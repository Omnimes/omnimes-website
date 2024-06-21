'use server';

import { changeRoleById } from '@/utils/user';
import { revalidatePath } from 'next/cache';

export async function changeRole(userId: string, role: string) {
  // Uncomment this to enable deletion
  await changeRoleById(userId, role);
  revalidatePath('/admin/users');
}