import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpService } from 'src/app/core/services/http.service';
import { AppConfigService } from 'src/app/core/services/app-config.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpService: HttpService,
    private http: HttpClient,
    private appConfigService: AppConfigService,
    
  ) { }

  // array filter by key
  filterByKey(array: any, key: string, value: string) {
    return array.filter((item: any) => item[key] == value);
  }

 }
