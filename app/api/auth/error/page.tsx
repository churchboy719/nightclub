"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ErrorContent = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      <p className="mt-4">{error || "An unknown error occurred. Please try again."}</p>
      <a
        href="/api/auth/signin"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Sign-In
      </a>
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
};

export default ErrorPage;
