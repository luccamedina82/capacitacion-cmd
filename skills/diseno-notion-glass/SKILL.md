---
name: diseno-notion-glass
description: "Diseñar y construir sitios educativos (cursos, capacitaciones, onboarding) con estética Notion para el contenido y Liquid Glass de iOS 26 para el chrome, con tres temas (claro, oscuro, noche) y motion con significado. Trigger: capacitación web, curso online, landing educativa, estilo Notion, liquid glass, modo noche, auditoría UX de una página de aprendizaje."
license: MIT
metadata:
  origen: "Capacitación Notion · Comunicación Multimedial · UTN 2026"
  stack: "React 19 + Vite, CSS plano con tokens, motion/react, lucide-react"
---

# Diseño "Notion + Liquid Glass" para sitios de aprendizaje

Esta guía resume cómo se diseñó y construyó la página "Organizá tu cursada con Notion". Está escrita para que otra persona, sola o con un asistente de IA (Claude Code u otro), obtenga un resultado de la misma calidad.

No es una plantilla para copiar y pegar. Es un **proceso**: qué preguntarse, en qué orden, qué decidir y qué verificar.

---

## 1. Activation Contract

Usá esta skill cuando:
- vas a construir o rediseñar un sitio cuyo objetivo es que alguien **aprenda algo paso a paso** (curso, capacitación, tutorial, onboarding);
- querés una estética calma y "de producto": Notion, Apple;
- pedís una auditoría UX/UI de una página así.

No la uses para dashboards de datos, e-commerce ni landings de marketing agresivo: ahí cambian las prioridades.

---

## 2. La idea central (leé esto antes que nada)

> **Notion para el contenido, iOS 26 para el chrome.**

- **Contenido** (lo que se lee y se aprende): superficies planas, tipografía de sistema, mucho aire, bloques. Igual que una página de Notion. Nada de vidrio ni brillo sobre el texto que hay que leer.
- **Chrome** (lo que se toca para navegar: barra superior, barra inferior, menús, hojas, selectores): Liquid Glass. Vidrio translúcido con blur, borde luminoso, forma de cápsula, y que se achica cuando estorba.

¿Por qué? El objetivo pedagógico era **bajar el estrés visual**. Una capacitación que se siente como un "choclo" de información hace que el estudiante abandone.

Notion transmite orden y calma. El vidrio de iOS hace que la navegación esté presente pero no compita con el contenido.

### Principios que guiaron cada decisión

1. **Una cosa a la vez.** Se ve una etapa por vez y, dentro de un módulo, un paso por vez (pestañas). Nada de páginas de scroll infinito.
2. **El contenido arriba.** Al empezar un módulo, el video tiene que quedar visible sin scrollear. Si el video queda "abajo del pliegue", el diseño falló.
3. **Siempre sabés dónde estás.** Ubicación en la barra, recorrido lateral, "Módulo 3 de 6" e ícono grande de la etapa.
4. **El progreso tiene que explicarse solo.** Nada de "2/6" críptico. Usá frases como "Próxima pieza: Vistas" y piezas que se encienden.
5. **El motion cuenta algo.** Cada animación muestra una causa y su efecto (un bloque que viaja, un estado que cambia). Ninguna es decoración.
6. **La navegación nunca se rompe.** Cada rediseño conservó: deep links con `#hash`, botón atrás del navegador, "Continuar donde dejaste", foco de teclado e impresión.

---

## 3. Herramientas que se usaron (y cuáles no)

| Herramienta | Para qué se usó |
|---|---|
| **Claude Code** (Opus) | Agente principal: auditar, proponer, implementar y revisar |
| Skill **`ui-ux-pro-max`** | Auditoría UX/UI con reglas priorizadas (accesibilidad → touch → performance → estilo → layout → tipografía → animación → navegación) |
| **Sub-agentes de revisión** (contexto fresco) | Después de cada cambio grande, un agente que no participó del cambio revisa el diff buscando bugs, regresiones de navegación y accesibilidad |
| MCP **Engram** (memoria persistente) | Guardar decisiones y gotchas entre sesiones (por ejemplo: "backdrop-filter rompe position: fixed") |
| **motion/react** (ex framer-motion) | Animaciones con resortes, `layoutId` (elemento compartido) y `AnimatePresence` |
| **lucide-react** | Íconos SVG consistentes (nunca emojis como íconos de UI) |
| **View Transitions API** (nativa del navegador) | Transición portada → curso |
| **oxlint** + `pnpm build` | Verificación después de cada cambio |
| Script de Node para contraste | Calcular el ratio WCAG de cada par de colores de cada tema |

