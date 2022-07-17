import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { AboutComponent }           from '../../pages/about/about.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { DailiesComponent }         from '../../pages/dailies/dailies.component';
import { GenderComponent }          from '../../pages/gender/gender.component';
import { ImmunityComponent }        from '../../pages/immunity/immunity.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    AboutComponent,
    IconsComponent,
    DailiesComponent,
    GenderComponent,
    ImmunityComponent,
  ]
})

export class AdminLayoutModule {}
