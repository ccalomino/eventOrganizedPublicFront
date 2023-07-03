import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VinoComponent } from './vino/vino.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PlatoComponent } from './plato/plato.component';
import { MaridajeComponent } from './maridaje/maridaje.component';
import { PopupComponent } from './popup/popup.component';

import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';

import { BackendService } from './backend-service/backend-service.component';



@NgModule({
  declarations: [
    AppComponent,
    VinoComponent,
    PlatoComponent,
    MaridajeComponent,
    PopupComponent,
    BackendService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
