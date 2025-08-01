import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-document.ts';
import '@/ai/flows/extract-tables.ts';
import '@/ai/flows/interactive-q-and-a.ts';