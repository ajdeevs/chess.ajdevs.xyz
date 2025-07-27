import ChessBoard from "../components/ChessBoard";

const Game = () => {
  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg flex">
        <div className="grid grid-cols-6 gap-4 ">
          <div className="col-span-4">
            <ChessBoard />
          </div>
          <div className="col-span-2">
            <button>Play</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
