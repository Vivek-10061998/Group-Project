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
import { ModalConfig } from './modal-dialog-config.interface';
import { ModalRef } from "./modal-ref.class";
import { ModalContainerComponent } from "./modal-container.component";

@core.Injectable({
    providedIn: "root"
})
export class ModalService {
    shareData: any;
    constructor(private overlay: Overlay, private injector: core.Injector) { }
    dRef: any;
    overlayRef: any;

    public open<T>(
        component: ComponentType<T>,
        config?: ModalConfig
    ): ModalRef<T> {
        config = config || { width: "none", height: "none", data: "" };
        const positionStrategy = this.overlay.position().global().centerVertically().centerHorizontally();
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            positionStrategy,
            panelClass: "dialog-container",
            width: config.width,
            maxWidth: "90vw",
            height: "100vh"
        });
        this.shareData = {};
        const dialogPreview = new ComponentPortal(ModalContainerComponent);
        const dialogContainerRef: any = this.overlayRef.attach(dialogPreview);
        dialogContainerRef.instance.width = config.width || "none";
        dialogContainerRef.instance.height = config.height || "none";
        // passing data to dialogContainerRef  
        if (config.data) {
            this.shareData = config.data
        }
        const dialogRef = new ModalRef<T>(this.overlayRef);

        const injector = this.createInjector(dialogRef);
        const c = new ComponentPortal(component, null, injector);
        dialogContainerRef.instance.selectedPortal = c;
        const componentRef = dialogContainerRef.instance.attach();
        dialogRef.componentInstance = componentRef;

        this.applyDialogProperties(dialogContainerRef, this.overlayRef, config);
        this.dRef = dialogRef;

        return dialogRef;
    }
    public close(data?: any) {
        this.dRef.close(data);
        this.overlayRef.dispose();
    }
    public getData() {
        return this.shareData;
    }

    private applyDialogProperties(
        componentRef: core.ComponentRef<any>,
        overlayRef: OverlayRef,
        config: ModalConfig
    ) {
        // passing data to componentRef  
        // if (config.data) {
        //     componentRef.instance.dialogData = config.data;
        // }
        componentRef.instance.containerEvent.subscribe((e: any) => {
            if (e.key === "CLOSE") {
                overlayRef.dispose();
            }
        });
        if (!config.disableClose) {
            overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
        }
    }
    private createInjector<T>(dialogRef: ModalRef<T>) {
        const injectorMap = new WeakMap();
        injectorMap.set(ModalRef, dialogRef);
        const providers: StaticProvider[] = [
            { provide: ModalRef, useValue: dialogRef }
        ];
        return core.Injector.create({ parent: this.injector, providers });
    }
}
