"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";
import axios from "axios";

type Event = {
  id: string;
  name: string;
  poster: string;
};

const Profile = () => {
  const profileImages = ["/p1.svg", "/p2.svg", "/p3.svg", "/p4.svg", "/p5.svg"];
  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState({
    name: "",
    user_id: "",
    points: "",
  });
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [moreEvents, setMoreEvents] = useState<Event[]>([]);
  const [token, setToken] = useState<string | null>(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    setToken(storedToken); 
    console.log("Token retrieved from localStorage:", storedToken);

    if (!storedToken) {
      console.error("No token found. Please log in.");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user/`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/events/`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setRegisteredEvents(response.data.registered_events);
      } catch (error) {
        console.error("Failed to fetch registered events:", error);
      }
    };

    const fetchMoreEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/`
        );
        setMoreEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch more events:", error);
      }
    };

    const storedImage = localStorage.getItem("profileImg");
    if (storedImage) {
      setProfileImg(storedImage);
    } else {
      const randomImg = profileImages[Math.floor(Math.random() * profileImages.length)];
      localStorage.setItem("profileImg", randomImg);
      setProfileImg(randomImg);
    }

    fetchUserProfile();
    fetchRegisteredEvents();
    fetchMoreEvents();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Navbar />
      <div className="mt-4 text-white">
        Token: {token ? "Token found" : "No token found"}
      </div>

      <div className="mt-28 participant_info font-inter flex flex-col text-white items-center justify-center">
        <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-b from-[#1B7774] to-[#0E1F25]">
          <div className="w-28 h-28 rounded-full overflow-hidden my-3 ">
            {profileImg && (
              <Image
                src={profileImg}
                alt="Profile Image"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="name text-2xl mt-2 font-semibold text-white">{user.name}</div>
        <div className="prodyid text-xl font-semibold py-4 text-white">Prody ID: {user.user_id}</div>
        <div className="points text-2xl font-semibold text-white">{user.points}</div>
        <div className="points text-lg font-medium mb-12 text-white">Prody Points</div>
      </div>

      <div className="flex px-6 pb-2 mt-12 justify-between w-full">
        <div className="text-white mt-7 mx-auto font-semibold pb-8 text-2xl">More Events</div>
      </div>

      <Link href="/events">
        <div className="grid grid-cols-4 gap-20 bg-[##010101] p-4 w-full text-white">
          {moreEvents.map((event) => (
            <div key={event.id} className="flex items-center hover:scale-110 transition-all duration-300 mb-32">
              <Image
                src={event.poster}
                alt={event.name}
                width={64}
                height={64}
                className="rounded-full object-cover w-20 translate-x-2"
              />
              <Image
                src="/Subtract.svg"
                alt="Decoration"
                width={500}
                height={500}
                className="w-44 relative"
              />
              <div className="flex absolute translate-x-32">
                {event.name}
              </div>
            </div>
          ))}
        </div>
      </Link>

      <Footer />
    </div>
  );
};

export default Profile;