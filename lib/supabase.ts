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
}

// Helper function - Error handling
export const handleSupabaseError = (error: any) => {
  console.error('Supabase Error:', error);
  return {
    success: false,
    error: error.message || 'Bir hata oluştu',
  };
};
