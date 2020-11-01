import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

// Pages
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { BroadcastingPageComponent } from './broadcasting-page/broadcasting-page.component';
import { BroadcastingSendPageComponent } from './broadcasting-page/broadcasting-page-send/broadcasting-page-send.component';
import { BroadcastingCreatePageComponent } from './broadcasting-page/broadcasting-page-create/broadcasting-page-create.component';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      {
        path: 'broadcasting',
        component: BroadcastingPageComponent,
        children: [
          { path: '', redirectTo: '/broadcasting/send', pathMatch: 'full' },
          { path: 'send', component: BroadcastingSendPageComponent },
          { path: 'send/create', component: BroadcastingCreatePageComponent }
        ]
      },
      { path: '404', component: NotFoundPageComponent },
      { path: '**', redirectTo: '404' },

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
