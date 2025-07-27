import { useNavigate } from "react-router-dom";

const Landing = () => {
  const router = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="mt-2 max-w-screen-md">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex justify-center">
            <img src={"/chessboard.jpeg"} className="max-w-96" />
          </div>
          <div className="pt-16">
            <h1 className="text-4xl font-bold text-white">Chess</h1>
            <p className="text-lg mt-2 text-white">
              Play chess with your friends
            </p>
            <div>
              <button
                onClick={() => {
                  router("/game");
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-2 px-4 rounded"
              >
                Play Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
