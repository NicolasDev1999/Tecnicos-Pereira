/* ==========================================================
   RetroSound · catálogo de productos
   ----------------------------------------------------------
   CÓMO AGREGAR UN PRODUCTO NUEVO:
   1. Copia cualquier objeto del arreglo `products`.
   2. Pégalo al final (antes del `];`) y separa con coma.
   3. Usa un `id` que no exista todavía.
   4. `categoria` debe ser: "tocadiscos", "amplificadores",
      "cintas" o "altavoces" (así coincide con los filtros).
   5. `estado` debe ser: "Restaurado 100%", "Colección" o "Como Nuevo".
   6. Guarda y recarga: la tarjeta aparece sola, sin tocar el HTML.
   ========================================================== */

const products = [
  {
    id: 1,
    nombre: "fugue-mg6-mezcladora",
    categoria: "Mezclador",
    precio: 350000,
    estado: "Nuevo",
    imagen: "img/fugue-mg6-mezcladora.jpg",
    descripcionCorta: ""
  },
  {
    id: 2,
    nombre: "Gemini-pmx350-mezcladora",
    categoria: "Mezcladora",
    precio: 320000,
    estado: "Colección",
    imagen: "img/gemini-pmx350-mezcladora.jpg",
    descripcionCorta: ""
  },
  {
    id: 3,
    nombre: "Sony-lbt-xb66-",
    categoria: "Equipo-completo",
    precio: 650000,
    estado: "Restaurado 100%",
    imagen: "img/sony-lbt-xb66-equipo-completo.jpg",
    descripcionCorta: "60 W por canal, válvulas EL34 reemplazadas y frontal de latón cepillado."
  },
  {
    id: 4,
    nombre: "National-panasonic-",
    categoria: "tocadiscos",
    precio: 640000,
    estado: "Restaurado",
    imagen: "img/national-panasonic-panel-frontal.jpg",
    descripcionCorta: ""
  },
  {
    id: 5,
    nombre: "Peavey-messenger-m100",
    categoria: "mezclador",
    precio: 900000,
    estado: "Nuevo",
    imagen: "img/peavey-messenger-m100-logo.jpg",
    descripcionCorta: "Todos los accesorio"
  },
  {
    id: 6,
    nombre: "optonica-st1133",
    categoria: "sintonizador",
    precio: 450000,
    estado: "Restarurado",
    imagen: "img/optonica-st1133-sintonizador.jpg",
    descripcionCorta: ""
  },
  {
    id: 7,
    nombre: "toa-a2240",
    categoria: "amplificadores",
    precio: 600000,
    estado: "Como Nuevo",
    imagen: "img/toa-a2240-amplificador-pa.jpg",
    descripcionCorta: ""
  },
  {
    id: 8,
    nombre: "Monitores Steren",
    categoria: "altavoces",
    precio: 380000,
    estado: "Nuevo",
    imagen: "img/monitores-steren.JPG",
    descripcionCorta: ""
  }
];

/* ---------- Renderizado ---------- */

const STATE_STYLES = {
  "Restaurado 100%": "bg-brass text-mahogany",
  "Colección": "bg-mahogany text-cream",
  "Como Nuevo": "bg-ember text-white"
};

// SVG de respaldo por si una imagen de Unsplash deja de existir
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#3a2216'/><circle cx='200' cy='150' r='80' fill='#1a0f09'/><circle cx='200' cy='150' r='26' fill='#b8893f'/><circle cx='200' cy='150' r='5' fill='#3a2216'/></svg>"
  );

const formatPrice = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function productCard(p) {
  return `
    <article class="sleeve group flex flex-col bg-cream-soft border border-brass/60 shadow-sm" data-id="${p.id}">
      <div class="relative aspect-[4/3] overflow-hidden bg-mahogany">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy"
             onerror="this.onerror=null;this.src='${FALLBACK_IMG}'"
             class="h-full w-full object-cover sepia-[.35] transition duration-500 group-hover:sepia-0">
        <span class="absolute left-3 top-3 px-2.5 py-1 text-xs font-semibold ${STATE_STYLES[p.estado] || "bg-brass text-mahogany"}">${p.estado}</span>
      </div>
      <div class="flex flex-1 flex-col p-5">
        <p class="text-sm text-wood/70 capitalize">${p.categoria}</p>
        <h3 class="mt-1 font-display text-xl font-bold leading-snug text-mahogany">${p.nombre}</h3>
        <p class="mt-2 flex-1 text-sm leading-relaxed text-wood">${p.descripcionCorta}</p>
        <div class="mt-5 flex items-center justify-between border-t border-brass/50 pt-4">
          <span class="font-display text-2xl font-bold text-mahogany">${formatPrice(p.precio)}</span>
          <button type="button" data-add="${p.id}"
                  class="bg-ember px-4 py-2 text-sm font-semibold text-white transition hover:bg-mahogany focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass">
            Añadir
          </button>
        </div>
      </div>
    </article>`;
}

function renderCatalog(categoria = "todos") {
  const container = document.getElementById("catalog-container");
  const list = categoria === "todos" ? products : products.filter((p) => p.categoria === categoria);

  container.innerHTML = list.length
    ? list.map(productCard).join("")
    : `<p class="col-span-full py-12 text-center text-wood">Aún no hay piezas en esta categoría. Vuelve pronto.</p>`;
}
