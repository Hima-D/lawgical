// components/dashboard/AuthError.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {message.includes("token") ? "Access Denied" : 
             message.includes("expired") ? "Session Expired" : 
             "User Not Found"}
          </CardTitle>
          <CardDescription className="text-center">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link href="/sign-in">
            <Button className="w-full">Sign In</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}