import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDropDirective } from './file-drop.directive';
import { FileSelectDirective } from './file-select.directive';

@NgModule({
  declarations: [ FileDropDirective, FileSelectDirective ],
  imports: [
    CommonModule
  ],
  exports: [ FileDropDirective, FileSelectDirective ]
})
export class FileUploadModule { }
