'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      // Giriş yapılmış, dashboard'a yönlendir
      router.push('/admin/dashboard');
    } else {
      // Giriş yapılmamış, login sayfasına yönlendir
      router.push('/admin/login');
    }
  }, [router]);

  // Yönlendirme sırasında boş ekran göster
  return (
    <div className="flex items-center justify-center min-h-screen bg-warm-concrete">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-muted-gold mx-auto mb-4"></div>
        <p className="text-dark-carbon/70 font-manrope">Yönlendiriliyor...</p>
      </div>
    </div>
  );
}
