'use server';
/**
 * @fileOverview An interactive Q&A AI agent for PDF documents.
 *
 * - interactiveQandA - A function that handles the interactive Q&A process.
 * - InteractiveQandAInput - The input type for the interactiveQandA function.
 * - InteractiveQandAOutput - The return type for the interactiveQandA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveQandAInputSchema = z.object({
  pdfText: z.string().describe('The extracted text content of the PDF document.'),
  pdfImage: z.string().describe(
    "A photo of a page of the PDF, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  question: z.string().describe('The user question about the PDF content.'),
});
export type InteractiveQandAInput = z.infer<typeof InteractiveQandAInputSchema>;

const InteractiveQandAOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type InteractiveQandAOutput = z.infer<typeof InteractiveQandAOutputSchema>;

export async function interactiveQandA(input: InteractiveQandAInput): Promise<InteractiveQandAOutput> {
  return interactiveQandAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveQandAPrompt',
  input: {schema: InteractiveQandAInputSchema},
  output: {schema: InteractiveQandAOutputSchema},
  prompt: `You are an expert PDF document analyzer. You will answer questions about the content of the PDF document based on the provided text and image.

PDF Text: {{{pdfText}}}
PDF Image: {{media url=pdfImage}}
Question: {{{question}}}

Answer:`, // Provide a default Answer to give LLM a head start
});

const interactiveQandAFlow = ai.defineFlow(
  {
    name: 'interactiveQandAFlow',
    inputSchema: InteractiveQandAInputSchema,
    outputSchema: InteractiveQandAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
