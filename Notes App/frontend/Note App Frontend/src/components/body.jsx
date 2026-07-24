import NoteCard from "./note-card";
import LoginSignUp from "./login-signup";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const Body = () => {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  return (
    <main className="flex-grow p-6 h-[77vh]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Notes</h2>
        {isLoggedIn?<NoteCard title="My First Note" content="This is a deep dive project!"></NoteCard> :<LoginSignUp setIsLoggedIn={setIsLoggedIn}></LoginSignUp> }
      </div>
    </main>
  );
};

export default Body;