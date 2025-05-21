import { Music, Users, Radio, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LandingPage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-900/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-900/20 blur-3xl"></div>

          <div className="container relative z-10 flex flex-col items-center text-center">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Let Your Fans Choose What You <span className="text-purple-500">Stream</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-zinc-400">Connect with your fans like never before.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
              >
                Learn More
              </Button>
            </div>

            {/* Key Features */}
            <div className="mt-16 grid gap-8 md:grid-cols-3 w-full max-w-4xl">
              <div className="flex flex-col items-center p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
                <div className="h-12 w-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Fan Interaction</h3>
                <p className="mt-2 text-zinc-400">Let your audience vote on what songs to play next</p>
              </div>

              <div className="flex flex-col items-center p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
                <div className="h-12 w-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                  <Radio className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Live Interaction</h3>
                <p className="mt-2 text-zinc-400">Real-time engagement during your streaming sessions</p>
              </div>

              <div className="flex flex-col items-center p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
                <div className="h-12 w-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                  <Headphones className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">High Quality Audio</h3>
                <p className="mt-2 text-zinc-400">Crystal clear sound for the best listening experience</p>
              </div>
            </div>

            {/* Email Signup */}
            <div className="mt-16 w-full max-w-md">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="text-2xl font-bold mb-4">Ready to transform your streams?</h2>
                <p className="text-zinc-400 mb-6">Join thousands of creators connecting with their fans.</p>

                <form className="flex flex-col space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Join Now</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-800 py-6 bg-zinc-900">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Music className="h-5 w-5 text-purple-500" />
              <span className="font-bold">StreamConnect</span>
            </div>
            <p className="text-sm text-zinc-500">© {new Date().getFullYear()} StreamConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
