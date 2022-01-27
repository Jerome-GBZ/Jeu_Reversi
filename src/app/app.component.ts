import { Component } from '@angular/core';
import { IaService } from './ia.service';
import { ReversiGameEngineService } from './reversi-game-engine.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public ennemi = "Player2";
  public me = "Player1";
  constructor(public RGS: ReversiGameEngineService, private ia: IaService) {
  }




  /**
   * Retourne en booléen en fonction de si la case est jouable ou non
   * @param i 
   * @param j 
   * @returns 
   */
  checkIfIsWherePositionICanPlay(i: number, j: number): boolean{
    
    
    let isPossible = false;
    let coordonneePosibles = this.RGS.whereCanPlay();
    let count = 0;
    while(count < coordonneePosibles.length && !isPossible){
      if(coordonneePosibles[count][0]==i && coordonneePosibles[count][1]==j){
        isPossible = true;
      }
      count++;
    }

    return isPossible;
  }


  onPredictionClick(i: number, j:number){
    console.log("Prediction clicked.");
    this.RGS.play(i,j);
    
  }
}


