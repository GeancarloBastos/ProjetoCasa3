// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmutoemhafahpnahypxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdXRvZW1oYWZhaHBuYWh5cHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMDUxMzcsImV4cCI6MjA0Mzg4MTEzN30.pBh3pF9iHIKNx-B0zO5G9dUQlMDgQhk5aDrzVAVI4Ck'; // Chave anônima ou secreta
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; // Exporta a instância para ser usada em outros arquivos
