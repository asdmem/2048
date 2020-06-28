import {
  Board,
  Direction,
  ReferenceBoard,
  ReferenceCell,
  Dimension,
} from "./common";
import { Renderable } from "./render";

export class Game {
  board: ReferenceBoard = new ReferenceBoard([
    [2, 2, 8, 4],
    [2, 0, 0, 0],
    [2, 2, 4, 0],
    [2, 2, 4, 0],
  ]);

  constructor(private renderable: Renderable) {
    this.render();

    const values = Object.values(Direction) as string[];

    document.addEventListener("keydown", (event) => {
      if (values.includes(event.code)) {
        this.move(event.code as Direction);
        this.render();
      }
    });
  }

  move(direction: Direction) {
    let changed = false;
    let array: ReferenceCell[] = [];

    for (let i = 0; i < Dimension; i++) {
      switch (direction) {
        case Direction.DOWN:
        case Direction.UP: {
          array = this.board.getColumn(i, direction === Direction.DOWN);

          this.mergeArray(array);

          break;
        }
        case Direction.LEFT:
        case Direction.RIGTH: {
          array = this.board.getRow(i, direction === Direction.RIGTH);

          this.mergeArray(array);

          break;
        }
      }
    }

    if (changed) {
      // this.board.fillRandomPosition();
    }
  }

  mergeArray(array: ReferenceCell[]) {
    shift(array);

    array.reduce((a, b) => {
      if (a.value === b.value && a.value !== 0) {
        a.value += b.value;
        b.value = 0;
      }

      return b;
    });

    shift(array);

    function shift(array: ReferenceCell[]) {
      const copy: number[] = [];

      array.forEach((refCell) => {
        if (refCell.value !== 0) {
          copy.push(refCell.value);

          refCell.value = 0;
        }
      });

      copy.forEach((cell, i) => (array[i].value = cell));
    }
  }

  render(): void {
    this.renderable.render(this.board.toBoard());
  }

  destroy() {}
}
