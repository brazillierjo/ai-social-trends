interface TwitterTrend {
  id: string;
  title: string;
  description: string;
  count: number;
}

interface TwitterTweet {
  id: string;
  text: string;
  author_id: string;
  public_metrics?: {
    retweet_count: number;
  };
}

interface TwitterError {
  error: string;
  details?: Record<string, unknown>;
}

export async function searchTrends(query: string): Promise<TwitterTrend[]> {
  try {
    const response = await fetch(
      `/api/twitter?query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    if (!response.ok) {
      const error = data as TwitterError;
      throw new Error(
        error.error || "Erreur lors de la recherche des tendances"
      );
    }

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Format de réponse invalide");
    }

    return data.data.map((tweet: TwitterTweet) => ({
      id: tweet.id,
      title: query.startsWith("@") ? `@${tweet.author_id}` : `#${query}`,
      description: tweet.text,
      count: tweet.public_metrics?.retweet_count || 0,
    }));
  } catch (error) {
    console.error("Erreur Twitter API:", error);
    throw error;
  }
}
