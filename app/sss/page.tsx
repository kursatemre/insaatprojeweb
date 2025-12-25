'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getSiteSettings } from '@/lib/api/settings';

export default function SSSPage() {
  const [activeCategory, setActiveCategory] = useState('genel');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  const [faqData, setFaqData] = useState<{
    hero: {
      title: string;
      description: string;
    };
    categories: Array<{
      id: string;
      name: string;
      icon: 'help' | 'document' | 'support' | 'money';
      questions: Array<{
        question: string;
        answer: string;
      }>;
    }>;
  }>({
    hero: {
      title: 'Sıkça Sorulan Sorular',
      description: 'Mimarlık ve mühendislik hizmetlerimiz hakkında merak ettikleriniz'
    },
    categories: [
      {
        id: 'genel',
        name: 'Genel Sorular',
        icon: 'help',
        questions: [
          {
            question: 'Hangi alanlarda hizmet veriyorsunuz?',
            answer: 'Mimari projeler, statik hesaplamalar, tesisat projeleri, deprem performans analizi, kontrollük hizmetleri ve teknik raporlama alanlarında profesyonel hizmet sunuyoruz.'
          }
        ]
      }
    ]
  });

  useEffect(() => {
    const loadFaqData = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data?.faq) {
        setFaqData(result.data.faq);
      }
    };
    loadFaqData();
  }, []);

  const getCategoryIcon = (icon: string) => {
    const icons: { [key: string]: JSX.Element } = {
      help: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      document: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      support: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      money: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[icon] || icons['help'];
  };

  const activeQuestions = faqData.categories.find(cat => cat.id === activeCategory)?.questions || [];

  return (
    <div className="pt-32 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue overflow-hidden">
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
                S.S.S
              </span>
              <div className="w-16 h-0.5 bg-muted-gold"></div>
            </div>
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
              {faqData.hero.title}
            </h1>
            <p className="text-white/70 font-manrope text-lg max-w-2xl mx-auto">
              {faqData.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-warm-concrete">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-6 sticky top-32">
                <h3 className="font-playfair font-bold text-lg text-night-blue mb-4">
                  Kategoriler
                </h3>
                <div className="space-y-2">
                  {faqData.categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setOpenQuestionIndex(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                        activeCategory === category.id
                          ? 'bg-gradient-to-r from-night-blue to-dark-carbon text-white shadow-lg'
                          : 'text-dark-carbon/70 hover:bg-warm-concrete hover:text-night-blue'
                      }`}
                    >
                      <span className={activeCategory === category.id ? 'text-muted-gold' : 'text-dark-carbon/50'}>
                        {getCategoryIcon(category.icon)}
                      </span>
                      <span className="font-manrope font-medium text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {activeQuestions.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-xl border-2 border-dark-carbon/10 overflow-hidden hover:border-muted-gold/50 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenQuestionIndex(openQuestionIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-start justify-between text-left group"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`flex-shrink-0 mt-1 ${
                          openQuestionIndex === index ? 'text-muted-gold' : 'text-dark-carbon/40 group-hover:text-muted-gold'
                        } transition-colors`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className={`font-manrope font-semibold text-base ${
                          openQuestionIndex === index ? 'text-night-blue' : 'text-dark-carbon group-hover:text-night-blue'
                        } transition-colors`}>
                          {item.question}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: openQuestionIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex-shrink-0 ml-4 ${
                          openQuestionIndex === index ? 'text-muted-gold' : 'text-dark-carbon/40 group-hover:text-muted-gold'
                        } transition-colors`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: openQuestionIndex === index ? 'auto' : 0,
                        opacity: openQuestionIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pl-15">
                        <div className="pl-9 border-l-2 border-muted-gold/30">
                          <p className="text-dark-carbon/70 font-manrope leading-relaxed pl-4">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-night-blue to-dark-carbon">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair font-bold text-3xl text-white mb-4">
              Sorunuza Cevap Bulamadınız mı?
            </h2>
            <p className="text-white/70 font-manrope text-lg mb-8">
              Bizimle iletişime geçin, size yardımcı olmaktan memnuniyet duyarız.
            </p>
            <a
              href="/iletisim"
              className="inline-block px-8 py-4 bg-gradient-to-r from-muted-gold to-bronze hover:from-bronze hover:to-muted-gold text-white font-playfair font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Bize Ulaşın
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
