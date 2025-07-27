import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const ChessBoard = ({
  setBoard,
  socket,
  chess,
  board,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
}) => {
  const [from, setFrom] = useState<Square | null>(null);

  return (
    <div
      className="text-black select-none"
      style={{ fontFamily: '"Noto Sans Symbols", sans-serif' }}
    >
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const sqRep = (String.fromCharCode(97 + j) + (8 - i)) as Square; // "a1" to "h8"

            const isSelected = from === sqRep;

            return (
              <div
                key={j}
                onClick={() => {
                  if (!from) {
                    console.log("Selecting from:", sqRep);
                    setFrom(sqRep);
                  } else {
                    const move = { from: from, to: sqRep };

                    console.log("Sending move:", move);
                    socket.send(
                      JSON.stringify({
                        type: "move",
                        payload: move,
                      }),
                    );
                    setFrom(null);
                    chess.move(move);
                    setBoard(chess.board());
                  }
                }}
                className={`w-16 h-16 flex items-center justify-center text-xl font-bold cursor-pointer border border-black ${
                  isSelected
                    ? "bg-yellow-400"
                    : (i + j) % 2 === 0
                      ? "bg-green-500"
                      : "bg-green-300"
                }`}
              >
                {square ? square.type : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Optional: display pieces as Unicode symbols
const getPieceUnicode = (type: PieceSymbol, color: Color) => {
  const unicodeMap: Record<PieceSymbol, { w: string; b: string }> = {
    p: { w: "♙", b: "♟︎" },
    r: { w: "♖", b: "♜" },
    n: { w: "♘", b: "♞" },
    b: { w: "♗", b: "♝" },
    q: { w: "♕", b: "♛" },
    k: { w: "♔", b: "♚" },
  };

  return unicodeMap[type][color];
};

export default ChessBoard;
