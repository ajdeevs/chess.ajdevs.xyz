import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-12">
      <section className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Play Chess Online
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-6">
            Challenge friends or compete with random opponents in real-time.
            Simple. Fast. Free.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/game")}>Play Now</Button>
            <Button onClick={() => navigate("/about")} outlined>
              Learn More
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/chessboard.jpeg"
            alt="Chess Game"
            className="rounded-2xl shadow-2xl w-full max-w-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Features */}
      <section className="mt-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="♟️"
            title="Real-Time Gameplay"
            description="Experience smooth and fast multiplayer matches."
          />
          <FeatureCard
            icon="🧠"
            title="AI Practice"
            description="Train with various AI levels to sharpen your skills."
          />
          <FeatureCard
            icon="🌐"
            title="Global Leaderboard"
            description="Compete globally and climb the rankings."
          />
          <FeatureCard
            icon="💬"
            title="Live Chat"
            description="Communicate with your opponents during the game."
          />
          <FeatureCard
            icon="🎨"
            title="Custom Themes"
            description="Switch between board and piece styles to your liking."
          />
          <FeatureCard
            icon="📱"
            title="Mobile Ready"
            description="Play on any device with a responsive layout."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="bg-[#1e293b] rounded-xl p-6 shadow hover:shadow-lg transition">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-slate-300">{description}</p>
  </div>
);

export default Landing;
