import { TrendSearch } from "@/components/TrendSearch";
import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">AI Social Trends</h1>

        <div className="w-full max-w-2xl space-y-8">
          <TrendSearch />
          <Chat />
        </div>
      </div>
    </main>
  );
}
