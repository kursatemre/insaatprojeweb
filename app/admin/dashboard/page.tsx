'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      id: 1,
      label: 'Toplam Proje',
      value: '320',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 2,
      label: 'Aktif Şantiye',
      value: '45',
      change: '+3',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      id: 3,
      label: 'Bekleyen Mesaj',
      value: '5',
      change: 'Yeni',
      changeType: 'neutral',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 4,
      label: 'Aylık Gelir',
      value: '₺2.4M',
      change: '+8%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const recentProjects = [
    { id: 1, title: 'Milli Eğitim İlkokul Binası', status: 'Tamamlandı', date: '2024-03-15', client: 'MEB' },
    { id: 2, title: 'Lüks Rezidans Kompleksi', status: 'Devam Ediyor', date: '2024-03-10', client: 'Özel Müşteri' },
    { id: 3, title: 'Plaza ve İş Merkezi', status: 'Tamamlandı', date: '2024-03-08', client: 'ABC Holding' },
    { id: 4, title: 'Villa Kompleksi', status: 'Devam Ediyor', date: '2024-03-05', client: 'XYZ İnşaat' },
    { id: 5, title: 'Sağlık Ocağı Binası', status: 'Planlama', date: '2024-03-01', client: 'Belediye' },
  ];

  const recentMessages = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', subject: 'Proje Teklifi', date: '2 saat önce', unread: true },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', subject: 'Güçlendirme Hizmeti', date: '5 saat önce', unread: true },
    { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', subject: 'Statik Proje', date: '1 gün önce', unread: false },
  ];

  return (
    <div className="flex min-h-screen bg-warm-concrete">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-dark-carbon/10 p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair font-bold text-3xl text-night-blue">Dashboard</h1>
              <p className="text-dark-carbon/60 font-manrope mt-1">Hoş geldiniz, Admin</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-dark-carbon/5 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-dark-carbon/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="text-right">
                <p className="text-sm font-manrope font-semibold text-dark-carbon">Admin User</p>
                <p className="text-xs text-dark-carbon/60 font-manrope">{new Date().toLocaleDateString('tr-TR')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border-2 border-dark-carbon/10 hover:border-muted-gold/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-roboto-mono font-semibold ${
                      stat.changeType === 'positive'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-dark-carbon/60 font-manrope text-sm mb-1">{stat.label}</h3>
                <p className="text-3xl font-playfair font-bold text-night-blue">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Two Columns Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-white rounded-xl border-2 border-dark-carbon/10 overflow-hidden"
              >
                <div className="p-6 border-b border-dark-carbon/10 flex items-center justify-between">
                  <h2 className="font-playfair font-bold text-xl text-night-blue">Son Projeler</h2>
                  <a href="/admin/projeler" className="text-muted-gold hover:text-bronze font-manrope text-sm font-semibold">
                    Tümünü Gör →
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-warm-concrete/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-roboto-mono font-semibold text-dark-carbon/60 uppercase tracking-wider">
                          Proje Adı
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-roboto-mono font-semibold text-dark-carbon/60 uppercase tracking-wider">
                          Müşteri
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-roboto-mono font-semibold text-dark-carbon/60 uppercase tracking-wider">
                          Durum
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-roboto-mono font-semibold text-dark-carbon/60 uppercase tracking-wider">
                          Tarih
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-carbon/10">
                      {recentProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-warm-concrete/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-manrope font-semibold text-night-blue">{project.title}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm font-manrope text-dark-carbon/70">{project.client}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-manrope font-semibold ${
                                project.status === 'Tamamlandı'
                                  ? 'bg-green-100 text-green-700'
                                  : project.status === 'Devam Ediyor'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {project.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-roboto-mono text-dark-carbon/60">
                            {project.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Recent Messages */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-white rounded-xl border-2 border-dark-carbon/10 overflow-hidden"
              >
                <div className="p-6 border-b border-dark-carbon/10 flex items-center justify-between">
                  <h2 className="font-playfair font-bold text-xl text-night-blue">Son Mesajlar</h2>
                  <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-roboto-mono font-bold">
                    {recentMessages.filter((m) => m.unread).length}
                  </span>
                </div>
                <div className="divide-y divide-dark-carbon/10">
                  {recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 hover:bg-warm-concrete/30 transition-colors cursor-pointer ${
                        message.unread ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-muted-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-muted-gold font-playfair font-bold text-sm">
                            {message.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-manrope font-semibold text-night-blue truncate">
                              {message.name}
                            </p>
                            {message.unread && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                          </div>
                          <p className="text-xs text-dark-carbon/60 font-manrope truncate mb-1">{message.subject}</p>
                          <p className="text-xs text-dark-carbon/40 font-roboto-mono">{message.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-dark-carbon/10">
                  <a
                    href="/admin/mesajlar"
                    className="block text-center text-muted-gold hover:text-bronze font-manrope text-sm font-semibold"
                  >
                    Tüm Mesajları Gör →
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
