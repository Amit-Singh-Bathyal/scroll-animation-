"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { events, Event } from "../../../../public/data/event";
import Link from "next/link";
import Image from "next/image";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Find the event with the matching ID
    const foundEvent = events.find((event) => event.id === parseInt(id));
    setEvent(foundEvent || null);
  }, [id]);

  if (!event) {
    return <div className="p-8 text-center">Event not found!</div>;
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.webp')",
      }}
    >
      {/* Background Blur Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md"
        style={{
          WebkitBackdropFilter: "blur(10px)",
        }}
      ></div>

      {/* Event Details Content */}
      <main className="relative pt-20  z-10">
        <div className="max-w-4xl mx-auto p-6   rounded-3xl shadow-lg border-4 border-teal-700 backdrop-blur-sm">
          <Image
            src={event.photoUrl}
            alt={event.name}
            className="w-96 ml-4 mt-4 h-64 border-2 border-teal-500 rounded-2xl object-cover"
            height={256}
            width={384}
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
            <p className="text-white mb-6">{event.description}</p>
            <div className="space-y-4 space-x-4">
              <Link
                href={event.abstractLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                View Abstract
              </Link>
              <Link
  href={`/register`} // Dynamic route with event ID
  className="inline-block bg-teal-500 text-white px-8 py-2 rounded-lg hover:bg-teal-600 transition-all"
>
  Register
</Link>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;