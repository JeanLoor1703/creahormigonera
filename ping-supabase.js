import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Error: Faltan variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function pingSupabase() {
  console.log('🔄 Iniciando ping a Supabase...');
  console.log(`📍 URL: ${SUPABASE_URL}`);
  
  try {
    const { data, error, count } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Error en la consulta:', error.message);
      process.exit(1);
    }

    console.log(`✅ Ping exitoso: ${count} registros en tabla 'leads'`);
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
    process.exit(0);
    
  } catch (err) {
    console.error('❌ Error inesperado:', err.message);
    process.exit(1);
  }
}

pingSupabase();
