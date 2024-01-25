'use client'
import Board from "@/components/Board";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import useAuthStore from "@/store/AuthStore";



export default async function Home() {
  const user = await useAuthStore((state) => state.username);
  if(!user){
    redirect("/auth/signin")
  }

    return (
      <main>
        {
          <>
            <Header />
            <Board />
          </>
        }
      </main>
    );
  }


