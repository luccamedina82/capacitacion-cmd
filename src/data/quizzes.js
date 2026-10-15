/**
 * Datos de todos los quizzes de la capacitación.
 * Preguntas genéricas basadas en situaciones cotidianas de estudio y organización con Notion.
 * (Editables libremente)
 */

export const QUIZZES = {
  q0: [
    {
      texto: 'En Notion, ¿qué es el calendario?',
      opciones: [
        { op: 'a', texto: 'Una herramienta aparte que hay que mantener sincronizada con las tareas' },
        { op: 'b', texto: 'Una forma de mirar una base de datos que ya cargaste' },
        { op: 'c', texto: 'Un bloque donde escribís las fechas a mano' },
      ],
      ok: 'b',
    },
    {
      texto: '¿Qué escribís para abrir el menú de cosas que podés insertar?',
      opciones: [
        { op: 'a', texto: '@' },
        { op: 'b', texto: '#' },
        { op: 'c', texto: '/' },
      ],
      ok: 'c',
    },
  ],

  q1: [
    {
      texto: 'Tenés tres carillas de apuntes que te tapan la página. ¿Qué usás?',
      opciones: [
        { op: 'a', texto: 'Un título 1, para que quede separado' },
        { op: 'b', texto: 'Un toggle, para poder plegarlo' },
        { op: 'c', texto: 'Una página nueva, es la única forma' },
      ],
      ok: 'b',
    },
    {
      texto: '¿Cómo ponés dos bloques uno al lado del otro?',
      opciones: [
        { op: 'a', texto: 'Arrastrando uno hasta el costado del otro' },
        { op: 'b', texto: 'Insertando una tabla de dos columnas' },
        { op: 'c', texto: 'No se puede, Notion es de una sola columna' },
      ],
      ok: 'a',
    },
  ],

  q2: [
    {
      texto: 'Cargaste todas tus entregas en una tabla simple y ahora las querés ver en calendario.',
      opciones: [
        { op: 'a', texto: 'Agregás una vista de calendario a la tabla' },
        { op: 'b', texto: 'Copiás las fechas a un calendario aparte' },
        { op: 'c', texto: 'No se puede: una tabla simple no tiene vistas, necesitás una base de datos' },
      ],
      ok: 'c',
    },
    {
      texto: 'Corrés la fecha de una entrega desde la vista de tabla. ¿Qué pasa en el calendario?',
      opciones: [
        { op: 'a', texto: 'Se mueve sola: es la misma información vista de otra forma' },
        { op: 'b', texto: 'Queda desactualizado hasta que lo edites también ahí' },
        { op: 'c', texto: 'Se duplica la tarea en las dos fechas' },
      ],
      ok: 'a',
    },
  ],

  q3: [
    {
      texto: '¿Cuándo conviene una base de datos de Materias en vez de una propiedad de selección?',
      opciones: [
        { op: 'a', texto: 'Siempre, la selección es una versión incompleta' },
        { op: 'b', texto: 'Cuando de cada materia querés guardar más cosas que el nombre' },
        { op: 'c', texto: 'Cuando cursás más de cinco materias' },
      ],
      ok: 'b',
    },
    {
      texto: 'Con Tareas y Materias relacionadas, ¿qué ganás?',
      opciones: [
        { op: 'a', texto: 'Que las tareas se creen solas cada cuatrimestre' },
        { op: 'b', texto: 'Que el calendario ordene por materia automáticamente' },
        { op: 'c', texto: 'Que al abrir una materia veas todas sus tareas' },
      ],
      ok: 'c',
    },
  ],
}
