import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CalendarFullViewComponent } from './components/calendar-management/calendar-full-view/calendar-full-view.component';
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { APP_IMPORT } from './app.import';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CalendarFullViewComponent,
    MainLayoutComponent,
    APP_IMPORT
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'HRMS264';

  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
