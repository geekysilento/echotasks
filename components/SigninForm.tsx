'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function signinform() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <form className="space-y-6">
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium leading-none text-[#333]" htmlFor="email">
                    Username
                </label>
                <Input id="username" placeholder="Enter your email" type="email" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium leading-none text-[#333]" htmlFor="password" >
                    Password
                </label>
                <Input id="password" placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full">Sign Up</Button>
        </form>
    )
}