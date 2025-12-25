'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getSiteSettings, updateSiteSettings } from '@/lib/api/settings';

interface Question {
  question: string;
  answer: string;
}

interface Category {
  id: string;
  name: string;
  icon: 'help' | 'document' | 'support' | 'money';
  questions: Question[];
}

interface FaqData {
  hero: {
    title: string;
    description: string;
  };
  categories: Category[];
}

export default function AdminSSSPage() {
  const [faqData, setFaqData] = useState<FaqData>({
    hero: {
      title: 'Sıkça Sorulan Sorular',
      description: 'Mimarlık ve mühendislik hizmetlerimiz hakkında merak ettikleriniz'
    },
    categories: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  useEffect(() => {
    loadFaqData();
  }, []);

  const loadFaqData = async () => {
    setLoading(true);
    const result = await getSiteSettings();
    if (result.success && result.data?.faq) {
      setFaqData(result.data.faq);
      if (result.data.faq.categories.length > 0) {
        setActiveCategory(result.data.faq.categories[0].id);
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const result = await updateSiteSettings({ faq: faqData });

    if (result.success) {
      setMessage({ type: 'success', text: 'S.S.S ayarları başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: result.error || 'Kayıt sırasında bir hata oluştu' });
    }

    setSaving(false);
  };

  const updateHero = (field: 'title' | 'description', value: string) => {
    setFaqData({
      ...faqData,
      hero: {
        ...faqData.hero,
        [field]: value
      }
    });
  };

  const addCategory = () => {
    const newCategoryId = `kategori_${Date.now()}`;
    const newCategory: Category = {
      id: newCategoryId,
      name: 'Yeni Kategori',
      icon: 'help',
      questions: []
    };

    setFaqData({
      ...faqData,
      categories: [...faqData.categories, newCategory]
    });
    setActiveCategory(newCategoryId);
  };

  const updateCategory = (categoryId: string, field: 'name' | 'icon', value: string) => {
    setFaqData({
      ...faqData,
      categories: faqData.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, [field]: value }
          : cat
      )
    });
  };

  const deleteCategory = (categoryId: string) => {
    if (confirm('Bu kategoriyi ve içindeki tüm soruları silmek istediğinize emin misiniz?')) {
      const updatedCategories = faqData.categories.filter(cat => cat.id !== categoryId);
      setFaqData({
        ...faqData,
        categories: updatedCategories
      });
      if (activeCategory === categoryId && updatedCategories.length > 0) {
        setActiveCategory(updatedCategories[0].id);
      }
    }
  };

  const addQuestion = (categoryId: string) => {
    const newQuestion: Question = {
      question: 'Yeni soru?',
      answer: 'Yanıt buraya yazılacak...'
    };

    setFaqData({
      ...faqData,
      categories: faqData.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, questions: [...cat.questions, newQuestion] }
          : cat
      )
    });
  };

  const updateQuestion = (categoryId: string, questionIndex: number, field: 'question' | 'answer', value: string) => {
    setFaqData({
      ...faqData,
      categories: faqData.categories.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map((q, idx) =>
                idx === questionIndex
                  ? { ...q, [field]: value }
                  : q
              )
            }
          : cat
      )
    });
  };

  const deleteQuestion = (categoryId: string, questionIndex: number) => {
    if (confirm('Bu soruyu silmek istediğinize emin misiniz?')) {
      setFaqData({
        ...faqData,
        categories: faqData.categories.map(cat =>
          cat.id === categoryId
            ? {
                ...cat,
                questions: cat.questions.filter((_, idx) => idx !== questionIndex)
              }
            : cat
        )
      });
    }
  };

  const moveQuestion = (categoryId: string, fromIndex: number, direction: 'up' | 'down') => {
    setFaqData({
      ...faqData,
      categories: faqData.categories.map(cat => {
        if (cat.id !== categoryId) return cat;

        const questions = [...cat.questions];
        const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;

        if (toIndex < 0 || toIndex >= questions.length) return cat;

        [questions[fromIndex], questions[toIndex]] = [questions[toIndex], questions[fromIndex]];

        return { ...cat, questions };
      })
    });
  };

  const activeCategoryData = faqData.categories.find(cat => cat.id === activeCategory);

  if (loading) {
    return (
      <>
        <AdminSidebar />
        <div className="min-h-screen bg-warm-concrete flex items-center justify-center lg:ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-night-blue mx-auto mb-4"></div>
            <p className="text-dark-carbon/70 font-manrope">Yükleniyor...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminSidebar />
      <div className="min-h-screen bg-warm-concrete py-8 px-4 sm:px-6 lg:px-8 lg:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-dark-carbon/10 p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-playfair font-bold text-3xl text-night-blue mb-2">
                  S.S.S Yönetimi
                </h1>
                <p className="text-dark-carbon/70 font-manrope">
                  Sıkça sorulan soruları ve kategorileri düzenleyin
                </p>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-night-blue to-dark-carbon text-white font-playfair font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>

            {/* Success/Error Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg mb-6 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.text}
              </motion.div>
            )}

            {/* Hero Section Editor */}
            <div className="space-y-4">
              <h3 className="font-playfair font-bold text-lg text-night-blue">Hero Bölümü</h3>
              <div>
                <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
                  Başlık
                </label>
                <input
                  type="text"
                  value={faqData.hero.title}
                  onChange={(e) => updateHero('title', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:ring-2 focus:ring-muted-gold/20 transition-all font-manrope"
                />
              </div>
              <div>
                <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
                  Açıklama
                </label>
                <input
                  type="text"
                  value={faqData.hero.description}
                  onChange={(e) => updateHero('description', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:ring-2 focus:ring-muted-gold/20 transition-all font-manrope"
                />
              </div>
            </div>
          </div>

          {/* Categories and Questions */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-playfair font-bold text-lg text-night-blue">
                    Kategoriler
                  </h3>
                  <button
                    onClick={addCategory}
                    className="p-2 bg-muted-gold/10 text-muted-gold rounded-lg hover:bg-muted-gold/20 transition-colors"
                    title="Yeni Kategori Ekle"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  {faqData.categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-gradient-to-r from-night-blue to-dark-carbon text-white shadow-lg'
                          : 'text-dark-carbon/70 hover:bg-warm-concrete hover:text-night-blue'
                      }`}
                    >
                      <span className="font-manrope font-medium text-sm">{category.name}</span>
                      <span className="block text-xs opacity-70 mt-1">
                        {category.questions.length} soru
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Editor */}
            <div className="lg:col-span-3">
              {activeCategoryData ? (
                <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                  {/* Category Settings */}
                  <div className="mb-8 pb-8 border-b-2 border-dark-carbon/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-playfair font-bold text-xl text-night-blue">
                        Kategori Ayarları
                      </h3>
                      <button
                        onClick={() => deleteCategory(activeCategoryData.id)}
                        className="px-4 py-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-colors font-manrope text-sm"
                      >
                        Kategoriyi Sil
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
                          Kategori Adı
                        </label>
                        <input
                          type="text"
                          value={activeCategoryData.name}
                          onChange={(e) => updateCategory(activeCategoryData.id, 'name', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:ring-2 focus:ring-muted-gold/20 transition-all font-manrope"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
                          İkon
                        </label>
                        <select
                          value={activeCategoryData.icon}
                          onChange={(e) => updateCategory(activeCategoryData.id, 'icon', e.target.value)}
                          className="w-full px-4 py-2 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:ring-2 focus:ring-muted-gold/20 transition-all font-manrope"
                        >
                          <option value="help">❓ Yardım</option>
                          <option value="document">📄 Doküman</option>
                          <option value="support">🛟 Destek</option>
                          <option value="money">💰 Ücret</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Questions */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-playfair font-bold text-xl text-night-blue">
                        Sorular ({activeCategoryData.questions.length})
                      </h3>
                      <button
                        onClick={() => addQuestion(activeCategoryData.id)}
                        className="px-4 py-2 bg-muted-gold text-white rounded-lg hover:shadow-lg transition-all duration-300 font-manrope text-sm flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Yeni Soru Ekle</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {activeCategoryData.questions.map((question, index) => (
                        <div
                          key={index}
                          className="border-2 border-dark-carbon/10 rounded-lg p-6 hover:border-muted-gold/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-muted-gold font-roboto-mono font-bold">
                                #{index + 1}
                              </span>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => moveQuestion(activeCategoryData.id, index, 'up')}
                                  disabled={index === 0}
                                  className="p-1 text-dark-carbon/40 hover:text-muted-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                  title="Yukarı Taşı"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => moveQuestion(activeCategoryData.id, index, 'down')}
                                  disabled={index === activeCategoryData.questions.length - 1}
                                  className="p-1 text-dark-carbon/40 hover:text-muted-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                  title="Aşağı Taşı"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteQuestion(activeCategoryData.id, index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Soruyu Sil"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
                                Soru
                              </label>
                              <input
                                type="text"
                                value={question.question}
                                onChange={(e) => updateQuestion(activeCategoryData.id, index, 'question', e.target.value)}
                                className="w-full px-4 py-2 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:ring-2 focus:ring-muted-gold/20 transition-all font-manrope"
                                placeholder="Soru buraya yazılacak..."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
                                Yanıt
                              </label>
                              <textarea
                                value={question.answer}
                                onChange={(e) => updateQuestion(activeCategoryData.id, index, 'answer', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:ring-2 focus:ring-muted-gold/20 transition-all font-manrope resize-none"
                                placeholder="Yanıt buraya yazılacak..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {activeCategoryData.questions.length === 0 && (
                        <div className="text-center py-12 text-dark-carbon/50">
                          <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="font-manrope">Bu kategoride henüz soru yok</p>
                          <button
                            onClick={() => addQuestion(activeCategoryData.id)}
                            className="mt-4 text-muted-gold hover:underline font-manrope text-sm"
                          >
                            İlk soruyu ekleyin
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-12 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-dark-carbon/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-dark-carbon/50 font-manrope mb-4">
                    Henüz kategori yok
                  </p>
                  <button
                    onClick={addCategory}
                    className="px-6 py-3 bg-muted-gold text-white rounded-lg hover:shadow-lg transition-all duration-300 font-manrope"
                  >
                    İlk Kategoriyi Ekle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
