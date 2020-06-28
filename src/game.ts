import {
  Board,
  Direction,
  ReferenceBoard,
  ReferenceCell,
  Dimension,
} from "./common";
import { Renderable } from "./render";
import { WinValue } from "./common";

export class Game {
  board: ReferenceBoard = new ReferenceBoard([
    [2, 4, 8, 16],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  constructor(private renderable: Renderable, private window: Window) {
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

          changed = this.mergeArray(array) || changed;

          break;
        }
        case Direction.LEFT:
        case Direction.RIGTH: {
          array = this.board.getRow(i, direction === Direction.RIGTH);

          changed = this.mergeArray(array) || changed;

          break;
        }
      }
    }

    if (changed) {
      this.board.fillRandomPosition();
    }
  }

  mergeArray(array: ReferenceCell[]): boolean {
    let arrayChanged = false;

    shift(array);

    array.reduce((a, b) => {
      if (a.value === b.value && a.value !== 0) {
        a.value += b.value;
        b.value = 0;

        if (a.value === WinValue) {
          this.win();
        }

        arrayChanged = true;
      }

      return b;
    });

    shift(array);

    return arrayChanged;

    function shift(array: ReferenceCell[]) {
      const copy: number[] = [];

      array.forEach((refCell) => {
        if (refCell.value !== 0) {
          copy.push(refCell.value);

          refCell.value = 0;
        }
      });

      if (copy.length > 0) {
        arrayChanged = true;
      }

      copy.forEach((cell, i) => (array[i].value = cell));
    }
  }

  win() {
    this.window.queueMicrotask(() => window.alert("YOU WON!!!"));
  }

  lose() {
    this.window.queueMicrotask(() => window.alert("YOU LOSE!!!"));
  }

  render(): void {
    this.renderable.render(this.board.toBoard());
  }

  destroy() {}
}
