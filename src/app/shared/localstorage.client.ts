import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleStorageClient {
  set(key: string, value: any): Observable<boolean> {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);

    return of(true);
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}