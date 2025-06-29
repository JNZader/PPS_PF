import styled from "styled-components";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { useProductosStore } from "../../../store/ProductosStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useQuery } from "@tanstack/react-query";

function StockBajoMinimo() {
  const { reportBajoMinimo } = useProductosStore();
  const { dataempresa } = useEmpresaStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reporte stock bajo minimo", { _id_empresa: dataempresa?.id }],
    queryFn: () => {
      if (typeof reportBajoMinimo !== "function") {
        throw new Error("reportBajoMinimo is not a function. Check useProductosStore implementation.");
      }
      return reportBajoMinimo({ _id_empresa: dataempresa?.id });
    },
    enabled: !!dataempresa?.id,
  });

  const renderContent = () => {
    if (!dataempresa?.id) {
      return <MensajeInfo>No se encontró la empresa. Asegúrate de estar autenticado.</MensajeInfo>;
    }
    if (isLoading) {
      return <MensajeInfo>Cargando reporte...</MensajeInfo>;
    }
    if (error) {
      return <MensajeInfo>Error al cargar el reporte: {error.message}</MensajeInfo>;
    }
    if (!data || data.length === 0) {
      return <MensajeInfo>No se encontraron productos con stock bajo o igual al mínimo.</MensajeInfo>;
    }
    return (
      <PDFViewer className="pdfviewer">
        <Document title="Reporte de stock bajo minimo">
          <Page size="A4" orientation="portrait">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text style={{ fontSize: 18, fontWeight: "ultrabold", marginBottom: 10 }}>
                  Stock bajo minimo
                </Text>
                <Text>Fecha y hora del reporte: {formattedDate}</Text>
                <View>
                  {renderTableRow(
                    { descripcion: "Producto", stock: "Stock", stock_minimo: "Stock Mínimo" },
                    true
                  )}
                  {data.map((item) => renderTableRow(item))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  };

  const styles = StyleSheet.create({
    page: { flexDirection: "row", position: "relative" },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    table: { width: "100%", margin: "auto", marginTop: 10 },
    row: {
      flexDirection: "row",
      borderBottom: 1,
      borderBottomColor: "#121212",
      height: 24,
      borderLeft: 1,
      borderLeftColor: "#000",
      textAlign: "left",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cell: {
      flex: 1,
      textAlign: "center",
      borderLeftColor: "#000",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#dcdcdc",
      fontWeight: "bold",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
    },
  });

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id || (isHeader ? "header" : Math.random())}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>{rowData.descripcion}</Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>{rowData.stock}</Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>{rowData.stock_minimo}</Text>
    </View>
  );

  return <Container>{renderContent()}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 80vh;
  .pdfviewer {
    width: 100%;
    height: 100%;
  }
`;

const MensajeInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2em;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

export default StockBajoMinimo;