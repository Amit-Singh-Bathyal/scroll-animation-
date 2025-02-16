"use client";
import Link from 'next/link';
import Image from 'next/image';
import Display from '../componenets/eventdisplay';

const Profile = () => {
  
  const user={
    name: "Amit Singh Bathyal",
    prodyId: "011",
    points: 1000,
    profileImg: "/profile.svg", 
  };

  const events = [
    { id: 1, img: "/image77.jpg", text: "Mousetrap" },
    { id: 2, img: "/image77.jpg", text: "Abhedya 4.0" },
    { id: 3, img: "/image77.jpg", text: "Aeroquest" },
    { id: 4, img: "/image77.jpg", text: "CSE Event" },
  ];


  return (
    <div className="flex flex-col bg-black items-center min-h-screen">
      {/* User Info Section */}
      <div className="mt-12 participant_info font-inter flex flex-col text-white items-center justify-center">
        <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-b from-[#1B7774] to-[#0E1F25]">
          <div className="w-32 h-32 rounded-full overflow-hidden my-3">
            <Image
              src={user.profileImg}
              alt="Profile Image"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="name text-2xl mt-2 font-semibold text-white">{user.name}</div>
        <div className="prodyid text-xl font-semibold py-4 text-white">Prody ID: {user.prodyId}</div>
        <div className="points text-2xl font-semibold text-white">{user.points}</div>
        <div className="points text-lg font-medium mb-12 text-white">Prody Points</div>
      </div>

      {/* Event Display */}
      <Display />

      {/* More Events Section */}
      <div className="flex px-6 pb-2 mt-12 justify-between w-full">
        <div className="text-white mt-7 mx-auto font-semibold pb-8 text-2xl">More Events</div>
      </div>

      <Link href="/events">
        <div className="grid grid-cols-4 gap-20 bg-[##010101] p-4 w-full text-white">
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
                alt="Decoration"
                width={500}
                height={500}
                className="w-[10vw] relative"
              />
              <div className="absolute translate-x-20 -translate-y-2 px-7">
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
