// app/api/logout/route.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: "",
    path: "/",
    expires: new Date(0), // Expire immediately
    httpOnly: true,
  });

  // Redirect to homepage after logout
  redirect("/");
}
