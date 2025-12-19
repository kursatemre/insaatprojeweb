'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProjectForm from '@/components/admin/ProjectForm';
import { getAllProjects, deleteProject } from '@/lib/api/projects';
import type { Project } from '@/lib/supabase';

export default function AdminProjelerPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadProjects();
    }
  }, [router]);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllProjects();

      if (result.success && result.data) {
        setProjects(result.data);
      } else {
        setError(result.error || 'Projeler yüklenirken bir hata oluştu');
        console.error('Projeler yüklenemedi:', result.error);
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const result = await deleteProject(id);

      if (result.success) {
        // Remove from local state
        setProjects(projects.filter((p) => p.id !== id));
        alert('Proje başarıyla silindi!');
      } else {
        alert('Proje silinirken bir hata oluştu: ' + result.error);
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Beklenmeyen bir hata oluştu');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const filteredProjects =
    filterCategory === 'all' ? projects : projects.filter((p) => p.category === filterCategory);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-warm-concrete">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-dark-carbon/10 p-6 lg:p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 text-red-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-manrope font-semibold">{error}</span>
              </div>
            </div>
          )}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-playfair font-bold text-3xl text-night-blue">Proje Yönetimi</h1>
              <p className="text-dark-carbon/60 font-manrope mt-1">
                Toplam {projects.length} proje
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Yeni Proje Ekle</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 lg:p-8">
          <div className="bg-white rounded-xl p-4 border-2 border-dark-carbon/10 mb-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-4 py-2 rounded-lg font-manrope font-semibold text-sm transition-all ${
                  filterCategory === 'all'
                    ? 'bg-night-blue text-white'
                    : 'bg-warm-concrete text-dark-carbon hover:bg-dark-carbon/10'
                }`}
              >
                Tümü ({projects.length})
              </button>
              <button
                onClick={() => setFilterCategory('kamu')}
                className={`px-4 py-2 rounded-lg font-manrope font-semibold text-sm transition-all ${
                  filterCategory === 'kamu'
                    ? 'bg-night-blue text-white'
                    : 'bg-warm-concrete text-dark-carbon hover:bg-dark-carbon/10'
                }`}
              >
                Kamu Projeleri ({projects.filter((p) => p.category === 'kamu').length})
              </button>
              <button
                onClick={() => setFilterCategory('ozel')}
                className={`px-4 py-2 rounded-lg font-manrope font-semibold text-sm transition-all ${
                  filterCategory === 'ozel'
                    ? 'bg-night-blue text-white'
                    : 'bg-warm-concrete text-dark-carbon hover:bg-dark-carbon/10'
                }`}
              >
                Özel Sektör ({projects.filter((p) => p.category === 'ozel').length})
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted-gold border-t-transparent"></div>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl border-2 border-dark-carbon/10 hover:border-muted-gold/50 transition-all duration-300 overflow-hidden"
              >
                {/* Project Image */}
                {project.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Project Header */}
                <div className="p-6 border-b border-dark-carbon/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-playfair font-bold text-xl text-night-blue mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-dark-carbon/60 font-manrope">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          {project.location} • {project.year}
                        </span>
                      </div>
                    </div>
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
                  </div>
                  <p className="text-dark-carbon/70 font-manrope text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Project Details */}
                <div className="p-6 bg-warm-concrete/30">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Alan</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">{project.area}</p>
                    </div>
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Süre</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">{project.duration}</p>
                    </div>
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Bütçe</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">{project.budget}</p>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted-gold/10 text-muted-gold rounded text-xs font-manrope"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 px-4 py-2 bg-night-blue text-white rounded-lg hover:bg-night-blue/90 transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span className="font-manrope font-semibold text-sm">Düzenle</span>
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-dark-carbon/10">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="font-playfair font-bold text-xl text-dark-carbon/60 mb-2">
                Proje Bulunamadı
              </h3>
              <p className="text-dark-carbon/50 font-manrope mb-6">
                Bu kategoride henüz proje bulunmamaktadır
              </p>
              <button
                onClick={handleAddNew}
                className="px-6 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl transition-all"
              >
                İlk Projeyi Ekle
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProject(null);
          }}
          onSuccess={() => {
            loadProjects(); // Projeleri yeniden yükle
          }}
        />
      )}
    </div>
  );
}
