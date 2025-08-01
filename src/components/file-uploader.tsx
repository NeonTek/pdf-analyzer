'use client';

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploaderProps {
  onFileChange: (file: File) => void;
}

export function FileUploader({ onFileChange }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileValidation = (file: File): boolean => {
    if (file.type !== 'application/pdf') {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && handleFileValidation(file)) {
      onFileChange(file);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && handleFileValidation(file)) {
      onFileChange(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="flex-1 flex flex-col shadow-lg">
      <CardContent className="p-6 h-full">
        <div
          className={cn(
            'flex flex-col items-center justify-center w-full h-full rounded-lg border-2 border-dashed transition-colors duration-300',
            isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
          role="button"
          aria-label="File upload drop zone"
        >
          <div className="text-center p-8 space-y-4 text-muted-foreground">
            <UploadCloud className="mx-auto h-16 w-16 text-primary" />
            <p className="text-2xl font-semibold text-foreground">
              Drag & drop your PDF here
            </p>
            <p>or click to browse files</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="application/pdf"
          />
        </div>
      </CardContent>
    </Card>
  );
}
