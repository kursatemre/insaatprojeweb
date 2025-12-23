'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-red-500/20 shadow-2xl">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
            Bir Hata Oluştu
          </h2>

          <p className="text-white/70 font-manrope text-lg mb-8 max-w-md mx-auto">
            Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin veya ana sayfaya
            dönün.
          </p>

          {/* Error Details (Development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left">
              <p className="font-roboto-mono text-xs text-red-300 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="font-roboto-mono text-xs text-red-400 mt-2">
                  Error Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={reset}
              className="px-6 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl hover:shadow-muted-gold/30 transition-all duration-300 flex items-center justify-center group"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Tekrar Dene
            </button>

            <Link
              href="/"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-manrope font-semibold rounded-lg border border-muted-gold/30 hover:border-muted-gold transition-all duration-300 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Ana Sayfa
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-white/50 font-manrope text-sm">
            Sorun devam ederse{' '}
            <Link href="/iletisim" className="text-muted-gold hover:text-bronze transition-colors">
              bizimle iletişime geçin
            </Link>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5 pointer-events-none"></div>
      </div>
    </div>
  );
}
