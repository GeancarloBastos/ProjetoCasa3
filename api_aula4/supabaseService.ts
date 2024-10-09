// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';


const supabaseService = createClient(process.env.supabaseUrl as string, process.env.supabaseBypass as string);

export default supabaseService; // Exporta a instância para ser usada em outros arquivos
