import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    ButtonModule,
    FormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() onSoftDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productService: ProductService) {}

  softDelete(id: string) {
    this.onSoftDelete.emit(id);
  }
}
