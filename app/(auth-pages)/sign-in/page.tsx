import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import UserFooter from "@/components/user-footer";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex flex-col min-w-64 md:min-w-80 mx-auto p-7 rounded-lg shadow-2xl">
        <h1 className="sm:text-4xl font-2xl font-bold">Login</h1>
        <p className="text-sm text-foreground">
          Don&apos;t have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-up">
            Register
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Login
          </SubmitButton>
          <UserFooter />
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
