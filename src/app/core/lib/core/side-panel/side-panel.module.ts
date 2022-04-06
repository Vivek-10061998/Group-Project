import * as core from "@angular/core";
import { CommonModule } from '@angular/common';
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";

import { SidepanelContainerComponent } from "./side-panel-container.component";
import { SidepanelheaderComponent } from "./side-panel-container-header.component";
import { SidepanelcontentComponent } from "./side-panel-container-content.component";
import { SidepanelfooterComponent } from "./side-panel-container-footer.component";
import { SidepanelService } from "./side-panel.service";

@core.NgModule({
    declarations: [
        SidepanelContainerComponent,
        SidepanelheaderComponent,
        SidepanelcontentComponent,
        SidepanelfooterComponent,

    ],
    imports: [CommonModule, PortalModule, OverlayModule],
    providers: [SidepanelService],
    entryComponents: [
        SidepanelContainerComponent,
        SidepanelheaderComponent,
        SidepanelcontentComponent,
        SidepanelfooterComponent
    ],
    exports: [
        SidepanelheaderComponent,
        SidepanelcontentComponent,
        SidepanelfooterComponent
    ]
})
export class SidepanelModule { }
