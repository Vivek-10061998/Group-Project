import * as core from "@angular/core";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";

import { PopoverContainerComponent } from "./popover-container.component";
import { PopoverheaderComponent } from "./popover-container-header.component";
import { PopovercontentComponent } from "./popover-container-content.component";
import { PopoverfooterComponent } from "./popover-container-footer.component";
import { PopoverService } from "./popover.service";

@core.NgModule({
    declarations: [
        PopoverContainerComponent,
        PopoverheaderComponent,
        PopovercontentComponent,
        PopoverfooterComponent,
    ],
    imports: [PortalModule, OverlayModule],
    providers: [PopoverService],
    entryComponents: [
        PopoverContainerComponent,
        PopoverheaderComponent,
        PopovercontentComponent,
        PopoverfooterComponent
    ],
    exports: [
        PopoverContainerComponent,
        PopoverheaderComponent,
        PopovercontentComponent,
        PopoverfooterComponent
    ]
})
export class PopoverModule { }
