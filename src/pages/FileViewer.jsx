// src/pages/FileViewer.jsx
import React from "react";
import styled from "styled-components";

export function FileViewer({ fileUrl, fileType }) {
  let viewerUrl = "";
  if (fileType === "html") {
    // Para HTML, usamos la URL local generada por Vite
    viewerUrl = fileUrl;
  } else if (fileType === "pptx_google") {
    // Si es un PPTX de Google, usamos la URL directamente
    viewerUrl = fileUrl;
  } else if (fileType === "pptx") {
    // Si es un PPTX local (que habrías subido a public o assets en tu servidor)
    // Usamos el visor gview para archivos .pptx accesibles por URL directa
    // window.location.origin + fileUrl es para construir la URL absoluta en el entorno desplegado
    viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + fileUrl)}&embedded=true`;
  }

  return (
    <Container>
      {fileType === "pptx_google" ? (
        <>
          <h2>Presentación del Proyecto</h2>
          <p>Cargando presentación de Google Slides...</p>
          <IframeWrapper>
            <iframe
              title="Presentación de Google Slides"
              src={viewerUrl} // Aquí se usa la URL directa de Google Slides
              width="100%"
              height="600px"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </IframeWrapper>
          <p>
            Si la presentación no se carga, asegúrate de que esté configurada para ser compartida públicamente.
            También puedes verla directamente en Google Slides:{" "}
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Slides</a>
          </p>
        </>
      ) : fileType === "html" ? (
        <>
          <h2>Documentación del Proyecto</h2>
          <IframeWrapper>
            <iframe
              title="Documentación"
              src={viewerUrl} // Aquí usa la URL directa del HTML local
              width="100%"
              height="600px"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </IframeWrapper>
          <p>
            Si el contenido no se muestra correctamente, puedes{" "}
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" download>descargar la documentación aquí</a>.
          </p>
        </>
      ) : fileType === "pptx" ? (
        // Este bloque es para PPTX locales que quisieras ver con gview,
        // aunque el pptx_google ahora es la opción principal para Google Slides
        <>
          <h2>Presentación del Proyecto</h2>
          <p>Cargando presentación local...</p>
          <IframeWrapper>
            <iframe
              title="Presentación local"
              src={viewerUrl}
              width="100%"
              height="600px"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </IframeWrapper>
          <p>
            Si la presentación no se carga o no se ve bien, puedes{" "}
            <a href={fileUrl} download>descargarla aquí (.pptx)</a>.
          </p>
        </>
      ) : (
        <p>Tipo de archivo no soportado para visualización directa.</p>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  h2 {
    color: ${(props) => props.theme.text};
    margin-bottom: 20px;
  }
  p {
    color: ${(props) => props.theme.text};
    margin-bottom: 10px;
  }
  a {
    color: ${(props) => props.theme.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const IframeWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.bg4};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  iframe {
    display: block;
  }
`;