import * as core from "@angular/core";
import { Subscription } from 'rxjs';
import {
    ComponentPortal,
    Portal,
    CdkPortalOutlet,
} from "@angular/cdk/portal";

@core.Component({
    selector: "app-dialog-container",
    templateUrl: './side-panel-container.component.html',
    encapsulation: core.ViewEncapsulation.None,
    styleUrls: ['./side-panel-container.component.scss'],
})
export class SidepanelContainerComponent<T> {
    @core.Input()
    message: string = "";
    subscription!: Subscription;

    @core.Input()
    disableClose = false;

    @core.Input()
    width = "none";
    @core.Input()
    comp!: ComponentPortal<T>

    @core.Output()
    containerEvent = new core.EventEmitter<{ key: "CLOSE" }>();

    @core.ViewChild("portal", { read: CdkPortalOutlet, static: true })
    portal!: CdkPortalOutlet;

    @core.Input()
    selectedPortal!: Portal<T>;

    constructor() { }



    attach() {
        const c = this.portal.attach(this.selectedPortal);
        return c.instance;
    }

    closeDialog() {
        this.containerEvent.emit({ key: "CLOSE" });
    }
}
