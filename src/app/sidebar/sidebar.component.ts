import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-chart-bar-32',       class: '' },
    { path: '/dailies',       title: 'Daily Totals',      icon:'nc-chart-bar-32',    class: '' },
    { path: '/gender',          title: 'Gender',          icon:'nc-chart-pie-36',      class: '' },
    { path: '/immunity',    title: 'Herd Immunity',     icon:'nc-tile-56',    class: '' },
    { path: '/about',         title: 'About',             icon:'nc-caps-small', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
