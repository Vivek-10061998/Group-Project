import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

  constructor() {
  }

  setSessionObj(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getSessionObj(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  removeSessionObj(key : string){
    localStorage.removeItem(key);
  }

  saveTokenValue(tokenValue: string) {
    localStorage.setItem('tokenValue', tokenValue);
  }

  getTokenValue() {
    return localStorage.getItem('tokenValue');
  }

}
