import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { DialogComponent } from './dialog/dialog.component';
import { PlateauComponent } from './plateau/plateau.component';

/**
 * NgModule that includes all Material modules that are required to serve
 * the Plunker.
 */
@NgModule({
  exports: [MatButtonModule, MatDialogModule],
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent, PlateauComponent, ScoreComponent, DialogComponent],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
