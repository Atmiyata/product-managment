import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashComponent {}
