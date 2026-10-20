# Guiones de Video — Secciones 5 y 6

Guiones listos para grabar sobre el Notion de **Lucca's Space** (página **Mi Cursada**). Usan los nombres reales de la base y las tareas de ejemplo ya cargadas.

Formato de cada paso:
- 🎥 **Pantalla**: lo que se graba.
- 🎙️ **Narración**: lo que se dice.

Duración estimada: **~4 min** (Sección 5) y **~6 min** (Sección 6).

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

> ⚠️ **Si grabás otro día**, corré las 3 fechas "hoy" a la fecha de grabación; si no, el filtro *Is Today* queda vacío.
> ⚠️ Hay **2 filas vacías** (sin nombre, Not started, sin fecha) en la base. Borralas antes de grabar, porque aparecen con el filtro "Is not Done".

**Resultado esperado de los filtros** (con las tareas de arriba, 19/10):
- `Estado is not Done` → saca las filas Done; quedan las pendientes de todas las materias.
- `Fecha is Today` → 3 tareas de Comunicación Multimedial.
- `Fecha is within This week` → suma las del 21, 23 y 24/10.

---

## 🎬 Sección 5 — Filtros, Ordenamiento y "Mi Día Hoy"

### Preparación
- Abrir la página **Mi Cursada** y mostrar la base `Entregas y Examenes`.
- Ocultar o borrar las 2 filas vacías.

### Paso 1 — Gancho (0:00–0:20)
🎥 Scroll por la base completa.
🎙️ "Esta es mi base de entregas y exámenes de todas las materias. Tiene todo… y ese es el problema: cuando ves todo junto, no sabés por dónde empezar. Hoy hacemos que Notion te muestre solo lo importante."

### Paso 2 — Duplicar la vista (0:20–0:50)
🎥 Clic en el nombre de la vista (*Table*) → **Duplicate view** → renombrar **"☀️ Mi Día Hoy"**.
🎙️ "No tocamos la vista original: la duplicamos. Una vista cambia cómo se ven los datos, no los datos. Si me equivoco, la tabla completa sigue ahí."

### Paso 3 — Filtro por Estado (0:50–1:30)
🎥 **Filter** → *Estado* → **Is not** → *Done*.
🎙️ "Primer filtro: ocultar lo que ya terminé. Estado, 'Is not Done'. Lo completado desaparece, pero no se borró nada: solo está oculto en esta vista."

### Paso 4 — Filtro por Fecha: "Hoy" (1:30–2:20)
🎥 **+ Add filter** → *Fecha de entrega* → **Is** → **Today**. Quedan 3 tareas.
🎙️ "La regla clave: Fecha de entrega, 'Is Today'. Es dinámica. Mañana, cuando abras Notion, la vista se actualiza sola y te muestra las tareas de mañana. No tenés que reconfigurar nada."

### Paso 5 — Variante semanal (2:20–2:50)
🎥 Duplicar "Mi Día Hoy" → renombrar **"📅 Esta Semana"** → cambiar la fecha a **Is within → This week**.
🎙️ "Para mirar más adelante, duplicamos y cambiamos la condición a 'This week'. Una vista para el día y otra para la semana."

### Paso 6 — Filtrar por materia (2:50–3:10)
🎥 En "Mi Día Hoy", agregar filtro *Materia* → **Is** → *Comunicación Multimedial* y desactivarlo para mostrar la diferencia.
🎙️ "Y si querés enfocarte en una sola materia, sumás un filtro por Materia. Podés combinar los que quieras."

### Paso 7 — Ordenamiento (3:10–3:35)
🎥 **Sort** → *Fecha de entrega* → **Ascending** (en ambas vistas).
🎙️ "Ahora ordenamos: Sort, por Fecha de entrega, ascendente. Lo más urgente queda arriba. Filtrar es decidir *qué* ves; ordenar es decidir *en qué orden* lo ves."

### Paso 8 — Cierre (3:35–4:00)
🎥 Mostrar las tres pestañas: *Table*, *Mi Día Hoy*, *Esta Semana*.
🎙️ "Pasamos de más de quince filas a las tres que tenés que resolver hoy. El sistema trabaja para vos. En la próxima sección llevamos estas vistas a tu Dashboard. Descargá el PDF de Lógica de Filtros y hacé el quiz."

