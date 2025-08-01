'use server';
/**
 * @fileOverview Extracts tables from a PDF document using AI.
 *
 * - extractTables - A function that handles the table extraction process.
 * - ExtractTablesInput - The input type for the extractTables function.
 * - ExtractTablesOutput - The return type for the extractTables function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTablesInputSchema = z.object({
  pdfText: z.string().describe('The text content extracted from the PDF document.'),
  pdfImage: z
    .string()
    .describe(
      'A photo of the PDF, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type ExtractTablesInput = z.infer<typeof ExtractTablesInputSchema>;

const ExtractTablesOutputSchema = z.object({
  tables: z.array(
    z.object({
      tableData: z.string().describe('The extracted table data in JSON format.'),
    })
  ).describe('An array of extracted tables from the PDF document.'),
});
export type ExtractTablesOutput = z.infer<typeof ExtractTablesOutputSchema>;

export async function extractTables(input: ExtractTablesInput): Promise<ExtractTablesOutput> {
  return extractTablesFlow(input);
}

const extractTablesPrompt = ai.definePrompt({
  name: 'extractTablesPrompt',
  input: {schema: ExtractTablesInputSchema},
  output: {schema: ExtractTablesOutputSchema},
  prompt: `You are an expert in extracting tables from documents.

  Given the following text and image from a PDF document, extract all tables and return them in JSON format.

  Text: {{{pdfText}}}
  Image: {{media url=pdfImage}}

  Return an array of JSON objects, where each object represents a table. Each table object should have a "tableData" field containing the JSON representation of the table.
  `,
});

const extractTablesFlow = ai.defineFlow(
  {
    name: 'extractTablesFlow',
    inputSchema: ExtractTablesInputSchema,
    outputSchema: ExtractTablesOutputSchema,
  },
  async input => {
    const {output} = await extractTablesPrompt(input);
    return output!;
  }
);
