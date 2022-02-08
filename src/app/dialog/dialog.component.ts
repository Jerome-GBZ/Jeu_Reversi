import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReversiGameEngineService } from '../reversi-game-engine/reversi-game-engine.service'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  message: string = 'Votre partie est terminé';
  cancelButtonText: string = 'Retour';
  validButtonText: string = 'Recommencer';
  meScore: number = 2;
  enemyScore: number = 2;
  messageWinner: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    public RGS: ReversiGameEngineService
  ) {
    if (data) {
      this.meScore = data.meScore;
      this.enemyScore = data.enemyScore;

      if(this.meScore > this.enemyScore)
        this.messageWinner = "Le joueur 'Player1' à gagner.";
      else if(this.meScore < this.enemyScore) 
      this.messageWinner = "Le joueur 'Player2' à gagner.";
      else
        this.messageWinner = "Egalité ! Il n'y a pas de gagnant";
    }
    this.dialogRef.updateSize('300vw', '300vw');
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    console.log('BTN YES');

    this.RGS.restart();
  }
}
