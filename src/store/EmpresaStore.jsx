import { create } from "zustand";
import { ContarUsuariosXempresa, MostrarEmpresa } from "../supabase/crudEmpresa";
import { supabase } from "../supabase/supabase.config";

export const useEmpresaStore = create((set, get) => ({
  contadorusuarios: 0,
  dataempresa: {},

  mostrarEmpresa: async (p) => {
    try {
      const response = await MostrarEmpresa(p);
      set({ dataempresa: response.empresa || {} });
      return response.empresa || {};
    } catch (error) {
      console.error('Error fetching empresa:', error);
      set({ dataempresa: {} });
      return {};
    }
  },

  contarusuariosXempresa: async (p) => {
    try {
      const response = await ContarUsuariosXempresa(p);
      set({ contadorusuarios: response });
      return response;
    } catch (error) {
      console.error('Error fetching user count:', error);
      set({ contadorusuarios: 0 });
      return 0;
    }
  },
}));