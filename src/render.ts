import { Board } from './common';

export class Renderable {
  htmlCells: HTMLElement[] = [];

  constructor(document: Document) {
    this.htmlCells = Array.from(document.querySelectorAll(".cell"));
  }

  render(board: Board): void {
    board.forEach((row, i) => {
      row.forEach((cell, k) => {
        this.htmlCells[i * 3 + k].textContent =
          cell === 0 ? "" : cell.toString();
      });
    });
  }
}