**Lo que NO se usó:** ningún generador de UI (v0, 21st.dev/magic, Figma-to-code). El MCP de 21st.dev estaba configurado pero falló al conectar, y no hizo falta. Todo el CSS está escrito a mano sobre tokens.

> Lección: la herramienta no hace el diseño. El diseño sale de **auditar → decidir con criterio → implementar → revisar**. La IA ejecuta; vos dirigís.

---

## 4. El proceso, paso a paso

### Fase 0 · Contexto antes de tocar nada

Antes de pedir diseño, dejale claro al agente:
- **¿Quién aprende?** (en este caso, estudiantes universitarios desordenados);
- **¿qué tiene que poder hacer al final?**;
- **¿cuál es la estructura del contenido?** (6 módulos con video, lectura, guía PDF y cuestionario);
- **¿qué no se puede romper?** (navegación, progreso guardado, cuestionarios embebidos).

### Fase 1 · Auditoría honesta

Pedí una auditoría **antes** de pedir cambios. Prompt tipo:

```
Auditá esta página (la portada / la vista del curso). Decime qué está bien,
qué cambiarías y por qué. Pensá en que el objetivo es un espacio armónico,
sin estrés visual, donde el usuario se sienta cómodo aprendiendo.
Tené en cuenta la navegabilidad actual: tiene que mantenerse.
```

Si tenés `ui-ux-pro-max`, invocala (`/ui-ux-pro-max`) para que la auditoría siga sus prioridades.

Lo que salió de la auditoría en este proyecto:
- navbar buggeada y encimada con el contenido;
- objetivos genéricos que "no decían nada";
- módulos desplegados todos juntos (estresante);
- progreso poco intuitivo;
- el video quedaba debajo del pliegue.

### Fase 2 · Decidir la dirección visual

Elegí **una** dirección y nombrala. Acá fue "Notion mezclado con Liquid Glass de iOS 26". Pedile al agente que confirme si lo que hay cumple esa dirección y que proponga cómo llegar. Aprobá la propuesta antes de implementar.

### Fase 3 · Sistema de tokens (la base de todo)

Nada de colores sueltos en los componentes. Todo sale de variables CSS en `:root`:

```css
:root {
  /* Superficies y texto (paleta real de Notion) */
  --n-bg: #FFFFFF;  --n-bg-secondary: #F7F6F3;  --n-bg-hover: #F1F0ED;
  --n-text: #37352F; --n-text-muted: #6B6A67;   /* AA sobre los fondos */
  --n-text-light: #9B9A97;                       /* solo decoración, nunca texto */
  --n-accent: #2383E2; --n-link: #1B65B0;        /* link = acento seguro para texto chico */
  --n-accent-soft: rgba(35,131,226,.10);

  /* Vidrio */
  --glass-blur: 24px; --glass-sat: 180%;
  --glass-tint: rgba(255,255,255,.58);
  --glass-rim: linear-gradient(135deg, rgba(255,255,255,.95), rgba(255,255,255,.18) 40%, rgba(255,255,255,.7));

  --ancho-max: 1240px;
}
```

Reglas:
- Cada token de texto lleva un comentario con **sobre qué fondo cumple AA**.
- Un token "solo decoración" nunca se usa para texto.
- El layout aprovecha el ancho (1240px) con una columna lateral de recorrido de unos 300px.

### Fase 4 · Tres temas: claro, oscuro y noche

Prompt que lo originó: *"poneme modo oscuro como tiene Notion"*, después *"dame la posibilidad de elegir oscuro o noche"* y por último *"que los 3 modos sean ergonómicos"*.

| Tema | Idea | Fondo / texto / acento |
|---|---|---|
| **Claro** | Notion de día | `#FFFFFF` / `#37352F` / azul `#2383E2` |
| **Oscuro** | El modo oscuro real de Notion (gris neutro, no negro puro) | `#191919`–`#252525` / `#DEDEDC` / azul |
| **Noche** | Lectura nocturna: tonos cálidos tipo sepia, sin luz azul | `#1A1714`–`#24201B` / `#CFC0A8` / ámbar `#D08A3E` |

Cómo se implementa:
1. **Atributo en `<html>`:** `data-tema="claro|oscuro|noche"`. Cada tema solo redefine tokens; los componentes no se enteran.
2. **Script en `index.html` antes del primer render.** Lee la elección guardada (o `prefers-color-scheme`) y fija `data-tema`, así no hay destello blanco al cargar.
3. **Hook `useTema`** con `useSyncExternalStore`:
   - observa el atributo con un `MutationObserver`;
   - acompaña los cambios del sistema mientras el usuario no haya elegido;
   - sincroniza entre pestañas (evento `storage`).
