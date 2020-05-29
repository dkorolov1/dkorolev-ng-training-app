import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.mdule';
import { AppRountingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AuthInterсeptorService } from './shared/services/auth-interсeptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    // ng
    BrowserModule,
    HttpClientModule,
    // shared
    SharedModule,
    // routing
    AppRountingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterсeptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
