import * as core from "@angular/core";
import { Subscription } from 'rxjs';
import {
    Overlay,
    ComponentType,
    OverlayRef
} from "@angular/cdk/overlay";
import {
    ComponentPortal,
} from "@angular/cdk/portal";
import { StaticProvider, ViewContainerRef } from '@angular/core';
import { SidepanelConfig } from './side-panel-dialog-config.interface';
import { SidepanelRef } from "./side-panel-ref.class";
import { SidepanelContainerComponent } from "./side-panel-container.component";

@core.Injectable({
    providedIn: "root"
})
export class SidepanelService {
    shareData: any;
    constructor(private overlay: Overlay, private injector: core.Injector) { }
    dRef: any;
    disableClose: boolean = false;
    public open<T>(
        component: ComponentType<T>,
        config?: SidepanelConfig
    ): SidepanelRef<T> {
        config = config || { width: "none", data: "" };
        const positionStrategy = this.overlay
            .position()
            .global()
            .top("0")
            .right("0");
        const overlay = this.overlay.create({
            hasBackdrop: true,
            positionStrategy,
            panelClass: "dialog-container",
            width: config.width,
            maxWidth: "90vw",
            height: "100vh"
        });
        this.shareData = {};
        this.disableClose = config.disableClose || false;
        document.body.classList.add("overflow-hidden");
        const dialogPreview = new ComponentPortal(SidepanelContainerComponent);
        const dialogContainerRef = overlay.attach(dialogPreview);
        dialogContainerRef.instance.width = config.width || "none";
        dialogContainerRef.instance.disableClose = this.disableClose;
        // dialogContainerRef.instance.dialogTitle = config.title;
        // passing data to dialogContainerRef  
        if (config.data) {
            this.shareData = config.data

        }
        const dialogRef = new SidepanelRef<T>(overlay);

        const injector = this.createInjector(dialogRef);
        const c = new ComponentPortal(component, null, injector);
        dialogContainerRef.instance.selectedPortal = c;
        const componentRef = dialogContainerRef.instance.attach();
        dialogRef.componentInstance = componentRef;

        this.applyDialogProperties(dialogContainerRef, overlay, config);
        this.dRef = dialogRef;

        return dialogRef;
    }
    public close(data?: any) {
        this.dRef.close(data);
    }
    public getData() {
        return this.shareData;
    }

    private applyDialogProperties(
        componentRef: core.ComponentRef<any>,
        overlayRef: OverlayRef,
        config: SidepanelConfig
    ) {
        // passing data to componentRef  
        // if (config.data) {
        //     componentRef.instance.dialogData = config.data;
        // }
        componentRef.instance.containerEvent.subscribe((e: any) => {
            if (e.key === "CLOSE") {
                if (!this.disableClose) {
                    document.body.classList.remove("overflow-hidden");
                    overlayRef.dispose();
                }
            }
        });
        if (!config.disableClose) {
            overlayRef.backdropClick().subscribe(() => {
                document.body.classList.remove("overflow-hidden");
                overlayRef.dispose();
            });
        }
    }
    private createInjector<T>(dialogRef: SidepanelRef<T>) {
        const injectorMap = new WeakMap();
        injectorMap.set(SidepanelRef, dialogRef);
        const providers: StaticProvider[] = [
            { provide: SidepanelRef, useValue: dialogRef }
        ];
        return core.Injector.create({ parent: this.injector, providers });
    }
}
