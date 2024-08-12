'use client';
import { LuLoader2, LuTrash2 } from 'react-icons/lu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/Select';
import { useState } from 'react';
import { toast } from '@/components/ui/UseToast';
import { changeRoleUser, deleteUserById } from "@/actions/user";
import { useTranslations } from 'next-intl';
import {
    TableRow,
    TableCell,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { SelectUser } from './UsersTable';

type role = 'admin' | 'user' | 'developer'
export function UserTableRow({ user }: { user: SelectUser }) {
    const t = useTranslations("AdminUsers");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingSelect, setLoadingSelect] = useState<boolean>(false);

    const userId = user.id;

    const handleDeleteUser = async () => {
        setLoading(true);
        const result = await deleteUserById(user.id);
        if (result.success) {
            toast({
                description: t(result.message),
                variant: "success",
            })
        } else if (result.error) {
            toast({
                description: t(result.message),
                variant: "destructive",
            })
        }
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const handleChangeRoleInComapny = async (role: role) => {
        setLoadingSelect(true);
        const result = await changeRoleUser(userId, role);
        if (result.success) {
            toast({
                description: t(result.message),
                variant: "success",
            })
        } else if (result.error) {
            toast({
                description: t(result.message),
                variant: "destructive",
            })
        }
        setLoadingSelect(false)
    }

    return (
        <TableRow>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
            <TableCell>
                <Select disabled={loadingSelect} onValueChange={(e: role) => { handleChangeRoleInComapny(e) }} defaultValue={user.role}>
                    <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder={t("placeholderRole")}>
                            <span className="flex gap-2 items-center">{loadingSelect && <LuLoader2 className="animate-spin" />}{user.role}</span>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">{t("admin")}</SelectItem>
                        <SelectItem value="developer">{t("developer")}</SelectItem>
                        <SelectItem value="user">{t("user")}</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>
                <Button
                    className="w-fit"
                    size="sm"
                    variant="destructive"
                    aria-label={t('delete')}
                    aria-labelledby={t('delete')}
                    title={t('delete')}
                    role="button"
                    disabled={loading}
                    formAction={handleDeleteUser}
                >
                    {loading ? <LuLoader2 className="animate-spin" /> : <LuTrash2 />}
                </Button>
            </TableCell>
        </TableRow>
    );
}