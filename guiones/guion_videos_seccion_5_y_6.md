# Guiones de Video — Secciones 5 y 6

Guiones listos para grabar sobre el Notion de **Lucca's Space** (página **Mi Cursada**). Usan los nombres reales de la base y las tareas de ejemplo ya cargadas.

Formato de cada paso:
- 🎥 **Pantalla**: qué se ve en la grabación.
- 🖱️ **Acciones en Notion**: clics exactos, en orden.
- 🎙️ **Narración**: lo que se dice.

Duración estimada: **~4 min** (Sección 5) y **~6 min** (Sección 6).

> **Sobre los nombres de los botones:** se escriben en inglés, como se ve en tu Notion. Si cambia el idioma o la versión, el lugar de los botones puede moverse un poco, pero las opciones se llaman igual.

---

## Glosario rápido de la interfaz

| Término | Dónde está |
|---|---|
| **Pestañas de vistas** | Fila arriba de la base de datos: *Table*, y las vistas que agregues. El **+** al final agrega una vista nueva. |
| **Barra de herramientas de la base** | A la derecha de las pestañas, aparece al pasar el mouse sobre la base: íconos de **Filter** (embudo), **Sort** (flechas ↑↓), buscar (lupa), **•••** y el botón azul **New**. |
| **Menú `/`** | Se abre al escribir `/` en una línea vacía de cualquier página. Se filtra escribiendo, y se confirma con **Enter**. |
| **Asa de arrastre ⋮⋮** | Seis puntitos a la izquierda de un bloque, aparecen al pasar el mouse. Sirven para arrastrar el bloque. |
| **Menú `•••` de página** | Arriba a la derecha de cualquier página: ahí están *Lock page*, *Full width*, etc. |
| **Estrella ☆** | Arriba a la derecha, al lado de *Share*. Agrega la página a Favoritos. |

---

## Datos del entorno

**Base unificada:** `Entregas y Examenes` (dentro de *Mi Cursada*). Una sola base para todas las materias.

| Propiedad | Tipo | Valores |
|---|---|---|
| Nombre | Título | — |
| Materia | Select | Creatividad, IOP, ISW, Comunicación Multimedial, Física, Redes |
| Tipo | Select | Tarea, Trabajo Practico, Examen |
| Fecha de entrega | Date | — |
| Estado | Status | Not started, In progress, Done |

**Tareas de ejemplo de Comunicación Multimedial** (pensadas para grabar el **19/10/2026**):

| Nombre | Tipo | Fecha | Estado |
|---|---|---|---|
| Leer material de la clase | Tarea | 19/10 (hoy) | In progress |
| Guion del video TP2 | Tarea | 19/10 (hoy) | Not started |
| Presentación grupal | Tarea | 19/10 (hoy) | In progress |
| Storyboard TP2 | Tarea | 21/10 | Not started |
| TP 2 - Guion y storyboard | Trabajo Practico | 23/10 | Not started |
| Edición de audio | Tarea | 24/10 | Not started |
| TP 3 - Producto multimedia | Trabajo Practico | 30/10 | Not started |
| Preparar final | Tarea | 25/11 | Not started |
| Lectura obligatoria | Tarea | 15/10 | Done |
| Moodboard | Tarea | 17/10 | Done |
| TP 1 - Investigacion | Trabajo Practico | 20/10 | Done |

> ⚠️ **Si grabás otro día**, corré las 3 fechas "hoy" a la fecha de grabación. Si no, el filtro *Is Today* queda vacío.
> ⚠️ Hay **2 filas vacías** (sin nombre, Not started, sin fecha). Borralas antes de grabar: clic derecho sobre la fila → **Delete**.

**Resultado esperado de los filtros** (con las tareas de arriba, 19/10):
- `Estado is not Done` → saca las filas Done; quedan las pendientes de todas las materias.
- `Fecha de entrega is Today` → 3 tareas de Comunicación Multimedial.
- `Fecha de entrega is within This week` → suma las del 21, 23 y 24/10.

---

## 🎬 Sección 5 — Filtros, Ordenamiento y "Mi Día Hoy"

### Preparación
1. En la barra lateral izquierda, abrí **Mi Cursada**.
2. Hacé scroll hasta la base **Entregas y Examenes**.
3. Borrá las 2 filas vacías (clic derecho en la fila → **Delete**).

