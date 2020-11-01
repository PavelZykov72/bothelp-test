import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { BroadcastingDraftElement, BroadcastingElement } from './interfaces';
import { LocaleStorageClient } from './localstorage.client';
import { delay, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BroadcastingService {
  private draft: BroadcastingDraftElement = null;
  private list: Array<BroadcastingElement> = [];

  constructor(
    private storeClient: LocaleStorageClient
  ) {}

  private save(key: string, value: any) {
    return this.storeClient.set(key, value);
  }

  private load(key: string) {
    return this.storeClient.get(key);
  }

  clearDraft(): Observable<boolean> {
    return this.setDraft(null);
  }

  setDraft(draft: BroadcastingDraftElement | null): Observable<boolean> {
    this.draft = draft;
    return this.storeClient.set('draft', draft);
  }

  getExistDraft(): BroadcastingDraftElement  {
    return this.draft || this.load('draft');
  }

  saveBroadcast(element: BroadcastingElement): Observable<Boolean> {
    const getRandom = () => (Math.random() * 1000) << 0;
    return of(element).pipe(
      delay(1000),
      mergeMap(() => this.loadBroadcasts()),
      mergeMap((list) => {
        // Emulate other fields
        element = {
          ...element,
          agent: 'Carl Jenkins',
          status: 'Активна',
          send: getRandom(),
          views: getRandom(),
          clicks: getRandom(),
          created: new Date()
        };
        this.list = [ ...list, element ];
        return this.save('broadcasts', this.list)
      })
    );
  }

  loadBroadcasts(): Observable<Array<BroadcastingElement>> {
    return of(this.load('broadcasts'))
    .pipe(
      delay(1000),
      tap((list) => this.list = list)
    );
  }

  getBroadcastsApp(): Array<BroadcastingElement> {
    return this.list;
  }
}