import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

// Se modifica la función para obtener todos los campos de la empresa sin usar una función RPC
export const MostrarEmpresa = async (p) => {
  if (!p?.idusaurio) {
    throw new Error('No id_usuario provided');
  }

  const { error, data } = await supabase
    .from("asignarempresa")
    // Se expande la selección para incluir los nuevos campos
    .select(`empresa(id, nombre, simbolomoneda, cuit, direccion, telefono, rubro, logo_url)`)
    .eq("id_usuario", p.idusaurio)
    .maybeSingle();

  if (error) {
    console.error("Error fetching empresa data:", error);
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

export async function EditarEmpresa(p) {
    const { error } = await supabase
      .from("empresa")
      .update({ 
          nombre: p.nombre, 
          simbolomoneda: p.simbolomoneda,
          cuit: p.cuit,
          direccion: p.direccion,
          telefono: p.telefono,
          rubro: p.rubro,
          logo_url: p.logo_url 
      })
      .eq("id", p.id);
    if (error) {
      Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al editar la empresa: " + error.message,
      });
    } else {
      Swal.fire({
          icon: 'success',
          title: '¡Guardado!',
          text: 'Los datos de la empresa se han actualizado.',
          showConfirmButton: false,
          timer: 1500
      });
    }
  }