### Paso 1 — Gancho (0:00–0:20)
🎥 Scroll por la base completa.
🖱️ Ninguna. Solo mostrar la tabla.
🎙️ "Esta es mi base de entregas y exámenes de todas las materias. Tiene todo… y ese es el problema: cuando ves todo junto, no sabés por dónde empezar. Hoy hacemos que Notion te muestre solo lo importante."

### Paso 2 — Duplicar la vista (0:20–1:00)
🎥 Pestañas de vistas arriba de la base.
🖱️ **Acciones:**
1. Hacé clic en la pestaña de la vista actual (*Table*). Se abre un menú.
2. Elegí **Duplicate view**. Aparece una pestaña nueva con el mismo nombre (*Table* copia).
3. Hacé clic en esa pestaña nueva y elegí **Rename** (o doble clic sobre el nombre).
4. Borrá el texto, escribí **Mi Día Hoy** y apretá **Enter**.
5. Para agregar el ícono: en la ventana de renombrar, hacé clic en el cuadradito de ícono a la izquierda del nombre y elegí ☀️.

🎙️ "No tocamos la vista original: la duplicamos. Una vista cambia cómo se ven los datos, no los datos. Si me equivoco, la tabla completa sigue ahí."

### Paso 3 — Filtro por Estado (1:00–1:40)
🎥 Barra de herramientas de la base.
🖱️ **Acciones** (con la vista "Mi Día Hoy" activa):
1. Hacé clic en el ícono de **Filter** (el embudo) de la barra de herramientas.
2. Hacé clic en **+ Add filter**.
3. En la lista de propiedades, elegí **Estado**.
4. En el desplegable de la condición (dice *Is* por defecto), cambiá a **Is not**.
5. En el desplegable del valor, tildá **Done**.
6. Hacé clic fuera del panel para cerrarlo.

🎙️ "Primer filtro: ocultar lo que ya terminé. Estado, 'Is not Done'. Lo completado desaparece, pero no se borró nada: solo está oculto en esta vista."

### Paso 4 — Filtro por Fecha: "Hoy" (1:40–2:30)
🎥 Panel de filtros y la tabla actualizándose.
🖱️ **Acciones:**
1. Hacé clic de nuevo en el ícono **Filter**.
2. Hacé clic en **+ Add filter** (o **Add filter** debajo del primero).
3. Elegí la propiedad **Fecha de entrega**.
4. Dejá la condición en **Is**.
5. En el desplegable del valor, elegí **Today**. (Las otras opciones son *Tomorrow*, *Yesterday*, *One week ago*, *Exact date*, etc.).
6. Cerrá el panel: tienen que quedar **3 tareas**.

🎙️ "La regla clave: Fecha de entrega, 'Is Today'. Es dinámica. Mañana, cuando abras Notion, la vista se actualiza sola y te muestra las tareas de mañana. No tenés que reconfigurar nada."

### Paso 5 — Variante semanal (2:30–3:10)
🎥 Pestañas de vistas.
🖱️ **Acciones:**
1. Hacé clic en la pestaña **Mi Día Hoy** → **Duplicate view**.
2. Renombrala **Esta Semana** (clic en la pestaña → **Rename**) y ponele el ícono 📅.
3. Abrí **Filter**. Hacé clic sobre el filtro de *Fecha de entrega*.
4. En el desplegable de la condición, cambiá **Is** por **Is within**.
5. En el valor, elegí **This week**.
6. Cerrá el panel.

🎙️ "Para mirar más adelante, duplicamos y cambiamos la condición a 'This week'. Una vista para el día y otra para la semana."

### Paso 6 — Filtrar por materia (3:10–3:30)
🎥 Panel de filtros, filtro por materia que se agrega y se quita.
🖱️ **Acciones** (en *Mi Día Hoy*):
1. Hacé clic en **Filter** → **+ Add filter** → **Materia**.
2. Condición **Is**, valor **Comunicación Multimedial**.
3. Para sacarlo y mostrar la diferencia: pasá el mouse sobre ese filtro, hacé clic en **•••** → **Delete filter**.

🎙️ "Y si querés enfocarte en una sola materia, sumás un filtro por Materia. Podés combinar los que quieras."

### Paso 7 — Ordenamiento (3:30–3:50)
🎥 Ícono de ordenamiento y la lista reordenándose.
🖱️ **Acciones** (hacerlo en *Mi Día Hoy* y repetir en *Esta Semana*):
1. Hacé clic en el ícono **Sort** (flechas ↑↓) de la barra de herramientas.
2. Hacé clic en **+ Add sort**.
3. Elegí la propiedad **Fecha de entrega**.
4. Dejá la dirección en **Ascending**.
5. Cerrá el panel.

