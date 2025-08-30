import React, { useEffect } from "react";
import "../styles/VerifiedPage.css";

export default function VerifiedPage() {
  useEffect(() => {
    fetch("http://localhost:8080/api/register/verify", {
      method: "POST",
      credentials: "include", // sends cookies if needed
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "harrisonyeboahcs@gmail.com", // 👈 adjust as needed
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Response:", data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <main>
      <h1>You are now verified ✅</h1>
      <p>Your account has been successfully verified.</p>
    </main>
  );
}
