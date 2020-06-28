export const Dimension = 4;
export const WinValue = 64;

export enum Direction {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGTH = "ArrowRight",
}

export type Board = number[][];

export class ReferenceCell {
  constructor(public value: number = 2) {}
}

export class ReferenceBoard {
  private board: ReferenceCell[][] = [];

  constructor(board: Board) {
    board.forEach((row, i) => {
      this.board[i] = [];

      row.forEach((cell) => {
        this.board[i].push(new ReferenceCell(cell));
      });
    });
  }

  get(i: number, k: number): ReferenceCell {
    return this.board[i][k];
  }

  getRow(i: number, reverse = false): ReferenceCell[] {
    return reverse ? this.board[i].slice().reverse() : this.board[i];
  }

  getColumn(k: number, reverse = false): ReferenceCell[] {
    const column = [];

    for (let i = 0; i < this.board.length; i++) {
      column.push(this.board[i][k]);
    }

    return reverse ? column.slice().reverse() : column;
  }

  toBoard(): Board {
    const board: Board = [];

    this.board.forEach((row, i) => {
      board[i] = [];

      row.forEach((refCell) => board[i].push(refCell.value));
    });

    return board;
  }

  fillRandomPosition(value: number = 2) {
    while (true) {
      const i = Math.floor(Math.random() * Dimension);
      const k = Math.floor(Math.random() * Dimension);

      if (this.board[i][k].value === 0) {
        this.board[i][k].value = value;

        break;
      }
    }
  }
}
