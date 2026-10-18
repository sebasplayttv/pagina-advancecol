
// ADVANCECOL - Validación de formularios

const formularioEmpleo = document.getElementById("formulario-empleo");

if (formularioEmpleo) {

    const archivo = document.getElementById("hoja-vida");
    const mensaje = document.getElementById("archivo-mensaje");

    formularioEmpleo.addEventListener("submit", function(evento) {

        const pdf = archivo.files[0];
        const limite = 10 * 1024 * 1024;

        mensaje.textContent = "";

        if (!pdf) {
            evento.preventDefault();
            mensaje.textContent = "Debes adjuntar tu hoja de vida.";
            return;
        }

        const esPDF =
            pdf.type === "application/pdf" &&
            pdf.name.toLowerCase().endsWith(".pdf");

        if (!esPDF) {
            evento.preventDefault();
            mensaje.textContent = "Solo se permiten archivos PDF.";
            return;
        }

        if (pdf.size > limite) {
            evento.preventDefault();
            mensaje.textContent = "El PDF no puede superar los 10 MB.";
            return;
        }

        // Si es válido, el navegador envía el formulario.
    });
}

// Validar selección de servicio en Contacto

const formularioContacto =
    document.querySelector(".contacto-formulario form");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(evento) {

        const seleccionados =
            formularioContacto.querySelectorAll(
                'input[name="servicios"]:checked'
            );

        const error =
            document.getElementById("contacto-error");

        if (seleccionados.length === 0) {
            evento.preventDefault();
            error.textContent =
                "Selecciona al menos un servicio de interés.";
        } else {
            error.textContent = "";
        }
    });
}

// Actualizar año del footer

const anioFooter = document.getElementById("anio-actual");

if (anioFooter) {
    anioFooter.textContent = new Date().getFullYear();
}
