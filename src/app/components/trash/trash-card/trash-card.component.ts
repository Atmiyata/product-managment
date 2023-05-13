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

import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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

  constructor(
    private trashService: TrashService,
    private confirmationService: ConfirmationService
  ) {}

  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trashService
          .deleteTrashProduct(id)
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
