"use client";

import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6">

          {/* Card */}
          <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8 text-center">

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              We encountered an unexpected error.
              Don’t worry — your financial data is safe and secure.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">

              {/* Try again */}
              <button
                onClick={() => reset()}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition w-full"
              >
                <RefreshCcw size={16} />
                Try Again
              </button>

              {/* Home */}
              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center justify-center gap-2 border border-white/20 text-gray-300 hover:bg-white/5 px-5 py-3 rounded-xl font-semibold transition w-full"
              >
                <Home size={16} />
                Dashboard
              </button>
            </div>

            {/* Dev error (only in dev) */}
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs text-red-400 mt-6 break-all">
                {error?.message}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}