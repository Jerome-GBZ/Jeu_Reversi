import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Board_RO, getEmptyBoard, Turn } from '../reversi-game-engine/ReversiDefinitions';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlateauComponent implements OnInit {
  @Input() board: Board_RO;
  @Input() turn: Turn;
  @Input() playable: boolean[][];

  @Output() play:EventEmitter<[number, number]>;

  public ennemi = "Player2";
  public me = "Player1";

  constructor() {
    this.board = getEmptyBoard();
    this.turn = 'Player1';
    this.playable = new Array<boolean[]>(this.board.length);
    for(let i = 0; i< 8; i++){
      this.playable[i] = new Array(this.board.length).fill(false);
    }

    this.play = new EventEmitter<[number, number]>();
  }

  Play(i: number, j: number) {
    this.play.emit([i,j]);
  }

  onClick(i: number, j:number){
    console.log("Prediction clicked.");
    this.Play(i,j);
  }

  ngOnInit(): void { }
}
