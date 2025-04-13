import Image from "next/image";
import { AppBar } from "./components/AppBar";

export default function Home() {
  console.log("google client id", process.env.GOOGLE_CLIENT_ID);
  console.log("google client secret", process.env.GOOGLE_CLIENT_SECRET);
  return (
    <div>
      <AppBar/>
    </div>
  );
}
