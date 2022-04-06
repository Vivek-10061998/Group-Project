import { Component, Input, HostBinding, Directive, ViewEncapsulation, ElementRef, AfterContentInit } from '@angular/core';
import { TableService } from './table.service';

@Directive({
    selector: 'table[ruitable]'
})
export class TableDirective implements AfterContentInit {

    constructor(private el: ElementRef, private tableService: TableService) {
        //el.nativeElement.style.backgroundColor = 'yellow';
    }

    cdesign: any = {
        "bordered": "jds-table-border",
        "zebra": "jds-table-zebra",
        "fixed-header": "jds-fixed-header"
    };


    @Input()
    public design: any = "bordered";

    @Input()
    public data: any = [];

    ngAfterContentInit() {
        if (this.data.length > 0) {
            // console.log(this.data)
            let cols = this.tableService.getColumnNames(this.data);
            // console.log("cols", cols);
        }
    }

    @HostBinding('class')
    get classes(): string {
        return `${this.cdesign[this.design]} jds-table`
    }

}
