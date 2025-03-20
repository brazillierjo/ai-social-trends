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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Trend {
  id: string;
  title: string;
  description: string;
  count: number;
}

const ITEMS_PER_PAGE = 5;

export function TrendSearch() {
  const [query, setQuery] = useState("");
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setCurrentPage(1);

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

  const totalPages = Math.ceil(trends.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTrends = trends.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          {currentTrends.map((trend) => (
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

        {trends.length > 0 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
