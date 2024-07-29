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
import { usePathname, useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/delete-user';
import { changeRole } from "@/actions/change-role";
import { useTranslations } from 'next-intl';
import { LuCheck, LuTrash2 } from 'react-icons/lu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/Select';
import { aproveRequestDeveloper, RoleRequest } from '@/actions/become-developer';
import { deleteRequest } from '@/actions/become-developer';

export function DeveloperTable({
    requests,
}: {
    requests: RoleRequest[];
}) {
    const t = useTranslations("AdminUsers");
    return (
        <>
            <form className="border shadow-sm rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[150px]">{t("name")}</TableHead>
                            <TableHead>{t("company")}</TableHead>
                            <TableHead>{t("action")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((req) => (
                            <UserRow key={req.userId} req={req} />
                        ))}
                        {!requests.length && <TableRow className='text-center'>
                            <TableCell colSpan={4}>{t("noData")}</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </form>
        </>
    );
}

function UserRow({ req }: { req: RoleRequest }) {
    const t = useTranslations("AdminUsers")
    const userId = req.userId;
    const aproveRequestDeveloperWithId = aproveRequestDeveloper.bind(null, userId);
    const deleteRequestWithId = deleteRequest.bind(null, userId);
    return (
        <TableRow>
            <TableCell className="font-medium">{req.user.name}</TableCell>
            <TableCell className="hidden md:table-cell">{req.company.name}</TableCell>
            <TableCell className="flex gap-2">
                <Button
                    className="w-fit"
                    size="sm"
                    variant="success"
                    aria-label={t('check')}
                    aria-labelledby={t('check')}
                    title={t('check')}
                    role="button"
                    formAction={aproveRequestDeveloperWithId}
                >
                    <LuCheck />
                </Button>
                <Button
                    className="w-fit"
                    size="sm"
                    variant="destructive"
                    aria-label={t('delete')}
                    aria-labelledby={t('delete')}
                    title={t('delete')}
                    role="button"
                    formAction={deleteRequestWithId}
                >
                    <LuTrash2 />
                </Button>
            </TableCell>
        </TableRow>
    );
}