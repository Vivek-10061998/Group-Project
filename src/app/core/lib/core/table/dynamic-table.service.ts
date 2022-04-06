import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicTableService {

  constructor() { }

  getColumnNames(data_list=[]){
    let list = {
      column: [''],
      rowValue:[]
    };
    list['column'] = Object.keys(data_list[0]);
    list['rowValue'] = data_list;
    return list;
  }

  sortArrayList(list_items: any [] = [], propertyName: string = '',sortingOrder:string=''){
    if(sortingOrder == 'asc'){
      return list_items.sort((a:any,b:any) => (a[propertyName] > b[propertyName]) ? 1 : ((b[propertyName] > a[propertyName]) ? -1 : 0));
    }
    else{
      return list_items.reverse();
    }
  }
}
