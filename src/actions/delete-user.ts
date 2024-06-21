'use server';

import { deleteUserById } from '@/utils/user';
import { revalidatePath } from 'next/cache';

export async function deleteUser(userId: string) {
  // Uncomment this to enable deletion
  await deleteUserById(userId);
  revalidatePath('/admin/users');
}