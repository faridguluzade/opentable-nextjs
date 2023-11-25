"use client";

import Link from "next/link";

import AuthModal from "./AuthModal";
import { useAuth } from "../../hooks/useAuth";

export default function NavBar() {
  const { data, loading, signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        {!loading && (
          <div className="flex">
            {data && (
              <button
                className="bg-blue-400 text-white mr-3  border p-1 px-4 rounded"
                onClick={signout}
              >
                Sign out
              </button>
            )}

            {!data && (
              <>
                <AuthModal isSignin={true} />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
