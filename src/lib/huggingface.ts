export async function generateResponse(prompt: string) {
  try {
    const response = await fetch("/api/huggingface", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Erreur lors de la génération de la réponse"
      );
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error("Erreur:", error);
    return "Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.";
  }
}
