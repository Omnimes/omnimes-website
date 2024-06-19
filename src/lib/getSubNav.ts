import { dashboardConfigBasic, dashboardConfigDeveloper } from "@/data/dashboard";

export const getSubNav = (role: string) => {

    if(role != 'user') {
        return dashboardConfigDeveloper.sidebarNav
    }

    return dashboardConfigBasic.sidebarNav
}

export const getMainNav = (role: string) => {

    if(role != 'user') {
        return dashboardConfigDeveloper.mainNav
    }

    return dashboardConfigBasic.mainNav
}