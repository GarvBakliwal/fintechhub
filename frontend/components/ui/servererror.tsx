"use client";

import { RefreshCw, WifiOff } from "lucide-react";

type ServerErrorProps = {
    title?: string;
    message?: string;
    showRetry?: boolean;
    onRetry?: () => void;
};

export default function ServerError({
    title = "Connection issue detected",
    message = "We're having trouble connecting to our servers. Please try again.",
    showRetry = true,
    onRetry,
}: ServerErrorProps) {
    return (
        <div className="flex items-center justify-center h-full min-h-[70vh]">

            <div className="flex flex-col items-center justify-center w-full py-20 px-6 text-center">

                {/* Icon */}
                <div className="bg-red-100 dark:bg-red-900/30 p-5 rounded-full mb-6">
                    <WifiOff className="w-10 h-10 text-red-500" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                    {message}
                </p>

                {/* Retry Button */}
                {showRetry && (
                    <button
                        onClick={onRetry || (() => window.location.reload())}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                text-white px-5 py-2.5 rounded-lg transition-all shadow-md"
                    >
                        <RefreshCw size={18} />
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
}