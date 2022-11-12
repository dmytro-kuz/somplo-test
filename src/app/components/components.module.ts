import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSettingsComponent } from './image-settings/image-settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  declarations: [ImageSettingsComponent],
  exports: [ImageSettingsComponent],
})
export class ComponentsModule {}