4. **El sistema solo resuelve claro u oscuro. "Noche" se elige a mano.** Es una preferencia, no una condición del entorno.
5. **Transición de colores solo durante el cambio:** se agrega la clase `tema-cambiando` por 300 ms. Si la transición quedara siempre activa, todo "parpadearía" al cargar o al hacer hover.
6. **Los bloques de tema van dentro de `@media screen`**, así la impresión (el certificado) sale siempre clara.
7. **Selector:** un popover con `role="radiogroup"` y una muestra de color fija por tema, para que se vea cómo queda cada uno antes de elegirlo.
8. **Verificación de contraste con un script.** No alcanza con mirarlo: hay que calcular el ratio WCAG de cada token de texto sobre cada fondo, incluidos hover y activo. Ejemplo real: un botón pasó de 3.88 a 5.94.
9. **`prefers-reduced-transparency`:** el vidrio pasa a superficie sólida.

### Fase 5 · Chrome Liquid Glass (iOS 26)

Prompt: *"¿tiene el estilo de las nuevas actualizaciones UX/UI de iOS? Quiero eso, Notion mezclado con eso"*.

Componentes y patrones:
- **Barra superior de vidrio que se minimiza al scrollear.**
  - Al bajar se achica a una cápsula de unos 460px de ancho y 44px de alto.
  - Al subir vuelve a su tamaño completo.
  - Lo maneja un hook `useBarraAlDesplazar`:
    - tiene umbrales (8px para "desplazada", 160px para empezar a minimizar, 8px de delta para ignorar el rebote del trackpad);
    - va con `requestAnimationFrame` como throttle;
    - no minimiza si el foco del teclado está dentro de la barra.
- **Título chico en la barra:** cuando el título grande sale de pantalla, aparece "Estás en: X".
- **Scroll edge effect:** un borde difuminado donde el contenido pasa por debajo de la barra.
- **Barra inferior en móvil** (≤ 900px): anterior · Módulos · siguiente. Es la tab bar de iOS.
- **Bottom sheet** para la lista de módulos:
  - tiene handle, velo, cierre con Esc o tocando afuera, y bloqueo del scroll de fondo;
  - usa `overscroll-behavior: contain`;
  - se cierra sola si la pantalla se agranda.
- **Segmented control** para los pasos del módulo: una píldora que se desliza entre pestañas con `layoutId`.

⚠️ **Gotcha crítico:** `backdrop-filter` convierte al elemento en contenedor de los hijos con `position: fixed`. Una hoja "fixed" dentro de la barra de vidrio queda atrapada en la barra. **Solución:** renderizar hojas y velos con `createPortal(..., document.body)`.

### Fase 6 · Arquitectura de la experiencia de aprendizaje

Prompt: *"quiero entrar y ver los módulos como bloques estilo Notion, tocar uno, ver su intro con un botón Empezar, y recién ahí video, paso a paso, guía y cuestionario"*.

Flujo final:

```
Portada ──[Entrar]──► "Tus módulos" (galería de tarjetas tipo Notion)
                         │
                         ├─► Antes de empezar (diagnóstico de 3 preguntas → plan personalizado)
                         ├─► Módulo N · portada: logro "Al terminar vas a poder…", intro, temario, [Empezar]
                         │        └─► Lección: pestañas Video | Paso a paso | Guía | Cuestionario
                         └─► Cierre: proyecto, evaluación final y certificado
```

Decisiones clave:
- **Las tarjetas de la galería** tienen una portada de color propio por módulo (`--tono`, un matiz HSL) y muestran: número, título, estado, duración del video, "x de 4 pasos" y la estrella "Para vos" si el diagnóstico lo recomienda.
- **Cada etapa es una "pantalla"**, pero todas quedan **montadas y ocultas con `hidden`**. Así, los cuestionarios embebidos (iframes) no pierden las respuestas a medio completar.
- **Deep links:** cada etapa tiene su `#hash`. Funcionan el atrás y el adelante del navegador, y un hash vacío vuelve a la galería.
- **Foco:** al cambiar de etapa, el foco va al `h1` de esa etapa (`tabIndex={-1}`).
- **Los objetivos se volvieron logros concretos:** en lugar de "Comprender bases de datos", el texto dice "Tener todas tus entregas en una base de datos con materia, estado y fecha".
- **Un paso solo se tilda cuando está hecho de verdad.** El cuestionario se tilda al aprobarlo, no al visitarlo.

### Fase 7 · Motion con significado

