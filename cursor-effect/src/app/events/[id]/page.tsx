"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: number;
  name: string;
  description: string;
  abstract_link: string;
  poster: string;
  date_time: string;
  is_live: boolean;
  is_completed: boolean;
  is_team_event: boolean;
  max_members: number;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}/`
        );
        setEvent(response.data);
      } catch (err) {
        setError("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        alert("You must be logged in to register for an event.");
        router.push("/login"); // Redirect to login page
        return;
      }

      // Check if the token is expired
      const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      const expiration = tokenPayload.exp * 1000; // Convert to milliseconds
      if (Date.now() > expiration) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("jwt"); // Remove expired token
        router.push("/login"); // Redirect to login page
        return;
      }

      // Payload for the registration request
      const registrationPayload = {
        team_id: teamId,
        team_name: teamName,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register-event/${id}/`,
        registrationPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setShowRegistrationModal(false);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("jwt"); // Remove expired token
          router.push("/login"); // Redirect to login page
        } else {
          console.error("Registration failed:", error);
          alert("Registration failed. Please try again.");
        }
      } else {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-white">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }
  if (!event) {
    return <div className="p-8 text-center text-white">Event not found!</div>;
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.webp')",
      }}
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md"
        style={{
          WebkitBackdropFilter: "blur(10px)",
        }}
      ></div>
      <main className="relative pt-20 z-10">
        <div className="max-w-4xl mx-auto p-6 rounded-3xl shadow-lg border-4 border-teal-700 backdrop-blur-sm">
          <Image
            src={event.poster}
            alt={event.name}
            className="w-96 ml-4 mt-4 h-64 border-2 border-teal-500 rounded-2xl object-cover"
            height={256}
            width={384}
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
            <div className="mb-4">
              {event.is_live ? (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Live
                </span>
              ) : event.is_completed ? (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Completed
                </span>
              ) : (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Upcoming
                </span>
              )}
            </div>
            {event.is_team_event && (
              <div className="mb-4">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  Team Event (Max {event.max_members} members)
                </span>
              </div>
            )}
            <p className="text-white mb-6">{event.description}</p>
            <div className="space-y-4 space-x-4">
              <Link
                href={event.abstract_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                View Abstract
              </Link>
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="inline-block bg-teal-500 text-white px-8 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-md"
            onClick={() => setShowRegistrationModal(false)}
          ></div>
          <div className="bg-black border-2 border-teal-600 rounded-3xl p-6 w-[90%] max-w-md relative z-50">
            <h2 className="text-2xl font-bold text-white mb-4">
              Register for {event.name}
            </h2>
            {event.is_team_event && (
              <>
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2">
                    Team ID (optional):
                  </label>
                  <input
                    type="text"
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                    className="w-full p-2 border border-teal-600 bg-black text-white rounded-lg"
                    placeholder="Enter Team ID"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2">
                    Team Name (if creating a new team):
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full p-2 border border-teal-600 bg-black text-white rounded-lg"
                    placeholder="Enter Team Name"
                  />
                </div>
              </>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;