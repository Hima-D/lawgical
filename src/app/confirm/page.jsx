"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseclient";

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const confirmEmail = async () => {
      const { query } = router;
      const { token } = query;

      if (!token) {
        setError("Invalid or missing confirmation token.");
        setLoading(false);
        return;
      }

      try {
        // Confirm the user's email with the token
        const { user, error } = await supabase.auth.api
          .updateUser(token)
          .catch((error) => {
            setError("Failed to confirm email. Please try again.");
          });

        if (error) {
          setError(error.message);
        } else {
          router.push("/signin"); // Redirect after successful confirmation
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black py-12 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl">
        {loading && (
          <div className="flex justify-center items-center">
            <svg
              className="w-8 h-8 animate-spin text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0116 0"
              ></path>
            </svg>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-600 text-white p-4 rounded-md text-center shadow-md">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-green-600 text-white p-4 rounded-md text-center shadow-md">
            <p className="font-semibold">Your email has been successfully confirmed!</p>
            <p>You can now sign in and start using lawgical.</p>
            <button
              onClick={() => router.push("/signin")}
              className="mt-4 w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none transition-all duration-200"
            >
              Go to Sign In
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at <a href="mailto:support@lawgical.io" className="text-black hover:underline">support@lawgical.io</a></p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
