import { NgModule } from '@angular/core';
import {
  ButtonModule,
  AccordianModule,
  ToggleSwitchModule,
  TextfieldModule,
  SnackbarModule,
  LoaderModule,
  DropdownModule,
  CardModule,
  TooltipModule,
  TabModule,
  SidepanelModule,
  ModalModule,
  // MenuModule,
  // PopoverModule,
  AutocompleteModule,
  CheckboxModule,
  ChipModule,
  RadioModule,
  TableModule
} from './lib';


@NgModule({
  exports: [
    ButtonModule,
    AccordianModule,
    AutocompleteModule,
    ToggleSwitchModule,
    TextfieldModule,
    SnackbarModule,
    LoaderModule,
    DropdownModule,
    CardModule,
    TooltipModule,
    TabModule,
    SidepanelModule,
    ModalModule,
    // MenuModule,
    // PopoverModule,
    CheckboxModule,
    ChipModule,
    RadioModule,
    TableModule
  ]
})
export class AppRuiModule { }

