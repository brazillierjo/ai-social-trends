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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // TODO: Implémenter l&apos;appel à l&apos;API Twitter
    // Pour l&apos;instant, on simule des données
    setTimeout(() => {
      setTrends([
        {
          id: "1",
          title: "#ExampleTrend",
          description: "Une tendance d&apos;exemple",
          count: 1000,
        },
        {
          id: "2",
          title: "@ExampleUser",
          description: "Un utilisateur populaire",
          count: 500,
        },
      ]);
      setIsLoading(false);
    }, 1000);
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
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Recherche..." : "Rechercher"}
          </Button>
        </form>

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
