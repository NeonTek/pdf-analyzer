'use client';

import { useEffect, useState } from 'react';
import { X, File as FileIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface PdfPreviewProps {
  file: File;
  onClear: () => void;
}

export function PdfPreview({ file, onClear }: PdfPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // It can take a moment for the iframe to load the object URL
    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => {
      URL.revokeObjectURL(url);
      clearTimeout(timer);
    };
  }, [file]);

  return (
    <Card className="flex-1 flex flex-col shadow-lg min-h-0">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2 font-medium truncate">
          <FileIcon className="h-5 w-5 shrink-0" />
          <span className="truncate" title={file.name}>
            {file.name}
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClear} aria-label="Clear file">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-2 min-h-0">
        <div className="relative w-full h-full rounded-md bg-muted overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          {previewUrl && (
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title="PDF Preview"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
