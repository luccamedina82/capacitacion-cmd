# Propuesta de contenido para los PDF de las secciones 4, 5 y 6

**Estado:** planificación editorial; no son los PDF terminados. Este documento define qué explicar, qué ejercicios incluir y qué recursos visuales producir. No se generaron PDF ni capturas de pantalla.

La secuencia propuesta es: **ver las tareas de distintas maneras → seleccionar lo importante → reunirlo en una página de inicio**. Continúa la base estudiantil de la sección 3 y complementa los videos y cuestionarios de la capacitación, sin repetir la introducción a bloques, apuntes y propiedades.

| Sección | Título propuesto | Resultado para el estudiante | Destino del PDF futuro |
| --- | --- | --- | --- |
| 4 | Seis vistas de Notion: cómo elegir la adecuada | Gestionar las mismas tareas con tabla, tablero y calendario, y reconocer otros formatos útiles. | `public/pdfs/guia-4.pdf` |
| 5 | Filtros y ordenamiento: construir «Mi día hoy» | Consultar tareas relevantes sin borrar ni duplicar información. | `public/pdfs/guia-5.pdf` |
| 6 | Layouts y columnas: construir el hub del estudiante | Reunir materias, recursos y vistas vinculadas en un panel funcional. | `public/pdfs/guia-6.pdf` |

## Caso práctico compartido

Usar una sola base de ejemplo: **«Tareas de la cursada»**. Se reutilizan las propiedades de la sección 3: Tarea (Title), Materia (Select), Estado (Status) y Fecha límite (Date). Los estados serán Pendiente, En curso y Entregado.

Preparar estos seis registros ficticios una única vez. «Hoy» y «mañana» se reemplazan por fechas reales al realizar el ejercicio; no deben escribirse como texto en la propiedad Date.

| Tarea | Materia | Estado inicial | Fecha límite |
| --- | --- | --- | --- |
| Resolver guía de derivadas | Análisis Matemático I | Pendiente | Hoy |
| Entregar TP de algoritmos | Algoritmos | En curso | Hoy |
| Leer capítulo de cinemática | Física I | Pendiente | Mañana |
| Corregir informe de laboratorio | Física I | Pendiente | Ayer |
| Subir resumen de límites | Análisis Matemático I | Entregado | Hoy |
| Consultar consigna del proyecto | Algoritmos | Pendiente | Sin fecha |

Cada PDF debe recordar los requisitos mínimos y permitir incorporarse sin rehacer las secciones anteriores. Para comparar resultados, restablecer estos estados al comenzar cada ejercicio.

## PDF 4 — Seis vistas de Notion: cómo elegir la adecuada

**Objetivo:** entender que cambiar la presentación no crea una copia de las tareas. Priorizar Board y Calendar, que son el centro del módulo; presentar las otras cuatro como referencia breve.

### Contenido a desarrollar

