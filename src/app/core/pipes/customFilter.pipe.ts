import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'customFilter'
})

export class CustomFilter implements PipeTransform {

  transform(items: any[], field: string, searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    if (!field) {
      return items.filter(str => {
        const filter = Object.keys(str);
        return filter.some(key => {
          if (str[key])
            return str[key].toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        });
      });
    } else {
      const fields = field.split(",");
      let filterType = false;
      return items.filter(str => {
        for (let i = 0; i < fields.length; i++) {
          if(str[fields[i].trim()])
          filterType = str[fields[i].trim()].toString().toLowerCase().includes(searchText.toLowerCase());
          if (filterType) {
            return filterType
          }
        }
        return false
      });
    }

  }
}
