import { Portfolio } from "../components/portfolio";
import AIGridBackground from "../components/AIGridBackground";

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen">
      <AIGridBackground position="fixed" className="z-0" />

      <div className="relative z-10">
        <Portfolio />
      </div>
    </main>
  );
}
