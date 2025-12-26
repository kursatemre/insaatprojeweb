import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

// Login with email and password
export async function loginWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (data.user) {
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || '',
          role: 'admin',
        },
        session: data.session,
      };
    }

    return {
      success: false,
      error: 'Giriş başarısız',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Bir hata oluştu',
    };
  }
}

// Logout
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Çıkış yapılamadı',
    };
  }
}

// Get current session
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (session) {
      return {
        success: true,
        session,
        user: {
          id: session.user.id,
          email: session.user.email || '',
          role: 'admin',
        },
      };
    }

    return {
      success: false,
      error: 'Oturum bulunamadı',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Session alınamadı',
    };
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const result = await getCurrentSession();
  return result.success;
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (user) {
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email || '',
          role: 'admin',
        },
      };
    }

    return {
      success: false,
      error: 'Kullanıcı bulunamadı',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Kullanıcı bilgisi alınamadı',
    };
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: AdminUser | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email || '',
        role: 'admin',
      });
    } else {
      callback(null);
    }
  });

  return subscription;
}
