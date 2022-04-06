import * as core from "@angular/core";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";

import { ModalContainerComponent } from "./modal-container.component";
import { ModalheaderComponent } from "./modal-container-header.component";
import { ModalcontentComponent } from "./modal-container-content.component";
import { ModalfooterComponent } from "./modal-container-footer.component";
import { ModalService } from "./modal.service";

@core.NgModule({
    declarations: [
        ModalContainerComponent,
        ModalheaderComponent,
        ModalcontentComponent,
        ModalfooterComponent,
    ],
    imports: [PortalModule, OverlayModule],
    providers: [ModalService],
    entryComponents: [
        ModalContainerComponent,
        ModalheaderComponent,
        ModalcontentComponent,
        ModalfooterComponent
    ],
    exports: [
        ModalContainerComponent,
         ModalheaderComponent,
         ModalcontentComponent,
         ModalfooterComponent
    ]
})
export class ModalModule { }
