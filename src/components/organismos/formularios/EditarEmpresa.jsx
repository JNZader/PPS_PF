import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText } from "./InputText";
import { BtnSave } from "../../moleculas/BtnSave";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { FaRegBuilding, FaMapMarkerAlt, FaPhone, FaBriefcase, FaLink } from "react-icons/fa";
import { AiOutlineBarcode } from "react-icons/ai";

export function EditarEmpresa() {
    const { dataempresa, editarEmpresa } = useEmpresaStore();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (dataempresa) {
            reset(dataempresa);
        }
    }, [dataempresa, reset]);

    async function onSubmit(data) {
        const p = {
            id: dataempresa.id,
            ...data
        };
        await editarEmpresa(p);
    }

    if (!dataempresa || Object.keys(dataempresa).length === 0) {
        return <div>Cargando datos de la empresa...</div>;
    }

    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <InputText icono={<FaRegBuilding />}>
                <input
                    className="form__field"
                    type="text"
                    placeholder="Nombre de la empresa"
                    {...register("nombre", { required: true })}
                />
                <label className="form__label">Nombre de la empresa</label>
                {errors.nombre && <p>Campo requerido</p>}
            </InputText>

            <InputText icono={<v.iconoprecioventa />}>
                <input
                    className="form__field"
                    type="text"
                    placeholder="Símbolo de moneda"
                    {...register("simbolomoneda", { required: true })}
                />
                <label className="form__label">Símbolo de moneda</label>
                {errors.simbolomoneda && <p>Campo requerido</p>}
            </InputText>

            <InputText icono={<AiOutlineBarcode />}>
                <input
                    className="form__field"
                    type="text"
                    placeholder="CUIT"
                    {...register("cuit")}
                />
                <label className="form__label">CUIT</label>
            </InputText>

            <InputText icono={<FaMapMarkerAlt />}>
                <input
                    className="form__field"
                    type="text"
                    placeholder="Dirección"
                    {...register("direccion")}
                />
                <label className="form__label">Dirección</label>
            </InputText>

            <InputText icono={<FaPhone />}>
                <input
                    className="form__field"
                    type="text"
                    placeholder="Teléfono"
                    {...register("telefono")}
                />
                <label className="form__label">Teléfono</label>
            </InputText>

            <InputText icono={<FaBriefcase />}>
                <input
                    className="form__field"
                    type="text"
                    placeholder="Rubro"
                    {...register("rubro")}
                />
                <label className="form__label">Rubro</label>
            </InputText>

            <InputText icono={<FaLink />}>
                <input
                    className="form__field"
                    type="text"
                    placeholder="URL del Logo"
                    {...register("logo_url")}
                />
                <label className="form__label">URL del Logo</label>
            </InputText>

            <div className="btnguardarContent">
                <BtnSave titulo="Guardar" icono={<v.iconoguardar />} bgcolor="#ef552b" />
            </div>
        </Container>
    );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.bgcards};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  .btnguardarContent {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
   p {
      color: #ff6d6d;
      font-size: 0.8rem;
      margin-top: 4px;
   }
`;