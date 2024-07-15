'use client';

import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from '@/components/atoms/Table';
import { Button } from '@/components/atoms/Button';
import { SelectUser } from '@/utils/user';
import { usePathname, useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/delete-user';
import { changeRole } from "@/actions/change-role";
import { useTranslations } from 'next-intl';
import { LuTrash2 } from 'react-icons/lu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './atoms/Select';

export function UsersTable({
    users,
    offset,
    prevOffset
}: {
    users: SelectUser[];
    offset: number | null;
    prevOffset: number | null
}) {
    const router = useRouter();
    const t = useTranslations("AdminUsers")
    const pathname = usePathname();

    function onClick() {
        router.replace(`${pathname}/?offset=${offset}`);
    }
    function onClickPrev() {
        router.replace(`${pathname}/?offset=${prevOffset}`);
    }
    return (
        <>
            <form className="border shadow-sm rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[150px]">{t("name")}</TableHead>
                            <TableHead className="hidden md:table-cell">{t("email")}</TableHead>
                            <TableHead className="hidden md:table-cell">{t("role")}</TableHead>
                            <TableHead>{t("action")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                        {!users.length && <TableRow className='text-center'>
                            <TableCell colSpan={4}>{t("noData")}</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </form>
            <section className='flex justify-between'>
            {prevOffset !== null && (
                <>
                    {!users.length && (
                    <Button
                        className="mt-4 w-40"
                        variant="primary"
                        aria-label={t('prev')}
                        aria-labelledby={t('prev')}
                        title={t('prev')}
                        role="button"
                        onClick={() => onClickPrev()}
                    >
                        {t("prev")}
                    </Button>
                    )}
                    {offset !== null && (
                    <Button
                        className="mt-4 w-40"
                        variant="primary"
                        aria-label={t('prev')}
                        aria-labelledby={t('prev')}
                        title={t('prev')}
                        role="button"
                        disabled={Number(offset) == 1}
                        onClick={() => onClickPrev()}
                    >
                        {t("prev")}
                    </Button>
                    )}
                </>
                )}
            {offset !== null && (
                <Button
                    className="mt-4 w-40"
                    variant="primary"
                    aria-label={t('next')}
                    aria-labelledby={t('next')}
                    title={t('next')}
                    role="button"
                    onClick={() => onClick()}
                >
                    {t("next")}
                </Button>
            )}
            </section>
        </>
    );
}

function UserRow({ user }: { user: SelectUser }) {
    const t = useTranslations("AdminUsers")
    const userId = user.id;
    const deleteUserWithId = deleteUser.bind(null, userId);
    return (
        <TableRow>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
            <TableCell>
                <Select onValueChange={(e) => {changeRole(userId, e)}} defaultValue={user.role}>
                <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder={t("placeholderRole")}>
                        {user.role}
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
                    formAction={deleteUserWithId}
                >
                   <LuTrash2 />
                </Button>
            </TableCell>
        </TableRow>
    );
}