1. **Datos frente a presentación.** Abrir la misma tarea desde tabla, tablero y calendario. Mostrar que conserva su nombre, contenido y propiedades. Incluir una advertencia: eliminar una entrada elimina ese registro compartido; eliminar una vista solo quita esa presentación. [Referencia oficial: fuentes de datos y vistas vinculadas](https://www.notion.com/help/data-sources-and-linked-databases).
2. **Cuadro para elegir una vista**, con estos ejemplos:

| Vista | Pregunta que ayuda a responder | Ejemplo y configuración a explicar |
| --- | --- | --- |
| Tabla (Table) | ¿Qué información tiene cada tarea? | Revisar de una vez Materia, Estado y Fecha límite. Es el lugar de control de los seis registros. [Ayuda oficial](https://www.notion.com/help/tables). |
| Tablero (Board) | ¿En qué etapa está cada entrega? | Agrupar explícitamente por Estado: Pendiente, En curso y Entregado. No asumir que siempre se configura solo. [Ayuda oficial](https://www.notion.com/help/boards). |
| Calendario (Calendar) | ¿Cuándo vence cada entrega? | Seleccionar Fecha límite como propiedad de fecha. Revisar las cinco tareas fechadas; la tarea sin fecha no tiene un día asignado. [Ayuda oficial](https://www.notion.com/help/calendars). |
| Lista (List) | ¿Cómo consultar tareas con poco ruido visual? | Mostrar el nombre y pocas propiedades para una lectura rápida. [Ayuda oficial](https://www.notion.com/help/lists). |
| Galería (Gallery) | ¿Cuándo conviene reconocer contenido visualmente? | Usar portadas o imágenes de referencia para identificar proyectos; no convertir cada tarea en una tarjeta decorativa. [Ayuda oficial](https://www.notion.com/help/galleries). |
| Cronograma (Timeline) | ¿Cuánto dura un trabajo y con cuáles se superpone? | Como ampliación, añadir una propiedad Date «Periodo de trabajo», con inicio y fin, a dos tareas existentes. No reemplazar sus fechas límite. [Ayuda oficial](https://www.notion.com/help/timelines). |

**Aclaración editorial:** son seis vistas seleccionadas para este curso, no todas las que existen actualmente. Notion también documenta gráficos y formularios; quedan fuera del nivel introductorio. [Referencia oficial: tipos de vistas](https://www.notion.com/help/views-filters-and-sorts#types-of-database-views).

3. **Acciones que sí modifican datos.** Mover «Entregar TP de algoritmos» entre columnas cambia su Estado. Mover una tarjeta a otro día del calendario cambia su fecha: no es un movimiento meramente visual. [Tableros](https://www.notion.com/help/boards), [calendarios](https://www.notion.com/help/calendars).

### Ejercicio guiado y resultado esperado

1. Conservar una vista Tabla sin filtros para control.
2. Agregar una vista Board llamada «Por estado» y agruparla por Estado.
3. Mover «Resolver guía de derivadas» a En curso y comprobar el cambio en Tabla.
4. Agregar Calendar llamado «Entregas» usando Fecha límite.
5. Comprobar las tareas de hoy y buscar «Consultar consigna del proyecto» en Tabla, sin inventarle una fecha.

**Resultado:** siguen existiendo seis tareas, no seis tareas por vista. La guía de derivadas cambia de estado en todas sus presentaciones. El calendario ubica las tareas con fecha y la tabla permite revisar también la que no la tiene.

### Recursos visuales propuestos — pendientes de crear

- Diagrama «una base → varias vistas», siguiendo una misma tarea resaltada.
- Capturas anotadas del tablero y calendario del caso, con flechas en Group y en la propiedad de fecha.
- Comparación «eliminar vista / eliminar tarea» mediante un esquema, sin pedir al estudiante que borre datos reales.

### Lista de comprobación

- [ ] Se puede elegir una vista según la pregunta, no por su apariencia.
- [ ] El tablero agrupa por Estado y el calendario usa Fecha límite.
- [ ] Se distingue eliminar una tarea de eliminar una vista.

## PDF 5 — Filtros y ordenamiento: construir «Mi día hoy»

**Objetivo:** obtener una lista de vencimientos del día pendientes de resolución. Aclarar que «vence hoy» no equivale a «todo lo que conviene estudiar hoy»: una entrega futura puede requerir trabajo anticipado.

### Contenido a desarrollar

**Tres conceptos que no deben confundirse:** filtrar selecciona qué entradas muestra una vista; ordenar cambia su secuencia; los permisos controlan acceso. Un filtro no es una barrera de privacidad. [Filtros y ordenamiento](https://www.notion.com/help/views-filters-and-sorts), [permisos](https://www.notion.com/help/sharing-and-permissions).

Presentar estas recetas como reglas de configuración, no como fórmulas para pegar:

| Vista propuesta | Condición | Orden útil |
| --- | --- | --- |
| Mi día hoy | Fecha límite corresponde a Hoy **Y** Estado no es Entregado. | Tarea ascendente para desempatar si todas vencen el mismo día. |
| Pendientes | Estado no es Entregado. | Fecha límite ascendente. Revisar también los registros sin fecha. |
| Atrasadas | Fecha límite anterior a Hoy **Y** Estado no es Entregado. | Fecha límite ascendente. |
| Por programar | Fecha límite está vacía **Y** Estado no es Entregado. | Tarea ascendente. |

Explicar **Y/AND** con «cumplir ambas condiciones» y **O/OR** con «cumplir al menos una». Ampliación breve: `(vence hoy O está atrasada) Y no está entregada`. Un O mal colocado puede incluir entregas terminadas. [Referencia oficial: filtros avanzados](https://www.notion.com/help/views-filters-and-sorts#filters).

Usar el criterio relativo Hoy, no una fecha fija: la intención es que la selección acompañe el día de consulta. En la redacción final, documentar el nombre exacto que muestre la interfaz utilizada. No prometer que el filtro reprograma tareas ni que resuelve pendientes anteriores.

### Ejercicio guiado y resultado esperado

1. Crear una vista List llamada «Mi día hoy», manteniendo Tabla sin filtros.
2. En los ajustes de la vista, configurar las dos condiciones unidas por Y y el orden indicado.
3. Comprobar que aparecen «Resolver guía de derivadas» y «Entregar TP de algoritmos».
4. Marcar la guía de derivadas como Entregado: debe dejar de mostrarse aquí, pero seguir en Tabla.
5. Crear «Atrasadas» y comprobar que muestra «Corregir informe de laboratorio».

**Resultado:** dos tareas inicialmente en «Mi día hoy» y una después de completar la guía. El resumen ya entregado, la tarea de mañana y la tarea sin fecha quedan fuera por motivos diferentes, que el material debe explicar. Mañana el criterio Hoy seleccionará los vencimientos de esa nueva jornada.

### Errores frecuentes a cubrir

- Confundir una vista vacía con una base vacía: revisar filtros, fechas y estados desde Tabla.
- Esperar que ordenar o filtrar cambie fechas, complete tareas o elimine registros.
- Olvidar atrasadas y tareas sin fecha al mirar exclusivamente «Hoy».
- Usar rangos u horas sin aclarar qué extremo y día se comparan. El ejercicio básico usa fechas únicas sin hora.
- En trabajo compartido, distinguir ajustes personales de «Guardar para todos», según permisos. [Referencia oficial: ajustes de filtros y orden](https://www.notion.com/help/views-filters-and-sorts).

### Recursos visuales propuestos — pendientes de crear

- Captura anotada de las dos condiciones Y y del ordenamiento.
- Cuadro «entra / no entra» con los seis registros del caso y su justificación.
- Esquema antes/después de completar una tarea, mostrando que permanece en Tabla.

### Lista de comprobación

- [ ] «Hoy» es relativo; no quedó fijado al día de la captura.
- [ ] El estudiante diferencia filtrar, ordenar y dar acceso.
- [ ] Hay una forma de revisar atrasadas y tareas sin fecha.

## PDF 6 — Layouts y columnas: construir el hub del estudiante

**Objetivo:** crear una página de inicio útil en tres columnas que reutilice los datos anteriores, no otra base ni una lista manual de las mismas tareas. La distribución debe coincidir con la explicación y el cuestionario de la sección 6: materias y recursos a la izquierda, calendario semanal en el centro y tareas del día a la derecha.

### Contenido a desarrollar

1. **Diseño antes que decoración.** Distribuir el hub en tres columnas: izquierda para accesos a materias y recursos; centro para el calendario semanal; derecha para «Mi día hoy». Mantener el enlace a la base completa en el encabezado y ajustar los anchos para que el calendario sea legible. Esta es la distribución que evalúa el cuestionario de la sección 6.
2. **Columnas de página.** Explicar el arrastre desde el control del bloque hasta una guía vertical azul y el ajuste de ancho. Aclarar que no son las columnas de propiedades de una tabla. En teléfono el contenido se apila: revisar el orden de lectura. [Referencia oficial: columnas y formato](https://www.notion.com/help/columns-headings-and-dividers).
3. **Vista vinculada frente a copia.** Insertar una base mediante `/database` y elegir «Link to existing data source», seleccionando «Tareas de la cursada». La vista vinculada permite sus propios filtros y presentación, pero editar las páginas o propiedades modifica los datos compartidos. No usar «New empty database» ni duplicar la base para este objetivo. [Referencia oficial: fuentes de datos vinculadas](https://www.notion.com/help/data-sources-and-linked-databases).

### Boceto propuesto — no es una captura ni una plantilla creada

```text
MI CURSADA
Objetivo de la semana y enlace a la base completa
--------------------------------------------------------------------------------
IZQUIERDA                 | CENTRO                     | DERECHA
Materias y recursos       | Calendario semanal         | Mi día hoy
Análisis Matemático I     | Vista vinculada Calendar   | Vista vinculada List
Algoritmos                | Fecha límite               | Hoy Y no Entregado
Física I / Campus         | Misma base de tareas       | Pestaña: Atrasadas
--------------------------------------------------------------------------------
```

Los accesos de la izquierda apuntan a las páginas de apuntes de la sección 2. «Mi día hoy», a la derecha, aplica las reglas de la sección 5. El calendario central reutiliza Fecha límite y se presenta por semana; no requiere copiar entregas. [Referencia oficial: calendario semanal](https://www.notion.com/help/calendars).

### Ejercicio guiado y resultado esperado

1. Crear la página «Mi cursada», con encabezados y enlaces a tres materias.
2. Crear tres columnas: materias y recursos a la izquierda, espacio para el calendario en el centro y tareas del día a la derecha.
3. Vincular la base existente en la columna derecha y crear allí «Mi día hoy» y «Atrasadas» con las recetas anteriores.
4. Agregar en la columna central otra presentación vinculada Calendar, seleccionar la misma fuente y mostrar el calendario semanal.
5. Cambiar el Estado de «Entregar TP de algoritmos» desde el hub y comprobarlo en la base original.
6. Cambiar un filtro del hub y comprobar que no alteró el filtro de la vista original. Revisar también el apilado en teléfono.

**Resultado:** una página con materias y recursos a la izquierda, calendario semanal en el centro y foco diario a la derecha, alimentada por los mismos seis registros. La distribución coincide con el cuestionario. Cambian los datos compartidos al editarlos, pero no se duplican tareas ni se trasladan automáticamente los ajustes de una vista a otra.

### Precauciones a incluir

- Compartir el hub no garantiza acceso a los datos vinculados: comprobar el acceso a la base original. [Referencia oficial](https://www.notion.com/help/data-sources-and-linked-databases).
- Quitar una presentación vinculada no es lo mismo que borrar entradas o enviar la fuente original a la papelera. Mostrar exactamente qué elemento se está seleccionando.
- Evitar listas manuales paralelas de tareas: los enlaces a materias son navegación, no otra agenda que mantener.
- «Dashboard» significa aquí una página compuesta con bloques y vistas vinculadas; no se enseña la funcionalidad específica de vistas Dashboard ni automatizaciones.

### Recursos visuales propuestos — pendientes de crear

- Captura de la guía vertical al crear las tres columnas y del ajuste de ancho, con materias a la izquierda, calendario en el centro y tareas del día a la derecha.
- Captura anotada de la selección de la fuente existente.
- Diagrama «hub ↔ datos originales»: datos compartidos, filtros propios.
- Comparación del mismo hub en escritorio y teléfono, con datos ficticios.

### Lista de comprobación

- [ ] En escritorio hay tres columnas: materias y recursos a la izquierda, calendario semanal en el centro y tareas del día a la derecha.
- [ ] El hub referencia la base existente y permite abrirla completa.
- [ ] Un cambio de Estado se refleja en el origen sin duplicar registros.
- [ ] Los accesos y el orden de lectura funcionan también en teléfono.

## Producción pendiente para convertir esta propuesta en PDF

1. Redactar cada guía con introducción breve, pasos numerados, ejemplo resuelto, ejercicio y lista de comprobación. Extensión orientativa: 3 a 5 páginas por guía, según las capturas.
2. Preparar el espacio de demostración con los seis registros y producir los recursos visuales propuestos; usar únicamente información ficticia y textos legibles.
3. Probar las instrucciones en la interfaz vigente de Notion, registrar fecha de revisión y adaptar las etiquetas al idioma de las capturas. Las referencias técnicas de esta propuesta se consultaron el 18 de octubre de 2026.
4. Maquetar y exportar los tres PDF; revisar visualmente tablas, capturas, enlaces y saltos de página.
5. Publicarlos en los destinos indicados y comprobar las descargas `/pdfs/guia-4.pdf`, `/pdfs/guia-5.pdf` y `/pdfs/guia-6.pdf` desde la capacitación.

**Fuera de alcance:** fórmulas avanzadas, relaciones, rollups, automatizaciones y creación de nuevas bases por materia. No son necesarios para los objetivos ni los cuestionarios de estas tres secciones.
