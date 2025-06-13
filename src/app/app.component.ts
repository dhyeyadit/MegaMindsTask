import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';

@Component({
  selector: 'app-root',
  imports: [SummaryViewComponent,DetailedViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task';

  selectedTab: 'summary' | 'detailed' = 'summary';

}
