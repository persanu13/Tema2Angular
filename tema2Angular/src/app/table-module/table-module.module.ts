import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { TableModuleRoutingModule } from './table-module-routing.module';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [TableComponent, ProductFormComponent],
  imports: [
    CommonModule,
    TableModuleRoutingModule,
    NzTableModule,
    NzNotificationModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    ReactiveFormsModule,
  ],
})
export class TableModuleModule {}
