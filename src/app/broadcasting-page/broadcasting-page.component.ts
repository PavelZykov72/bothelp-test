import { Component } from '@angular/core';
import { MenuItem } from '../shared/interfaces';

@Component({
  selector: 'app-broadcasting-page',
  templateUrl: './broadcasting-page.component.html',
  styleUrls: [ './broadcasting-page.component.scss' ]
})
export class BroadcastingPageComponent {
  public menuItems: Array<MenuItem> = [
    {
      name: 'Отправлены',
      route: [ '/broadcasting', 'send' ]
    },
    {
      name: 'Черновики',
      route: [ '/broadcasting', 'drafts' ]
    },
    {
      name: 'Запланированы',
      route: [ '/broadcasting', 'planned' ]
    }
  ];
}
