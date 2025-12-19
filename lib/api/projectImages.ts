import { supabase, handleSupabaseError, type ProjectImage } from '../supabase';

/**
 * Bir projeye ait tüm görselleri getir
 */
export async function getProjectImages(projectId: number): Promise<{ success: boolean; data?: ProjectImage[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', projectId)
      .order('display_order', { ascending: true });

    if (error) {
      return handleSupabaseError(error);
    }

    return {
      success: true,
      data: data as ProjectImage[],
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

/**
 * Projeye yeni görsel ekle
 */
export async function addProjectImage(
  projectId: number,
  imageUrl: string,
  caption?: string,
  displayOrder?: number
): Promise<{ success: boolean; data?: ProjectImage; error?: string }> {
  try {
    // Eğer display_order belirtilmemişse, en son sırayı al
    if (displayOrder === undefined) {
      const { data: existingImages } = await supabase
        .from('project_images')
        .select('display_order')
        .eq('project_id', projectId)
        .order('display_order', { ascending: false })
        .limit(1);

      displayOrder = existingImages && existingImages.length > 0
        ? existingImages[0].display_order + 1
        : 0;
    }

    const { data, error } = await supabase
      .from('project_images')
      .insert({
        project_id: projectId,
        image_url: imageUrl,
        caption: caption || null,
        display_order: displayOrder,
      })
      .select()
      .single();

    if (error) {
      return handleSupabaseError(error);
    }

    return {
      success: true,
      data: data as ProjectImage,
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

/**
 * Proje görselini sil
 */
export async function deleteProjectImage(imageId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('project_images')
      .delete()
      .eq('id', imageId);

    if (error) {
      return handleSupabaseError(error);
    }

    return {
      success: true,
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

/**
 * Proje görselinin sırasını güncelle
 */
export async function updateProjectImageOrder(imageId: number, newOrder: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('project_images')
      .update({ display_order: newOrder })
      .eq('id', imageId);

    if (error) {
      return handleSupabaseError(error);
    }

    return {
      success: true,
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

/**
 * Proje görselinin başlığını güncelle
 */
export async function updateProjectImageCaption(imageId: number, caption: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('project_images')
      .update({ caption })
      .eq('id', imageId);

    if (error) {
      return handleSupabaseError(error);
    }

    return {
      success: true,
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}
