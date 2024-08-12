"use client"
import { changeRoleInCompany, deleteUserCompany } from "@/actions/company";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { TableCell, TableRow } from "@/components/ui/Table";
import { toast } from "@/components/ui/UseToast";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuLoader2, LuTrash2 } from "react-icons/lu";

type User = {
    id: string,
    name: string | null,
    email: string | null,
    companyId: string | null,
    adminCompanyId: string | null,
}
export const UserRow = ({user}: {user: User}) => {
    const t = useTranslations("CompanyUsersTable");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingSelect, setLoadingSelect] = useState<boolean>(false);
    const adminCompany = user.adminCompanyId == null ? false : true;

    const handleDeleteUser = async () => {
        setLoading(true);
        const result = await deleteUserCompany(user);
        if(result.success) {
            toast({
                description: t(result.message),
                variant: "success",
              })
        } else if(result.error) {
            toast({
                description: t(result.message),
                variant: "destructive",
              })
        }
        setLoading(false)
    }

    const handleChangeRoleInComapny = async (role: 'admin' | 'user') => {
        setLoadingSelect(true);
        const result = await changeRoleInCompany(user, role);
        if(result.success) {
            toast({
                description: t(result.message),
                variant: "success",
              })
        } else if(result.error) {
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
            <TableCell>{user.email}</TableCell>
            <TableCell>
                <Select disabled={loadingSelect} onValueChange={(e: 'admin' | 'user') => {handleChangeRoleInComapny(e)}} defaultValue={ adminCompany ? t("ceo") : t("user") }>
                    <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder={t("placeholderRole")}>
                            { adminCompany 
                                ? <>{ loadingSelect ? <span className="flex gap-2 items-center"><LuLoader2 className="animate-spin"/>{t("ceo")}</span> : t("ceo") }</> 
                                : <>{ loadingSelect ? <span className="flex gap-2 items-center"><LuLoader2 className="animate-spin"/>{t("user")}</span> : t("user") }</>
                            }
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">{t("ceo")}</SelectItem>
                        <SelectItem value="user">{t("user")}</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell className="flex gap-2">
                <Button
                    className="w-fit"
                    size="sm"
                    variant="destructive"
                    aria-label={t('delete')}
                    aria-labelledby={t('delete')}
                    title={t('delete')}
                    role="button"
                    disabled={adminCompany || loading}
                    formAction={handleDeleteUser}
                >   
                    {loading ? <LuLoader2 className="animate-spin" /> : <LuTrash2 />}
                </Button>
            </TableCell>
        </TableRow>
    );
}