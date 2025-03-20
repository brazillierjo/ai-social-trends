import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    console.error("Twitter API Error: No bearer token found");
    return NextResponse.json(
      {
        error: "Twitter API configuration error",
        details: "No bearer token found",
      },
      { status: 500 }
    );
  }

  try {
    console.log("Twitter API Request:", {
      query,
      tokenLength: bearerToken.length,
      tokenStart: bearerToken.slice(0, 10) + "...",
    });

    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(
        query
      )}&tweet.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Twitter API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        headers: Object.fromEntries(response.headers.entries()),
      });
      return NextResponse.json(
        { error: "Twitter API error", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Twitter API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweets", details: error },
      { status: 500 }
    );
  }
}