🎙️ "Ahora ordenamos: Sort, por Fecha de entrega, ascendente. Lo más urgente queda arriba. Filtrar es decidir *qué* ves; ordenar es decidir *en qué orden* lo ves."

### Paso 8 — Cierre (3:50–4:10)
🎥 Mostrar las tres pestañas: *Table*, *Mi Día Hoy*, *Esta Semana*.
🖱️ Hacer clic en cada pestaña, de a una.
🎙️ "Pasamos de más de quince filas a las tres que tenés que resolver hoy. El sistema trabaja para vos. En la próxima sección llevamos estas vistas a tu Dashboard. Descargá el PDF de Lógica de Filtros y hacé el quiz."

**Texto en pantalla sugerido:** *"Date is Today = se actualiza solo"* · *"Filtrar ≠ borrar"* · *"Sort ascendente = lo urgente primero"*.

---

## 🎬 Sección 6 — El Hub Central del Estudiante (Dashboard)

### Preparación
- Tener las 4 páginas de materias (Comunicación Multimedial, Creatividad, Física, Redes) dentro de **Mi Cursada**.
- Tener la base `Entregas y Examenes` y las vistas de la Sección 5.

### Paso 1 — Gancho (0:00–0:20)
🎥 Mostrar el Dashboard terminado unos 5 segundos (grabarlo al final y montarlo al inicio).
🖱️ Ninguna.
🎙️ "Esto vamos a construir: tu pantalla de inicio de la facultad. Materias, calendario y tareas del día en un vistazo."

### Paso 2 — Crear la página (0:20–1:00)
🎥 Barra lateral y página nueva.
🖱️ **Acciones:**
1. En la barra lateral izquierda, pasá el mouse sobre **Mi Cursada** y hacé clic en el **+** que aparece a la derecha. (Así la página se crea *dentro* de Mi Cursada.)
2. En el campo de título escribí **Mi Facultad**.
3. Pasá el mouse sobre el título: aparecen **Add icon** y **Add cover** arriba. Hacé clic en **Add icon** y elegí 🎓.
4. Hacé clic en **Add cover** (se pone una portada al azar; para cambiarla, **Change cover** → elegí una).

🎙️ "Creamos una página nueva, con nombre, ícono y portada. Va a ser la que abras todos los días."

### Paso 3 — Bienvenida (1:00–1:20)
🎥 Primera línea debajo del título.
🖱️ **Acciones:**
1. Hacé clic en la línea vacía debajo del título.
2. Escribí `/callout` y apretá **Enter**.
3. Escribí: *Semestre 2026 — Objetivo: aprobar todo al día*.
4. Para cambiar el ícono del callout, hacé clic en el 💡 y elegí 💪.

🎙️ "Arriba va un Callout con un mensaje o un objetivo del semestre. Es opcional, pero le da personalidad."

### Paso 4 — Columnas (1:20–2:10)
🎥 Línea azul vertical al arrastrar.
🖱️ **Acciones (método A, más fácil):**
1. Hacé clic en una línea vacía debajo del callout.
2. Escribí `/3 columns` y apretá **Enter**. Aparecen tres columnas vacías.
3. Hacé clic dentro de cada columna y escribí un encabezado con `/heading 2`: **📚 Materias**, **🗓️ Calendario** y **☀️ Hoy**.

**Método B (para mostrar el arrastre):**
1. Escribí tres líneas de texto.
2. Pasá el mouse sobre la segunda: aparece **⋮⋮** a la izquierda.
3. Hacé clic y mantené sobre **⋮⋮**, arrastrá hacia el **borde derecho** de la primera línea hasta ver una **línea azul vertical**, y soltá. Se crea una columna.

🎙️ "Para crear columnas, arrastrás un bloque hasta el costado de otro hasta ver una línea azul vertical, y lo soltás. También podés escribir '/3 columns'."

### Paso 5 — Columna izquierda: Materias (2:10–2:50)
🎥 Columna izquierda llenándose de enlaces.
🖱️ **Acciones:**
1. Hacé clic debajo del encabezado **📚 Materias**.
2. Escribí `@Comunicación` y elegí la página **Comunicación Multimedial** de la lista. Apretá **Enter** para ir a una línea nueva.
3. Repetí con `@Creatividad`, `@Física` y `@Redes`.

