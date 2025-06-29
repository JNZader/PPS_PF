import { supabase } from "./supabase.config";

export const MostrarEmpresa = async (p) => {
  if (!p?.idusaurio) {
    throw new Error('No id_usuario provided');
  }

  const { error, data } = await supabase
    .from("asignarempresa")
    .select(`empresa(id, nombre, simbolomoneda)`)
    .eq("id_usuario", p.idusaurio)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch empresa: ${error.message}`);
  }

  return data || {};
};

export const ContarUsuariosXempresa = async (p) => {
  if (!p?.id_empresa) {
    throw new Error('No id_empresa provided');
  }

  const { data, error } = await supabase.rpc("contar_usuarios_por_empresa", { _id_empresa: p.id_empresa });

  if (error) {
    console.error('Supabase RPC Error:', error);
    throw new Error(`Failed to fetch user count: ${error.message}`);
  }

  return data ?? 0;
};