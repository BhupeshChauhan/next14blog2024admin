"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status, update }: any = useSession();
  console.log(session);
  return <div>Homepage</div>;
}
