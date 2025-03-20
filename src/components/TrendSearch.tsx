"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { searchTrends } from "@/lib/twitter";

interface Trend {
  id: string;
  title: string;
  description: string;
  count: number;
}

export function TrendSearch() {
  const [query, setQuery] = useState("");
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);
  console.log(process.env.TWITTER_API_KEY);
  console.log(process.env.TWITTER_API_SECRET);
  console.log(process.env.TWITTER_ACCESS_TOKEN);
  console.log(process.env.TWITTER_ACCESS_TOKEN_SECRET);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchTrends(query);
      setTrends(results);
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la recherche. Veuillez réessayer."
      );
      console.error("Erreur de recherche:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rechercher des tendances</CardTitle>
        <CardDescription>
          Entrez un tag ou un nom d&apos;utilisateur pour découvrir les
          tendances associées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <Input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder="Entrez un tag ou un nom d'utilisateur..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Recherche..." : "Rechercher"}
          </Button>
        </form>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

        <div className="space-y-4">
          {trends.map((trend) => (
            <Card key={trend.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{trend.title}</h3>
                    <p className="text-sm text-gray-500">{trend.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {trend.count} mentions
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
