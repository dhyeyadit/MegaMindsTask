import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observation, SummaryObservation } from '../../model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.css',
})
export class SummaryViewComponent implements OnInit {
  summaryData = signal<SummaryObservation[]>([]);
  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient.get<Observation>('data.json').subscribe({
      next: (res) => {
        const summary = res.Datas.map((d) => {
          const data: any = { samplingTime: d.SamplingTime };

          d.Properties.forEach((p) => {
            const label = p.Label.toLowerCase();
            if (label.includes('project')) data.projectName = p.Value;
            if (label.includes('count')) data.constructionCount = p.Value;
            if (label.includes('completed'))
              data.isConstructionCompleted = p.Value;
            if (label.includes('length')) data.lengthOfRoad = p.Value;
          });

          return data as SummaryObservation;
        });

        this.summaryData.set(summary);
        console.log('Summary View:', summary); // ✅ Only log the result
      },
    });
  }
}
