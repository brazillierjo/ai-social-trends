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
import { generateResponse } from "@/lib/huggingface";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateResponse(input);
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erreur:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Désolé, une erreur est survenue. Veuillez réessayer.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chat avec l&apos;IA</CardTitle>
        <CardDescription>
          Posez des questions sur les tendances et obtenez des informations
          détaillées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="h-64 border rounded-lg p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800">
                  En train de réfléchir...
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              placeholder="Posez votre question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Envoi..." : "Envoyer"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