**Texto en pantalla sugerido:** *"Date is Today = se actualiza solo"* · *"Filtrar ≠ borrar"* · *"Sort ascendente = lo urgente primero"*.

---

## 🎬 Sección 6 — El Hub Central del Estudiante (Dashboard)

### Preparación
- Tener las 4 páginas de materias (Comunicación Multimedial, Creatividad, Física, Redes) y la base `Entregas y Examenes`.
- Las vistas filtradas de la Sección 5 ya existen.

### Paso 1 — Gancho (0:00–0:20)
🎥 Mostrar el Dashboard terminado unos 5 segundos (grabarlo al final y montarlo al inicio).
🎙️ "Esto vamos a construir: tu pantalla de inicio de la facultad. Materias, calendario y tareas del día en un vistazo."

### Paso 2 — Crear la página (0:20–0:50)
🎥 **+ New page** → **"🎓 Mi Facultad"** → ícono y portada.
🎙️ "Creamos una página nueva, con nombre, ícono y portada. Va a ser la que abras todos los días."

### Paso 3 — Bienvenida (0:50–1:10)
🎥 `/callout` → "Semestre 2026 — Objetivo: aprobar todo al día 💪".
🎙️ "Arriba va un Callout con un mensaje o un objetivo del semestre. Es opcional, pero le da personalidad."

### Paso 4 — Columnas (1:10–2:00)
🎥 Escribir `/3 columns` (o arrastrar un bloque al borde lateral de otro hasta ver la **línea azul vertical**). Encabezados: **📚 Materias** · **🗓️ Calendario** · **☀️ Hoy**.
🎙️ "Para crear columnas, arrastrás un bloque hasta el costado de otro hasta ver una línea azul vertical, y lo soltás. También podés escribir '/3 columns'."

### Paso 5 — Columna izquierda: Materias (2:00–2:40)
🎥 Escribir `@` + nombre para enlazar **Comunicación Multimedial**, **Creatividad**, **Física** y **Redes**.
🎙️ "A la izquierda dejamos accesos directos a las materias: arroba y el nombre de la página. Un clic y estás adentro."

### Paso 6 — Columna central: Calendario (2:40–3:30)
🎥 `/linked view of database` → **Entregas y Examenes** → **+ New view → Calendar** (por *Fecha de entrega*).
🎙️ "Este es el bloque estrella: la vista enlazada. No crea una base nueva: crea un *reflejo* de la que ya tenemos. Elegimos Entregas y Examenes y le ponemos vista de Calendario."

### Paso 7 — Columna derecha: Hoy (3:30–4:20)
🎥 Otra `/linked view of database` → **Entregas y Examenes** → vista **List** → filtros *Estado is not Done* + *Fecha de entrega is Today* → Sort *Fecha de entrega Ascending*.
🎙️ "A la derecha, otra vista enlazada con los filtros de la Sección 5: sin terminar y con fecha de hoy. Estos filtros son independientes: lo que configurés acá no cambia la base original."

### Paso 8 — Demostrar la sincronía (4:20–4:50)
🎥 Cambiar una tarea a **Done** desde el Dashboard → abrir la base original en Mi Cursada y mostrar el cambio.
🎙️ "La prueba: marco una tarea como Done acá, voy a la base original y ya está actualizada. Es el mismo dato, visto desde otro lugar."

### Paso 9 — Toques finales (4:50–5:30)
🎥 Menú `...` → **Lock page** · **Add to Favorites**.
🎙️ "Bloqueamos la página para no desarmarla sin querer y la agregamos a Favoritos para tenerla siempre en la barra lateral."

### Paso 10 — Cierre (5:30–6:00)
🎥 Plano general del Dashboard.
🎙️ "¡Terminaste! Pasaste del caos de papelitos a un sistema que se organiza solo. Descargá el PDF de Layouts y Columnas, hacé el quiz y pasá a la evaluación final."

**Texto en pantalla sugerido:** *"Linked database = espejo, no copia"* (pregunta 1 del quiz) · *"Línea azul vertical = nueva columna"* (pregunta 2).

---

## Checklist post-grabación
- [ ] Subir los videos a YouTube y completar `videoSrc` de `sec5` y `sec6` en `src/data/modulos.js`.
- [ ] Actualizar `videoDuracion` y la duración en `recursosAside` (hoy figuran 12:10 y 15:45).
- [ ] Verificar que las respuestas del quiz coincidan con lo que muestra el video.
