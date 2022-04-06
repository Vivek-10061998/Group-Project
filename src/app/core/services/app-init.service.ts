import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppInitService {
  environment:any = environment;
  constructor(private httpClient: HttpClient) {
  }

  init(): Promise<any> {
    return new Promise((resolve:any, reject) => {
      setTimeout(() => {
          resolve();
      }, 500);
    });
  }

  loadUrls(): Promise<any> {
    const promise = this.httpClient.get('./assets/config/environment.json')
      .toPromise()
      .then((env: any) => {
        let environmentKeys = Object.keys(env)
        environmentKeys.forEach(key => {
        this.environment[key] = env[key];
        });
          return env;
      });
    return promise;
  }
}
