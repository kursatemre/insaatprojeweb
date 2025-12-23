'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="tr">
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-red-500/20 shadow-2xl">
              <div className="w-32 h-32 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
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

              <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
                Kritik Hata
              </h2>

              <p className="text-white/70 font-manrope text-lg mb-8">
                Uygulamada kritik bir hata oluştu. Lütfen sayfayı yenileyin.
              </p>

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

              <button
                onClick={reset}
                className="px-6 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl hover:shadow-muted-gold/30 transition-all duration-300"
              >
                Sayfayı Yenile
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
