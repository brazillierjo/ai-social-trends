const HUGGINGFACE_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
const API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

export async function generateResponse(prompt: string) {
  try {
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
      throw new Error("Erreur lors de la génération de la réponse");
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error("Erreur:", error);
    return "Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.";
  }
}
