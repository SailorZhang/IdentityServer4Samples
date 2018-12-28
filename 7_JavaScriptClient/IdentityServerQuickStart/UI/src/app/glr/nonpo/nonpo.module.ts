import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// containers
import { NonpoComponent } from './nonpo.component';
import { OwlModule } from 'ngx-owl-carousel';

// routes
export const ROUTES: Routes = [{ path: '', component: NonpoComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), OwlModule, FormsModule],
  declarations: [NonpoComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class NonpoModule { }
