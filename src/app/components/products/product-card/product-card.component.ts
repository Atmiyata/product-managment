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
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RatingModule,
    ButtonModule,
    NgOptimizedImage,
    ConfirmDialogModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() onSoftDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService
  ) {}

  softDelete(id: string) {
    console.log('called');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSoftDelete.emit(id);
      },
      reject: () => {},
    });
    //Todo - add confirm modal
  }
}
