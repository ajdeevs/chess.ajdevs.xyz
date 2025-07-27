import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [asciiBoard, setAsciiBoard] = useState(chess.board());

  const INIT_GAME = "init_games";
  const MOVE = "move";
  const GAME_OVER = "game_over";

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case INIT_GAME:
          const newGame = new Chess();
          setChess(newGame);
          setAsciiBoard(newGame.board());
          console.log("init game");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          console.log("move");
          break;
        case GAME_OVER:
          console.log("game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Loading...</div>;

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg flex w-full">
        <div className="grid grid-cols-6 gap-4 w-full justify-center">
          <div className="col-span-4 w-full">
            <ChessBoard
              chess={chess}
              setBoard={setAsciiBoard}
              board={asciiBoard}
              socket={socket}
            />
          </div>
          <div className="col-span-2">
            <Button
              onClick={() => {
                socket.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  }),
                );
              }}
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
