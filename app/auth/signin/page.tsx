
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import SigninForm from "@/components/signinForm"

export default function Component() {
  return (
    <div
      key="1"
      className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-300 to-purple-400"
    >
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#333]">
          <Image
            alt="EchoTasks"
            height={400}
            src="/echotasks.png"
            className=""
            width={400}
          />
        </h1>
        <p className="mt-1 text-lg text-[#555]">Sign in to manage your tasks</p>
      </div>
      <Card className="w-[400px] pt-6">
        <CardContent>
          <SigninForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between space-y-2 pt-4">
          <Link className="text-sm text-[#555]" href="#">
            Forgot password?
          </Link>
          <div className="flex items-center space-x-1">
            <p className="text-sm text-[#555]">Don't have an account?</p>
            <Link className="text-sm text-[#555] font-medium" href="signup">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