#### 7.1 La animación de la portada (la que más llama la atención)

**Prompt original:**
```
Quiero que veas el home de esta página, lo audites y me digas si podemos
agregarle alguna funcionalidad más, estilo motion o diseño, que llame la atención.
```

Después de aprobar la propuesta: *"arrancá por todo"*.

**La idea:** la portada no *explica* Notion, lo *muestra*. Hay una ventana de Notion falsa donde una demo se "escribe sola", en bucle:

1. Aparece el cursor.
2. Se "escribe" `/` y se abre el menú de bloques.
3. El resalte baja opción por opción hasta Base de datos, Tablero o Calendario (uno distinto en cada vuelta).
4. El bloque se materializa en la página.
5. **Llega un recordatorio tipo toast** que muestra para qué sirve lo que se acaba de crear. Por ejemplo: "📌 TP de Semiótica · Vence el 19 nov · faltan 2 días". Ese es el "por qué" del curso.
6. Alrededor flotan bloques de vidrio (Texto, H1, Toggle…). Cuando se usa un bloque, **vuela** desde su lugar flotante hasta la ventana: es un elemento compartido con `layoutId` y resorte `{ stiffness: 170, damping: 24, mass: 0.9 }`.
7. En el titular, un **resaltador** se dibuja debajo de la palabra "tarde" (el dolor del estudiante: enterarse tarde).
8. Al tocar "Entrar", una **View Transition** hace que la ventana de Notion se transforme en el bloque de progreso del curso.

**Cómo está construida (patrón "guion"):**

```js
// Un hook que corre una secuencia async con esperas, y se pausa cuando no se ve.
export function useGuion(estatico, activa) {
  const [estado, setEstado] = useState({ fase: 'cursor', idx: 0, aviso: false })
  const docVisible = useSyncExternalStore(subVisibilidad, () => document.visibilityState === 'visible', () => true)
  const corre = !estatico && activa && docVisible

  useEffect(() => {
    if (!corre) return
    let vivo = true; const timers = []
    const esperar = ms => new Promise(r => timers.push(setTimeout(r, ms)))
    ;(async () => {
      while (vivo) {
        setEstado({ fase: 'cursor' });       await esperar(1000)
        setEstado({ fase: 'menu', idx: 0 }); await esperar(750)
        // ...bajar el resalte, materializar el bloque, mostrar el aviso...
      }
    })()
    return () => { vivo = false; timers.forEach(clearTimeout) }
  }, [corre])

  return estatico ? ESTADO_FINAL : estado   // reduced motion: se muestra la escena final quieta
}
```

Claves:
- **El guion es estado, no CSS keyframes.** Los componentes solo dibujan según `fase`. Así se puede pausar, cortar y mostrar quieto.
- **Se pausa** con la pestaña oculta (`visibilitychange`) y cuando la portada no está visible.
- **Con `prefers-reduced-motion` no hay guion:** se muestra directo la escena final completa, así no se pierde información.
- **Usá la View Transition solo durante la transición:** agregá una clase (`vt-entrando`) que asigna los `view-transition-name` y sacala al terminar. Un `view-transition-name` permanente crea un contexto de apilamiento que rompe otros efectos.

#### 7.2 Reglas de motion del resto del sitio

- **Resortes, no curvas lineales.** La píldora de pestañas usa `{ stiffness: 420, damping: 34, mass: 0.8 }` (rápida y firme). El vuelo de bloques es más suave.
- **Duraciones:** 150–300 ms en micro-interacciones; nada que bloquee el input.
- **Animá solo `transform` y `opacity`**, nunca `width`, `height` ni `top`.
- **Animá el panel solo cuando el usuario interactúa** (clase `interactuado`), no en la primera carga.
- **Feedback de presión:** un `scale` sutil en botones y tarjetas.
- **Skeleton** mientras cargan los iframes de los cuestionarios.
- **Todo lo que se mueve tiene su versión `prefers-reduced-motion`:** sin transformaciones, solo cambios de opacidad o nada.

### Fase 8 · Accesibilidad (no negociable)

- Contraste AA medido en los 3 temas.
- Navegación completa por teclado y `:focus-visible` visible.
- Pestañas con el patrón WAI-ARIA tabs (flechas, `aria-selected`, `aria-controls`).
- `aria-live="polite"` para anunciar aprobaciones.
- Un "saltar al contenido" (skip link) y un `h1` por pantalla.
- Áreas táctiles de 44–48px mínimo.
- `@media print`: se oculta todo el chrome fijo (barras, recorrido, bordes) y el certificado sale limpio.

### Fase 9 · Verificar y revisar

