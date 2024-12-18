// import React, { useEffect, useState } from 'react';

// const StripePayment = () => {
//   const [stripe, setStripe] = useState(null);

//   useEffect(() => {
//     // Dynamically load the Stripe.js script
//     const script = document.createElement('script');
//     script.src = "https://js.stripe.com/v3/";
//     script.onload = () => {
//       // After loading the script, set Stripe
//       setStripe(window.Stripe('your-publishable-key-here')); // Replace with your Stripe Publishable Key
//     };
//     script.onerror = (error) => {
//       console.error("Stripe script failed to load", error);
//     };
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async () => {
//     if (!stripe) {
//       alert('Stripe has not loaded yet. Please try again later.');
//       return;
//     }

//     try {
//       // Send a request to your backend to create the checkout session
//       const response = await fetch('http://localhost:3000/api/v1/funds/payment/create-checkout-session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 2000 }), // Amount in cents (e.g., 2000 = $20)
//       });

//       const { url } = await response.json();

//       // Redirect the user to the Stripe Checkout page
//       window.location.href = url;
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while processing the payment.');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <button style={styles.button} onClick={handlePayment}>
//         Donate Now
//       </button>
//     </div>
//   );
// };

// // Inline styles for simplicity
// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#f4f4f4',
//   },
//   button: {
//     backgroundColor: '#FB8C00',
//     color: 'white',
//     padding: '15px 30px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
//     transition: '0.3s',
//     outline: 'none',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
// };

// export default StripePayment;

import React, { useState,useEffect } from 'react';
import toast from 'react-hot-toast';

function StripePayment() {
  const donationOptions = [
    { amount: 25, description: "Provides meals for 5 families" },
    { amount: 50, description: "Supplies clean water for a month" },
    { amount: 100, description: "Funds education for 2 children" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Make a <span className="text-orange-500">Difference</span> Today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your generosity can change lives. Join us in making the world a better place,
            one donation at a time.
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-12 text-center">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
            alt="People helping people"
            className="rounded-xl shadow-2xl mx-auto max-w-4xl w-full object-cover h-[400px]"
          />
        </div>

        {/* Impact Section */}
        <ImpactSection />

       

        {/* Custom Donation Form */}
        <div className="flex justify-center">
          <DonationForm />
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Trusted by organizations worldwide</p>
          <div className="flex justify-center space-x-8">
            <span className="text-4xl">🔒</span>
            <span className="text-4xl">✨</span>
            <span className="text-4xl">💪</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ImpactSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
      <div className="text-center">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-orange-600">🌟</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">10K+</h3>
        <p className="text-gray-600">Lives Impacted</p>
      </div>
      <div className="text-center">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-orange-600">🌍</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">50+</h3>
        <p className="text-gray-600">Countries Reached</p>
      </div>
      <div className="text-center">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-orange-600">❤️</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">1M+</h3>
        <p className="text-gray-600">Donations Made</p>
      </div>
    </div>
  );
};



const DonationForm = () => {
    const [customAmount, setCustomAmount] = useState('');

  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/";
    script.onload = () => {
      setStripe(window.Stripe('your-publishable-key-here')); // Replace with your Stripe Publishable Key
    };
    script.onerror = (error) => {
      console.error("Stripe script failed to load", error);
    };
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if(customAmount<=0){
        toast.error('Please Fill the amount')
        return;
    }
    if (!stripe) {
        toast.error('Stripe has not loaded yet. Please try again later.');
      return;
    }
    

    try {
      
      const response = await fetch('http://localhost:3000/api/v1/funds/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: customAmount }), // Amount in cents (e.g., 2000 = $20)
      });

      const { url } = await response.json();

      // Redirect the user to the Stripe Checkout page
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the payment.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Custom Amount</h3>
      <div className="relative">
        <span className="absolute left-3 top-2 text-gray-500">$</span>
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-full pl-8 pr-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
          placeholder="Enter amount"
        />
      </div>
      <button  onClick={handlePayment}  className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
        Donate Now
      </button>
    </div>
  );
};

export default StripePayment;
