'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ID, account } from "@/appwrite";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/AuthStore";



export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const setUser = useAuthStore((state) => state.setUser)

    const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if the password meets the length requirement
        if (password.trim().length < 8) {
          alert('Password must be at least 8 characters long');
          return;
        }

        // Check for other fields and proceed with account creation
        if (username.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
          try {
            // Call your account creation API
            const acc = await account.create(ID.unique(), email, password, username);

            // Create a session
            const session = await account.createEmailSession(email, password);

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
        <form className="space-y-6" onSubmit={signupHandler}>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium leading-none text-[#333]" htmlFor="username">
                    Username
                </label>
                <Input id="username" placeholder="Enter your username" type="string" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium leading-none text-[#333]" htmlFor="email">
                    Email
                </label>
                <Input id="email" placeholder="Enter your email" type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium leading-none text-[#333]" htmlFor="password">
                    Password
                </label>
                <Input id="password" placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full" type="submit">Sign Up</Button>
        </form>
    );
}
