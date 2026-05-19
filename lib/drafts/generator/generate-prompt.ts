import { buildIcpPrompt } from '../templates/icp-prompt-template';
import { buildPersonaPrompt } from '../templates/persona-prompt-template';
import type { IcpSeedInputs, PersonaSeedInputs, SeedInputs } from '../types';

export function generatePrompt(kind: string, inputs: SeedInputs): string {
  if (kind === 'icp') {
    return buildIcpPrompt(inputs as IcpSeedInputs);
  }
  if (kind === 'persona') {
    return buildPersonaPrompt(inputs as PersonaSeedInputs);
  }
  throw new Error(`Unknown draft kind: ${kind}`);
}
