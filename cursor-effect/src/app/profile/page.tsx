"use client";
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Display from '../componenets/eventdisplay';

const Profile = () => {

const events= [
  {
    id: 1,
    img: "/image77.jpg",
    text:"mousetrap"
   },
   {
    id: 2,
    img: "/image77.jpg",
    text:"Abhedya 4.0"
   },
   {
    id: 3,
    img: "/image77.jpg",
    text:"aeroquest"
   },
   {
    id: 4,
    img: "/image77.jpg",
    text:"CSE Event"
   },
];


  return (
    <div
      className="flex flex-col bg-black items-center min-w-screen">

      <div className='mt-12 participant_info font-inter flex flex-col text-white items-center justify-center'>
        <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-b from-[#1B7774] to-[#0E1F25]">
        <div className="w-32 h-32 rounded-full overflow-hidden my-3 ">
        <Image 
  src="/profile.svg" 
  alt="Circular Image" 
  width={500} 
  height={500} 
  className="w-full h-full object-cover" 
/>
</div>
        </div>
        <div className='name text-lg mt-2 font-semibold text-white'>Amit Singh Bathyal</div>
        <div className='prodyid text-lg font-semibold py-3 text-white'>prody_id 011</div>
        <div className='points text-lg font-semibold text-white'>1000</div>
        <div className='points text-base font-medium mb-8 text-white'>Prody Points</div>
      </div>
      <Display/>
      {/* <CircularProgressBar events={eventNames.length} eventNames={eventNames}/> */}
      <div className='flex px-6 pb-2 mt-8 justify-between w-full'>
      <div className='text-white mx-auto font-semibold pb-8 text-2xl'>More Events </div>
      </div>
      <Link href="/events">        
<div className="grid grid-col-4 grid-flow-col gap-20 bg-[##010101] p-4 w-full text-white ">
  {events.map((event) => (
    <div key={event.id} className="flex items-center mb-4 hover:scale-110 transition-all duration-300">
      
      
        <Image
              src={event.img}
              alt={event.text}
              width={64} 
              height={64} 
              className="rounded-full object-cover w-[5vw] translate-x-2"
            />
      <Image
      src="/Subtract.svg" 
  alt="Circular Image" 
  width={500} 
  height={500} 
  className="w-[10vw] relative" 
/>
      <div className='absolute translate-x-20 -translate-y-2 bg- px-7'>
        {event.text}
        
      </div>
    </div>
  ))}
</div>
</Link>

    </div>
  );
};

export default Profile;
