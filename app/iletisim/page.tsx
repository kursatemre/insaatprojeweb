'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added with backend
    console.log('Form submitted:', formData);
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      title: 'Telefon',
      value: '+90 (312) 123 45 67',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      title: 'E-posta',
      value: 'info@ekipproje.com',
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
    },
    {
      title: 'Adres',
      value: 'Çankaya, Ankara, Türkiye',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Çalışma Saatleri',
      value: 'Pzt-Cum: 09:00 - 18:00',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const projectTypes = [
    'Mimari Proje',
    'Statik Proje',
    'Tesisat Projesi',
    'Deprem Analizi',
    'Kontrollük',
    'Teknik Danışmanlık',
    'Diğer',
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-0.5 bg-muted-gold"></div>
              <span className="mx-4 text-muted-gold font-roboto-mono text-xs tracking-widest">
                İLETİŞİM
              </span>
              <div className="w-16 h-0.5 bg-muted-gold"></div>
            </div>
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              Bizimle İletişime Geçin
            </h1>
            <p className="text-white/70 font-manrope text-xl max-w-3xl mx-auto leading-relaxed">
              Projeniz için ücretsiz ön görüşme ve teklif almak için formu doldurun
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-16 bg-warm-concrete">
        <div className="absolute inset-0 bg-topo-pattern opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl border-2 border-dark-carbon/10 hover:border-muted-gold/50 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="text-muted-gold group-hover:text-bronze transition-colors mb-4">
                  {info.icon}
                </div>
                <h3 className="font-playfair font-bold text-lg text-night-blue mb-2">
                  {info.title}
                </h3>
                <p className="text-dark-carbon/70 font-manrope text-sm">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section id="teklif" className="relative py-24 bg-gradient-to-b from-slate-light to-warm-concrete">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl border-2 border-dark-carbon/10 p-8 md:p-10 shadow-2xl">
                <h2 className="font-playfair font-bold text-3xl text-night-blue mb-2">
                  Teklif Formu
                </h2>
                <p className="text-dark-carbon/60 font-manrope mb-8">
                  Detaylı bilgi ve teklif için formu doldurun
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-dark-carbon font-manrope font-semibold mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none transition-colors font-manrope"
                      placeholder="Adınız ve Soyadınız"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-dark-carbon font-manrope font-semibold mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none transition-colors font-manrope"
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-dark-carbon font-manrope font-semibold mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none transition-colors font-manrope"
                        placeholder="0555 123 45 67"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-dark-carbon font-manrope font-semibold mb-2">
                      Proje Türü *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none transition-colors font-manrope bg-white"
                    >
                      <option value="">Seçiniz...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-dark-carbon font-manrope font-semibold mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none transition-colors font-manrope"
                      placeholder="Projenizin kısa başlığı"
                    />
                  </div>

                  <div>
                    <label className="block text-dark-carbon font-manrope font-semibold mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none transition-colors font-manrope resize-none"
                      placeholder="Projeniz hakkında detaylı bilgi verin..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-night-blue to-dark-carbon text-white font-manrope font-bold text-lg rounded-lg hover:shadow-xl hover:shadow-night-blue/30 transition-all duration-300 flex items-center justify-center"
                  >
                    Gönder
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-night-blue to-dark-carbon rounded-2xl overflow-hidden border-2 border-muted-gold/20 shadow-2xl h-80">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <svg
                      className="w-20 h-20 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="font-roboto-mono text-sm">GOOGLE MAPS ENTEGRASYONU</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl border-2 border-dark-carbon/10 p-8 shadow-lg">
                <h3 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Sıkça Sorulan Sorular
                </h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-dark-carbon/10">
                    <h4 className="font-manrope font-semibold text-night-blue mb-2">
                      Teklif ne kadar sürede hazırlanır?
                    </h4>
                    <p className="text-dark-carbon/60 font-manrope text-sm">
                      Projenizin detaylarını aldıktan sonra 2-3 iş günü içinde size detaylı teklif
                      sunuyoruz.
                    </p>
                  </div>

                  <div className="pb-4 border-b border-dark-carbon/10">
                    <h4 className="font-manrope font-semibold text-night-blue mb-2">
                      EKAP ihalesine uygun proje hazırlıyor musunuz?
                    </h4>
                    <p className="text-dark-carbon/60 font-manrope text-sm">
                      Evet, tüm projelerimiz EKAP standartlarına uygun ve kamu onaylıdır.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-manrope font-semibold text-night-blue mb-2">
                      Hangi illerde hizmet veriyorsunuz?
                    </h4>
                    <p className="text-dark-carbon/60 font-manrope text-sm">
                      Türkiye'nin tüm illerinde proje ve danışmanlık hizmeti sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16 bg-gradient-to-r from-night-blue to-dark-carbon">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="font-playfair font-bold text-3xl text-white mb-2">
                Acil Durum mu?
              </h2>
              <p className="text-white/70 font-manrope">
                7/24 acil destek hattımızdan bize ulaşabilirsiniz
              </p>
            </div>
            <a
              href="tel:+903121234567"
              className="px-8 py-4 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-muted-gold/50 transition-all duration-300 flex items-center"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Hemen Ara
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
