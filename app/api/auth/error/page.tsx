"use client";

import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-4">{error || "An unknown error occurred. Please try again."}</p>
        <a href="/api/auth/signin" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          Go to Sign-In
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
