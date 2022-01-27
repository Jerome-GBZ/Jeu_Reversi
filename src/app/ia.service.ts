import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { ReversiGameEngineService } from './reversi-game-engine.service';

@Injectable({
  providedIn: 'root'
})
export class IaService {

  constructor(private RGS: ReversiGameEngineService) {
    console.log("IA créée");
    RGS.gameStateObs.pipe(
      delay(1000)
    ).subscribe( gs => {
      const L = RGS.whereCanPlay();
    })
  }
}