Después de **cada** cambio:
1. Correr `pnpm lint` y `pnpm build`.
2. Para cambios grandes, lanzar un **sub-agente de revisión con contexto fresco**: *"Revisá este diff buscando bugs, regresiones de navegación (hash, atrás, foco), accesibilidad y reduced motion. No conocés el cambio: juzgalo desde cero."*
3. Probarlo en el navegador, en desktop y en 400px de ancho, y en los 3 temas.
4. Guardar en memoria los gotchas que aparezcan.

---

## 5. Gotchas aprendidos (te ahorran horas)

| Problema | Causa | Solución |
|---|---|---|
| Hoja o modal atrapado dentro de la barra | `backdrop-filter` crea un containing block para `fixed` | `createPortal` a `document.body` |
| Botón blanco sobre blanco | `.boton-primario` estaba antes que `.glass` en el CSS (misma especificidad) | Ordenar el CSS o usar selector doble (`.boton-primario.x`) |
| `.sr-only` visible | Un selector `.x > :not(...)` lo pisaba | Acotar el selector |
| Linter: setState dentro de un effect | Se sincronizaba estado derivado de props con un effect | Patrón "ajustar durante el render" guardando la prop previa |
| El tema parpadea al cargar | El tema se aplicaba recién después del primer render | Script en `index.html` antes del bundle |
| Todo "flota" con una transición al cargar | `transition` global en colores | Clase temporal `tema-cambiando` (300 ms) |
| Respuestas del cuestionario perdidas al navegar | Se desmontaba el iframe | Mantener las etapas montadas con `hidden` |
| Paso marcado como hecho solo por visitarlo | El criterio de "listo" era la visita | Un criterio explícito (`hecho`) cuando existe |
| La barra de chrome se imprime | Elementos fijos en la impresión | Ocultarlos en `@media print` |

---

## 6. Prompts reutilizables

**Auditoría inicial**
```
Auditá [la página / esta sección]. Objetivo: un espacio de aprendizaje armónico,
sin estrés visual. Decime qué está bien, qué cambiarías y por qué, priorizado.
La navegación actual (hashes, atrás, continuar, foco) tiene que mantenerse.
No implementes todavía.
```

**Dirección visual**
```
Quiero estética Notion para el contenido y Liquid Glass de iOS 26 para la
navegación (barras de vidrio que se minimizan, tab bar en móvil, bottom sheet,
segmented control). ¿Lo que hay cumple esto? Proponé cómo llegar.
```

**Temas**
```
Agregá tres temas: claro (Notion), oscuro (el oscuro real de Notion, gris
neutro) y noche (cálido, sepia, sin azul). Por tokens CSS con data-tema en <html>,
sin destello al cargar, el sistema solo elige claro u oscuro, y noche es manual.
Verificá el contraste AA de cada token con un script.
```

**Motion de portada**
```
La portada tiene que *mostrar* el producto, no explicarlo. Hacé una demo que se
escriba sola en bucle: cursor → "/" → menú → bloque creado → un recordatorio que
muestra para qué sirve. Que sea un guion en estado (se pausa con la pestaña
oculta y con reduced motion queda la escena final quieta). Usá layoutId para
que los bloques viajen y View Transition para entrar al curso.
```

**Estructura de curso**
```
Al entrar quiero ver los módulos como tarjetas tipo Notion. Al tocar una:
portada del módulo (logro, intro, temario, botón Empezar). Al empezar: pestañas
Video | Paso a paso | Guía | Cuestionario, con el video visible sin scrollear.
```

**Revisión**
```
Lanzá un sub-agente con contexto fresco que revise el diff: bugs, navegación,
foco, accesibilidad, reduced motion e impresión. Después aplicá solo lo confirmado.
```

---

## 7. Checklist final

- [ ] Una dirección visual nombrada y aplicada en todo el sitio.
- [ ] Todos los colores salen de tokens; 3 temas; sin destello al cargar; contraste AA medido.
- [ ] Contenido plano (Notion) y chrome de vidrio (iOS), sin vidrio sobre texto de lectura.
- [ ] Una etapa por vez y un paso por vez; el contenido principal visible sin scrollear.
- [ ] "Dónde estoy" siempre visible; progreso explicado en palabras.
- [ ] Deep links, atrás y adelante, continuar y foco funcionando.
- [ ] Cada animación con significado, con resortes y con su versión reduced motion.
- [ ] Hojas y modales en un portal; scroll de fondo bloqueado; Esc cierra.
- [ ] Impresión limpia.
- [ ] Lint, build y revisión con un agente de contexto fresco.
