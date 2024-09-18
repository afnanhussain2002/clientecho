'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/message.json'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
    {/* Main content */}
    <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-32 py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen">
      <section className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Dive into the World of Anonymous Feedback
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-300">
          Client Echo - Where your identity remains a secret.
        </p>
      </section>
  
      {/* Carousel for Messages */}
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full max-w-lg md:max-w-2xl"
      >
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index} className="p-6">
              <Card className="bg-gray-700 text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{message.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <Mail className="flex-shrink-0 text-indigo-500 h-6 w-6" />
                  <div>
                    <p className="text-base md:text-lg">{message.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{message.received}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  
    {/* Footer */}
    <footer className="text-center p-6 bg-gray-900 text-gray-400">
      <p>© 2024 Client Echo. All rights reserved.</p>
    </footer>
  </>
  
  );
}