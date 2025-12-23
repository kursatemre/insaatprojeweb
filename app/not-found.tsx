import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Sayfa Bulunamadı',
  description: 'Aradığınız sayfa bulunamadı. Ana sayfaya dönebilir veya diğer sayfalarımızı ziyaret edebilirsiniz.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="font-playfair font-bold text-9xl md:text-[12rem] text-muted-gold opacity-20">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="relative z-10 -mt-32 md:-mt-40">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-muted-gold/20 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 bg-muted-gold/20 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-muted-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
              Sayfa Bulunamadı
            </h2>

            <p className="text-white/70 font-manrope text-lg mb-8 max-w-md mx-auto">
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Ana sayfaya dönebilir
              veya aşağıdaki bağlantıları kullanabilirsiniz.
            </p>

            {/* Navigation Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link
                href="/"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Ana Sayfa
              </Link>

              <Link
                href="/iletisim"
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                İletişim
              </Link>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/10">
              <Link
                href="/hizmetler"
                className="text-muted-gold hover:text-bronze font-manrope text-sm transition-colors"
              >
                Hizmetlerimiz
              </Link>
              <span className="text-white/30">•</span>
              <Link
                href="/projeler"
                className="text-muted-gold hover:text-bronze font-manrope text-sm transition-colors"
              >
                Projeler
              </Link>
              <span className="text-white/30">•</span>
              <Link
                href="/hakkimizda"
                className="text-muted-gold hover:text-bronze font-manrope text-sm transition-colors"
              >
                Hakkımızda
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5 pointer-events-none"></div>
      </div>
    </div>
  );
}
