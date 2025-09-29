import Link from "next/link";
import { Music } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
            <Music className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold font-headline">Welcome Back to EarBeatz</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account.</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
            </Link>
        </p>
      </div>
    </div>
  );
}
