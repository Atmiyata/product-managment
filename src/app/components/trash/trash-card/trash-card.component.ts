import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

import { TrashService } from 'src/app/shared/services/trash.service';
import { Product, InventoryStatus } from 'src/app/shared/models/product';

@Component({
  selector: 'app-trash-card',
  standalone: true,
  imports: [
    TagModule,
    FormsModule,
    CommonModule,
    RatingModule,
    ButtonModule,
    NgOptimizedImage,
    ConfirmDialogModule,
  ],
  templateUrl: './trash-card.component.html',
  styleUrls: ['./trash-card.component.scss'],
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() onRemove: EventEmitter<void> = new EventEmitter<void>();

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
    private trashService: TrashService,
    private confirmationService: ConfirmationService
  ) {}

  onDelete(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trashService
          .deleteTrashProduct(product?.id || '')
          .pipe(take(1))
          .subscribe(() => this.onRemove.emit());
      },
      reject: () => {},
    });
  }

  onRestore(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trashService
          .restoreProduct(product)
          .pipe(take(1))
          .subscribe(() => this.onRemove.emit());
      },
      reject: () => {},
    });
  }
}
