import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const ChessBoard = ({
  setBoard,
  socket,
  chess,
  board,
  playerColor,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
  playerColor: "w" | "b";
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);

  const handleClick = (
    sqRep: Square,
    squareData: { type: PieceSymbol; color: Color } | null,
  ) => {
    if (!from) {
      if (!squareData || squareData.color !== playerColor) return;
      setFrom(sqRep);

      // Get legal moves from selected piece
      const moves = chess.moves({ square: sqRep, verbose: true });
      //@ts-ignore
      setLegalMoves(moves.map((m) => m.to));
    } else {
      if (sqRep === from) {
        setFrom(null);
        setLegalMoves([]);
        return;
      }

      const move = { from, to: sqRep };
      const result = chess.move(move);

      if (result) {
        socket.send(JSON.stringify({ type: "move", payload: move }));
        setBoard(chess.board());
      }

      setFrom(null);
      setLegalMoves([]);
    }
  };

  const displayedRows = playerColor === "b" ? [...board].reverse() : board;

  return (
    <div className="text-black select-none rounded-lg overflow-hidden">
      {displayedRows.map((row, i) => {
        const displayedCols = playerColor === "b" ? [...row].reverse() : row;

        return (
          <div key={i} className="flex">
            {displayedCols.map((square, j) => {
              const actualRow = playerColor === "b" ? 7 - i : i;
              const actualCol = playerColor === "b" ? 7 - j : j;
              const sqRep = (String.fromCharCode(97 + actualCol) +
                (8 - actualRow)) as Square;

              const isSelected = from === sqRep;
              const isLegal = legalMoves.includes(sqRep);
              const isLight = (actualRow + actualCol) % 2 === 0;

              const baseColor = isSelected
                ? "bg-yellow-400"
                : isLight
                  ? "bg-green-500"
                  : "bg-green-300";

              return (
                <div
                  key={j}
                  onClick={() => handleClick(sqRep, square)}
                  className={`w-16 h-16 ${baseColor} relative flex items-center justify-center cursor-pointer`}
                >
                  {square ? (
                    <img
                      src={`/pieces/${square.color}${square.type.toUpperCase()}.svg`}
                      alt={`${square.color}${square.type}`}
                      className="w-10 h-10 pointer-events-none"
                    />
                  ) : null}

                  {/* Legal move indicator */}
                  {isLegal && !square && (
                    <div className="w-4 h-4 rounded-full bg-black/50" />
                  )}
                  {isLegal && square && (
                    <div className="absolute inset-0 ring-4 ring-yellow-300/70 rounded-md pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
