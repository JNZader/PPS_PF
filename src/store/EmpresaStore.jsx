import { create } from "zustand";
import { ContarUsuariosXempresa, EditarEmpresa, MostrarEmpresa } from "../supabase/crudEmpresa";

export const useEmpresaStore = create((set, get) => ({
  contadorusuarios: 0,
  dataempresa: {},
  parametros: {},

  mostrarEmpresa: async (p) => {
    try {
      set({ parametros: p });
      const response = await MostrarEmpresa(p);
      set({ dataempresa: response.empresa || {} });
      return response.empresa || {};
    } catch (error) {
      console.error('Error fetching empresa:', error);
      set({ dataempresa: {} });
      return {};
    }
  },

  editarEmpresa: async (p) => {
    await EditarEmpresa(p);
    const { mostrarEmpresa, parametros } = get();
    await mostrarEmpresa(parametros);
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