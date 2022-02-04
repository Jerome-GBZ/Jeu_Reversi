import { Component } from '@angular/core';
import { IaService } from './ia.service';
import { ReversiGameEngineService } from './reversi-game-engine.service';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  public monScore = 2;
  public ennemiScore = 2;

  constructor(public RGS: ReversiGameEngineService, private ia: IaService) {
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

  isPlayable(): boolean[][] {
    let playableInput: boolean[][] = new Array<boolean[]>(this.RGS.board.length);
    for(let i = 0; i< this.RGS.board.length; i++){
      playableInput[i] = new Array(this.RGS.board.length).fill(false);
    }
    
    // On met true au endroit jouable
    this.RGS.whereCanPlay().forEach(([x,y]) => {
      playableInput[x][y] = true;
      console.log(x+" "+y);
    });

    console.log(playableInput);
    return playableInput;
  }

  updateScore(): void {
    this.monScore = 0;
    this.ennemiScore = 0;

    for(let i=0; i<this.RGS.board.length; i++){
      for(let j=0; j<this.RGS.board.length; j++) {
        if(this.RGS.board[i][j] === "Player1"){
          this.monScore++;
        } else if(this.RGS.board[i][j] === "Player2"){
          this.ennemiScore++;
        }
      }
    }
  }
}
