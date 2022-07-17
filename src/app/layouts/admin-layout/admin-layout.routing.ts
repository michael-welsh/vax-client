import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { AboutComponent } from '../../pages/about/about.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { DailiesComponent } from '../../pages/dailies/dailies.component';
import { GenderComponent } from '../../pages/gender/gender.component';
import { ImmunityComponent } from '../../pages/immunity/immunity.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'about',          component: AboutComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'dailies',        component: DailiesComponent },
    { path: 'gender',           component: GenderComponent },
    { path: 'immunity',         component: ImmunityComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
