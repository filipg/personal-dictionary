import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatPaginatorModule,
    MatRippleModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatPaginatorModule,
    MatRippleModule
  ]
})
export class AppMaterialModule { }