🎙️ "A la izquierda dejamos accesos directos a las materias: arroba y el nombre de la página. Un clic y estás adentro."

### Paso 6 — Columna central: Calendario (2:50–3:40)
🎥 Calendario mensual con las entregas.
🖱️ **Acciones:**
1. Hacé clic debajo del encabezado **🗓️ Calendario**.
2. Escribí `/linked view of database` y apretá **Enter**.
3. En el buscador, escribí **Entregas** y elegí **Entregas y Examenes**. Aparece una tabla (es un espejo de la base).
4. Hacé clic en el **+** al final de las pestañas de vistas (**Add a view**).
5. En el selector de tipo, elegí **Calendar**. Si lo pide, en *Show calendar by* elegí **Fecha de entrega**.
6. Hacé clic en **Create**. Si la vista inicial *Table* sobra, borrala: pestaña → **Delete view**.

🎙️ "Este es el bloque estrella: la vista enlazada. No crea una base nueva: crea un *reflejo* de la que ya tenemos. Elegimos Entregas y Examenes y le ponemos vista de Calendario."

### Paso 7 — Columna derecha: Hoy (3:40–4:40)
🎥 Lista de tareas del día.
🖱️ **Acciones:**
1. Hacé clic debajo del encabezado **☀️ Hoy**.
2. Escribí `/linked view of database` → **Enter** → elegí **Entregas y Examenes**.
3. Hacé clic en el **+** de las vistas → **List** → **Create** (o **Table** si preferís mostrar columnas).
4. Hacé clic en **Filter** → **+ Add filter** → **Estado** → **Is not** → tildá **Done**.
5. **Filter** → **+ Add filter** → **Fecha de entrega** → **Is** → **Today**.
6. Hacé clic en **Sort** → **+ Add sort** → **Fecha de entrega** → **Ascending**.

🎙️ "A la derecha, otra vista enlazada con los filtros de la Sección 5: sin terminar y con fecha de hoy. Estos filtros son independientes: lo que configurés acá no cambia la base original."

### Paso 8 — Demostrar la sincronía (4:40–5:20)
🎥 Pantalla dividida o cambio entre páginas.
🖱️ **Acciones:**
1. En la lista **☀️ Hoy**, hacé clic en el estado de una tarea (por ejemplo *In progress*).
2. Elegí **Done**. La tarea desaparece de la lista (porque el filtro es "Estado is not Done").
3. En la barra lateral, abrí **Mi Cursada** y mostrá en la base original que esa tarea ahora figura como **Done**.

🎙️ "La prueba: marco una tarea como Done acá, voy a la base original y ya está actualizada. Es el mismo dato, visto desde otro lugar."

### Paso 9 — Toques finales (5:20–5:50)
🎥 Menú de la página.
🖱️ **Acciones:**
1. Arriba a la derecha, hacé clic en la **estrella ☆** para agregar a Favoritos.
2. Hacé clic en **•••** (menú de la página).
3. Activá **Full width** (para que las 3 columnas respiren).
4. En el mismo menú, activá **Lock page** para evitar cambios accidentales.

🎙️ "Bloqueamos la página para no desarmarla sin querer y la agregamos a Favoritos para tenerla siempre en la barra lateral."

### Paso 10 — Cierre (5:50–6:10)
🎥 Plano general del Dashboard.
🖱️ Ninguna.
🎙️ "¡Terminaste! Pasaste del caos de papelitos a un sistema que se organiza solo. Descargá el PDF de Layouts y Columnas, hacé el quiz y pasá a la evaluación final."

**Texto en pantalla sugerido:** *"Linked database = espejo, no copia"* (pregunta 1 del quiz) · *"Línea azul vertical = nueva columna"* (pregunta 2).

---

## Tips de grabación
- Hacé zoom del navegador al **125 %** (Ctrl y +) para que los menús se lean bien.
- Usá resaltador de cursor o un círculo en edición cuando hagas clic en **Filter**, **Sort** y el **+** de las vistas.
- Si te equivocás en un paso, **Ctrl+Z** deshace casi todo en Notion.
- Grabá cada paso por separado y unilos en edición: es más fácil corregir.

## Checklist post-grabación
- [ ] Subir los videos a YouTube y completar `videoSrc` de `sec5` y `sec6` en `src/data/modulos.js`.
- [ ] Actualizar `videoDuracion` y la duración en `recursosAside` (hoy figuran 12:10 y 15:45).
- [ ] Verificar que las respuestas del quiz coincidan con lo que muestra el video.
