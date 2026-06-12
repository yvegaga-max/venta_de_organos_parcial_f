/* ══════════════════════════════════════
   PLUSHANATOMY · scripts.js
   ══════════════════════════════════════ */


/* ── 1. EFECTO DE SCROLL EN LA BARRA DE NAVEGACIÓN ──────────────────
   Agrega la clase 'nav-scroll' al nav cuando el usuario baja más de
   60px, para aplicar estilos de fondo/sombra desde CSS.             */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('nav-scroll');
    } else {
        nav.classList.remove('nav-scroll');
    }
});


/* ── 2. APARICIÓN DE ELEMENTOS AL HACER SCROLL (IntersectionObserver)
   Se aplica el estado invisible desde JS (no desde CSS) para que si
   el script falla, el contenido igual sea visible por defecto.
   Cada elemento se anima al entrar al viewport con un retardo
   escalonado según su posición en el grupo.                         */
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.style.opacity = '1';
            entrada.target.style.transform = 'translateY(0)';
            observador.unobserve(entrada.target); // deja de observar una vez animado
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
});

const tarjetas    = document.querySelectorAll('.tarjeta');
const porqueItems = document.querySelectorAll('.porque-item');

[...tarjetas, ...porqueItems].forEach((el, i) => {
    el.style.opacity         = '0';
    el.style.transform       = 'translateY(20px)';
    el.style.transitionDelay = (i % 3) * 0.12 + 's'; // escalonado de 3 en 3
    observador.observe(el);
});


/* ── 3. LÓGICA PRINCIPAL: ACORDEÓN DE CADENAS + MENÚ HAMBURGUESA ─── */
document.addEventListener("DOMContentLoaded", () => {

    /* ── 3a. ACORDEÓN DE CADENAS DE PRODUCTOS ──────────────────────
       Al hacer clic en un botón ".btn-mas", se despliega la cadena
       de productos asociada (identificada por data-target).
       Solo una cadena puede estar abierta a la vez.
       El botón muestra "+" cuando está cerrado y "−" cuando abierto. */
    const botonesMas     = document.querySelectorAll(".btn-mas");
    const cadenas        = document.querySelectorAll(".cadena-productos");
    const botonesCerrar  = document.querySelectorAll(".btn-cerrar-cadena");

    botonesMas.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.stopPropagation(); // evita que el clic se propague al documento

            const targetId       = boton.getAttribute("data-target");
            const cadenaObjetivo = document.getElementById(targetId);

            if (cadenaObjetivo.classList.contains("activa")) {
                // La cadena ya estaba abierta: la cerramos
                cadenaObjetivo.classList.remove("activa");
                boton.textContent = "+";
            } else {
                // Cerramos cualquier otra cadena que esté abierta
                cadenas.forEach(c => c.classList.remove("activa"));
                botonesMas.forEach(b => b.textContent = "+");

                // Abrimos la cadena seleccionada
                cadenaObjetivo.classList.add("activa");
                boton.textContent = "−";

                // Desplazamiento suave para que la cadena quede visible
                setTimeout(() => {
                    cadenaObjetivo.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 300);
            }
        });
    });

    // Botón interno "X" para cerrar la cadena abierta desde adentro
    botonesCerrar.forEach(botonCerrar => {
        botonCerrar.addEventListener("click", () => {
            cadenas.forEach(c => c.classList.remove("activa"));
            botonesMas.forEach(b => b.textContent = "+");
        });
    });


    /* ── 3b. MENÚ HAMBURGUESA MÓVIL ────────────────────────────────
       Abre y cierra el menú al presionar el botón hamburguesa.
       Al seleccionar cualquier ítem del menú, este se cierra
       automáticamente para mejorar la experiencia de navegación.   */
    const hamburgerBtn  = document.getElementById("hamburger-btn");
    const navContainer  = document.getElementById("nav-links-container");
    const navItems      = document.querySelectorAll(".nav-item");

    if (hamburgerBtn && navContainer) {
        hamburgerBtn.addEventListener("click", () => {
            navContainer.classList.toggle("menu-abierto");
            hamburgerBtn.classList.toggle("animado");
        });

        navItems.forEach(item => {
            item.addEventListener("click", () => {
                navContainer.classList.remove("menu-abierto");
                hamburgerBtn.classList.remove("animado");
            });
        });
    }

});