import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [asciiBoard, setAsciiBoard] = useState(chess.board());
  const [status, setStatus] = useState("Waiting to start...");
  const [started, setStarted] = useState(false);

  const INIT_GAME = "init_games";
  const MOVE = "move";
  const GAME_OVER = "game_over";

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          console.log("init game");
          setAsciiBoard(chess.board());
          setStatus("Game started!");
          setStarted(true);
          break;

        case MOVE:
          const move = message.payload;
          console.log(move);
          chess.move(move);
          setAsciiBoard(chess.board());
          setStatus("Opponent moved");
          break;

        case GAME_OVER:
          setStatus("Game Over!");
          break;
      }
    };
  }, [socket]);

  if (!socket) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
        <Navbar />
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium animate-pulse">
            Connecting to game server...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chessboard */}
          <div className="md:col-span-2 flex justify-center items-center">
            <div className="w-full max-w-[500px]">
              <ChessBoard
                chess={chess}
                setBoard={setAsciiBoard}
                board={asciiBoard}
                socket={socket}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Game Info</h2>
              <p className="text-slate-300 mb-6">{status}</p>
              {!started && (
                <Button
                  onClick={() => {
                    // setChess(new Chess());
                    setAsciiBoard(chess.board());
                    socket.send(JSON.stringify({ type: INIT_GAME }));
                  }}
                >
                  Start New Game
                </Button>
              )}
            </div>

            <div className="mt-8 border-t border-slate-600 pt-4">
              <h3 className="text-lg font-medium mb-2">Tips:</h3>
              <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                <li>Click on a piece to move</li>
                <li>Legal moves are validated</li>
                <li>Wait for your opponent's turn</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Game;
