"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">Something went wrong!</h2>
      <p className="text-muted mb-8 max-w-md">
        We encountered an error loading the daily essays. This could be due to network issues or missing database credentials.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-foreground text-background font-medium rounded-lg hover:bg-zinc-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
