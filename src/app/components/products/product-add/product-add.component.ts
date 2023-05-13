import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ProductService } from 'src/app/shared/services/product.service';
import { inventoryStatus } from 'src/app/shared/models/product';

interface ProductForm {
  name: FormControl<string>;
  description?: FormControl<string>;
  price?: FormControl<number>;
  quantity: FormControl<number>;
  inventoryStatus: FormControl<inventoryStatus>;
  category: FormControl<string>;
}

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
  ],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  categories = ['Accessories', 'Clothing', 'Electronics', 'Fitness'];

  productForm = this.fb.group<ProductForm>({
    name: this.fb.control('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    }),
    description: this.fb.control('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(150),
      ],
    }),
    price: this.fb.control(0, { nonNullable: true, validators: [] }),
    quantity: this.fb.control(0, { nonNullable: true }),
    inventoryStatus: this.fb.control('INSTOCK', { nonNullable: true }),
    category: this.fb.control('', { nonNullable: true }),
  });

  ngOnInit(): void {
    //this.productForm.valueChanges.subscribe(console.log);
  }

  onNavigateBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onSave() {}

  onCancel() {}
}
