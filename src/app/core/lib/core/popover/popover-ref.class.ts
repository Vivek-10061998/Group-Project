import * as core from "@angular/core";
import { OverlayRef } from "@angular/cdk/overlay";
import { Subject } from "rxjs";

export interface PopoverCloseEvent<R> {
    type: 'backdropClick' | 'close';
    data: R;
}
@core.Injectable({
    providedIn: "root"
})
export class PopoverRef<T> {
    private compInstance!: core.ComponentRef<T>;
    afterClosed = new Subject<PopoverCloseEvent<any>>();
    public data: any
    constructor(private overlayRef: OverlayRef) {
        overlayRef.backdropClick().subscribe(() => this._close('backdropClick', this.data));
    }

    get componentInstance() {
        return this.compInstance;
    }

    set componentInstance(c: core.ComponentRef<T>) {
        this.compInstance = c;
    }

    close(data?: any) {
        this._close('close', data);
    }

    private _close(type: 'backdropClick' | 'close', data: any) {
        this.overlayRef.dispose();
        this.afterClosed.next({
            type,
            data
        });

        this.afterClosed.complete();
    }
}