import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import * as fromApp from './store/app.reducer';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './auth/store/auth.effects';
import { AppRountingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { CustomSerializer } from './app.route-serializer';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RecipesEffects } from './recipes/store/recipes.effects';
import { AuthInterсeptorService } from './auth/auth-interсeptor.service';
import { ShoppingListEffects } from './shopping-list/store/shopping-list.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    // ng
    BrowserModule.withServerTransition({ 
      appId: 'serverApp' 
    }),
    HttpClientModule,
    // shared
    SharedModule,
    // routing
    AppRountingModule,
    // store
    StoreModule.forRoot(fromApp.appReducer),
    // effects
    EffectsModule.forRoot([
      AuthEffects, RecipesEffects, ShoppingListEffects
    ]),
    // ngrx router store
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    // ng animation
    BrowserAnimationsModule,
    // service worker
    ServiceWorkerModule.register('ngsw-worker.js', { 
      enabled: environment.production 
    })
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterсeptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
