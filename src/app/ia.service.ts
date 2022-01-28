import { Injectable } from '@angular/core';
import { delay, filter } from 'rxjs';
import { ReversiGameEngineService } from './reversi-game-engine.service';

@Injectable({
  providedIn: 'root'
})
export class IaService {

  constructor(private RGS: ReversiGameEngineService) {
    console.log("IA créée");
    RGS.gameStateObs
    .pipe(
      delay(1000),
      filter(game => game.turn === 'Player2')
    ).subscribe( gs => {
      const L = this.RGS.whereCanPlay();
      this.RGS.play(L[0][0],L[0][1]);
    })
  }
}
