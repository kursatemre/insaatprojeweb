import { supabase, SiteSettings, handleSupabaseError } from '../supabase';

// Site ayarlarını getir
export async function getSiteSettings(): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data: data || undefined };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Site ayarlarını güncelle
export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .update({
        ...settings,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1) // Tek satır olacağı için id=1
      .select()
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data: data || undefined };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// İlk kurulum için default ayarları oluştur
export async function createDefaultSettings(): Promise<{ success: boolean; data?: SiteSettings; error?: string }> {
  try {
    const defaultSettings: Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'> = {
      colors: {
        primary: '#0f172a',
        secondary: '#1a1a1a',
        accent: '#b89150',
        background: '#f4f4f2',
      },
      hero: {
        title: 'Ekip Proje',
        subtitle: 'MİMARLIK & MÜHENDİSLİK',
        tagline: 'Sadece proje çizmiyoruz; geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz.',
      },
      stats: {
        totalProjects: '320+',
        constructionArea: '2.4M m²',
        activeSites: '45',
        clients: '180+',
      },
      contact: {
        email: 'info@ekipproje.com',
        phone: '+90 (312) 123 4567',
        address: 'Çankaya, Ankara, Türkiye',
        workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
      },
      social: {
        linkedin: 'https://linkedin.com/company/ekipproje',
        instagram: 'https://instagram.com/ekipproje',
        facebook: 'https://facebook.com/ekipproje',
        twitter: 'https://twitter.com/ekipproje',
      },
    };

    const { data, error } = await supabase
      .from('site_settings')
      .insert([defaultSettings])
      .select()
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data: data || undefined };
  } catch (error) {
    return handleSupabaseError(error);
  }
}
