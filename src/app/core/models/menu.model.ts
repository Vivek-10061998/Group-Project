export interface Menu {
  name: string;
  icon: string;
  subMenus: any[];
  isSelected: boolean;
  isRoadmap: boolean;
  navigationUrl: string;
  openNewTab: boolean;
  isExpanded: boolean;
}