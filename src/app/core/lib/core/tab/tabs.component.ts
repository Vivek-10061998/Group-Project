import { Component, HostBinding, QueryList, ContentChildren, Input, EventEmitter, Output } from '@angular/core';
import { TabComponent } from "./tab.component";

@Component({
  selector: 'tabs',
  template: `
  <div class="jds-tab">
    <div [ngClass]="cdesign[design]">
      <div *ngFor="let tab of tabs; let i = index;" class="jds-tab-header" [ngClass]="{'selected': tab.active === true }" (click)="selectTab(tab)"> 
        <div class="jds-header-text">
          {{ tab.tabTitle }}
        </div>
      </div>
    </div>
    <ng-content> </ng-content>
  </div>`,
  styleUrls: ['./tab.component.scss']

})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = {} as QueryList<TabComponent>;
  cdesign: any = {
    "boxed": "jds-tab-header-block",
    "underline": "jds-tab-header-underline"
  };

  @Input() public selectedTab: any = 0;
  @Input() public design: any = "boxed";
  @Output() tabChange: any = new EventEmitter<any>();

  ngAfterContentInit() {
    this.initTabs();
    setTimeout((e: any) => {
      this.selectTab(this.tabs.toArray()[this.selectedTab]);
    }, 0);
  }
  selectionChange(tab: TabComponent) {
    return tab;
  }
  initTabs() {
    this.tabs.toArray().forEach((mtab: any, index: number) => (mtab.active = false, mtab.index = index));
  }
  selectTab(tab: TabComponent) {
    this.initTabs();
    this.selectedTab = tab.index;
    tab.active = true;
    this.tabChange.emit(tab);
  }

}
