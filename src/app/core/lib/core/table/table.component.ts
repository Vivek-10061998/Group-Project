import { Component, Input, HostBinding, Directive, ViewEncapsulation, ElementRef, AfterContentInit } from '@angular/core';
import { TableDirective } from './table.directive';
@Component({
    selector: 'table[ruitable]',
    providers: [TableDirective],
    templateUrl: "./table.component.html",
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableComponent {

}

