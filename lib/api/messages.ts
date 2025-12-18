import { supabase, Message, handleSupabaseError } from '../supabase';

// Tüm mesajları getir
export async function getAllMessages() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return handleSupabaseError(error);

    return { success: true, data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Okunmamış mesajları getir
export async function getUnreadMessages() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) return handleSupabaseError(error);

    return { success: true, data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Okunmamış mesaj sayısı
export async function getUnreadCount() {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);

    if (error) return handleSupabaseError(error);

    return { success: true, count };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Yeni mesaj ekle (İletişim formu)
export async function createMessage(message: Omit<Message, 'id' | 'created_at' | 'is_read'>) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          ...message,
          is_read: false,
          priority: 'medium', // Default priority
        },
      ])
      .select()
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Mesajı okundu olarak işaretle
export async function markMessageAsRead(id: number) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Mesaj önceliğini güncelle
export async function updateMessagePriority(id: number, priority: 'low' | 'medium' | 'high') {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ priority })
      .eq('id', id)
      .select()
      .single();

    if (error) return handleSupabaseError(error);

    return { success: true, data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Mesaj sil
export async function deleteMessage(id: number) {
  try {
    const { error } = await supabase.from('messages').delete().eq('id', id);

    if (error) return handleSupabaseError(error);

    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
}
