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
    <div className="text-black select-none rounded-lg overflow-hidden">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const sqRep = (String.fromCharCode(97 + j) + (8 - i)) as Square;
            const isSelected = from === sqRep;
            const isLight = (i + j) % 2 === 0;
            const bgColor = isSelected
              ? "bg-yellow-400"
              : isLight
                ? "bg-green-500"
                : "bg-green-300";

            return (
              <div
                key={j}
                onClick={() => {
                  if (!from) {
                    setFrom(sqRep);
                  } else {
                    const move = { from, to: sqRep };
                    const result = chess.move(move);
                    if (result) {
                      socket.send(
                        JSON.stringify({
                          type: "move",
                          payload: move,
                        }),
                      );
                      setBoard(chess.board());
                    }
                    setFrom(null);
                  }
                }}
                className={`w-16 h-16 ${bgColor} flex items-center justify-center cursor-pointer`}
              >
                {square ? (
                  <img
                    src={`/pieces/${square.color}${square.type.toUpperCase()}.svg`}
                    alt={`${square.color}${square.type}`}
                    className="w-10 h-10 pointer-events-none"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
