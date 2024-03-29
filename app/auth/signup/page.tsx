import { CardContent, CardFooter, Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import SignupForm from "@/components/SignupForm";

export default function SignupComponent() {

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
        <p className="mt-1 text-lg text-[#555]">Sign up to create your account</p>
      </div>
      <Card className="w-[400px] pt-6">
        <CardContent>
            <SignupForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between space-y-2 pt-4">
          <Link className="text-sm text-[#555]" href="signin">
            Already have an account? Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
