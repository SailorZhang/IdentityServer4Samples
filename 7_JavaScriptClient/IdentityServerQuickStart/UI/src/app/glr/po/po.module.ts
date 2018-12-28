import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// containers
import { PoComponent } from './po.component';
import { OwlModule } from 'ngx-owl-carousel';
import { FormsModule } from '@angular/forms';

// routes
export const ROUTES: Routes = [{ path: '', component: PoComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), OwlModule, FormsModule],
  declarations: [PoComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class PoModule { }
