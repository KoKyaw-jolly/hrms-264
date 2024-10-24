import { Component } from '@angular/core';
import { APP_IMPORT } from '../../../app.import';
import { LeaveBalanceSummaryComponent } from '../../../share/components/leave-balance-summary/leave-balance-summary.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [
    APP_IMPORT,
    LeaveBalanceSummaryComponent
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent {

}
