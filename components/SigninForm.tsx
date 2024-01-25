'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { account } from "@/appwrite";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/AuthStore";

export default function Signinform() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const setUser = useAuthStore((state) => state.setUser)
    const router = useRouter();
    const signinHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if the password meets the length requirement
        if (password.trim().length < 8) {
          alert('Password must be at least 8 characters long');
          return;
        }

        // Check for other fields and proceed with account creation
        if (email.trim() !== '' && password.trim() !== '') {
          try {

            // Create a session
            const session = await account.createEmailSession(email, password);
            const username = (await account.get()).name

            if (session) {
                setUser(username)
                router.push('/')
            }

          } catch (error) {
            // Handle account creation or session creation errors
            alert(error);
          }
        } else {
          alert("Input fields cannot be empty!");
        }
      };
    return (
        <form className="space-y-6" onSubmit={signinHandler}>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium leading-none text-[#333]" htmlFor="email">
                    Email
                </label>
                <Input id="email" placeholder="Enter your Email" type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium leading-none text-[#333]" htmlFor="password" >
                    Password
                </label>
                <Input id="password" placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full">Sign In</Button>
        </form>
    )
}