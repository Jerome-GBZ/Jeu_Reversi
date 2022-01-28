import { Component } from '@angular/core';
import { IaService } from './ia.service';
import { ReversiGameEngineService } from './reversi-game-engine.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  public ennemi = "Player2";
  public me = "Player1";
  public monScore = 2;
  public ennemiScore = 2;

  constructor(public RGS: ReversiGameEngineService, private ia: IaService) {
    // this.RGS.gameStateObs

    RGS.gameStateObs.subscribe( gs => {
        console.log("Un coup jouer !!!");
        this.updateScore();
    });
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


  updateScore(): void {
      this.monScore = 0;
      this.ennemiScore = 0;

      for(let i=0; i<this.RGS.board.length; i++){
          for(let j=0; j<this.RGS.board.length; j++) {
              if(this.RGS.board[i][j] === this.me){
                this.monScore++;
              }else if(this.RGS.board[i][j] === "Player2"){
                this.ennemiScore++;
              }
          }
      }
  }
}
