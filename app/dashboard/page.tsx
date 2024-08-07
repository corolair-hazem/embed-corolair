"use client";

import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@clerk/clerk-sdk-node";
import Image from "next/image";
export default function Home() {
  const { replace } = useRouter();
  const userId = useReadLocalStorage("userId") as string;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async (userId: string) => {
      try {
        const { data } = await axios.get(`/api/user?id=${userId}`);
        setUser(data.user);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (!userId) return;
    getUser(userId);
  }, [user, userId]);

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
    </main>
  );
}
