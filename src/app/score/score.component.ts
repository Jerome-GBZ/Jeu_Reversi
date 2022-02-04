import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent implements OnInit {
  @Input() monScore: number;
  @Input() ennemiScore: number;

  constructor() { 
    this.monScore = 2;
    this.ennemiScore = 2;
  }

  ngOnInit(): void { }
}
