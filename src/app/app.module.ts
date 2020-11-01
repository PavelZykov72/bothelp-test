import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Modules
import { AppMaterialModule } from './shared/modules/app-material.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';

// Pages
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { BroadcastingPageComponent } from './broadcasting-page/broadcasting-page.component';
import { MainLeftbarComponent } from './shared/components/main-leftbar/main-leftbar.component';
import { BroadcastingSendPageComponent } from './broadcasting-page/broadcasting-page-send/broadcasting-page-send.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { BroadcastingCreatePageComponent } from './broadcasting-page/broadcasting-page-create/broadcasting-page-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NotFoundPageComponent,
    BroadcastingPageComponent,
    MainLeftbarComponent,
    BroadcastingSendPageComponent,
    MainHeaderComponent,
    DashboardPageComponent,
    BroadcastingCreatePageComponent,
    MainFooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
