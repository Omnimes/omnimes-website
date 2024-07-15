import { aproveUserToCompany, deleteRequest } from '@/actions/company';
import { Button } from '@/components/atoms/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/Card';
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from '@/components/atoms/Table';
import { useTranslations } from 'next-intl';
import { LuCheck, LuTrash2 } from 'react-icons/lu';

type User = {
    id: string;
    name: string | null;
    email: string | null;
};

type CompanyRequest = {
    id: string;
    userId: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
};

export type Requests = CompanyRequest[];

export const ComponentRequests = ({ requests }: { requests: Requests }) => {
    const t = useTranslations("dashboardTable");

    return (
        <form>
            <Card>
                <CardHeader>
                    <CardTitle>{t("title")}</CardTitle>
                    <CardDescription>{t("desc")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="max-w-[150px]">{t("name")}</TableHead>
                                <TableHead className="hidden md:table-cell">{t("email")}</TableHead>
                                <TableHead>{t("action")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='overflow-auto'>
                            {requests.map((user) => (
                                <UserRow key={user.id} userProps={user} />
                            ))}
                            {!requests.length && <TableRow className='text-center'>
                                <TableCell colSpan={4}>{t("noData")}</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </form>
    )
}

function UserRow({ userProps }: { userProps: CompanyRequest }) {
    const t = useTranslations("dashboardTable");
    const user = userProps.user
    const obj = {
        userId: userProps.userId,
        companyId: userProps.companyId,
        reqId: userProps.id
    }
    const deleteRequestWithId = deleteRequest.bind(null, userProps.id);
    const aproveRequestWithId = aproveUserToCompany.bind(null, obj)
    return (
        <TableRow>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="">{user.email}</TableCell>
            <TableCell className="flex gap-2">
                <Button
                    className="w-fit"
                    size="sm"
                    variant="success"
                    aria-label={t('check')}
                    aria-labelledby={t('check')}
                    title={t('check')}
                    role="button"
                    formAction={aproveRequestWithId}
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