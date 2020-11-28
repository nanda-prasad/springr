import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermanagementRoutingModule } from './usermanagement-routing.module';
import { UsermanagementComponent } from './usermanagement.component';
import { MatDialogModule, MatIconModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsermanagementComponent],
  imports: [
    CommonModule,
    UsermanagementRoutingModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsermanagementModule { }
