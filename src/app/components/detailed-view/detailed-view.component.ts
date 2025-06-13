import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DetailedViewComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  form!: FormGroup;
  data: any[] = [];
  selectedIndex = 0;

  ngOnInit(): void {
    this.http.get<any>('data.json').subscribe((res) => {
      this.data = res.Datas ?? [];
      if (this.data.length > 0) {
        this.select(0);
      }
    });
  }

  select(index: number): void {
    this.selectedIndex = index;
    const item = this.data[index];
    const formFields: any = {};

    item.Properties.forEach((p: any) => {
      const key = this.getControlName(p.Label);
      // Set even null values to maintain control visibility
      formFields[key] = p.Value ?? null;
    });

    this.form = this.fb.group(formFields);
  }

  save(): void {
    const updatedProps = this.data[this.selectedIndex].Properties.map((p: any) => {
      const key = this.getControlName(p.Label);
      return {
        ...p,
        Value: this.form.get(key)?.value ?? null,
      };
    });

    this.data[this.selectedIndex].Properties = updatedProps;

    const updatedBody = {
      Datas: this.data,
    };

    this.http.put('https://localhost:7060/api/observation', updatedBody).subscribe(() => {
      alert('Saved to backend!');
    });
  }

  getControlName(label: string): string {
    return label.toLowerCase().replace(/\s+/g, '_');
  }

  isLengthField(label: string): boolean {
    return label.toLowerCase().includes('length');
  }
}
