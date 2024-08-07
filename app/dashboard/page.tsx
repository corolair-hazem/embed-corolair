"use client";

import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";

export default function Home() {
  const { replace } = useRouter();
  const userId = useReadLocalStorage("userId");
  if (!userId) {
    replace("/error");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard
      <h1>userId : {String(userId)}</h1>
    </main>
  );
}
