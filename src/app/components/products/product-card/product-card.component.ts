import { take } from 'rxjs';
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

import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { InventoryStatus, Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TagModule,
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
  @Output() onSoftDelete: EventEmitter<void> = new EventEmitter<void>();

  severityByInventoryStatus = {
    [InventoryStatus.INSTOCK]: 'success',
    [InventoryStatus.LOWSTOCK]: 'warning',
    [InventoryStatus.OUTOFSTOCK]: 'danger',
  };

  labelByInventoryStatus = {
    [InventoryStatus.INSTOCK]: 'IN STOCK',
    [InventoryStatus.LOWSTOCK]: 'LOW STOCK',
    [InventoryStatus.OUTOFSTOCK]: 'OUT OF STOCK',
  };

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService
  ) {}

  softDelete(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService
          .softDelete(product)
          .pipe(take(1))
          .subscribe(() => this.onSoftDelete.emit());
      },
      reject: () => {},
    });
  }
}
