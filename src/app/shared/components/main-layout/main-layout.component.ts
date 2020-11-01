import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuItem } from '../../interfaces';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [ './main-layout.component.scss' ]
})
export class MainLayoutComponent {

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public menuItems: Array<MenuItem> = [
    {
      name: 'Диалоги',
      materialIcon: 'comment',
      route: '/chats'
    },
    {
      name: 'Подписчики',
      materialIcon: 'people',
      route: '/people'
    },
    {
      name: 'Рассылки',
      materialIcon: 'send',
      route: '/broadcasting'
    },
    {
      name: 'Боты',
      materialIcon: 'adb',
      route: '/bots'
    },
    {
      name: 'Инструменты роста',
      materialIcon: 'trending_up',
      route: 'landings'
    },
    {
      name: 'Автоматизация',
      materialIcon: 'power',
      route: 'automation'
    },
    {
      name: 'Авторассылки',
      materialIcon: 'filter_list',
      route: 'funnels'
    },
    {
      name: 'Аналитика',
      materialIcon: 'broken_image',
      route: 'analytics'
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
