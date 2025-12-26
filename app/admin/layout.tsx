'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { isAuthenticated } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Login sayfasında auth kontrolü yapma
      if (pathname === '/admin/login') {
        setIsLoading(false);
        return;
      }

      const authenticated = await isAuthenticated();

      if (!authenticated) {
        router.push('/admin/login');
      } else {
        setIsAuthed(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-concrete flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-muted-gold"></div>
          <p className="mt-4 text-dark-carbon/60 font-manrope">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Login sayfası için sidebar gösterme
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Authenticated admin pages
  if (!isAuthed) {
    return null; // Redirect yapılıyor
  }

  return (
    <div className="min-h-screen bg-warm-concrete">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
