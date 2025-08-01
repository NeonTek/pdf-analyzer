'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/chat-interface';
import { FileUploader } from '@/components/file-uploader';
import { Logo } from '@/components/logo';
import { PdfPreview } from '@/components/pdf-preview';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body">
      <header className="p-4 border-b shrink-0">
        <Logo />
      </header>
      <main className="flex-1 grid md:grid-cols-2 gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="flex flex-col gap-6 lg:gap-8">
          {!file ? (
            <FileUploader onFileChange={handleFileChange} />
          ) : (
            <PdfPreview file={file} onClear={() => handleFileChange(null)} />
          )}
        </div>
        <div className="flex flex-col h-full min-h-0">
          <ChatInterface file={file} />
        </div>
      </main>
    </div>
  );
}
