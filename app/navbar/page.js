'use client';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

function Navbar() {
 const { user } = useUser();

  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Habit Tracker
      </Link>

        <Link href="/addhabit">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Add Habit
            </button>
      </Link>
      

      <div className="flex items-center gap-4">
        <SignedIn>
          <span className="text-gray-700 hidden sm:block">
            Hello, <span className="font-semibold">{user?.username}</span>
          </span>
          <Link
            href="/dashboard"
            className="text-sm text-blue-600 hover:underline hidden sm:block"
          >
            Dashboard
          </Link>
          <SignOutButton>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Sign out
            </button>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar