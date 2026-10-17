
document.addEventListener("DOMContentLoaded", () => {

    const botonMenu = document.getElementById("boton-menu");
    const menuLateral = document.getElementById("menu-lateral");
    const cerrarMenu = document.getElementById("cerrar-menu");
    const fondoMenu = document.getElementById("fondo-menu");

    function abrir() {
        fondoMenu.hidden = false;
        menuLateral.inert = false;
        menuLateral.setAttribute("aria-hidden", "false");
        menuLateral.classList.add("abierto");

        botonMenu.setAttribute("aria-expanded", "true");
        botonMenu.setAttribute("aria-label", "Cerrar menú");

        document.body.style.overflow = "hidden";
        cerrarMenu.focus();
    }

    function cerrar() {
        menuLateral.classList.remove("abierto");
        menuLateral.setAttribute("aria-hidden", "true");
        menuLateral.inert = true;

        fondoMenu.hidden = true;
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.setAttribute("aria-label", "Abrir menú");

        document.body.style.overflow = "";
        botonMenu.focus();
    }

    botonMenu.addEventListener("click", () => {
        if (menuLateral.classList.contains("abierto")) {
            cerrar();
        } else {
            abrir();
        }
    });

    cerrarMenu.addEventListener("click", cerrar);
    fondoMenu.addEventListener("click", cerrar);

    menuLateral.querySelectorAll("a").forEach(enlace => {
        enlace.addEventListener("click", cerrar);
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" &&
            menuLateral.classList.contains("abierto")) {
            cerrar();
        }
    });

    // Buscador provisional
    const formulario = document.getElementById("form-busqueda");
    const campo = document.getElementById("buscar");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const texto = campo.value.trim();

        if (!texto) {
            campo.focus();
            return;
        }

        console.log("Búsqueda:", texto);
    });

});


// =======================================
// CARRUSEL ADVANCECOL
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    const carrusel = document.getElementById("carrusel");

    if (!carrusel) return;

    const diapositivas =
        carrusel.querySelectorAll(".diapositiva");

    const botonAnterior =
        document.getElementById("anterior");

    const botonSiguiente =
        document.getElementById("siguiente");

    const indicadores =
        document.getElementById("indicadores");

    let actual = 0;
    let intervalo;

    // CREAR INDICADORES

    diapositivas.forEach((diapositiva, indice) => {

        const punto = document.createElement("button");

        punto.type = "button";
        punto.className = "punto";

        punto.setAttribute(
            "aria-label",
            `Mostrar imagen ${indice + 1}`
        );

        punto.addEventListener("click", () => {
            mostrar(indice);
            reiniciar();
        });

        indicadores.appendChild(punto);
    });

    const puntos = indicadores.querySelectorAll(".punto");

    // MOSTRAR IMAGEN

    function mostrar(indice) {

        actual = (indice + diapositivas.length)
                 % diapositivas.length;

        diapositivas.forEach((diapositiva, i) => {
            const activa = i === actual;

            diapositiva.classList.toggle("activa", activa);
            diapositiva.setAttribute(
                "aria-hidden",
                String(!activa)
            );
            diapositiva.inert = !activa;
        });

        puntos.forEach((punto, i) => {
            const activo = i === actual;

            punto.classList.toggle("activo", activo);
            punto.setAttribute(
                "aria-pressed",
                String(activo)
            );
        });
    }

    // BOTONES

    botonSiguiente.addEventListener("click", () => {
        mostrar(actual + 1);
        reiniciar();
    });

    botonAnterior.addEventListener("click", () => {
        mostrar(actual - 1);
        reiniciar();
    });

    // DESPLAZAMIENTO AUTOMÁTICO

    function iniciar() {
        clearInterval(intervalo);

        if (window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches) return;

        intervalo = setInterval(() => {
            if (!document.hidden) {
                mostrar(actual + 1);
            }
        }, 4500);
    }

    function detener() {
        clearInterval(intervalo);
    }

    function reiniciar() {
        detener();
        iniciar();
    }

    carrusel.addEventListener("mouseenter", detener);
    carrusel.addEventListener("mouseleave", iniciar);
    carrusel.addEventListener("focusin", detener);
    carrusel.addEventListener("focusout", evento => {
        if (!carrusel.contains(evento.relatedTarget)) {
            iniciar();
        }
    });

    // INICIAR CARRUSEL
    mostrar(0);
    iniciar();

});


// AÑO AUTOMÁTICO DEL FOOTER

document.addEventListener("DOMContentLoaded", () => {

    const anio = document.getElementById("anio-actual");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }

});
