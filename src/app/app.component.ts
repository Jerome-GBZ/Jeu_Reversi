import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IaService } from './ia/ia.service';
import { DialogComponent } from './dialog/dialog.component';
import { Turn } from './reversi-game-engine/ReversiDefinitions';
import { ReversiGameEngineService } from './reversi-game-engine/reversi-game-engine.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  public monScore: number = 2;
  public ennemiScore: number = 2;
  public winner!: string;
  
  public etat: number = 0;
  public estBloquer: Turn[] = [];
  public status: boolean = false;


  constructor(public RGS: ReversiGameEngineService, 
              private ia: IaService, private dialog: MatDialog) {
    

    RGS.gameStateObs.subscribe( gs => {
        console.log("Un coup jouer !!!");
        this.updateScore();
        this.isFinish();
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
    });

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

  isFinish(): void {
    /* ----- Verif grille pleine ? ----- */
    let nbPionJouer: number = 0;
    let nbPiontTotal: number = this.RGS.board.length*this.RGS.board[0].length;
    this.RGS.board.map(row => row.map(elm => { if(elm !== 'Empty'){nbPionJouer++} }));
    console.log("nbPionJouer: "+nbPionJouer+" - nbPiontTotal: "+nbPiontTotal);

    if(this.RGS.whereCanPlay().length === 0) {
      if(this.RGS.turn !== this.estBloquer[0] && this.RGS.turn !== this.estBloquer[1]) {
        this.etat++;

        if(this.RGS.turn == "Player1")
          this.estBloquer[0] = this.RGS.turn;
        if(this.RGS.turn == "Player2")
          this.estBloquer[1] = this.RGS.turn;
      }
    } else {
      this.etat = 0;
      this.estBloquer = [];
    }

    console.log("etat: "+this.etat+" estBloquer: "+this.estBloquer+" turn: "+this.RGS.turn);
    

    if((nbPionJouer === nbPiontTotal || this.etat === 2) && this.status === false) {
        console.log("ALERT !! "+this.RGS.turn);
        this.status = true;
        
        /* ----- dialogue angular ----- */
        const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            meScore: this.monScore,
            enemyScore: this.ennemiScore,
          }
        });
    }
  }
}