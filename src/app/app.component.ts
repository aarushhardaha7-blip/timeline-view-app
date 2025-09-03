import { Component } from '@angular/core';
import { TimelineViewComponent } from './timeline-view/timeline-view.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimelineViewComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timeline-view-app';
}