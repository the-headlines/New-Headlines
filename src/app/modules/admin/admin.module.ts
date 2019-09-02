import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {ComplaintsComponent} from './complaints/complaints.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {CoreModule} from '../../core/core.module';
import {HomeModule} from '../home/home.module';

@NgModule({
    declarations: [ComplaintsComponent, DashboardComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        CoreModule,
    ]
})
export class AdminModule {
}
