import React from "react";
import { useLocation } from "react-router-dom";

export default function Thanks() {
  const loc = useLocation();
  const isPaid = loc.state?.isPaid;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-400 to-pink-500 p-4">

  <div
    className={`relative w-full max-w-md p-8 rounded-2xl text-center cursor-pointer
       border transition-all duration-300
      hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]
      ${isPaid
        ? "bg-white/20 border-green-400/40 shadow-[0_0_20px_rgba(0,255,100,0.4)]"
        : "bg-white/20 border-orange-400/40 shadow-[0_0_20px_rgba(255,150,50,0.4)]"
      }`}
  >

    {/* Glow behind card */}
    <div
      className={`absolute inset-0 rounded-2xl  opacity-40 -z-10
        ${isPaid ? "bg-green-400/50" : "bg-orange-400/50"}`}>
    </div>

    <h2 className="text-2xl font-bold text-white drop-shadow-md">
      {isPaid ? "🎉 Thanks for becoming a Paid User 😊!" : "👋 Why don’t you join our Family 🥺?"}
    </h2>

    <p className="mt-3 text-sm text-white/90">
      {isPaid
        ? "You now have full access to premium features."
        : "Unlock premium features and become part of our community."}
    </p>

  </div>
</div>

  );
}
