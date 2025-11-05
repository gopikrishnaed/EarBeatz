import { config } from 'dotenv';
config({ path: '.env.local' });

import '@/ai/flows/generate-mood-based-playlist.ts';
