import { supabase, Project, handleSupabaseError } from '../supabase';

// Tüm projeleri getir
export async function getAllProjects(): Promise<{ success: boolean; data?: Project[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return handleSupabaseError(error);

    return { success: true, data: data || [] };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Kategoriye göre projeler
export async function getProjectsByCategory(category: string): Promise<{ success: boolean; data?: Project[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) return handleSupabaseError(error);

    return { success: true, data: data || [] };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Tek proje getir
export async function getProjectById(id: number): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data: data || undefined };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Yeni proje ekle
export async function createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data: data || undefined };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Proje güncelle
export async function updateProject(id: number, updates: Partial<Project>): Promise<{ success: boolean; data?: Project; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data: data || undefined };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Proje sil
export async function deleteProject(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) return handleSupabaseError(error);

    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Proje sayısını getir
export async function getProjectCount(): Promise<{ success: boolean; data?: number; error?: string }> {
  try {
    const { count, error } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });

    if (error) return handleSupabaseError(error);

    return { success: true, data: count || 0 };
  } catch (error) {
    return handleSupabaseError(error);
  }
}
