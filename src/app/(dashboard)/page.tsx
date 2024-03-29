"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status, update }: any = useSession();
  const route = useRouter();
  useEffect(() => {
    route.push("/dashboard");
  }, [route]);

  return <div>Homepage</div>;
}
