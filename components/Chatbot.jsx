"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const Chatbot = () => {
  const { user } = useUser();

  useEffect(() => {
    const loadChatbase = async () => {
      if (!user?.id) return;

      try {
        // Call your API route to generate HMAC
        const res = await fetch("/api/chatbase-hmac", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });

        const data = await res.json();

        if (!data.hmac) {
          console.error("No HMAC received");
          return;
        }

        // Inject Chatbase script
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "your-chatbase-bot-id"; // Replace with your bot ID
        script.setAttribute("chatbase-hmac", data.hmac);
        script.setAttribute("chatbase-id", "your-chatbase-bot-id"); // Replace with your bot ID
        script.setAttribute("chatbase-version", "1");
        document.body.appendChild(script);
      } catch (err) {
        console.error("Error loading chatbot:", err);
      }
    };

    loadChatbase();
  }, [user]);

  return null; // No visible UI here
};

export default Chatbot;
