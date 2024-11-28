"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function SignedOut({ children }) {
  const [profile, setProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setProfile(true);
    }
  }, [router]);

  return <div>{!profile ? children : null}</div>;
}

export default SignedOut;
