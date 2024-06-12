import { ComponentSearch } from "@/components/ComponentSearch";
import { UserAccountNav } from "@/components/UserAccountNav";
import HeaderUser from "@/components/auth/NavbarUser";
// import { getCurrentUser } from "@/utils/session";

export default function Navbar() {
    // const user = await getCurrentUser();
    return (
            <ComponentSearch>
                <HeaderUser>
                    <UserAccountNav user={undefined} />
                </HeaderUser>
            </ComponentSearch>
    )
}