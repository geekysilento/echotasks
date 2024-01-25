'use client'

import Board from "@/components/Board";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import useAuthStore from "@/store/AuthStore";



export default function Home() {
  const user = useAuthStore((state) => state.username);
  
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


