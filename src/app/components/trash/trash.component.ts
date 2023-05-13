import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Params,
  Router,
  ActivatedRoute,
  NavigationExtras,
} from '@angular/router';
import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  of,
  Subject,
  switchMap,
  Observable,
  debounceTime,
  combineLatest,
  BehaviorSubject,
} from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { Product } from 'src/app/shared/models/product';
import { TrashService } from 'src/app/shared/services/trash.service';

import { TrashCardComponent } from './trash-card';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TrashCardComponent,
  ],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject<void>();
  private fetchEvent: BehaviorSubject<boolean> = new BehaviorSubject(true);

  searchVal: string = '';
  products$: Observable<Product[]> = of([]);
  fetchEvent$ = this.fetchEvent.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private trashService: TrashService
  ) {}

  ngOnInit(): void {
    const param: Params = this.activatedRoute.snapshot.queryParams;
    this.searchVal = param['name'];

    this.products$ = combineLatest([
      this.fetchEvent$,
      this.activatedRoute.queryParams,
    ]).pipe(
      debounceTime(200),
      switchMap(([ev, param]: [any, Params]) =>
        this.trashService.getTrashProducts(
          param ? { search: param['name'] } : undefined
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.fetchEvent.complete();
  }

  trackByProduct(_: number, product: Product) {
    return product?.id;
  }

  onSearch() {
    let routeParams: NavigationExtras = {
      relativeTo: this.activatedRoute,
    };

    if (this.searchVal) {
      routeParams = {
        ...routeParams,
        queryParams: { name: this.searchVal.trim() },
        queryParamsHandling: 'merge',
      };
    }

    this.router.navigate([], routeParams);
  }

  onRemove() {
    this.fetchEvent.next(true);
  }
}
