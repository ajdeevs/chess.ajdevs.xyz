import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

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
              <Button onClick={() => router("/game")}>Play Online</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
