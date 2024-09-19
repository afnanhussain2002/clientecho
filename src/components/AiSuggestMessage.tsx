import React, { useState } from "react";
import { Button } from "./ui/button";

const AiSuggestMessage = () => {
    const [messages, setMessages] = useState([])

    const getAiMessage = () =>{
        
    }


  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="mb-6">
        <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Suggest Messages
        </Button>
        <p className="mt-2 text-gray-700">
          Click on any message below to select it.
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Messages</h2>
        <div className="space-y-2">
          <p className="p-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            What's your favorite movie?
          </p>
          <p className="p-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            Do you have any pets?
          </p>
          <p className="p-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
            What's your dream job?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiSuggestMessage;
