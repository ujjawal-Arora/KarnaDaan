import PropTypes from "prop-types";
import { useState } from "react";

const OtpCard = ({ length, onChangeOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;

    if (/[^0-9]/.test(value)) return; // Prevent non-numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (index < length - 1 && value) {
      element.nextSibling.focus();
    }

    onChangeOtp(newOtp.join(""));
  };

  const handleBackspace = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);

    // Move focus to the previous input
    if (index > 0) {
      element.previousSibling.focus();
    }

    onChangeOtp(newOtp.join(""));
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length).split("");
    const newOtp = [...otp];

    pasteData.forEach((value, i) => {
      if (/^[0-9]$/.test(value)) {
        newOtp[i] = value;
      }
    });

    setOtp(newOtp);
    onChangeOtp(newOtp.join(""));
  };

  return (
    <div onPaste={handlePaste}>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={data}
          className="w-14 h-14 border-[3px]  mr-5 text-2xl font-medium rounded-lg text-center border-gray-400"
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              handleBackspace(e.target, index);
            }
          }}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

OtpCard.propTypes = {
  length: PropTypes.number.isRequired,
  onChangeOtp: PropTypes.func.isRequired,
};

export default OtpCard;
