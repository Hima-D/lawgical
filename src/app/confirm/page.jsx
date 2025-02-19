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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <p>Your email has been successfully confirmed. You can now sign in!</p>
      )}
    </div>
  );
};

export default ConfirmEmail;
