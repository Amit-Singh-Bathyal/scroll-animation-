import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

const Register: React.FC = () => {
  return (
    <Link href="/profile" passHref>
    <div className="w-[50vw] h-[75vh] flex flex-col items-center justify-center space-y-6 p-4">
      
      <div className="w-[40vw] h-[50vh] flex items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/1d8fae96-53e6-4b03-ae59-6b00bd57a27d/N13Ya2OXgq.lottie"
          loop
          autoplay
        />
      </div>

      
      <button className="px-6 py-3  text-lg bg-[#00a3a3] text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:bg-[#008080]">
        Explore Your Profile
      </button>
    </div>
    </Link>
  );
};

export default Register;
