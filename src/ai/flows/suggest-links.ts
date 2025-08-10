// This file holds the Genkit flow for suggesting relevant links based on user's current saved links.

'use server';

/**
 * @fileOverview A link suggestion AI agent.
 *
 * - suggestLinks - A function that handles the link suggestion process.
 * - SuggestLinksInput - The input type for the suggestLinks function.
 * - SuggestLinksOutput - The return type for the suggestLinks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLinksInputSchema = z.object({
  savedLinks: z
    .array(z.string())
    .describe('An array of the user\'s currently saved links.'),
});
export type SuggestLinksInput = z.infer<typeof SuggestLinksInputSchema>;

const SuggestLinksOutputSchema = z.object({
  suggestedLinks: z
    .array(z.string())
    .describe('An array of suggested links relevant to the user\'s saved links.'),
});
export type SuggestLinksOutput = z.infer<typeof SuggestLinksOutputSchema>;

export async function suggestLinks(input: SuggestLinksInput): Promise<SuggestLinksOutput> {
  return suggestLinksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLinksPrompt',
  input: {schema: SuggestLinksInputSchema},
  output: {schema: SuggestLinksOutputSchema},
  prompt: `You are a helpful assistant that suggests relevant links based on the user's current saved links.

  Here are the user's saved links:
  {{#each savedLinks}}
  - {{{this}}}
  {{/each}}

  Suggest 3-5 relevant links that the user might be interested in, given their current saved links.
  The links should be full URLs. Do not provide any explanation, only the list of links.
  `,
});

const suggestLinksFlow = ai.defineFlow(
  {
    name: 'suggestLinksFlow',
    inputSchema: SuggestLinksInputSchema,
    outputSchema: SuggestLinksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
