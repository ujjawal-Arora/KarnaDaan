import React, { useEffect, useState } from 'react'
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import FrontCard from '../Components/FrontCard';

const FrontCards = () => {
  const [data,setData] =useState(' ');
  // useEffect(()=>{
  //   const getData= async ()=>{
  //     try{
  //       // const response = await fetch('http://localhost:3000/api/v1/post/get');
  //       const data = await response.json();
  //       setData(data);

  //     }catch(e){
  //       console.error('Failed to fetch data', e);
  //     }
  //   }
  // })
  return (
    <div className="h-screen w-full grid grid-cols-4   justify-center items-center gap-4 bg-gray-100 p-4">
      <FrontCard
        imgSrc="https://picsum.photos/300/200"
        imgAlt="Card Image"
        title="Card Title 1"
        description="This is a description for card 1"
        btntext="Learn More"
        link="LearnMore"
        wishlist={false} // initial wishlist state
        // learnMorePath="/LearnMore"
      />

      <FrontCard
        // imgSrc="https://picsum.photos/301/200"
        imgSrc={img3}
        imgAlt="Card Image"
        title="Card Title 2"
        description="This is a description for card 2"
        btntext="Learn More"
        link="Contact"
        wishlist={false} // initial wishlist state
      />

      <FrontCard
        imgSrc="https://picsum.photos/302/200"
        imgAlt="Card Image"
        title="Card Title 3"
        description="This is a description for card 3"
        btntext="Learn More"
        link="cardPage"
        wishlist={true} // initial wishlist state
      />

      <FrontCard
        imgSrc={img3}
        imgAlt="Card Image"
        title="Card Title 4"
        description="This is a description for card 4"
        btntext="Learn More"
        link="cardPage"
        wishlist={false} // initial wishlist state
      />

      <FrontCard
        // imgSrc="https://picsum.photos/304/200"
        imgSrc={img2}
        imgAlt="Card Image"
        title="Card Title 5"
        description="This is a description for card 5"
        btntext="Learn More"
        link="cardPage"
        wishlist={false} // initial wishlist state
      />

      <FrontCard
        imgSrc="https://picsum.photos/305/200"
        imgAlt="Card Image"
        title="Card Title 6"
        description="This is a description for card 6"
        btntext="Learn More"
        link="cardPage"
        wishlist={false} // initial wishlist state
      />
    </div>
  )
}

export default FrontCards
