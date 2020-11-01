import { Component, Input } from '@angular/core';
import { MenuItem } from '../../interfaces';

@Component({
  selector: 'app-main-leftbar',
  templateUrl: './main-leftbar.component.html',
  styleUrls: [ './main-leftbar.component.scss' ]
})
export class MainLeftbarComponent {
  @Input() title: string;
  @Input() menuItems: Array<MenuItem>;
}
