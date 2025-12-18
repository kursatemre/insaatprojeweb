'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function AdminMesajlarPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadMessages();
    }
  }, [router]);

  const loadMessages = () => {
    // Demo data - gerçek projede Supabase'den gelecek
    const demoMessages: Message[] = [
      {
        id: 1,
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        phone: '+90 532 123 4567',
        projectType: 'Mimari Proje',
        message:
          'Merhaba, 500 m² arazim için villa projesi yaptırmak istiyorum. Detaylı bilgi alabilir miyim?',
        date: '2024-03-18T10:30:00',
        isRead: false,
        priority: 'high',
      },
      {
        id: 2,
        name: 'Ayşe Demir',
        email: 'ayse@example.com',
        phone: '+90 533 987 6543',
        projectType: 'Güçlendirme Projesi',
        message: '3 katlı bina için deprem güçlendirme analizi yaptırmak istiyorum.',
        date: '2024-03-18T09:15:00',
        isRead: false,
        priority: 'high',
      },
      {
        id: 3,
        name: 'Mehmet Kaya',
        email: 'mehmet@example.com',
        phone: '+90 534 555 1234',
        projectType: 'Statik Proje',
        message: 'İş yeri için statik proje hazırlatmak istiyorum. Fiyat teklifi alabilir miyim?',
        date: '2024-03-17T16:45:00',
        isRead: true,
        priority: 'medium',
      },
      {
        id: 4,
        name: 'Fatma Özkan',
        email: 'fatma@example.com',
        phone: '+90 535 111 2222',
        projectType: 'Tesisat Projesi',
        message: 'Apartman için tesisat projesi yaptırmak istiyorum.',
        date: '2024-03-17T14:20:00',
        isRead: true,
        priority: 'low',
      },
      {
        id: 5,
        name: 'Ali Çelik',
        email: 'ali@example.com',
        phone: '+90 536 999 8888',
        projectType: 'Kontrollük',
        message: 'Devam eden inşaat için kontrollük hizmeti almak istiyorum.',
        date: '2024-03-17T11:00:00',
        isRead: true,
        priority: 'medium',
      },
    ];
    setMessages(demoMessages);
  };

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    // TODO: Supabase update işlemi
  };

  const handleDelete = (id: number) => {
    if (confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      setMessages(messages.filter((m) => m.id !== id));
      setSelectedMessage(null);
      // TODO: Supabase delete işlemi
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
  };

  const filteredMessages =
    filterStatus === 'all'
      ? messages
      : filterStatus === 'unread'
      ? messages.filter((m) => !m.isRead)
      : messages.filter((m) => m.isRead);

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-warm-concrete">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-dark-carbon/10 p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair font-bold text-3xl text-night-blue">İletişim Mesajları</h1>
              <p className="text-dark-carbon/60 font-manrope mt-1">
                {unreadCount} okunmamış mesaj
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-manrope font-semibold text-sm transition-all ${
                  filterStatus === 'all'
                    ? 'bg-night-blue text-white'
                    : 'bg-warm-concrete text-dark-carbon hover:bg-dark-carbon/10'
                }`}
              >
                Tümü ({messages.length})
              </button>
              <button
                onClick={() => setFilterStatus('unread')}
                className={`px-4 py-2 rounded-lg font-manrope font-semibold text-sm transition-all ${
                  filterStatus === 'unread'
                    ? 'bg-night-blue text-white'
                    : 'bg-warm-concrete text-dark-carbon hover:bg-dark-carbon/10'
                }`}
              >
                Okunmamış ({unreadCount})
              </button>
              <button
                onClick={() => setFilterStatus('read')}
                className={`px-4 py-2 rounded-lg font-manrope font-semibold text-sm transition-all ${
                  filterStatus === 'read'
                    ? 'bg-night-blue text-white'
                    : 'bg-warm-concrete text-dark-carbon hover:bg-dark-carbon/10'
                }`}
              >
                Okundu ({messages.length - unreadCount})
              </button>
            </div>
          </div>
        </div>

        {/* Messages Layout */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-3">
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleSelectMessage(message)}
                  className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all duration-200 ${
                    selectedMessage?.id === message.id
                      ? 'border-muted-gold shadow-lg'
                      : 'border-dark-carbon/10 hover:border-muted-gold/30'
                  } ${!message.isRead ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-muted-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-muted-gold font-playfair font-bold text-sm">
                          {message.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-manrope font-semibold text-night-blue text-sm">
                          {message.name}
                        </p>
                        <p className="text-xs text-dark-carbon/50 font-roboto-mono">
                          {new Date(message.date).toLocaleString('tr-TR', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    {!message.isRead && (
                      <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                    )}
                  </div>
                  <p className="text-xs font-manrope text-muted-gold font-semibold mb-1">
                    {message.projectType}
                  </p>
                  <p className="text-sm text-dark-carbon/70 font-manrope line-clamp-2">
                    {message.message}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-manrope font-semibold ${
                        message.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : message.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {message.priority === 'high'
                        ? 'Yüksek Öncelik'
                        : message.priority === 'medium'
                        ? 'Orta Öncelik'
                        : 'Düşük Öncelik'}
                    </span>
                  </div>
                </motion.div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center border-2 border-dark-carbon/10">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-dark-carbon/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-dark-carbon/60 font-manrope">Mesaj bulunamadı</p>
                </div>
              )}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border-2 border-dark-carbon/10 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-dark-carbon/10 bg-gradient-to-r from-night-blue/5 to-muted-gold/5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-muted-gold/20 rounded-full flex items-center justify-center">
                          <span className="text-muted-gold font-playfair font-bold text-xl">
                            {selectedMessage.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h2 className="font-playfair font-bold text-2xl text-night-blue">
                            {selectedMessage.name}
                          </h2>
                          <p className="text-dark-carbon/60 font-manrope text-sm">
                            {selectedMessage.email}
                          </p>
                          <p className="text-dark-carbon/60 font-roboto-mono text-sm">
                            {selectedMessage.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(selectedMessage.id)}
                          className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                          title="Sil"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-muted-gold/20 text-muted-gold rounded-full text-sm font-manrope font-semibold">
                        {selectedMessage.projectType}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-manrope font-semibold ${
                          selectedMessage.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : selectedMessage.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {selectedMessage.priority === 'high'
                          ? 'Yüksek Öncelik'
                          : selectedMessage.priority === 'medium'
                          ? 'Orta Öncelik'
                          : 'Düşük Öncelik'}
                      </span>
                      <span className="text-sm text-dark-carbon/50 font-roboto-mono">
                        {new Date(selectedMessage.date).toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="p-6">
                    <h3 className="font-playfair font-bold text-lg text-night-blue mb-4">Mesaj İçeriği</h3>
                    <p className="text-dark-carbon/80 font-manrope leading-relaxed text-base">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="p-6 border-t border-dark-carbon/10 bg-warm-concrete/30">
                    <div className="flex space-x-3">
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span>E-posta Gönder</span>
                      </a>
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="flex-1 px-6 py-3 bg-night-blue text-white font-manrope font-semibold rounded-lg hover:bg-night-blue/90 transition-colors flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span>Ara</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl p-12 text-center border-2 border-dark-carbon/10 h-full flex items-center justify-center">
                  <div>
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-dark-carbon/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="font-playfair font-bold text-xl text-dark-carbon/60 mb-2">
                      Mesaj Seçilmedi
                    </h3>
                    <p className="text-dark-carbon/50 font-manrope">
                      Detayları görmek için bir mesaj seçin
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
