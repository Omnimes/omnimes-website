import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from '@/components/atoms/Table';
import { useTranslations } from 'next-intl';
import { RoleRequest } from '@/actions/become-developer';
import { DeveloperTableRow } from './DeveloperTableRow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/Card';

export function DeveloperTable({
    requests,
}: {
    requests: RoleRequest[];
}) {
    const t = useTranslations("AdminUsers");
    return (
        <>
            <form>
            <Card>
                <CardHeader>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>{t('desc')}</CardDescription>
                </CardHeader>
                <CardContent>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[150px]">{t("name")}</TableHead>
                            <TableHead className="max-w-[150px]">{t("email")}</TableHead>
                            <TableHead>{t("company")}</TableHead>
                            <TableHead>{t("action")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((req) => (
                            <DeveloperTableRow key={req.userId} req={req} />
                        ))}
                        {!requests.length && <TableRow className='text-center'>
                            <TableCell colSpan={4}>{t("noData")}</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
                </CardContent>
                </Card>
            </form>
        </>
    );
}
