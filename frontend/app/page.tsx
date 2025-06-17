import { Header } from "./components/AppBar";
import { LandingPage } from "./components/LandingPage";

export default function Home() {
  console.log("google client id", process.env.GOOGLE_CLIENT_ID);
  console.log("google client secret", process.env.GOOGLE_CLIENT_SECRET);
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <Header />
      <LandingPage />
    </div>
  );
}
