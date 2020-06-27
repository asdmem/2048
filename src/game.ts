import { Board } from './common';
import { Renderable } from './render';


const enum Direction {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGTH = "ArrowRight",
}

type ReferenceCell = {
  cell: number;
};

export class Game {
  board: Board = [
    [0, 2, 8],
    [0, 0, 0],
    [0, 2, 4],
  ];

  constructor(private renderable: Renderable) {
    this.board[2][0] = 2;

    this.render();

    document.addEventListener("keydown", (event) => {
      if (event.code === Direction.LEFT) {
        this.move();
        this.render();
      }
    });
  }

  move() {
    for (let i = 0; i < 3; i++) {
      let currentIndex = 0;
      let nextIndex = 1;

      while (nextIndex <= 2) {
        if (this.get(i, currentIndex) === this.get(i, nextIndex)) {
          this.board[i][currentIndex] *= 2;
          this.board[i][nextIndex] = 0;

          nextIndex++;
        } else if (this.get(i, currentIndex) === 0) {
					this.board[i][currentIndex] = this.board[i][nextIndex];
					this.board[i][nextIndex] = 0

					currentIndex++;
          nextIndex++;
        } else {
          currentIndex++;
          nextIndex++;
        }
      }
    }
  }

  get(i: number, k: number) {
    return this.board[i][k];
  }

  render(): void {
    this.renderable.render(this.board);
  }

  destroy() {}
}

