import { createClient } from '@supabase/supabase-js';

// Supabase credentials - .env.local dosyasından gelecek
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Project {
  id: number;
  created_at?: string;
  title: string;
  category: 'kamu' | 'ozel' | 'konut' | 'ticari';
  location: string;
  year: string;
  area: string;
  description: string;
  status: 'Tamamlandı' | 'Devam Ediyor' | 'Planlama';
  budget: string;
  duration: string;
  services: string[];
  image_url?: string;
}

export interface Message {
  id: number;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  company?: string;
  location?: string;
  message: string;
  is_read: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  caption?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettings {
  id: number;
  created_at?: string;
  updated_at?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    leftCard?: {
      title: string;
      description: string;
      features: string[];
    };
    rightCard?: {
      title: string;
      description: string;
      features: string[];
    };
  };
  stats: {
    totalProjects: string;
    constructionArea: string;
    activeSites: string;
    clients: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
    mapsUrl?: string;
  };
  social: {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
  about?: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    values?: Array<{
      title: string;
      description: string;
      icon: 'shield' | 'lock' | 'lightbulb' | 'eye';
    }>;
    team?: Array<{
      name: string;
      role: string;
      credentials: string;
      experience: string;
      projects: string;
    }>;
    certifications?: string[];
  };
  cta?: {
    title: string;
    subtitle: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  navigation?: {
    logo: {
      text: string;
      subtitle: string;
      imageUrl?: string;
      showImage: boolean;
    };
    colors: {
      default: {
        background: string;
        text: string;
        border: string;
      };
      scrolled: {
        background: string;
        text: string;
        border: string;
      };
    };
    topBar: {
      enabled: boolean;
      stats: string[];
      showLanguageSwitcher: boolean;
      showEkapBadge: boolean;
      colors: {
        background: string;
        text: string;
        border: string;
      };
    };
    menuItems: Array<{
      label: string;
      href: string;
      type: 'link' | 'megamenu';
      megaMenuItems?: Array<{
        title: string;
        desc: string;
        href: string;
        icon: string;
      }>;
    }>;
    ctaButton: {
      enabled: boolean;
      text: string;
      href: string;
    };
  };
  services?: {
    proje: {
      title: string;
      subtitle: string;
      items: Array<{
        id: string;
        title: string;
        subtitle: string;
        description: string;
        features: Array<{
          title: string;
          desc: string;
        }>;
        deliverables: string[];
      }>;
    };
    danismanlik: {
      title: string;
      subtitle: string;
      items: Array<{
        id: string;
        title: string;
        subtitle: string;
        description: string;
        features: Array<{
          title: string;
          desc: string;
        }>;
        deliverables: string[];
      }>;
    };
  };
  footer?: {
    company: {
      logoText: string;
      logoUrl?: string;
      name: string;
      subtitle: string;
      description: string;
    };
    sections: Array<{
      title: string;
      links: Array<{
        name: string;
        href: string;
      }>;
    }>;
    certifications: Array<{
      label: string;
      icon: 'star' | 'badge' | 'check';
    }>;
    legalLinks: Array<{
      name: string;
      href: string;
    }>;
    copyright: string;
  };
  faq?: {
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
  };
}

// Helper function - Error handling
export const handleSupabaseError = (error: any) => {
  console.error('Supabase Error:', error);
  return {
    success: false,
    error: error.message || 'Bir hata oluştu',
  };
};
