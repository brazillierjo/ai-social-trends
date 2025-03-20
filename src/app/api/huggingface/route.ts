import { NextResponse } from "next/server";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

const API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Le prompt est requis" },
        { status: 400 }
      );
    }

    if (!HUGGINGFACE_API_KEY) {
      console.error("Hugging Face API Error: No API key found");
      return NextResponse.json(
        {
          error: "Erreur de configuration Hugging Face",
          details: "Clé API non trouvée",
        },
        { status: 500 }
      );
    }

    console.log("Hugging Face API Request:", {
      prompt,
      model: "mistralai/Mistral-7B-v0.1",
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: `<s>[INST] ${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.95,
        },
      }),
    });

    if (!response.ok) {
      console.log(response);
      const errorData = await response.json().catch(() => ({}));
      console.error("Hugging Face API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return NextResponse.json(
        { error: "Erreur Hugging Face API", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return NextResponse.json(
      { error: "Échec de la génération de réponse", details: error },
      { status: 500 }
    );
  }
}
