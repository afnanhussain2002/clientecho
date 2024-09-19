import React, { useState } from "react";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AiSuggestMessage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getAiMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/suggest-message");
      setMessages(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(messages);
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="mb-6">
        <Button
          onClick={getAiMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Suggest Messages
        </Button>
        <p className="mt-2 text-gray-700">
          Click on any message below to select it.
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Messages</h2>
        {loading ? (
          <h2 className="text-2xl font-semibold mb-4">Generating...</h2>
        ) : (
          <div className="space-y-2">
            {messages?.map((msg) => (
              <div key={msg}>
                <p className="p-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
                  {msg}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiSuggestMessage;
