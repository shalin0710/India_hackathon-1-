'use client'

import { useStudyBuddy } from '@/hooks/useStudyBuddy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Bot, Send, User } from 'lucide-react';
import { useRef, useEffect } from 'react';

export function StudyBuddyComponent() {
  const {
    question,
    setQuestion,
    chatHistory,
    loading,
    error,
    askStudyBuddy,
  } = useStudyBuddy();
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 border-0 backdrop-blur-sm flex flex-col h-[70vh]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <Bot className="w-6 h-6" />
          AI Study Buddy
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div ref={chatContainerRef} className="flex-grow space-y-4 overflow-y-auto pr-4">
          {chatHistory.length === 0 ? (
            <div className="text-center text-white/60 py-8">
              <p>Ask me anything and I'll help you learn!</p>
              <p className="text-sm">I can explain concepts, provide examples, and answer your questions.</p>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-500/30 p-3 rounded-lg max-w-sm">
                    <p className="text-white/90">{chat.question}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/50 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-purple-500/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-purple-500/30 p-3 rounded-lg max-w-sm">
                    <p className="text-white/90">{chat.answer}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && <p className="text-white/60">Thinking...</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
        <div className="flex space-x-2 pt-4 border-t border-white/20">
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-4 rounded-lg border-0 bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
            onKeyDown={(e) => e.key === 'Enter' && askStudyBuddy()}
          />
          <Button onClick={askStudyBuddy} disabled={loading || !question.trim()} size="icon">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
