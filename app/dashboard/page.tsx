"use client";

import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@clerk/clerk-sdk-node";
import Image from "next/image";
import { getListOfUserTutors } from "@/services/tutor-services";
export default function Home() {
  const { replace } = useRouter();
  const userId = useReadLocalStorage("userId") as string;
  const [user, setUser] = useState<User | null>(null);
  const [tutors, setTutors] = useState<any[]>([]);

  useEffect(() => {
    const getUser = async (userId: string) => {
      try {
        const { data } = await axios.get(`/api/user?id=${userId}`);
        const tutors = await getListOfUserTutors({
          userId,
        });
        setUser(data.user);
        setTutors(tutors);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (!userId) return;
    getUser(userId);
  }, [userId]);

  if (!userId) {
    replace("/error");
    return null;
  }
  if (!user) return <div>No user found</div>;
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      Dashboard
      <h1>Name : {user.firstName}</h1>
      <h1>Lastname : {user.lastName}</h1>
      <h1>id : {user.id}</h1>
      <img
        className="w-10 h-10 rounded-full"
        src={user.imageUrl}
        alt="profile picture"
      />
      <h2>Tutors</h2>
      <ul>
        {tutors.length > 0 &&
          tutors.map((tutor) => <li key={tutor.id}>{tutor.name}</li>)}
      </ul>
    </main>
  );
}
