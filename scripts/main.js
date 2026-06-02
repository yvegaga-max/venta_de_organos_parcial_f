
/* ══════════════════════════════════════
   PLUSHANATOMY · scripts.js
   ══════════════════════════════════════ */


// ── 1. NAV SCROLL ──
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('nav-scroll');
    } else {
        nav.classList.remove('nav-scroll');
    }
});


// ── 2. APARICIÓN CON SCROLL ──
// El estado inicial (invisible) se aplica desde JS, no desde CSS.
// Así si el JS no carga, el contenido igual se ve.

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.style.opacity = '1';
            entrada.target.style.transform = 'translateY(0)';
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
});

const tarjetas    = document.querySelectorAll('.tarjeta');
const porqueItems = document.querySelectorAll('.porque-item');

[...tarjetas, ...porqueItems].forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transitionDelay = (i % 3) * 0.12 + 's';
    observador.observe(el);
});


// ── 3. BOTONES + EN TARJETAS ──
const btnsMas = document.querySelectorAll('.btn-mas');

btnsMas.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.background   = '#c9a870';
        btn.style.borderColor  = '#c9a870';
        btn.textContent        = '✓';

        setTimeout(() => {
            btn.style.background  = '';
            btn.style.borderColor = '';
            btn.textContent       = '+';
        }, 1200);
    });
});


// ── 4. MENÚ MOBILE (OPCIONAL) ──
const btnMenu    = document.getElementById('BtnMenu');
const menuMobile = document.getElementById('MenuMobile');

if (btnMenu && menuMobile) {
    btnMenu.addEventListener('click', () => {
        menuMobile.classList.toggle('abierto');
        btnMenu.classList.toggle('activo');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const botonesMas = document.querySelectorAll(".btn-mas");
    const cadenas = document.querySelectorAll(".cadena-productos");
    const botonesCerrar = document.querySelectorAll(".btn-cerrar-cadena");

    botonesMas.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetId = boton.getAttribute("data-target");
            const cadenaObjetivo = document.getElementById(targetId);

            // 1. Si la cadena cliqueada ya está abierta, la cerramos
            if (cadenaObjetivo.classList.contains("activa")) {
                cadenaObjetivo.classList.remove("activa");
                boton.textContent = "+";
            } else {
                // 2. Cerramos cualquier otra cadena abierta primero
                cadenas.forEach(c => c.classList.remove("activa"));
                botonesMas.forEach(b => b.textContent = "+");

                // 3. Abrimos la cadena correspondiente y cambiamos el signo a "-"
                cadenaObjetivo.classList.add("activa");
                boton.textContent = "−";

                // Desplazamiento suave opcional para enfocar los nuevos productos
                setTimeout(() => {
                    cadenaObjetivo.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 300);
            }
        });
    });

    // Botón de cerrar interno ("X")
    botonesCerrar.forEach(botonCerrar => {
        botonCerrar.addEventListener("click", () => {
            cadenas.forEach(c => c.classList.remove("activa"));
            botonesMas.forEach(b => b.textContent = "+");
        });
    });
});

// ── CONTROL DE NAVEGACIÓN MÓVIL PULSOHUB ──
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navContainer = document.getElementById("nav-links-container");
    const navItems = document.querySelectorAll(".nav-item");

    // Abrir y cerrar al presionar la hamburguesa
    hamburgerBtn.addEventListener("click", () => {
        navContainer.classList.toggle("menu-abierto");
        hamburgerBtn.classList.toggle("animado");
    });

    // Cerrar automáticamente cuando el usuario elija una sección o pulse "Adoptar ahora"
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navContainer.classList.remove("menu-abierto");
            hamburgerBtn.classList.remove("animado");
        });
    });
});