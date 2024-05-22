import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { TableModuleRoutingModule } from './table-module-routing.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, TableModuleRoutingModule],
})
export class TableModuleModule {}
