import * as core from "@angular/core";
import { Subscription } from 'rxjs';
import {
    Overlay,
    ComponentType,
    OverlayRef,
    ConnectionPositionPair
} from "@angular/cdk/overlay";
import {
    ComponentPortal,
} from "@angular/cdk/portal";
import { ElementRef, StaticProvider, ViewContainerRef } from '@angular/core';
import { PopoverConfig } from './popover-dialog-config.interface';
import { PopoverRef } from "./popover-ref.class";
import { PopoverContainerComponent } from "./popover-container.component";

const defaultConfig: PopoverConfig = {
    backdropClass: '',
    disableClose: false,
    arrowOffset: 30,
    arrowSize: 20
};


@core.Injectable({
    providedIn: "root"
})
export class PopoverService {
    shareData: any;
    constructor(private overlay: Overlay, private injector: core.Injector) { }
    dRef: any;
    public open<T>(
        component: ComponentType<T>,
        target: ElementRef | HTMLElement,
        config?: PopoverConfig
    ): PopoverRef<T> {
        const mconfig: PopoverConfig = Object.assign({}, defaultConfig, config);

        const arrowSize = mconfig?.arrowSize || 0;
        const arrowOffset = mconfig?.arrowOffset || 0;
        const panelOffset = arrowSize / 2;

        const positions: ConnectionPositionPair[] = [
            // top center
            {
                overlayX: 'center',
                overlayY: 'bottom',
                originX: 'center',
                originY: 'top',
                panelClass: ['bottom', 'center'],
                offsetY: -1 * panelOffset
            },
            // top left
            {
                overlayX: 'start',
                overlayY: 'bottom',
                originX: 'center',
                originY: 'top',
                panelClass: ['bottom', 'left'],
                offsetX: -1 * arrowOffset,
                offsetY: -1 * panelOffset
            },
            // top right
            {
                overlayX: 'end',
                overlayY: 'bottom',
                originX: 'center',
                originY: 'top',
                panelClass: ['bottom', 'right'],
                offsetX: arrowOffset,
                offsetY: -1 * panelOffset
            },
            // bottom center
            {
                overlayX: 'center',
                overlayY: 'top',
                originX: 'center',
                originY: 'bottom',
                panelClass: ['top', 'center'],
                offsetY: panelOffset
            },
            // bottom left
            {
                overlayX: 'start',
                overlayY: 'top',
                originX: 'center',
                originY: 'bottom',
                panelClass: ['top', 'left'],
                offsetX: -1 * arrowOffset,
                offsetY: panelOffset
            },
            // bottom right
            {
                overlayX: 'end',
                overlayY: 'top',
                originX: 'center',
                originY: 'bottom',
                panelClass: ['top', 'right'],
                offsetX: arrowOffset,
                offsetY: panelOffset
            }
        ];

        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(target)
            .withPush(false)
            .withFlexibleDimensions(false)
            .withPositions(positions);

        const overlay = this.overlay.create({
            hasBackdrop: true,
            backdropClass: mconfig.backdropClass,
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
        // const overlay = this.overlay.create({
        //     hasBackdrop: true,
        //     positionStrategy,
        //     panelClass: "dialog-container",
        //     width: config.width,
        //     maxWidth: "90vw",
        //     height: "100vh"
        // });
        this.shareData = {};
        const dialogPreview = new ComponentPortal(PopoverContainerComponent);
        const dialogContainerRef: any = overlay.attach(dialogPreview);
        dialogContainerRef.instance.width = mconfig.width || "none";
        dialogContainerRef.instance.height = mconfig.height || "none";
        // passing data to dialogContainerRef  
        if (mconfig.data) {
            this.shareData = mconfig.data

        }
        const dialogRef = new PopoverRef<T>(overlay);

        const injector = this.createInjector(dialogRef);
        const c = new ComponentPortal(component, null, injector);
        dialogContainerRef.instance.selectedPortal = c;

        this.applyDialogProperties(dialogContainerRef, overlay, mconfig);
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
        config: PopoverConfig
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
    private createInjector<T>(dialogRef: PopoverRef<T>) {
        const injectorMap = new WeakMap();
        injectorMap.set(PopoverRef, dialogRef);
        const providers: StaticProvider[] = [
            { provide: PopoverRef, useValue: dialogRef }
        ];
        return core.Injector.create({ parent: this.injector, providers });
    }
}
