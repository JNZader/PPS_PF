import { useQuery } from "@tanstack/react-query";
import { HomeTemplate } from "../components/templates/HomeTemplate";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useState } from "react";

export function Home() {
  const { contarusuariosXempresa, dataempresa } = useEmpresaStore();
  const idEmpresa = dataempresa?.id;

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const openEditProfile = () => {
    console.log("Abriendo el modal de edición de perfil...");
    setProfileModalOpen(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['contar usuarios por empresa', idEmpresa],
    queryFn: () => contarusuariosXempresa({ id_empresa: idEmpresa }),
    enabled: !!idEmpresa
  });

  return (
    <>
      <HomeTemplate
        userCount={data}
        isUserCountLoading={isLoading}
        userCountError={isError ? error.message : null}
        onProfileEdit={openEditProfile}
      />
    </>
  );
}