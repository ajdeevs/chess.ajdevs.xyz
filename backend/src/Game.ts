import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAMES, MOVE } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private movecount = 0;
  private starttme: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.starttme = new Date();
    this.movecount = 0;

    this.player1.send(
      JSON.stringify({ type: INIT_GAMES, payload: { color: "white" } }),
    );
    this.player2.send(
      JSON.stringify({ type: INIT_GAMES, payload: { color: "black" } }),
    );
  }

  makeMove(socket: WebSocket, move: { from: "string"; to: "string" }) {
    console.log(move);
    if (this.movecount % 2 === 0 && socket !== this.player1) {
      console.log("not the right player");
      return;
    }
    if (this.movecount % 2 === 1 && socket !== this.player2) {
      console.log("not the right player");
      return;
    }

    try {
      this.board.move(move);
      this.movecount++;
    } catch (e) {
      console.log(e);
      return;
    }

    if (this.board.isGameOver()) {
      //
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() == "w" ? "black" : "white",
          },
        }),
      );
      this.player2.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() == "w" ? "black" : "white",
          },
        }),
      );

      return;
    }

    if (this.movecount % 2 === 0) {
      this.player1.send(JSON.stringify({ type: MOVE, payload: move }));
    } else {
      this.player2.send(JSON.stringify({ type: MOVE, payload: move }));
    }
    //push the move
    //send the update to the other player
  }
}
