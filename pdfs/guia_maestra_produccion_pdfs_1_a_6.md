# Guía maestra para producir los seis PDF de la capacitación Notion

**Documento de producción y auditoría editorial. Revisión: 18 de octubre de 2026.**

Los seis PDF deben formar una colección práctica: enseñar a construir **un mismo espacio de cursada**, acompañar la explicación de cada módulo y preparar para aplicar lo aprendido en sus cuestionarios. No deben ser transcripciones, respuestas para memorizar ni capturas decorativas.

Este archivo define contenido, páginas, ejemplos, imágenes reales, diseño, trazabilidad y controles de publicación. **No contiene los seis PDF terminados ni imágenes ya producidas.** Las páginas y medidas propuestas son decisiones editoriales; la cobertura semántica de los videos permanece pendiente de revisión.

## Índice y recorrido de lectura

1. [Qué se verificó y qué falta verificar](#1-qué-se-verificó-y-qué-falta-verificar).
2. [Correcciones de los materiales actuales](#2-correcciones-de-los-materiales-actuales).
3. [Contrato pedagógico y caso compartido](#3-contrato-pedagógico-y-caso-compartido).
4. [Sistema visual de la colección](#4-sistema-visual-de-la-colección).
5. [Cómo producir las imágenes reales](#5-cómo-producir-las-imágenes-reales).
6. [Plan de páginas de cada PDF](#6-plan-de-páginas-de-cada-pdf).
7. [Trazabilidad de las 40 preguntas públicas](#7-trazabilidad-de-las-40-preguntas-públicas).
8. [Validación específica de los videos](#8-validación-específica-de-los-videos).
9. [Flujo de producción y archivos](#9-flujo-de-producción-y-archivos).
10. [Aceptación, prioridades y definición de terminado](#10-aceptación-prioridades-y-definición-de-terminado).

**Para empezar:** leer 1 a 3, preparar la demostración y producir primero el PDF 3 como prueba de plantilla. Después completar 1 a 6 en orden pedagógico, usando la matriz de preguntas como control, no como índice del texto.

## 1. Qué se verificó y qué falta verificar

### 1.1 Estados de evidencia

| Estado | Significado en este documento |
| --- | --- |
| Verificado | Se observó en el código, los borradores o los formularios públicos consultados. |
| Propuesto | Criterio para redactar, diseñar o producir; todavía no implementado. |
| Pendiente | Requiere ver el video completo, ejecutar Notion o generar y revisar un artefacto. |

**Verificado en el repositorio:** hay seis explicaciones, seis rutas de descarga y tres enlaces de video configurados. Los módulos 1, 2 y 4 enlazan YouTube; 3, 5 y 6 tienen `videoSrc` vacío. La duración escrita de estos últimos no prueba que exista un video publicado. Fuentes: [`src/data/modulos.js:13-34`](../src/data/modulos.js#L13-L34), [`58-79`](../src/data/modulos.js#L58-L79), [`103-124`](../src/data/modulos.js#L103-L124), [`148-169`](../src/data/modulos.js#L148-L169), [`193-214`](../src/data/modulos.js#L193-L214) y [`238-259`](../src/data/modulos.js#L238-L259).

**Verificado en la auditoría pública:** se consultaron los seis cuestionarios de módulo y el final, con 30 + 10 preguntas. Sus enlaces están en la sección 7 y sus identificadores coinciden con [`src/data/tally.js:8-16`](../src/data/tally.js#L8-L16). Esta es la evaluación pública de referencia para los PDF, no todo el material de evaluación que existe en el proyecto.

**No confundir tres fuentes diferentes:**

- `docs/cuestionarios-tally.md` es un banco local de propuestas, con varios cuestionarios por módulo y su propia planificación; no es una copia exacta de los siete formularios publicados. Véase [`docs/cuestionarios-tally.md:1-16`](../docs/cuestionarios-tally.md#L1-L16).
- `src/components/EvaluacionFinal.jsx` conserva un examen integrador local además de la integración de Tally. Sus preguntas no deben atribuirse automáticamente al final público.
- Los formularios públicos son el objeto de la matriz de 40 filas. Sus temas se parafrasean; no se reproduce íntegramente el banco ni todas las opciones.

**Límite importante:** no se recuperó una transcripción verificable ni se documentó el visionado completo de los videos 1, 2 y 4. Por eso, la alineación con explicaciones y cuestionarios puede planificarse ahora, pero la afirmación «todo coincide también con el video» queda bloqueada por la sección 8.

### 1.2 Qué significa complementariedad

| Recurso | Función principal | Lo que no debe hacer |
| --- | --- | --- |
| Explicación web | Introducir el concepto y su utilidad. | Prometer funciones o resultados no demostrados. |
| Video | Mostrar el procedimiento y la respuesta de la interfaz. | Ser la única fuente de una condición evaluada. |
| PDF | Guiar una práctica, resolver dudas y permitir consulta posterior. | Copiar párrafos sin ejemplos ni comprobaciones. |
| Cuestionario | Comprobar comprensión y decisiones. | Exigir una herramienta no enseñada previamente. |

Un PDF puede completar un detalle que la explicación resume, pero ese agregado debe señalizarse y demostrarse. No se agregan relaciones entre bases, rollups ni fórmulas avanzadas para justificar distractores. El final público no pide configurar una relación: la expresión general «relacionar información» requiere aclaración editorial, no un nuevo módulo técnico.

## 2. Correcciones de los materiales actuales

Estos cambios se aplicarán **al producir las nuevas guías**. Este documento no modifica los borradores existentes.

| Material actual | Qué conservar | Qué corregir o completar |
| --- | --- | --- |
| [`pdf_1_guia_rapida_de_comandos_y_atajos.md`](pdf_1_guia_rapida_de_comandos_y_atajos.md) | Modelo de bloques, `/`, encabezados, Callout y subpáginas. | Convertir la lista de atajos en una práctica visual. Comprobar cada atajo en Windows/Mac e idioma elegido antes de publicarlo. No confundir `/` con barra invertida `\`. La explicación web también usa esa denominación incorrecta en `modulos.js:24`. |
| [`pdf_2_active_recall_en_notion.md:1-13`](pdf_2_active_recall_en_notion.md#L1-L13) y [`39-57`](pdf_2_active_recall_en_notion.md#L39-L57) | Pregunta visible, respuesta oculta y ejemplo de materia. | Quitar «retener el 100 %» y afirmaciones absolutas de retención. Añadir explícitamente Trabajos Prácticos: el esquema actual muestra recursos y clases, pero la explicación y el cuestionario distinguen tres zonas. Añadir `/embed`, diferencias y alternativas. Color más etiqueta textual, nunca semáforo solo. |
| [`pdf_3_diccionario_de_propiedades.md:6-25`](pdf_3_diccionario_de_propiedades.md#L6-L25) | Fila como página, propiedades y diccionario. | Comparar con la tabla simple de Notion, sin afirmar que Excel es «texto muerto». Mostrar Select frente a Multi-select con un registro de dos materias. Diferenciar propiedad Files y archivos dentro de la página. |
| [`propuesta_contenido_pdfs_4_5_6.md`](propuesta_contenido_pdfs_4_5_6.md) | Una fuente compartida, prácticas de vistas, filtros y hub. | Incorporar «Esta semana + no Entregado + fecha ascendente». Mantener tres columnas como diseño acordado, **no como posición exigida por Tally 6**: esa atribución del documento anterior es incorrecta. Dividir los seis pasos del ejercicio 6 en dos procedimientos cortos. |

La propuesta 4-6 queda como **antecedente histórico sin editar**. Esta guía maestra es el brief vigente para la nueva colección y prevalece en esas correcciones. «Seis vistas» significa una selección para el curso, no un catálogo exhaustivo de Notion; hay otros tipos documentados oficialmente. Véase [vistas, filtros y ordenamiento](https://www.notion.com/help/views-filters-and-sorts).

La promesa «retener el 100 %» también aparece en [`src/data/modulos.js:72-74`](../src/data/modulos.js#L72-L74); se registra como ajuste futuro de copy, no como un resultado pedagógico admisible. El PDF 5 no necesita fórmulas aunque el aside diga «Fórmulas y filtros clave» en [`modulos.js:211-214`](../src/data/modulos.js#L211-L214).

## 3. Contrato pedagógico y caso compartido

### 3.1 Objetivos, requisitos y límites

| PDF y destino futuro | Al terminar, el estudiante puede… | Requisito y límite |
| --- | --- | --- |
| 1. **Bloques y atajos para organizar tu cursada** · `public/pdfs/guia-1.pdf` | Crear una página, jerarquizar bloques, moverlos y anidar materias. | Cuenta y página de práctica; no bases ni columnas complejas. |
| 2. **Apuntes activos: recursos, preguntas y respuestas** · `public/pdfs/guia-2.pdf` | Separar recursos/TP/teoría, incrustar material y practicar recuperación. | Bloques básicos; no promesas de memoria perfecta ni planificación automática de repasos. |
| 3. **Tu base de tareas: páginas y propiedades** · `public/pdfs/guia-3.pdf` | Crear una fuente, elegir propiedades y registrar seis tareas. | Páginas y bloques; sin relaciones, rollups ni fórmulas. |
| 4. **Seis vistas: los mismos datos, distintas preguntas** · `public/pdfs/guia-4.pdf` | Usar tabla, tablero y calendario sin duplicar tareas. | Base del PDF 3; lista/galería/cronograma solo como referencia. |
| 5. **Filtros y orden: hoy, esta semana y pendientes** · `public/pdfs/guia-5.pdf` | Combinar condiciones y ordenar resultados, sin borrar datos. | Base con fechas y estados; recetas de filtros, no lenguaje de fórmulas. |
| 6. **Tu hub de cursada: columnas y vistas vinculadas** · `public/pdfs/guia-6.pdf` | Reunir materias y vistas de la fuente existente, verificando sincronización. | PDF 1-5; una página compuesta, no una funcionalidad avanzada homónima. |

Los nombres son propuestas editoriales. Las rutas ya están declaradas en `src/data/modulos.js`; al publicar, sincronizar el texto del botón con el título aprobado, sin cambiar silenciosamente las rutas.

### 3.2 Espacio ficticio único

Crear un espacio de demostración propio, sin datos personales, llamado **Campus de práctica**. Su página principal será **Mi cursada** y contendrá Análisis Matemático I, Algoritmos y Física I. En el PDF 2, Análisis Matemático I tendrá Recursos, Trabajos Prácticos y Apuntes Teóricos.

En el PDF 3 se crea **Tareas de la cursada**. Reutilizarla sin clonarla en 4, 5 y 6. Propiedades: Tarea (Title), Materia (Select), Estado (Status), Fecha límite (Date), Etiquetas (Multi-select) y Consigna (Files & media). Usar siempre **Pendiente / En curso / Entregado**; traducir estados equivalentes del video mediante una nota, no mezclarlos en capturas.

| ID didáctico | Tarea | Materia | Estado inicial | Fecha relativa |
| --- | --- | --- | --- | --- |
| T01 | Resolver guía de derivadas | Análisis Matemático I | Pendiente | Hoy |
| T02 | Entregar TP de algoritmos | Algoritmos | En curso | Hoy |
| T03 | Leer capítulo de cinemática | Física I | Pendiente | Mañana |
| T04 | Corregir informe de laboratorio | Física I | Pendiente | Ayer |
| T05 | Subir resumen de límites | Análisis Matemático I | Entregado | Hoy |
| T06 | Consultar consigna del proyecto | Algoritmos | Pendiente | Sin fecha |

Los ID son referencias editoriales; no hace falta crear otra propiedad. Registrar las fechas absolutas usadas en cada captura. Para el ejercicio semanal, elegir un **miércoles de demostración** y mapear ayer/hoy/mañana a martes/miércoles/jueves: quedan dentro de la misma semana sin depender del día en que se redacte. Ejemplo reproducible: 20/21/22 de octubre de 2026. Si se ejecuta después, actualizar fechas y leyendas; no presentar una captura antigua como filtro actualizado en vivo.

**Excepción didáctica para Multi-select:** duplicar solo la propiedad en una pequeña prueba temporal llamada «Materias involucradas», no la fuente entera. En T06 seleccionar Algoritmos y Física I para demostrar varias opciones; después conservar Materia como Select en el caso principal. Una tarea puede involucrar dos materias: «una sola» es una elección del modelo básico, no una regla universal de Notion.

### 3.3 Unidad didáctica repetible

Cada tema sigue **observar → comprender → hacer → comprobar → transferir**. Un procedimiento tendrá hasta cinco pasos; si necesita más, dividirlo en dos con resultados intermedios. Cada paso contiene acción, objeto visible y señal de éxito, no «configurar correctamente».

«Dinámico» significa alternancia de lectura, demostración y práctica. Un PDF estático no promete desplegables interactivos, videos incrustados reproducibles ni animaciones. Se muestra el antes/después y se invita a ejecutar la acción en Notion. Los enlaces complementan, pero no sustituyen instrucciones esenciales.

## 4. Sistema visual de la colección

### 4.1 Identidad observada y adaptación para papel

La web ya usa blanco cálido, texto oscuro, Inter, azul y tarjetas suaves. Son **tokens del proyecto**, no una certificación de diseño oficial de Notion: [`src/index.css:9-29`](../src/index.css#L9-L29), [`35-53`](../src/index.css#L35-L53), [`85-107`](../src/index.css#L85-L107). Sus callouts y prácticas refuerzan una gramática de bloques que conviene conservar, no copiar toda la interfaz de la página en cada hoja.

| Función | Token observado en web | Aplicación propuesta en PDF |
| --- | --- | --- |
| Papel / superficies | `#FFFFFF` / `#F7F6F3` | Página blanca; cálido en recuadros, no fondo completo obligatorio. |
| Texto principal | `#37352F` | Cuerpo, títulos y pasos. |
| Secundario | `#787774`, `#9B9A97` | No copiar el gris claro para texto pequeño; usar principal o gris más oscuro comprobado. |
| Acento | `#2383E2`, tinte al 10 % | Regla lateral, marcas, progreso y grandes acentos. Enlace pequeño: `#1B65B0`, subrayado. |
| Práctica | `#E4B831` + tinte | Fondo `#FCF8EA`, texto `#92400E`, rótulo «Práctica». |
| Resultado | `#16A34A` + tinte | Fondo `#E8F5EC`, texto `#166534`, rótulo «Comprobación». |
| Advertencia | `#DC2626` + tinte | Fondo `#FCE9E9`, texto `#991B1B`, rótulo «Atención». |

El contraste calculado orienta decisiones: `#37352F` sobre blanco **12,26:1** y sobre cálido **11,35:1**; azul original sobre blanco **3,88:1**, por eso no usarlo en enlaces pequeños. El gris `#787774` da **4,48:1** sobre blanco: no redondearlo para declararlo 4,5. Azul de enlace propuesto sobre blanco **5,94:1**; sobre `#E9F2FC`, **5,25:1**. Los pares verde, ámbar y rojo propuestos dan **6,35 / 6,67 / 7,11:1** respectivamente.

Usar como criterios mínimos de diseño 4,5:1 para texto habitual, 3:1 para texto grande y 3:1 para gráficos significativos; comprobar el tamaño/peso antes de tratar un título como grande. Referencias: [contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) y [luminancia relativa](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance). Estos controles **no certifican por sí solos accesibilidad integral ni conformidad PDF/UA**.

### 4.2 Retícula, tipografía y espacio

**Formato propuesto:** A4 vertical, 210 × 297 mm; márgenes superior/laterales 18 mm e inferior 20 mm. Área útil: 174 × 259 mm. Columna principal única. Usar dos columnas solo para comparaciones breves; nunca reducir una captura de menú para hacerla entrar.

| Estilo | Tamaño / interlínea | Peso y uso |
| --- | --- | --- |
| Título inicial | 30 / 35 pt | 700, máximo tres líneas. |
| Título de sección | 22 / 27 pt | 700, un tema por bloque. |
| Subtítulo | 16 / 21 pt | 600, distingue partes del procedimiento. |
| Paso / pregunta de práctica | 13 / 18 pt | 600; número separado del texto. |
| Cuerpo | 12 / 18 pt | 400; párrafos breves, alineados a la izquierda. |
| Código o comando | 11 / 15 pt | Monoespaciada con fondo tenue. |
| Pie de imagen | 10 / 14 pt | Describe la evidencia, no repite «imagen de Notion». |
| Pie de página | 9,5 / 13 pt | Módulo, sección y página. |

Inter es la familia de la web: [`src/index.css:6`](../src/index.css#L6), [`45-47`](../src/index.css#L45-L47). Incrustar fuentes permitidas en el PDF; fallback revisado: Segoe UI o una sans serif disponible con acentos completos. Para comandos: Consolas o equivalente. Comprobar licencias y glifos, sin asumir que importar una fuente web garantiza incrustación en el exportador.

**Escala de separación:** 6 pt después de párrafo; 12-16 pt entre bloques; 24 pt antes de una sección. Tarjetas con 12-14 pt de relleno, radio 6-8 pt y borde 0,6 pt. Mantener título con el primer párrafo, captura con pie y pasos sin cortes arbitrarios. Reservar espacio en blanco para separar ideas; no llenar huecos con iconos. Eliminar sombras fuertes; la cuadrícula web de 24 px puede aparecer solo en una franja inicial muy tenue. No trasladar animaciones ni transparencias dependientes de pantalla al papel.

### 4.3 Componentes y ejemplo de página

Cuatro componentes reutilizables: **Idea clave** (azul, explica un principio); **Práctica** (ámbar, tarea y punto de partida); **Atención** (rojo, consecuencia real); **Comprobación** (verde, resultado observable). Usar icono más palabra, nunca color como único significado. No colocar un recuadro alrededor de todos los párrafos.

```text
BOCETO EDITORIAL: no es una captura de Notion
┌──────────────────────────────────────────────┐
│ PDF 5 · Filtros                    03 / 06   │
│ Mi día hoy                                   │
│ Una lista de vencimientos, no toda tu agenda. │
│                                              │
│ IDEA CLAVE · Hoy Y no Entregado              │
│ Las dos condiciones deben cumplirse.         │
│                                              │
│ 1. Abrir ajustes de la vista...              │
│ 2. Elegir Fecha límite...                    │
│                                              │
│ [Captura real grande: condiciones del filtro]│
│ ① Fecha relativa   ② Conector Y   ③ Estado   │
│ Figura 5.2 · Ambas reglas limitan la vista.  │
│                                              │
│ COMPROBACIÓN · Aparecen T01 y T02.           │
│ ¿Por qué T05 no debería aparecer?           │
├──────────────────────────────────────────────┤
│ Campus de práctica · versión · página 3      │
└──────────────────────────────────────────────┘
```

Una imagen puede ocupar 35-50 % de una página didáctica si lo necesita, pero no es una cuota. Evitar portadas vacías: la primera página ya presenta objetivo, requisitos y resultado. Navegación constante: módulo, tema, número real de página, enlace al curso y próximo paso. Añadir marcadores del PDF por secciones, enlaces descriptivos y texto seleccionable. QR opcional y redundante con un enlace legible; no obligar a tener otro dispositivo.

A4 es fijo, **no responsive**. Para móvil, priorizar una columna, recortes ampliados y texto breve; probar a ancho de teléfono. Si exige zoom excesivo, ofrecer además la fuente web accesible: no prometer que una hoja A4 se comporta como una página móvil. Revisar también impresión en escala de grises.

## 5. Cómo producir las imágenes reales

### 5.1 Política de captura

Todas las capturas previstas abajo están **pendientes**. Se harán en Notion real, en el espacio ficticio controlado por el equipo. No usar imágenes generadas por IA, mockups de interfaz ni diagramas como si fueran pruebas del producto. Un esquema propio puede explicar «una fuente → varias vistas», siempre rotulado como **diagrama conceptual**.

Antes de capturar: ocultar correo, avatar identificable, otros espacios, notificaciones, miembros, enlaces privados y documentos de terceros. Usar PDF ficticio propio para el ejemplo de archivos. El modo de demostración puede tener interfaz en español; conservar el nombre inglés entre paréntesis cuando ayude a conectar con videos. Registrar idioma, aplicación web/escritorio/móvil, fecha, versión si es visible, zoom y tamaño del viewport. Los nombres exactos de menús deben verificarse en esa sesión, no inventarse a partir de un tutorial antiguo.

**Captura útil:** conservar título de página/vista y control accionado; recortar ruido sin perder contexto. Hacer una panorámica legible y acercamientos separados. Máximo tres marcadores numerados por imagen; la instrucción debe referirse a esos números. Las flechas no tapan etiquetas ni alteran valores. No reemplazar textos de la interfaz al anotar.

Guardar original PNG y copia anotada; no recomprimir como JPEG un menú con texto. Dimensionar según resolución **efectiva al imprimir**: `píxeles ÷ (ancho en mm / 25,4)`. A 174 mm de ancho, 1.500 px dan aproximadamente 219 ppp; a 150 ppp hacen falta unos 1.028 px; a 300 ppp, 2.055 px. Apuntar a 150-220 ppp para interfaz y 300 cuando se pueda. Capturar a resolución nativa o 2× real disponible; no agrandar una imagen pequeña para fingir detalle. Las etiquetas principales deben leerse aproximadamente como 10-11 pt en el tamaño final; si no, dividir la captura.

### 5.2 Convención y manifiesto

Nombres propuestos: `m03-c02-propiedad-fecha-original.png` y `m03-c02-propiedad-fecha-anotada.png`. Cada ID `M3-C02` del plan remite al manifiesto. El texto alternativo explica lo relevante para aprender; el pie indica qué se está demostrando. Ambos se redactan aparte, aunque describan la misma imagen.

```yaml
id: M3-C02
estado: pendiente
archivo_original: assets/pdf/notion/m03-c02-propiedad-fecha-original.png
archivo_anotado: assets/pdf/notion/m03-c02-propiedad-fecha-anotada.png
pagina_pdf: 3
origen: "Espacio propio Campus de práctica; captura aún no realizada"
fecha_captura: null
interfaz: "Notion; idioma, plataforma y zoom por completar"
derechos: "Pendiente confirmar captura propia y ausencia de terceros"
datos: "T01; Fecha límite; datos ficticios"
recorte: "Selector de propiedad más contexto de la tabla"
anotacion: "1: tipo Date; 2: día elegido"
pie: "La fecha es una propiedad estructurada, no texto en el título."
alt: "Selector de fecha de T01 con un día seleccionado en Fecha límite."
```

La documentación oficial sirve para comprobar funciones, **no supone permiso para reutilizar sus imágenes**. Preferir capturas propias, registrar procedencia y revisar condiciones aplicables antes de distribuir. No incluir programas de cátedra, fotos ni logos de terceros sin permiso. Guardar las autorizaciones cuando correspondan.

## 6. Plan de páginas de cada PDF

**Extensión orientativa:** seis páginas por guía, ajustables a cinco-siete o más si la legibilidad lo exige. No comprimir cuerpo ni capturas para cumplir un número. Los títulos siguientes son secciones de contenido, no una obligación de que cada una empiece en hoja nueva.

Cada inventario de imágenes especifica página, acción/datos, recorte/anotación y pie/alt de partida. **Estado de todas sus filas: pendiente de captura real.**

### 6.1 PDF 1: Bloques y atajos para organizar tu cursada

**Resultado:** Mi cursada contiene tres materias anidadas; una de ellas incluye título, lista y aviso destacado. Explicación de referencia: [`modulos.js:20-25`](../src/data/modulos.js#L20-L25).

| Página | Contenido y composición |
| --- | --- |
| 1 | Objetivo, requisitos y resultado real esperado. Panorámica M1-C01; presentar «Cada párrafo, encabezado o imagen es un bloque que se puede mover y transformar». |
| 2 | Menú `/`: encabezados, lista, cita, código y Callout. Enseñar la diferencia entre escribir texto y elegir un tipo de bloque, con M1-C02. |
| 3 | Mover y transformar sin reescribir. Antes/después M1-C03; explicar el control de arrastre y «Convertir en» con etiqueta real verificada. |
| 4 | Jerarquía Mi cursada → materia → Clase 1 → bloques del apunte. M1-C04 y procedimiento de cinco pasos. Callout para fecha de parcial, M1-C05. |
| 5 | Referencia compacta de diez acciones: `/`, encabezado, subpágina, lista, to-do, Callout, divisor, mover, duplicar, transformar. Atajos solo tras prueba por sistema; priorizar la vía de menú para no bloquear al principiante. |
| 6 | Práctica, comprobación y transferencia; resumen de errores y enlace al módulo 2. No incluir respuestas literales de Tally. |

**Procedimiento principal, hasta cinco pasos:** abrir Mi cursada; crear Análisis Matemático I como subpágina; insertar encabezado y lista; transformar «Parcial: fecha de ejemplo» en Callout; mover un bloque y verificar que conserva su texto. Crear las otras dos materias como repetición breve, no otro procedimiento de diez acciones. Después, crear «Clase 1» dentro de Análisis y colocar allí un apunte: comprobar la secuencia inicio → materia → clase → contenido, evaluada en el final.

**Texto clave:** «Un encabezado organiza; un Callout destaca. Ninguno crea por sí solo un recordatorio. Una subpágina organiza contenido; no es una carpeta del sistema de archivos».

**Práctica y resultado conocido:** obtener tres subpáginas bajo Mi cursada y un aviso destacado dentro de Análisis. **Autocomprobación:** cerrar y volver a abrir una materia; mover su lista sin copiarla. **Transferencia:** decidir dónde ubicar una advertencia de entrega y justificar por qué no sería un párrafo más.

| Captura | Página y evidencia | Recorte / anotación | Pie y alt de partida |
| --- | --- | --- | --- |
| M1-C01 | 1; Mi cursada con tres materias. | Página y navegación cercana; marcar jerarquía. | Pie: «Un inicio, tres materias». Alt: «Mi cursada muestra Análisis, Algoritmos y Física como subpáginas». |
| M1-C02 | 2; `/` con tipos de bloque visibles. | Menú más línea activa; marcar `/` y opciones. | Pie: «El menú elige qué bloque crear». Alt: «Menú de bloques abierto junto al punto de inserción». |
| M1-C03 | 3; mismo texto antes/después de transformación. | Dos recortes comparables; numerar origen/destino. | Pie: «Cambiar el tipo conserva el contenido». Alt: «La fecha pasa de párrafo a aviso sin reescritura». |
| M1-C04 | 4; crear Clase 1 dentro de una materia. | Título y ubicación; marcar padre/hija y bloques internos. | Pie: «La ubicación construye la jerarquía». Alt: «Clase 1 aparece dentro de Análisis y contiene bloques del apunte». |
| M1-C05 | 4; Callout con fecha ficticia. | Aviso completo y contexto; no solo icono. | Pie: «La información importante se distingue por función». Alt: «Aviso rotulado Parcial con fecha de ejemplo». |

**Errores frecuentes:** escribir `\` en lugar de `/`; usar todo como H1; borrar para cambiar formato; crear materias sueltas fuera del inicio. **Puente:** dentro de una materia, el PDF 2 organiza cómo estudiar, no solo dónde guardar.

### 6.2 PDF 2: Apuntes activos: recursos, preguntas y respuestas

**Resultado:** una materia con tres zonas y dos preguntas autocorregibles mediante desplegables. Referencia: [`modulos.js:65-70`](../src/data/modulos.js#L65-L70).

| Página | Contenido y composición |
| --- | --- |
| 1 | Mostrar Recursos / Trabajos Prácticos / Apuntes Teóricos, M2-C01. Aclarar que son zonas funcionales y no necesariamente tres columnas. |
| 2 | Construir un toggle con pregunta en el título y respuesta dentro, M2-C02. No usar el título para almacenar pregunta y respuesta visibles juntas. |
| 3 | Ciclo: intentar recordar sin mirar → abrir → comparar → corregir → volver a intentar otro día. M2-C03. Usar etiquetas «Necesito repasar / Parcial / Pude explicar», además del color si se utiliza. |
| 4 | Insertar un PDF propio con `/pdf`, M2-C04. Mostrar vista embebida y distinguir un enlace de una vista previa. |
| 5 | `/embed`: recurso externo o archivo según opciones admitidas; permisos y alternativa de enlace, M2-C05. Mini diagnóstico si no carga. |
| 6 | Práctica de dos preguntas, comprobar ubicación del contenido y diseñar una pregunta nueva sobre otro tema. Puente a registrar entregas. |

**Texto clave:** «Antes de abrir el desplegable, explica la respuesta con tus palabras. Reconocer una respuesta al verla no demuestra que pudieras recuperarla sin ayuda». No prometer estudiar menos siempre ni porcentajes de retención.

**Procedimiento A:** abrir Análisis; crear las tres zonas; insertar un toggle bajo teoría; escribir «¿Qué expresa la derivada en un punto?»; agregar dentro «La tasa de cambio instantánea; geométricamente, la pendiente de la tangente». Verificar abierto/cerrado.

**Procedimiento B:** preparar un PDF ficticio de una página; insertar el bloque PDF y cargarlo; ajustar su tamaño; comprobar lectura; añadir un enlace alternativo descriptivo. Para Embed, hacer una demostración separada de hasta cinco pasos con **el mismo PDF ficticio**, mediante Upload o URL permitida según las opciones vigentes, sin login adicional. Comprobar que se renderiza y se puede leer: mostrar otro recurso o un video no demuestra la cobertura del caso PDF evaluado en F-Q5.

La [ayuda oficial sobre incrustaciones](https://www.notion.com/help/embed-and-connect-other-apps) documenta `/embed`, carga de archivos y URL admitidas. **No afirmar que Embed es solo URL ni que cualquier enlace o tipo de archivo funciona igual que PDF.** Probar el recurso real, los permisos, las restricciones de incrustación y límites del plan. Si falla, conservar el enlace y explicar el motivo, sin simular una previsualización exitosa.

| Captura | Página y evidencia | Recorte / anotación | Pie y alt de partida |
| --- | --- | --- | --- |
| M2-C01 | 1; tres zonas con ejemplos propios. | Materia completa, texto legible; tres rótulos. | Pie: «Cada recurso tiene un lugar». Alt: «La materia separa Recursos, Trabajos Prácticos y Apuntes Teóricos». |
| M2-C02 | 2; crear toggle y colocar respuesta dentro. | Pregunta y área interna; marcar anidación. | Pie: «La respuesta pertenece al desplegable». Alt: «Pregunta sobre derivada con su respuesta dentro del toggle». |
| M2-C03 | 3; cerrado y abierto, mismo contenido. | Dos recortes idénticos de tamaño; una comparación. | Pie: «Primero recuperar, después comprobar». Alt: «La respuesta queda oculta al cerrar y visible al abrir». |
| M2-C04 | 4; PDF ficticio visible en Recursos. | Bloque y título; marcar contenido incrustado. | Pie: «Consultar el material sin salir de la materia». Alt: «PDF de práctica legible dentro de Recursos». |
| M2-C05 | 5; diálogo Embed y el mismo PDF ficticio de M2-C04 renderizado. | Control de carga o URL permitida y resultado en paneles separados. | Pie: «El mismo PDF también se prueba mediante Embed». Alt: «Opciones reales de Embed y PDF de práctica legible tras su incorporación». |

**Comprobación:** tres zonas, dos preguntas cerradas y respuestas completas al abrir; PDF accesible y enlace alternativo probado. **Transferencia:** transformar un subtítulo propio en una pregunta que exija explicar, no solo reconocer un término. **Errores:** respuesta fuera del toggle, confundir ocultar con aprender, prometer 100 %, recurso privado inaccesible. **Puente:** los TP de la materia se registran en una base central, no en agendas manuales paralelas.

### 6.3 PDF 3: Tu base de tareas: páginas y propiedades

**Resultado:** una base con seis registros identificables, propiedades correctas y una página interna con consigna. Referencia: [`modulos.js:110-115`](../src/data/modulos.js#L110-L115).

| Página | Contenido y composición |
| --- | --- |
| 1 | Tabla simple frente a base; abrir T01 como página, M3-C01. Explicar por qué el contenido interno y las propiedades cumplen funciones diferentes. |
| 2 | Crear una base dentro de la página mediante la opción vigente de Database. Title como nombre del registro; no cambiarlo por una etiqueta de estado. |
| 3 | Diccionario visual: Materia Select, Fecha Date y Estado Status, M3-C02 y M3-C03. Nombre del tipo, decisión y ejemplo, no siete párrafos aislados. |
| 4 | Select frente a Multi-select, M3-C04. Prueba temporal con T06 y dos materias; Files & media frente a contenido interno, M3-C05. |
| 5 | Introducir los seis registros del caso y revisar tipos, estados y fechas. Tabla de control, M3-C06; separar en recortes si es ancha. |
| 6 | Ejercicio, diagnóstico de errores y transferencia a otra entrega; puente a vistas. |

**Texto clave:** «Title identifica la página; Date guarda una fecha estructurada; Select permite una opción y Multi-select varias. El nombre que damos a la propiedad no cambia su tipo». La [referencia oficial de propiedades](https://www.notion.com/help/database-properties) es la base para comprobar etiquetas y posibilidades.

**Procedimiento A:** insertar una nueva base; nombrarla Tareas de la cursada; renombrar Title como Tarea; agregar Materia/Estado/Fecha límite; crear T01 y abrir su página. **Procedimiento B:** añadir Etiquetas y Consigna; completar los otros cinco registros; adjuntar una consigna propia; hacer la prueba de dos materias; verificar contra el caso inicial. No asumir que escribir «hoy» en el título equivale a asignar una fecha.

| Captura | Página y evidencia | Recorte / anotación | Pie y alt de partida |
| --- | --- | --- | --- |
| M3-C01 | 1; T01 abierta desde su fila. | Tabla y página interna; marcar mismo nombre. | Pie: «Una fila también es una página». Alt: «T01 se abre con propiedades y espacio para bloques». |
| M3-C02 | 3; tipo Date y fecha asignada. | Selector con contexto; dos marcadores. | Pie: «La fecha permite calendario y filtros». Alt: «Fecha límite de T01 usa el tipo Date». |
| M3-C03 | 3; Estado con tres opciones. | Menú de propiedad; nombres completos. | Pie: «Un criterio común para el progreso». Alt: «Estado ofrece Pendiente, En curso y Entregado». |
| M3-C04 | 4; Select una opción / Multi-select dos. | Comparación de T06; marcar diferencia de cardinalidad. | Pie: «Elegir uno no es elegir varios». Alt: «Una propiedad admite una materia y otra dos materias simultáneas». |
| M3-C05 | 4; archivo en Consigna y bloques internos. | Fila o página con ambas zonas; no datos privados. | Pie: «Archivo asociado y desarrollo interno son distintos». Alt: «La consigna adjunta acompaña una página con notas». |
| M3-C06 | 5; tabla de seis registros. | Tabla control; ampliar columnas en dos tomas si hace falta. | Pie: «Seis tareas serán la fuente de los próximos módulos». Alt: «Los seis registros conservan sus materias, fechas y estados iniciales». |

**Resultado comprobable:** seis filas; T01 tiene una página con una lista de pasos; T06 permanece sin fecha; T05 está Entregado. **Transferencia:** decidir el tipo adecuado para una tarea compartida entre dos materias y justificarlo. **Errores:** tabla simple por base, propiedad textual por Date, confundir Status con color decorativo. **Puente:** no recrear las tareas al hacer un tablero.

### 6.4 PDF 4: Seis vistas: los mismos datos, distintas preguntas

**Resultado:** Tabla, Por estado y Entregas consultan las mismas seis tareas. Referencia: [`modulos.js:155-160`](../src/data/modulos.js#L155-L160).

| Página | Contenido y composición |
| --- | --- |
| 1 | Diagrama conceptual de fuente y vistas, junto a M4-C01 real. Explicar identidad del registro y riesgo de borrado. |
| 2 | Crear Board y **elegir explícitamente agrupación por Estado**, M4-C02. No prometer que siempre se agrupa solo por la propiedad deseada. |
| 3 | Mover T01 a En curso y comprobarlo en tabla, M4-C03. Distinguir movimiento de tarjeta y reordenamiento de texto. |
| 4 | Calendar por Fecha límite, M4-C04; mover T03 a otro día y verificar la propiedad, M4-C05. Restablecer la fecha inicial al terminar. |
| 5 | Seis vistas seleccionadas: Table para editar; Board para etapas; Calendar para días; List para consulta breve; Gallery para referencias visuales; Timeline para periodos. M4-C06. No presentar lista exhaustiva del producto. |
| 6 | Práctica, diferencias entre borrar tarea/eliminar vista/filtrar y diagnóstico de tarea sin fecha. Puente a filtros. |

**Procedimiento:** mantener Tabla como control; añadir Por estado; agrupar por Estado; mover T01; verificar en Tabla. Un segundo procedimiento corto agrega Entregas usando Fecha límite y verifica cinco tareas fechadas. T06 sigue en la fuente aunque no tenga día asignado.

**Texto clave:** «Cambiar de vista cambia la presentación. Arrastrar entre estados o días sí puede cambiar una propiedad. Borrar una tarea afecta al registro compartido; quitar una vista no equivale a borrarlo». Respaldar con [vistas](https://www.notion.com/help/views-filters-and-sorts), [tableros](https://www.notion.com/help/boards) y [calendarios](https://www.notion.com/help/calendars). Mostrar borrado solo en un registro desechable, nunca pedir eliminar un trabajo real.

| Captura | Página y evidencia | Recorte / anotación | Pie y alt de partida |
| --- | --- | --- | --- |
| M4-C01 | 1; pestañas de una misma fuente. | Fuente y vistas con T01 reconocible. | Pie: «Varias perspectivas, no varias copias». Alt: «Tabla, tablero y calendario comparten la fuente de tareas». |
| M4-C02 | 2; opción agrupar por Estado. | Menú y columnas; marcar propiedad. | Pie: «La agrupación define las columnas». Alt: «El tablero utiliza Estado para agrupar tarjetas». |
| M4-C03 | 3; T01 antes/después y tabla. | Tres detalles legibles, no panorama diminuto. | Pie: «Mover cambia el estado del mismo registro». Alt: «T01 pasa a En curso y la tabla refleja ese estado». |
| M4-C04 | 4; Calendar y selector de fecha. | Propiedad y semana relevante; dos marcas. | Pie: «El calendario necesita una propiedad Date». Alt: «Entregas ubica registros según Fecha límite». |
| M4-C05 | 4; T03 movida y fecha resultante. | Día inicial/final y propiedad; restaurar tras captura. | Pie: «Reprogramar modifica la fecha compartida». Alt: «T03 conserva identidad pero cambia de día». |
| M4-C06 | 5; List/Gallery/Timeline del mismo caso. | Tres recortes independientes y rotulados. | Pie: «Elegir según la pregunta». Alt: «Tres presentaciones alternativas de la fuente existente». |

Timeline es referencia opcional: para mostrar duración, usar un rango de trabajo propio sin sobrescribir Fecha límite. **Comprobación:** siguen siendo seis tareas; T01 cambió de estado; T06 puede localizarse desde Tabla. **Transferencia:** elegir tablero o calendario según se pregunte progreso o vencimiento. **Errores:** crear otra fuente, borrar por confundir ocultar, no elegir Date. **Puente:** una vista puede seleccionar solo algunas tareas.

### 6.5 PDF 5: Filtros y orden: hoy, esta semana y pendientes

**Resultado:** vistas reproducibles de foco con condiciones y orden correctos. Referencia: [`modulos.js:200-205`](../src/data/modulos.js#L200-L205).

| Página | Contenido y composición |
| --- | --- |
| 1 | Filtrar decide qué aparece; ordenar decide en qué secuencia; permisos deciden quién accede. M5-C01, vista control frente a foco. |
| 2 | Y/AND exige ambas condiciones; O/OR acepta al menos una. Pequeña tabla «entra/no entra» de los seis registros; diagrama conceptual rotulado. Ejemplo breve de filtro Materia = Algoritmos, que selecciona T02 y T06 sin crear otra fuente. |
| 3 | Mi día hoy: Fecha límite es Hoy **Y** Estado no es Entregado, M5-C02. Mañana el criterio es relativo, no una fecha fija. |
| 4 | Esta semana: Fecha límite en Esta semana **Y** Estado no es Entregado; ordenar Fecha límite ascendente, M5-C03 y M5-C04. Es una receta central evaluada, no un apéndice. |
| 5 | Atrasadas y Por programar, M5-C05; antes/después de completar T01, M5-C06. No confundir una vista vacía con pérdida de datos. |
| 6 | Práctica con resultados esperados, diagnóstico y transferencia a otra combinación de condiciones. Puente al hub. |

| Vista | Regla de filtro | Orden / resultado inicial del caso |
| --- | --- | --- |
| Mi día hoy | Fecha límite = Hoy Y Estado ≠ Entregado. | Tarea ascendente; aparecen T01 y T02. |
| Esta semana | Fecha límite = Esta semana Y Estado ≠ Entregado. | Fecha límite ascendente; con la semana de demostración aparecen T04, T01/T02, T03. Resolver empates por Tarea. |
| Atrasadas | Fecha límite anterior a Hoy Y Estado ≠ Entregado. | Fecha ascendente; aparece T04. |
| Por programar | Fecha límite vacía Y Estado ≠ Entregado. | Tarea ascendente; aparece T06. |

Son reglas editoriales, no fórmulas para pegar. Verificar nombres y controles vigentes de [filtros y ordenamiento](https://www.notion.com/help/views-filters-and-sorts). El inicio de semana y zona horaria pueden afectar ejemplos relativos; registrar el contexto y usar fechas sin hora en la práctica básica.

**Procedimiento A:** restablecer el caso; crear Mi día hoy; elegir las dos condiciones con Y; comprobar T01/T02; completar T01 y comprobar que solo queda T02, sin perder T01 en Tabla. **Procedimiento B:** restablecer estados; crear Esta semana; aplicar dos condiciones; ordenar por fecha ascendente; comparar cada entrada con la tabla de control.

**Texto clave:** «Vence hoy no significa todo lo que conviene estudiar hoy. Los filtros no reprograman tareas atrasadas ni garantizan privacidad». Los [permisos](https://www.notion.com/help/sharing-and-permissions) son un mecanismo distinto. Advertir que guardar ajustes para todos o solo para la sesión depende de los controles y permisos disponibles.

| Captura | Página y evidencia | Recorte / anotación | Pie y alt de partida |
| --- | --- | --- | --- |
| M5-C01 | 1-2; Tabla completa y vista Materia = Algoritmos. | Dos recortes con conteos y condición visibles. | Pie: «Ocultar en una vista no elimina». Alt: «La fuente tiene seis tareas; el filtro por Algoritmos muestra T02 y T06». |
| M5-C02 | 3; dos reglas de Mi día hoy. | Fecha, Y, Estado; tres marcas. | Pie: «Las dos condiciones deben cumplirse». Alt: «Filtro relativo Hoy unido con no Entregado mediante Y». |
| M5-C03 | 4; reglas de Esta semana. | Panel abierto y nombre de vista. | Pie: «Cambiar el periodo sin mostrar tareas terminadas». Alt: «Filtro semanal mantiene la exclusión de Entregado». |
| M5-C04 | 4; sort ascendente y lista resultante. | Propiedad, dirección y fechas legibles. | Pie: «Primero vence lo más próximo». Alt: «T04 precede a tareas de hoy y mañana por fecha ascendente». |
| M5-C05 | 5; Atrasadas y Por programar. | Dos paneles y registros; marcar T04/T06. | Pie: «El foco diario no debe esconder pendientes olvidados». Alt: «T04 aparece como atrasada y T06 como tarea sin fecha». |
| M5-C06 | 5; completar T01 y consultar Tabla. | Antes/después y comprobación origen. | Pie: «Sale del filtro, permanece en la fuente». Alt: «Al completar T01 deja de verse en Hoy y sigue registrada». |

**Autocomprobación:** explicar por qué T05 queda fuera de Hoy y por qué T06 queda fuera de Esta semana. **Transferencia:** diseñar `(Hoy O atrasada) Y no Entregado` y probar con los seis registros. **Errores:** O en lugar de Y, fecha fija, orden descendente, olvidar sin fecha. **Puente:** las recetas se usan sobre vistas vinculadas, no copias manuales.

### 6.6 PDF 6: Tu hub de cursada: columnas y vistas vinculadas

**Resultado:** un inicio con accesos a materias, calendario y foco diario, alimentados por la misma fuente. Referencia: [`modulos.js:245-250`](../src/data/modulos.js#L245-L250).

| Página | Contenido y composición |
| --- | --- |
| 1 | Resultado final M6-C01 y mapa de dependencias: páginas del 2, datos del 3, vistas del 4 y filtros del 5. |
| 2 | Tres columnas como decisión del curso: izquierda materias/recursos, centro calendario, derecha Hoy. Arrastre y guía vertical, M6-C02. No es una posición obligatoria para aprobar Tally 6. |
| 3 | Insertar vista de una fuente existente, M6-C03; reconocer su nombre y evitar New empty database o duplicación de fuente. |
| 4 | Filtro propio y datos compartidos: ver T02 en Hoy, completarla, observar que desaparece de Hoy y comprobarla como Entregado en Tabla, M6-C04. Cambiar un filtro no debe confundirse con editar el registro. |
| 5 | Calendario semanal, acceso a Tabla completa y revisión de permisos. Escritorio/móvil, M6-C05; orden de lectura y anchura usable. |
| 6 | Prueba integradora de principio a fin, M6-C06; autoevaluación y acceso al final público. No crear un séptimo PDF ni introducir relaciones avanzadas. |

**Procedimiento A:** abrir Mi cursada; poner enlaces a las tres materias; crear tres columnas; ajustar ancho del calendario; comprobar que cada enlace abre la materia correcta. **Procedimiento B:** insertar una vista vinculada; elegir Tareas de la cursada; configurar Hoy con sus dos condiciones; añadir Calendar de la misma fuente; marcar T02 como Entregado y comprobar que desaparece de Hoy pero permanece Entregado en Tabla. Separar la revisión móvil/permisos como comprobaciones posteriores.

La ayuda oficial describe [fuentes de datos y vistas vinculadas](https://www.notion.com/help/data-sources-and-linked-databases) y [columnas](https://www.notion.com/help/columns-headings-and-dividers). La interfaz puede mostrar «Link to existing data source» u otra etiqueta localizada: capturar la real. **Vista vinculada no significa propiedad Relation.** El hub muestra y edita registros existentes; una relación conectaría registros de fuentes distintas, tema fuera de alcance.

**Texto clave:** «Los datos son compartidos; cada vista conserva su presentación y filtros. Quitar una presentación no es lo mismo que borrar la fuente. Compartir el hub no concede automáticamente acceso a todos los datos vinculados».

| Captura | Página y evidencia | Recorte / anotación | Pie y alt de partida |
| --- | --- | --- | --- |
| M6-C01 | 1; hub de tres columnas completo. | Panorama más recortes ampliados, sin texto diminuto. | Pie: «Un inicio para consultar, estudiar y actuar». Alt: «Materias a la izquierda, calendario central y foco diario a la derecha». |
| M6-C02 | 2; arrastre y guía vertical. | Bloque, destino y guía; dos marcas. | Pie: «Las columnas se construyen con bloques». Alt: «Una guía vertical indica dónde soltar un bloque para crear columna». |
| M6-C03 | 3; selector de fuente existente. | Nombre de la fuente y opción elegida. | Pie: «Vincular no es volver a crear». Alt: «Se selecciona Tareas de la cursada como fuente existente». |
| M6-C04 | 4; T02 en Hoy antes de completar, su desaparición de Hoy y su conservación como Entregado en Tabla. | Secuencia de tres recortes; conservar nombre de vista y marcar Estado en Tabla. | Pie: «Al completar, sale de Hoy pero sigue en la fuente». Alt: «T02 aparece inicialmente en Hoy; tras completarla deja esa vista y permanece Entregado en la tabla original». |
| M6-C05 | 5; mismo hub en móvil. | Captura real móvil, no escritorio angosto simulado como dispositivo. | Pie: «Revisar el orden cuando el contenido se apila». Alt: «Las secciones del hub se leen en secuencia en el teléfono». |
| M6-C06 | 6; acceso a fuente y permisos de demostración. | Solo controles necesarios; ocultar miembros e identidad. | Pie: «La navegación y el acceso también forman parte del diseño». Alt: «El hub permite volver a la fuente y revisar acceso sin exponer personas». |

**Comprobación integradora:** el origen mantiene seis tareas; al completar T02 sale de Hoy y permanece en Tabla; cambiar un filtro local no borra registros ni cambia automáticamente otra vista. Probar acceso con el rol destinatario autorizado, sin publicar el espacio real. **Transferencia:** adaptar el orden de bloques a otra pantalla manteniendo la misma fuente y justificar la decisión. **Errores:** recrear base, confundir columnas de página con propiedades, usar filtros como privacidad, confundir sincronización con duplicación. **Cierre:** evaluar el sistema por su utilidad y exactitud, no por decoración.

## 7. Trazabilidad de las 40 preguntas públicas

**Cómo leer:** `M1-Q1` significa primera pregunta del formulario público del módulo 1, en el orden consultado. `F-Q1` pertenece al final público. «Cubrir» indica la solución editorial prevista, no que el PDF o su captura ya exista. Las páginas remiten al plan de esta guía. Todas las capturas siguen pendientes y todas las filas requieren el cierre audiovisual de la sección 8.

### 7.1 Módulo 1: fundamentos

Fuente: [cuestionario público 1](https://tally.so/r/laDYjX), contrastado con [`modulos.js:20-25`](../src/data/modulos.js#L20-L25).

| ID | Habilidad evaluada, parafraseada | Enseñanza / página propuesta | Evidencia visual | Brecha y resolución |
| --- | --- | --- | --- | --- |
| M1-Q1 | Reconocer que el contenido se compone de bloques. | PDF 1, «modelo de bloques», p. 1 y 3. | M1-C01, M1-C03. | Convertir definición en un cambio visible de un bloque. |
| M1-Q2 | Reordenar sin reescribir todo el contenido. | PDF 1, «mover y transformar», p. 3. | M1-C03; capturar también el control de arrastre. | Verificar la interacción y que el texto se conserva. |
| M1-Q3 | Elegir Callout para destacar una fecha. | PDF 1, «aviso destacado», p. 4. | M1-C05. | Aclarar que destacar no crea un recordatorio. |
| M1-Q4 | Organizar materias con páginas anidadas. | PDF 1, «jerarquía», p. 4. | M1-C04. | Mostrar ubicación real, no solo un árbol dibujado. |
| M1-Q5 | Combinar página principal, subpáginas y encabezados. | PDF 1, «menú y jerarquía», p. 2 y 4. | M1-C01, M1-C02, M1-C04. | Distinguir nivel de página y tamaño de encabezado. |

### 7.2 Módulo 2: apuntes activos

Fuente: [cuestionario público 2](https://tally.so/r/J1KeoY), contrastado con [`modulos.js:65-70`](../src/data/modulos.js#L65-L70).

| ID | Habilidad evaluada, parafraseada | Enseñanza / página propuesta | Evidencia visual | Brecha y resolución |
| --- | --- | --- | --- | --- |
| M2-Q1 | Separar recursos, trabajos prácticos y teoría. | PDF 2, «tres zonas», p. 1. | M2-C01. | Borrador anterior omite una zona explícita: añadir TP. |
| M2-Q2 | Consultar un PDF dentro de la materia. | PDF 2, «insertar PDF y alternativas», p. 4-5. | M2-C04, M2-C05. | Probar archivo, permisos y lectura, no solo botón de inserción. |
| M2-Q3 | Colocar pregunta visible y respuesta en un toggle. | PDF 2, «construir un toggle», p. 2. | M2-C02. | Mostrar anidación correcta de la respuesta. |
| M2-Q4 | Intentar recuperar la respuesta antes de desplegarla. | PDF 2, «ciclo de recuperación», p. 3. | M2-C03. | Explicar la conducta de estudio, no solo abrir/cerrar. |
| M2-Q5 | Elegir usos adecuados de bloques en apuntes activos. | PDF 2, «zonas, toggle y comparación», p. 1-3. | M2-C01, M2-C02, M2-C03. | Distinguir ocultar respuesta, destacar un aviso y almacenar recursos. |

### 7.3 Módulo 3: base de datos

Fuente: [cuestionario público 3](https://tally.so/r/OQ1brA), contrastado con [`modulos.js:110-115`](../src/data/modulos.js#L110-L115).

| ID | Habilidad evaluada, parafraseada | Enseñanza / página propuesta | Evidencia visual | Brecha y resolución |
| --- | --- | --- | --- | --- |
| M3-Q1 | Comprender que cada fila es una página. | PDF 3, «tabla frente a base», p. 1-2. | M3-C01. | Abrir un registro y añadir bloques reales dentro. |
| M3-Q2 | Guardar una consigna o archivo con su tarea. | PDF 3, «contenido y Consigna», p. 1 y 4. | M3-C01, M3-C05. | Explicar archivo como propiedad y dentro de página sin confundirlos. |
| M3-Q3 | Elegir Date para el vencimiento. | PDF 3, «diccionario visual», p. 3. | M3-C02. | No sustituir la propiedad por una fecha escrita en Title. |
| M3-Q4 | Elegir Multi-select cuando hay dos materias. | PDF 3, «una opción frente a varias», p. 4. | M3-C04. | Añadir el ejemplo de dos materias que el texto web no distingue. |
| M3-Q5 | Registrar y clasificar con materia, fecha y estado. | PDF 3, «propiedades y seis registros», p. 3-5. | M3-C02, M3-C03, M3-C06. | Mantener nombres, tipos y valores consistentes con el caso. |

### 7.4 Módulo 4: vistas

Fuente: [cuestionario público 4](https://tally.so/r/0VrZzA), contrastado con [`modulos.js:155-160`](../src/data/modulos.js#L155-L160).

| ID | Habilidad evaluada, parafraseada | Enseñanza / página propuesta | Evidencia visual | Brecha y resolución |
| --- | --- | --- | --- | --- |
| M4-Q1 | Usar varias vistas sin duplicar información. | PDF 4, «misma fuente», p. 1. | M4-C01. | Reconocer el mismo registro, no tres ejemplos parecidos. |
| M4-Q2 | Configurar Calendar a partir de una fecha. | PDF 4, «Calendar por Fecha límite», p. 4. | M4-C04. | Seleccionar Date y mostrar el caso sin fecha. |
| M4-Q3 | Agrupar Board por progreso/Estado. | PDF 4, «Board por Estado», p. 2. | M4-C02. | Seleccionar agrupación explícita; no asumir automatismo. |
| M4-Q4 | Mover una tarjeta a la etapa final y reconocer su efecto. | PDF 4, «arrastre y propiedad», p. 3. | M4-C03. | Mostrar el cambio de Estado también desde Tabla. |
| M4-Q5 | Reconocer que las vistas comparten cambios del registro. | PDF 4, «misma fuente y comprobación», p. 1 y 3-4. | M4-C03, M4-C05. | Distinguir editar datos de cambiar presentación. |

### 7.5 Módulo 5: filtros y orden

Fuente: [cuestionario público 5](https://tally.so/r/6DJWYN), contrastado con [`modulos.js:200-205`](../src/data/modulos.js#L200-L205).

| ID | Habilidad evaluada, parafraseada | Enseñanza / página propuesta | Evidencia visual | Brecha y resolución |
| --- | --- | --- | --- | --- |
| M5-Q1 | Diferenciar filtrar de ordenar. | PDF 5, «tres mecanismos», p. 1. | M5-C01, M5-C04. | Comparar pertenencia y secuencia; no mezclar permisos. |
| M5-Q2 | Entender que ocultar con filtro no elimina. | PDF 5, «control y antes/después», p. 1 y 5-6. | M5-C01, M5-C06. | Encontrar el registro que desapareció de Hoy en Tabla. |
| M5-Q3 | Aplicar el criterio relativo Hoy. | PDF 5, «Mi día hoy», p. 3. | M5-C02. | Separar relativo de fecha fija; explicar el cambio de jornada. |
| M5-Q4 | Ordenar de menor a mayor fecha para priorizar. | PDF 5, «orden ascendente», p. 4. | M5-C04. | Mostrar fechas distintas; empates con criterio secundario. |
| M5-Q5 | Combinar esta semana, pendientes y fecha ascendente. | PDF 5, «receta semanal», p. 4. | M5-C03, M5-C04. | Falta en la propuesta anterior: incluirla completa; semana no es próximos siete días. |

### 7.6 Módulo 6: hub

Fuente: [cuestionario público 6](https://tally.so/r/X5l8AP), contrastado con [`modulos.js:245-250`](../src/data/modulos.js#L245-L250).

| ID | Habilidad evaluada, parafraseada | Enseñanza / página propuesta | Evidencia visual | Brecha y resolución |
| --- | --- | --- | --- | --- |
| M6-Q1 | Entender la sincronización de la vista vinculada. | PDF 6, «datos compartidos», p. 3-4. | M6-C03, M6-C04. | No confundir vincular una fuente con propiedad Relation. |
| M6-Q2 | Reutilizar datos sin volver a cargarlos. | PDF 6, «fuente existente», p. 3. | M6-C03. | Evitar nueva fuente o copia manual. |
| M6-Q3 | Construir columnas arrastrando bloques. | PDF 6, «columnas», p. 2. | M6-C02. | Tres posiciones son decisión didáctica, no criterio público exacto. |
| M6-Q4 | Mostrar Hoy con filtros propios en el hub. | PDF 6, «filtros propios», p. 4. | M6-C04; incluir panel de filtro local. | Demostrar independencia de configuración frente a datos compartidos. |
| M6-Q5 | Integrar materias, calendario y tareas en un inicio. | PDF 6, «resultado y revisión», p. 1 y 5-6. | M6-C01, M6-C05, M6-C06. | Evaluar componentes y función, no posiciones rígidas. |

### 7.7 Final público: integración, no séptimo PDF

Fuente: [evaluación final pública](https://tally.so/r/OQ18gg). Se resuelve reutilizando conceptos de las seis guías, no agregando herramientas avanzadas al final del recorrido.

| ID | Habilidad evaluada, parafraseada | Enseñanza / página propuesta | Evidencia visual | Brecha y resolución |
| --- | --- | --- | --- | --- |
| F-Q1 | Practicar recuperación activa: intentar responder antes de abrir el toggle. | PDF 2, «toggle y ciclo de recuperación», p. 2-3. | M2-C02, M2-C03; secuencia responder sin mirar, abrir y comparar. | No basta compactar apuntes: enseñar explícitamente la recuperación previa a la apertura. |
| F-Q2 | Ordenar la jerarquía página-materia-clase-contenido. | PDF 1, «jerarquía», p. 4. | M1-C04. | Incluir clase y sus bloques dentro del ejemplo; revisar scoring aparte. |
| F-Q3 | Elegir propiedades para clasificar información. | PDF 3, «diccionario y cardinalidad», p. 3-4. | M3-C02, M3-C03, M3-C04. | Enseñar elección razonada, no memorizar símbolos. |
| F-Q4 | Elegir Board para seguir etapas de progreso. | PDF 4, «Board por Estado», p. 2-3. | M4-C02, M4-C03. | Vincular la elección con la pregunta que resuelve. |
| F-Q5 | Reconocer PDF y Embed como vías de incorporar recursos. | PDF 2, «PDF y Embed», p. 4-5. | M2-C04, M2-C05. | Agregado imprescindible: `/embed`, recursos admitidos y alternativa. |
| F-Q6 | Filtrar tareas por materia sin duplicar la fuente. | PDF 5, «filtrar selecciona», p. 1-2. | M5-C01; añadir panel con Materia = Algoritmos. | Incluir ejemplo breve de filtro por materia, además del temporal. |
| F-Q7 | Ordenar vencimientos de forma ascendente. | PDF 5, «orden y receta semanal», p. 4. | M5-C04. | Verificar secuencia con fechas diferentes. |
| F-Q8 | Reconocer el efecto compartido de editar desde otra vista. | PDF 4, «arrastre y calendario», p. 3-4. | M4-C03, M4-C05. | Comprobar misma identidad y fecha/estado en Tabla. |
| F-Q9 | Elegir vista vinculada para mostrar la fuente en el hub. | PDF 6, «fuente existente», p. 3-4. | M6-C03, M6-C04. | No enseñarlo como una copia ni una relación entre bases. |
| F-Q10 | Integrar páginas, propiedades, vistas, filtros y organización. | PDF 3 p. 1-5; PDF 4 p. 1; PDF 5 p. 1-4; PDF 6 p. 6. | M3-C01, M4-C01, M5-C02, M6-C01. | «Relacionar información» es ambiguo: proponer «clasificar con propiedades»; no exige configurar Relation. |

**Control editorial:** las 40 filas tienen destino, evidencia prevista y acción de cierre. La matriz no prueba por sí sola que el estudiante aprendió: completar con la práctica observada y la revisión de los PDF terminados.

## 8. Validación específica de los videos

| Módulo | Evidencia disponible | Qué buscar al revisar | Estado |
| --- | --- | --- | --- |
| 1 | [Video configurado](https://youtu.be/bQJq6nPtoTI). | Bloques, `/`, transformación, Callout y materias anidadas; conectar con PDF 1, páginas 2-4. | Contenido completo y tiempos pendientes. |
| 2 | [Video configurado](https://youtu.be/GHYURkZ4qX4). | Tres zonas, toggle pregunta/respuesta, intento previo, PDF y Embed; PDF 2, páginas 1-5. | Contenido completo y tiempos pendientes; comprobar especialmente Embed. |
| 3 | Sin `videoSrc`. | Crear fuente, fila-página, tipos, una/varias materias, fecha y estado. | Video pendiente; no inventar enlace ni duración real. |
| 4 | [Video configurado](https://youtu.be/rRNDw2sclAA). | Misma fuente, agrupar por Estado, Date para Calendar, arrastres y efecto en otras vistas. | Contenido completo y tiempos pendientes. |
| 5 | Sin `videoSrc`. | Hoy Y no Entregado; Esta semana Y no Entregado + ascendente; límites del foco. | Video pendiente. |
| 6 | Sin `videoSrc`. | Fuente existente, filtros propios, sincronización y columnas; revisión móvil y acceso. | Video pendiente. |

**Protocolo de revisión:** obtener el video autorizado o una transcripción verificable; mirar el procedimiento además de leer el texto; registrar evidencia por concepto; clasificar «cubierto / parcial / ausente / contradicción»; resolver el faltante antes de afirmar alineación completa. No basta inferir contenido por el título o el enlace.

Ficha por hallazgo: `módulo | concepto | enlace/versión | tiempo inicial-final real | evidencia observada | página PDF | diferencia | resolución | revisor/fecha`. No usar `00:00` como tiempo ficticio ni rellenar una transcripción con suposiciones.

Si un concepto evaluado falta en un video, conservarlo en explicación/PDF y añadir una demostración breve o reemplazar el tramo; si el video contradice el procedimiento, actualizarlo o colocar una advertencia precisa. Diferencias meramente de idioma o posición de menús se resuelven con una nota de equivalencia después de comprobar la interfaz. **Alineación editorial planificada y alineación audiovisual comprobada son estados distintos.**

## 9. Flujo de producción y archivos

### 9.1 Un flujo recomendado

1. **Redactar:** convertir cada blueprint en fuente editable; verificar que toda habilidad evaluada tiene explicación, demostración y práctica.
2. **Demostrar:** ejecutar las instrucciones en Notion real y restablecer el caso entre módulos. Corregir texto antes de capturar.
3. **Capturar:** producir originales, anotaciones, pies, alt y manifiesto; revisar datos y derechos.
4. **Maquetar:** aplicar la plantilla única, exportar a PDF con texto, fuentes, enlaces y estructura conservados.
5. **Verificar y publicar:** renderizar todas las páginas a PNG, revisar visualmente y semánticamente, corregir, volver a exportar y probar la descarga desde la web.

La exportación no sustituye el control. Un render bonito puede tener orden de lectura incorrecto; una extracción textual correcta puede ocultar cortes y superposiciones. Revisar ambos. Si el exportador no conserva etiquetas o alt, usar otro paso de remediación y documentar el estado; no declarar accesible un PDF solo porque puede buscarse texto.

### 9.2 Organización futura propuesta

```text
pdfs/guia_maestra_produccion_pdfs_1_a_6.md  # este brief
pdfs/fuentes/guia-1.md ... guia-6.md        # manuscritos futuros
assets/pdf/notion/                         # originales y anotaciones futuros
assets/pdf/capturas-manifiesto.yaml        # trazabilidad futura
tmp/pdfs/                                  # pruebas y renders temporales
output/pdf/guia-1.pdf ... guia-6.pdf         # exportaciones aprobadas
public/pdfs/guia-1.pdf ... guia-6.pdf        # copias publicables del sitio
```

Solo se creó este Markdown; las demás rutas son una propuesta, no archivos existentes. Mantener un origen editable y copiar al destino público únicamente la exportación aprobada. No modificar una imagen anotada sin conservar la original. Versionar manifiesto y texto; definir política de tamaño de binarios antes de incorporar capturas grandes al repositorio.

**Orden de producción:** piloto de PDF 3 para validar tabla, detalle y legibilidad; plantilla aprobada; PDF 1-2; PDF 4-5-6; revisión transversal de términos y caso; cierre audiovisual; exportación de toda la colección; prueba de descarga. El orden de trabajo no cambia el orden de aprendizaje.

### 9.3 Revisión visual concreta

Renderizar **todas** las páginas de cada exportación, no solo la primera. Por ejemplo, con Poppler disponible: `pdftoppm -png guia-1.pdf tmp/pdfs/guia-1`. Inspeccionar al tamaño de lectura y ampliado: títulos, espacio, pies, bordes, capturas, marcadores, tablas y glifos. Corregir en la fuente, reexportar y volver a renderizar. Probar color, grises, escritorio y teléfono. Confirmar texto seleccionable, enlaces, marcadores y metadatos de idioma/título.

En la web, probar los seis enlaces `/pdfs/guia-N.pdf`, abrir el archivo completo y descargarlo. No alcanza que exista el botón ni que responda con una página HTML. Verificar PDF real, título, módulo, versión, número de páginas y ausencia de información privada.

## 10. Aceptación, prioridades y definición de terminado

### 10.1 Bloqueos de contenido antes de producir

| Prioridad | Pendiente | Resolución esperada |
| --- | --- | --- |
| P0 | Cobertura real de videos 1/2/4 y ausencia de 3/5/6. | Evidencia audiovisual revisada o alcance explícito: colección validada contra texto/Tally, video todavía no cerrado. |
| P0 | `/embed` evaluado pero poco desarrollado en explicación/borrador 2. | Procedimiento real probado, captura y alternativa; no equivalencia universal falsa con PDF. |
| P0 | TP ausente del esquema del borrador 2; receta semanal ausente de la propuesta 5. | Incorporar las tres zonas y la receta semanal completa en las páginas indicadas. |
| P0 | «Retener el 100 %» y posiciones supuestamente exigidas por Tally 6. | Eliminar promesa absoluta en nuevos títulos; distinguir diseño acordado de criterio evaluado. |
| P1 | Atajos y etiquetas antiguas o traducidas. | Prueba de interfaz, plataforma, fecha y capturas coherentes. |
| P1 | Confusión entre Select/Multi-select y vista vinculada/Relation. | Ejemplos comparativos explícitos, sin introducir herramientas avanzadas. |
| P1 | Calidad visual y acceso al hub. | Renders revisados, lectura móvil/grises y comprobación de permisos. |

**Puntuación: incidencia separada, no tarea de los PDF.** En los módulos públicos, dos puntos por acierto son compatibles con el mínimo 8/10 de [`src/data/tally.js:5-6`](../src/data/tally.js#L5-L6). La configuración estática revisada del final presenta nueve incrementos y una pregunta de ordenamiento sin regla de puntuación visible; no se confirmó en ejecución. Revisar en Tally autorizado antes de anunciar máximo y umbral. No enviar respuestas de prueba a formularios reales sin acordarlo ni reescribir las guías para compensar un posible error de scoring.

### 10.2 Lista de aceptación por guía

- [ ] Objetivo, requisito, archivo y enlace corresponden al módulo; la primera página ya enseña algo.
- [ ] Cada concepto evaluado tiene explicación, ejemplo y práctica; todas las filas de la sección 7 están resueltas.
- [ ] Cada procedimiento fue ejecutado; nombres de controles, idioma y plataforma coinciden con las capturas.
- [ ] Cada ejercicio parte de un estado conocido y declara un resultado comprobable; no solo entrega una respuesta correcta.
- [ ] Cada captura tiene original, anotación, manifiesto, procedencia, pie y alt; todos sus datos son ficticios.
- [ ] Texto y etiquetas se leen al tamaño final; no hay capturas deformadas, pixeladas ni reducidas para ahorrar hojas.
- [ ] Títulos jerárquicos, aire entre bloques, tablas, llamadas y numeración siguen la plantilla; no hay títulos huérfanos.
- [ ] No hay promesas absolutas, funciones simuladas, timestamps inventados ni contenidos avanzados exigidos sin enseñar.
- [ ] Texto buscable, fuentes incrustadas, orden de lectura, etiquetas, enlaces y marcadores se comprobaron; limitaciones documentadas.
- [ ] Todas las páginas fueron renderizadas y revisadas, incluidos impresión en grises y teléfono; no hay cortes ni superposiciones.
- [ ] El enlace del curso abre y descarga el PDF correcto, no un borrador viejo ni un HTML de error.
- [ ] La matriz audiovisual está cerrada o la limitación sigue explícita: no se declara alineación completa sin evidencia.

### 10.3 Definición de terminado

Una guía está lista cuando un estudiante de prueba puede ejecutar el procedimiento sin ayuda adicional, justificar las decisiones de su módulo, completar el ejercicio con el resultado previsto y consultar las imágenes sin adivinar texto. La colección está lista cuando los seis archivos comparten identidad, caso y términos, cubren las 40 habilidades públicas y tienen revisión audiovisual documentada o una limitación de publicación expresamente registrada.

**Entregable de esta etapa:** este plan maestro. **Etapa posterior:** redactar los seis manuscritos, construir el espacio de demostración, capturar Notion real, producir PDF y verificar publicación. No se generaron PDF, capturas ni cambios en cuestionarios durante la elaboración del plan.
