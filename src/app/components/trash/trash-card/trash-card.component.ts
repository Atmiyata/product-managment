import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { Input, Component, ChangeDetectionStrategy } from '@angular/core';

import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

import { Product } from 'src/app/shared/models/product';
import { TrashService } from 'src/app/shared/services/trash.service';

@Component({
  selector: 'app-trash-card',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RatingModule,
    ButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './trash-card.component.html',
  styleUrls: ['./trash-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(private trashService: TrashService) {}

  onDelete(id: string) {
    //Todo - add confirm modal
    this.trashService.deleteTrashProduct(id).subscribe(console.log);
  }
}
