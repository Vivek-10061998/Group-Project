import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextfieldComponent } from './textfield.component';
import { TextfieldHintComponent } from './textfield-hint.component';
import { TextfieldIconComponent } from './textfield-icon.component';

export { TextfieldComponent } from './textfield.component';
export { TextfieldHintComponent } from './textfield-hint.component';
export { TextfieldIconComponent } from './textfield-icon.component';

@NgModule({
  declarations: [
    TextfieldComponent,
    TextfieldHintComponent,
    TextfieldIconComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TextfieldComponent,
    TextfieldHintComponent,
    TextfieldIconComponent
  ]
})
export class TextfieldModule { }
