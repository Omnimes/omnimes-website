import { dashboardConfigAdmin, dashboardConfigBasic, dashboardConfigExtend } from "@/data/dashboard";

export const getSubNav = (role: string) => {
    if (role == 'admin') return dashboardConfigExtend.sidebarNav
    if (role == 'developer') return dashboardConfigExtend.sidebarNav.filter(position => position.title !== 'administrationPanel')
    return dashboardConfigBasic.sidebarNav
}

export const getMainNav = (role: string) => {
    if(role != 'user') return dashboardConfigExtend.mainNav
    return dashboardConfigBasic.mainNav
}

export const getMainAdmin = () => {
    return dashboardConfigAdmin.mainNav
}
export const getSubAdmin = () => {
    return dashboardConfigAdmin.sidebarNav
}