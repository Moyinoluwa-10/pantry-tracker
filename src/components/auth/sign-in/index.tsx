import Link from "next/link";
import SignInForm from "./form";

export default function SignIn() {
  return (
    <div className="w-full grid gap-6">
      <div className="grid grid-cols-2 bg-white rounded-lg text-center font-semibold mb-4">
        <Link
          href={"/sign-up"}
          className={"px-5 py-2 rounded-lg bg-white text-gray-500"}
        >
          Sign Up
        </Link>
        <Link
          href={"/sign-in"}
          className={"px-5 py-2 rounded-lg bg-blue-600 text-white"}
        >
          Sign In
        </Link>
      </div>

      <SignInForm />
    </div>
  );
}
