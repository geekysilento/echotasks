import Board from "@/components/Board";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

import Link from "next/link";

export default function Home() {
  const user = null;
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


