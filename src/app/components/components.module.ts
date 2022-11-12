import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSettingsComponent } from './image-settings/image-settings.component';
import { PreviewComponent } from './preview/preview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatTabsModule, MatIconModule],
  declarations: [ImageSettingsComponent, PreviewComponent],
  exports: [ImageSettingsComponent, PreviewComponent],
})
export class ComponentsModule {}
