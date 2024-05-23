import { Component, ChangeDetectorRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from '../helpers/product.service';
import { Product } from '../helpers/models/product';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private notificationService: NzNotificationService,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getListOfProduct();
  }

  getListOfProduct() {
    this.productService.getListOfProduct().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.products = res;
        this.notificationService.success(
          'Succes',
          'The list was succesfully retrived'
        );
      },
      error: (err) => {
        this.products = [];
        this.notificationService.error('Error', 'Something went wrong');
      },
    });
  }

  toggleAddProduct(): void {
    const modal: any = this.modal.create({
      nzTitle: 'Add Product',
      nzContent: ProductFormComponent,
      nzFooter: [
        {
          label: 'Anulare',
          onClick: () => modal.destroy(),
        },
      ],
    });
    const instance = modal.getContentComponent() as ProductFormComponent;
    instance.getProductEvent.subscribe((product) => {
      this.products = [product, ...this.products];
    });
  }

  GetProductEvent(eventData: Product): void {}

  toggleUpdateProduct(product: Product): void {
    const modal: any = this.modal.create({
      nzTitle: 'Edit Product',
      nzContent: ProductFormComponent,
      nzFooter: [
        {
          label: 'Anulare',
          onClick: () => modal.destroy(),
        },
      ],
    });
    const instance = modal.getContentComponent() as ProductFormComponent;
    instance.product = product;
    instance.modal = modal;
  }

  toggleDeleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter((d) => d.id !== product.id);

        this.notificationService.success(
          'Success',
          'Product delete successfully'
        );
      },
      error: () => {
        this.notificationService.error('Error', 'Something went wrong');
      },
    });
  }
}
