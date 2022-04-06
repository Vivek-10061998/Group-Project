import * as core from "@angular/core";
import { OverlayRef } from "@angular/cdk/overlay";
import { Subject } from "rxjs";

export interface SidepanelCloseEvent<R> {
    type: 'backdropClick' | 'close';
    data: R;
}

@core.Injectable({
    providedIn: "root"
})
export class SidepanelRef<T> {
    private compInstance!: core.ComponentRef<T>;
    afterClosed = new Subject<SidepanelCloseEvent<any>>();
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
        document.body.classList.remove("overflow-hidden");
        this.overlayRef.dispose();
        this.afterClosed.next({
            type,
            data
        });

        this.afterClosed.complete();
    }
}