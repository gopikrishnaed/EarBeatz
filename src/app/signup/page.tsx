import Link from "next/link";
import { Music } from "lucide-react";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
            <Music className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold font-headline">Join EarBeatz Today</h1>
            <p className="text-muted-foreground">Create an account to start your musical journey.</p>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
            </Link>
        </p>
      </div>
    </div>
  );
}
