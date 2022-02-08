import { TestBed } from '@angular/core/testing';

import { ReversiGameEngineService } from './reversi-game-engine.service';
import { Board, Board_RO, C, getEmptyBoard, L, R, TileCoords, Turn } from './ReversiDefinitions';

function charToTurn(c: string): Turn {
  return c === 'X' ? 'Player1' : 'Player2';
}

function chatToC(c: string): C {
  return c === '.' ? 'Empty' : charToTurn(c);
}

function stringToBoard(str: string): Board {
  return str.trim().split("\n").map(
      s => s.trim().split('').map( chatToC ) as L
  ) as Board;
}

function cToString(c: C): string {
	switch(c) {
		case 'Empty':   return ".";
		case 'Player1': return "X";
		case 'Player2': return "O";
	}
}

function LtoString(L: R): string {
	return L.reduce((acc, c) => `${acc}${cToString(c)}`, '');
}

function BoardtoString(b: Board_RO): string {
	return b.map( LtoString ).join("\n");
}


describe('ReversiGameEngineService', () => {
  let service: ReversiGameEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReversiGameEngineService);
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it("L'attribut board est bien définit lors de la création du service", () => {
    expect(service.board).toBeDefined();
  });

  it("Le plateau devrait contenir 8 lignes et 8 colonnes au départ", () => {
    expect(service.board).toBeDefined();
    expect(service.board.length).withContext(`Le plateau devrait contenir 8 lignes et pas ${service.board.length}`).toEqual(8);
    service.board.forEach(
      (l, i) => expect(l.length).withContext(`La ligne ${i} devrait contenir 8 colonnes et pas ${l.length}`).toEqual(8)
    );
  });

  it("Le plateau devrait être dans un état initial correct", () => {
    expect(service.board).toBeDefined();
    const BOK: Board_RO = placeToken( getEmptyBoard(), [[3,4], [4,3]], [[3,3], [4,4]]);
    const L = differencesBoards(BOK, service.board);
    L.forEach( ([i, j]) => {
        fail(`[${i},${j}] devrait valoir ${BOK[i][j]} au lieu de ${service.board[i]?.[j]}`);
    });
  });

  it("On teste les possibilités de jeu initiale (devrait être <2,3>, <3,5>, <4,2> et <5,3>)", () => {
    const L = [[2,3], [3,2], [4,5], [5,4]];
    L.forEach(
      ([x, y]) => expect( service.PionsTakenIfPlayAt(x, y).length ).withContext(`${x},${y} devrait faire parti de la liste des coups possibles`).toBeGreaterThan(0)
    );
    service.board.forEach( (line, i) => line.forEach( (_, j) => {
      if (!L.find( ([x, y]) => x === i && y === j)) {
        expect( service.PionsTakenIfPlayAt(i, j).length ).withContext(`${i},${j} ne devrait PAS faire parti de la liste des coups possibles`).toEqual(0)
      }
    }))
  });

  it(`On teste une situation S1 (voir console)`, () => {
    const board = stringToBoard( `........
                            ........
                            ....XXX.
                            X..XO...
                            .XOOOO..
                            ..X.O...
                            .X.O....
                            ........`);
    const turn = charToTurn('O');

    console.log(`------ Situation S1:\n${BoardtoString(board)}`);
    service.restart({board, turn});
    const L = service.whereCanPlay();
    expect(L.length).withContext(`Il devrait y avoir 9 coups possibles et pas ${L.length}`).toEqual(9);
    const LOK = [ [1,4], [1,5], [1,6], [2,2], [2,3], [3,2], [4,0], [6,2], [7,0] ];
    LOK.forEach( ([x,y]) => {
        expect(L.find( c => c[0] === x && c[1] === y)).withContext(`[${x},${y}] devrait faire parti de la liste des coups possibles`).toBeDefined();
    });
    L.forEach( ([x,y]) => {
        expect(LOK.find( c => c[0] === x && c[1] === y)).withContext(`[${x},${y}] ne devrait PAS faire parti de la liste des coups possibles`).toBeDefined();
    });
  });

  it(`On teste une situation S2 (voir console)`, () => {
    const board = stringToBoard( `.O...O..
                            .O..O...
                            .O.O....
                            OOO.....
                            OXOOOOOO
                            OOO.O...
                            .O.O....
                            .O..O...`);
    const turn = charToTurn('X');
    service.restart({board, turn});
    console.log(`------ Situation S2:\n${BoardtoString(board)}`);
    const L = service.whereCanPlay();
    expect(L.length).withContext(`Il devrait y avoir 0 coups possibles et pas ${L.length}`).toEqual(0);
  });

  it(`On teste une situation S3 (voir console)`, () => {
    const board = stringToBoard( `........
                            ...X..X.
                            .X.X.X..
                            ..XXX...
                            .XXOXXX.
                            ..XXX...
                            .X.X.X..
                            ........`);
    const turn = charToTurn('O');
    console.log(`------ Situation S3:\n${BoardtoString(board)}`);
    service.restart({board, turn});
    const L = service.whereCanPlay();
    expect(L.length).withContext(`Il devrait y avoir 8 coups possibles et pas ${L.length}`).toEqual(8);
    const LOK = [ [0,3], [0,7], [1,0], [4,0], [4,7], [7,0], [7,3], [7,6] ];
    LOK.forEach( ([x,y]) => {
        expect(L.find( c => c[0] === x && c[1] === y)).withContext(`[${x},${y}] devrait faire parti de la liste des coups possibles`).toBeDefined();
    });
    L.forEach( ([x,y]) => {
        expect(LOK.find( c => c[0] === x && c[1] === y)).withContext(`[${x},${y}] ne devrait PAS faire parti de la liste des coups possibles`).toBeDefined();
    });
  });

  it(`On teste une situation S4 (voir console)`, () => {
    const board = stringToBoard( `........
                            ........
                            ........
                            ........
                            ..OXXX..
                            ........
                            ........
                            ........`);
    const turn = charToTurn('O');
    console.log(`------ Situation S4:\n${BoardtoString(board)}`);
    service.restart({board, turn});

    const L = service.whereCanPlay();
    expect(L.length).withContext(`Il devrait y avoir 1 coups possibles et pas ${L.length}`).toEqual(1);
    const LOK = [ [4,6] ];
    LOK.forEach( ([x,y]) => {
        expect(L.find( c => c[0] === x && c[1] === y)).withContext(`[${x},${y}] devrait faire parti de la liste des coups possibles`).toBeDefined();
    });
    L.forEach( ([x,y]) => {
        expect(LOK.find( c => c[0] === x && c[1] === y)).withContext(`[${x},${y}] ne devrait PAS faire parti de la liste des coups possibles`).toBeDefined();
    });
  });

  it('On teste une partie P1 (voir console)', () => {
    const P1: Board[] = [
       `........
        ........
        ........
        ........
        ..OXXX.X
        ........
        ........
        ........`, `........
                    ........
                    ........
                    ........
                    ..OOOOOX
                    ........
                    ........
                    ........`,
       `........
        ........
        ........
        ........
        .XXXXXXX
        ........
        ........
        ........`
    ].map<Board>( stringToBoard );

    service.restart({board: P1[0], turn: 'Player2'});
    console.log( `---------- P1, step 0:\n${P1[0]}`);
    service.play(4,6);
    console.log( `---------- P1, step 1, after O plays at [4,6]:\n${BoardtoString(service.board)}`);
    expect(service.turn).withContext("After O playing at [4,6], now it is X turn").toEqual('Player1');
    expect(differencesBoards(service.board, P1[1]).length).withContext(`step 1 : Board should be in another state`).toEqual(0);
    service.play(4,1);
    console.log( `---------- P1, step 2, afer X plays at [4,1]:\n${BoardtoString(service.board)}`);
    expect(differencesBoards(service.board, P1[2]).length).withContext(`step 2 : Board should be in another state`).toEqual(0);
    expect(service.turn).withContext("After X playing at [4,1], it is still X turn cause O cannot play").toEqual('Player1');
    expect(service.whereCanPlay().length).withContext("End of game, X should not be able to play").toEqual(0);
  });

}); // Fin describe


/**
 * Fonctions utilitaires
 */
 function placeToken(b: Board, p1: TileCoords[] = [], p2: TileCoords[] = []): Board {
  p1.forEach( ([x, y]) => b[x][y] = 'Player1' );
  p2.forEach( ([x, y]) => b[x][y] = 'Player2' );
  return b;
}

function differencesBoards(bok: Board_RO, b: Board_RO): TileCoords[] {
  const L: TileCoords[] = [];
  bok.forEach( (l, i) => l.forEach( (c, j) => {
      if (c !== b?.[i]?.[j]) {
          L.push( [i, j] );
      }
  } ) );
  return L;
}
