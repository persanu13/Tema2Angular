import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from '../helpers/models/product';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../helpers/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LetterValidator } from '../helpers/form-helper';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Input() product!: Product;
  @Input() modal!: any;
  @Output() getProductEvent = new EventEmitter<Product>();
  productForm!: FormGroup<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.createProductForm();
    if (this.product) {
      this.productName = this.product.name;
      this.categoryName = this.product.category;
      this.quantity = this.product.quantity;
      this.price = this.product.price;
    }
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
          LetterValidator,
        ],
      ],
      categoryName: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
          LetterValidator,
        ],
      ],
      quantity: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.min(1),
          Validators.minLength(1),
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.min(1),
          Validators.minLength(1),
        ],
      ],
    });
  }

  addEditProduct(): void {
    console.log('ceva');
    const productName = this.productForm.controls['productName'].value;
    const categoryName = this.productForm.controls['categoryName'].value;
    const quantity = this.productForm.controls['quantity'].value;
    const price = this.productForm.controls['price'].value;
    if (!this.product) {
      this.addProduct(productName, categoryName, quantity, price);
    } else {
      this.editProduct(productName, categoryName, quantity, price);
    }
  }

  addProduct(
    productName: string,
    categoryName: string,
    quantity: number,
    price: number
  ): void {
    this.productService
      .createNewProduct(productName, categoryName, quantity, price)
      .subscribe({
        next: (res) => {
          this.notificationService.success(
            'Success',
            'Product added successfully'
          );
          this.getProductEvent.emit(res);
        },
        error: () => {
          this.notificationService.error('Error', 'Something went wrong');
        },
      });
    this.productForm.reset();
  }

  editProduct(
    productName: string,
    categoryName: string,
    quantity: number,
    price: number
  ): void {
    this.productService
      .editProduct(this.product.id, productName, categoryName, quantity, price)
      .subscribe({
        next: () => {
          this.notificationService.success(
            'Success',
            'Product edit successfully'
          );
          this.product.name = productName;
          this.product.category = categoryName;
          this.product.quantity = quantity;
          this.product.price = price;
          this.modal?.destroy();
        },
        error: () => {
          this.notificationService.error('Error', 'Something went wrong');
        },
      });
  }

  // -------------- form setters ------------------
  set productName(value: any) {
    this.productForm.controls['productName'].setValue(value);
  }
  set categoryName(value: any) {
    this.productForm.controls['categoryName'].setValue(value);
  }

  set quantity(value: any) {
    this.productForm.controls['quantity'].setValue(value);
  }

  set price(value: any) {
    this.productForm.controls['price'].setValue(value);
  }

  // -------------- form getters ------------------
  get productName(): AbstractControl {
    return this.productForm.controls['productName'];
  }

  get categoryName(): AbstractControl {
    return this.productForm.controls['categoryName'];
  }

  get quantity(): AbstractControl {
    return this.productForm.controls['quantity'];
  }
  get price(): AbstractControl {
    return this.productForm.controls['price'];
  }
}
