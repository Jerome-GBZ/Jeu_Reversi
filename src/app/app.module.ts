import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlateauComponent } from './plateau/plateau.component';
import { ScoreComponent } from './score/score.component';

@NgModule({
  declarations: [ AppComponent, PlateauComponent, ScoreComponent ],
  imports: [ BrowserModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
