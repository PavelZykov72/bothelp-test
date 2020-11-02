import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BroadcastingService } from '../../shared/broadcasting.service';
import { BroadcastingElement } from '../../shared/interfaces';
import { finalize, takeUntil } from 'rxjs/operators';

interface ColumnElement {
  id: string;
  caption: string;
}

@Component({
  selector: 'app-broadcasting-send-page',
  templateUrl: './broadcasting-page-send.component.html',
  styleUrls: [ './broadcasting-page-send.component.scss' ]
})
export class BroadcastingSendPageComponent implements OnInit {
  private readonly destroy$ = new Subject();

  public loading: boolean = true;
  public broadcasts$: Observable<BroadcastingElement[]> = this.broadcastingService.loadBroadcasts();
  public dataSource: Array<BroadcastingElement> = [];
  public initColumns: Array<ColumnElement> = [
    { id: 'title', caption: 'Название' },
    { id: 'status', caption: 'Статус' },
    { id: 'send', caption: 'Отправлено' },
    { id: 'views', caption: 'Просмотров' },
    { id: 'clicks', caption: 'Кликов' },
    { id: 'created', caption: 'Создана' },
    { id: 'agent', caption: 'Агент' },
  ];
  public displayedColumns: Array<string> = [
    'selected',
    ...this.initColumns.map((col) => col.id),
    'actions'
  ];

  constructor(private broadcastingService: BroadcastingService) { }

  ngOnInit(): void {
    this.dataSource = this.broadcastingService.getBroadcastsApp();
    this.loading = !this.dataSource || this.dataSource.length === 0;
    this.broadcasts$
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe((list) => {
        this.dataSource = list;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
