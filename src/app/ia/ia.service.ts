import { Injectable } from '@angular/core';
import { delay, filter } from 'rxjs';
import { ReversiGameEngineService } from '../reversi-game-engine/reversi-game-engine.service';

@Injectable({
  providedIn: 'root'
})
export class IaService {

  constructor(private RGS: ReversiGameEngineService) {
    console.log("IA créée");
    this.RGS.gameStateObs
    .pipe(
      delay(1000),
      filter(game => game.turn === 'Player2')
    ).subscribe( gs => {
      if(this.RGS.whereCanPlay().length > 0 && gs.turn === 'Player2') {     
        const L = this.RGS.whereCanPlay();
        this.RGS.play(L[0][0],L[0][1]);
      }
    })  
  }

  getNBPionJouer(): number {
    let nbPionJouer = 0;
    this.RGS.board.map(row => row.map(elm => { if(elm !== 'Empty'){nbPionJouer++} }));
    return nbPionJouer;
  }
}
