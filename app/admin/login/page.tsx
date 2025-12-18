'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // TODO: Supabase authentication entegrasyonu
    // Şimdilik basit demo login
    setTimeout(() => {
      if (formData.email === 'admin@ekipproje.com' && formData.password === 'admin123') {
        // localStorage'a token kaydet
        localStorage.setItem('adminToken', 'demo-token-123');
        router.push('/admin/dashboard');
      } else {
        setError('E-posta veya şifre hatalı');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-topo-pattern opacity-10"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-muted-gold/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-night-blue to-dark-carbon p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-muted-gold rounded-full flex items-center justify-center">
                <span className="text-2xl font-playfair font-bold text-white">EP</span>
              </div>
            </div>
            <h1 className="font-playfair font-bold text-3xl text-white mb-2">Admin Panel</h1>
            <p className="text-white/70 font-manrope text-sm">Ekip Proje Yönetim Sistemi</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-600 text-sm font-manrope">{error}</p>
                </motion.div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-dark-carbon font-manrope font-semibold mb-2">
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg focus:border-muted-gold focus:outline-none transition-colors font-manrope"
                  placeholder="admin@ekipproje.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-dark-carbon font-manrope font-semibold mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg focus:border-muted-gold focus:outline-none transition-colors font-manrope"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-muted-gold border-dark-carbon/20 rounded focus:ring-muted-gold"
                  />
                  <span className="ml-2 text-dark-carbon/70 font-manrope text-sm">
                    Beni Hatırla
                  </span>
                </label>
                <a
                  href="#"
                  className="text-muted-gold hover:text-bronze font-manrope text-sm font-semibold transition-colors"
                >
                  Şifremi Unuttum
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-bold rounded-lg hover:shadow-xl hover:shadow-muted-gold/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Giriş Yapılıyor...
                  </span>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-night-blue/5 rounded-lg border border-night-blue/10">
              <p className="text-xs font-manrope text-dark-carbon/60 text-center mb-2">
                <strong>Demo Giriş Bilgileri:</strong>
              </p>
              <p className="text-xs font-roboto-mono text-dark-carbon/80 text-center">
                admin@ekipproje.com / admin123
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-warm-concrete/50 border-t border-dark-carbon/10 text-center">
            <Link href="/" className="text-dark-carbon/60 hover:text-muted-gold font-manrope text-sm transition-colors">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <p className="text-white/40 font-roboto-mono text-xs">
            🔒 256-bit SSL ile güvenli bağlantı
          </p>
        </div>
      </motion.div>
    </div>
  );
}
