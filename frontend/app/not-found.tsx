"use client";

import Link from "next/link";
import { Home, RefreshCcw } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-[#0B0F19] px-6">
            <div className="flex flex-col items-center text-center max-w-xl">

                {/* 404 Gradient Text */}
                <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                    Page not found
                </h2>

                {/* Subtitle */}
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or may have been moved.
                    Don’t worry — your finances are safe and sound.
                </p>

                {/* Illustration / icon circle */}
                {/* <div className="mb-8 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shadow-inner">
                        <span className="text-4xl">💳</span>
                    </div>
                </div> */}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

                    {/* Home */}
                    <Link href="/">
                        <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md">
                            <Home size={18} />
                            Go to Dashboard
                        </button>
                    </Link>

                    {/* Retry */}
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-200 transition"
                    >
                        <RefreshCcw size={18} />
                        Refresh
                    </button>

                </div>

                {/* Footer text */}
                <p className="text-xs text-gray-400 mt-10">
                    FintechHub • Secure Digital Banking
                </p>
            </div>
        </div>
    );
}