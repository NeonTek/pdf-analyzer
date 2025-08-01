'use client';

import { summarizeDocument } from '@/ai/flows/summarize-document';
import { extractTables } from '@/ai/flows/extract-tables';
import { interactiveQandA } from '@/ai/flows/interactive-q-and-a';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Bot, FileText, Loader2, Send, Table, User, File as FileIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface ChatInterfaceProps {
  file: File | null;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  isTable?: boolean;
}

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function ChatInterface({ file }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (file) {
      setMessages([
        {
          id: '1',
          type: 'ai',
          content: `Hello! I see you've uploaded "${file.name}". How can I help you analyze this document?`,
        },
      ]);
    } else {
      setMessages([
        {
          id: '1',
          type: 'ai',
          content: "Hello! I'm your AI assistant. Please upload a PDF to get started.",
        },
      ]);
    }
  }, [file]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleAction = async (action: 'summarize' | 'extract_tables' | 'q_and_a', prompt?: string) => {
    if (!file) {
      toast({
        title: 'No file uploaded',
        description: 'Please upload a PDF file first.',
        variant: 'destructive',
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt || (action === 'summarize' ? 'Summarize this document' : 'Extract tables from this document'),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const dataUri = await fileToDataUri(file);
      let response;

      if (action === 'summarize') {
        response = await summarizeDocument({ pdfDataUri: dataUri, prompt: 'Provide a concise summary of the document.' });
      } else if (action === 'extract_tables') {
        // NOTE: These flows expect extracted text and images. For this prototype,
        // we pass the full PDF data URI as a stand-in for an image and empty text.
        // A full implementation would involve a client-side PDF parsing library.
        response = await extractTables({ pdfImage: dataUri, pdfText: '' });
      } else if (action === 'q_and_a' && prompt) {
        response = await interactiveQandA({ pdfImage: dataUri, pdfText: '', question: prompt });
      }
      
      let aiContent = '';
      let isTable = false;

      if (response && 'summary' in response) {
        aiContent = response.summary;
      } else if (response && 'tables' in response && response.tables.length > 0) {
        aiContent = response.tables.map(t => t.tableData).join('\n\n');
        isTable = true;
      } else if (response && 'answer' in response) {
        aiContent = response.answer;
      } else {
        aiContent = 'I could not process the request. Please try again.';
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiContent,
        isTable,
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        title: 'Analysis Failed',
        description: `There was an error processing your request: ${errorMessage}`,
        variant: 'destructive',
      });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I was unable to process your request.',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleAction('q_and_a', input);
      setInput('');
    }
  };

  const RenderTable = ({ data }: { data: string }) => {
    try {
      let tableData = JSON.parse(data);
      // The AI might return an array of tables, or a single table object
      if (!Array.isArray(tableData)) tableData = [tableData];
  
      return (
        <div className="space-y-4">
          {tableData.map((table: any, tableIndex: number) => {
            const rows = Object.values(table)[0] as any[];
            if (!Array.isArray(rows) || rows.length === 0) return null;
            const headers = Object.keys(rows[0]);
  
            return (
              <UiTable key={tableIndex} className="bg-background rounded-md shadow-sm">
                <TableHeader>
                  <TableRow>
                    {headers.map((header) => <TableHead key={header}>{header}</TableHead>)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row: any, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {headers.map(header => <TableCell key={`${rowIndex}-${header}`}>{row[header]}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </UiTable>
            );
          })}
        </div>
      );
    } catch (e) {
      return <pre className="text-xs whitespace-pre-wrap bg-muted p-2 rounded-md">{data}</pre>;
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-bold font-headline">AI Assistant</h2>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={cn('flex items-start gap-3', message.type === 'user' ? 'justify-end' : '')}>
                {message.type === 'ai' && (
                  <Avatar className="w-8 h-8 shrink-0">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'p-3 rounded-xl max-w-sm md:max-w-md lg:max-w-lg',
                    message.type === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
                  )}
                >
                  {message.isTable ? <RenderTable data={message.content} /> : <p className="whitespace-pre-wrap">{message.content}</p>}
                </div>

                {message.type === 'user' && (
                  <Avatar className="w-8 h-8 shrink-0">
                     <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                       <User className="h-5 w-5" />
                     </div>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 shrink-0">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </div>
                </Avatar>
                <div className="p-3 rounded-xl max-w-sm bg-muted rounded-bl-none space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 pt-4 border-t">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('summarize')}
            disabled={isLoading || !file}
          >
            <FileText className="mr-2 h-4 w-4" />
            Summarize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('extract_tables')}
            disabled={isLoading || !file}
          >
            <Table className="mr-2 h-4 w-4" />
            Extract Tables
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the document..."
            disabled={isLoading || !file}
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim() || !file} aria-label="Send message">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
