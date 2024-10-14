// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

import "dotenv/config";

const supabaseClient = createClient(process.env.supabaseUrl as string, process.env.supabasekey as string);

export default supabaseClient; // Exporta a instância para ser usada em outros arquivos
