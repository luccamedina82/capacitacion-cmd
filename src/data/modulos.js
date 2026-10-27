/**
 * Programa oficial de 6 módulos para la Capacitación Notion.
 * Cada módulo incluye:
 * - videoSrc & videoTitulo
 * - explicacionBreve (visible por defecto)
 * - explicacionDetallada (desplegable tipo acordeón)
 * - recurso PDF con link descargable
 * - clave: [etiqueta, texto] del dato práctico que conviene recordar
 * - corto: nombre breve para navegación y para la pieza del dashboard
 * - logro: lo que vas a poder hacer al terminar (objetivo del programa, en concreto)
 */

export const SECCIONES = [
  {
    id: 'sec1',
    corto: 'Bloques',
    logro: 'Crear cualquier bloque con el atajo / y ordenar tu cursada en páginas dentro de páginas.',
    num: 'Sección 1 · Módulo Fundamentos',
    titulo: 'Deconstruyendo el Caos Estudiantil (Mentalidad Notion)',
    tag: 'Mentalidad Notion',
    videoSrc: 'https://youtu.be/bQJq6nPtoTI',
    videoTitulo: 'Deconstruyendo el Caos Estudiantil: Bloques y Atajos Clave',
    videoDuracion: '2:09',
    explicacionBreve:
      'Descubrí qué es Notion y por qué funciona diferente a Word o Google Docs. Aprenderemos a navegar por la interfaz, a crear tu primera página y a dominar el concepto fundamental de "bloques" para centralizar toda tu cursada sin saturarte de información.',
    explicacionDetallada: [
      'A diferencia de los procesadores de texto tradicionales que funcionan como "hojas de papel", Notion funciona como un juego de piezas de Lego. Todo lo que ves (un párrafo, un título, una imagen, una lista de tareas) es un "bloque" independiente. Esto permite que puedas arrastrar, reordenar y transformar la información en segundos.',
      'Para empezar, solo necesitas dominar el atajo maestro: la barra (/). Al escribirla en cualquier lugar, se despliega un menú con todos los bloques disponibles: textos, encabezados (H1, H2, H3), listas con viñetas, bloques de código, citas o "Callouts" (cajas de texto resaltadas ideales para destacar fechas de parciales o advertencias).',
      'La regla de oro del estudiante en Notion es la limpieza visual: crear una página principal y anidar páginas dentro de ella en lugar de tener cientos de archivos sueltos.',
    ],
    pdf: {
      titulo: 'Guía Rápida: Los 10 atajos de teclado y comandos esenciales',
      url: '/pdfs/guia-1.pdf',
    },
    clave: ['Atajo clave', 'escribí / para insertar cualquier bloque'],
  },
  {
    id: 'sec2',
    corto: 'Apuntes',
    logro: 'Armar apuntes por materia con toggles que te preguntan antes de mostrarte la respuesta (Active Recall).',
    num: 'Sección 2 · Toma de Notas Inteligente',
    titulo: 'El Cuaderno Digital Inteligente (Toma de Apuntes Activa)',
    tag: 'Active Recall',
    videoSrc: 'https://youtu.be/GHYURkZ4qX4',
    videoTitulo: 'Estructuración de Materias, Toggles y Active Recall',
    videoDuracion: '2:08',
    explicacionBreve:
      'Transformá tus apuntes estáticos en material interactivo. Aprenderemos a estructurar la página de una materia, a incrustar recursos externos (como PDFs de la cátedra) y a utilizar los Toggles para aplicar la técnica de Active Recall y estudiar de forma más activa.',
    explicacionDetallada: [
      'El verdadero poder de estudiar en Notion no es solo escribir, sino crear un sistema que te evalúe. Para la estructura de una materia, lo ideal es dividir la página en tres zonas: Recursos (links al campus, programa oficial), Trabajos Prácticos, y Apuntes Teóricos.',
      'En la zona de apuntes, la herramienta estrella es la lista desplegable o Toggle (/toggle). En lugar de leer pasivamente un texto largo, escribes una posible pregunta de examen como título del Toggle, y ocultas la respuesta dentro. Al estudiar, intentas recordar la respuesta antes de desplegarlo (técnica de Active Recall).',
      'Además, Notion permite escribir /pdf para subir o incrustar los apuntes de la cátedra directamente en la página, permitiendo leer el material y tomar notas justo al lado sin cambiar de ventana.',
    ],
    pdf: {
      titulo: 'Active Recall en Notion: cómo estudiar con preguntas y respuestas ocultas',
      url: '/pdfs/guia-2.pdf',
    },
    clave: ['Comando clave', '/toggle para ocultar respuestas'],
  },
  {
    id: 'sec3',
    corto: 'Base de datos',
    logro: 'Tener todas tus entregas en una base de datos con materia, estado y fecha de entrega.',
    num: 'Sección 3 · Bases de Datos',
    titulo: 'El Núcleo de Datos: Tu Primera Base de Datos Estudiantil',
    tag: 'Bases de Datos',
    videoSrc: 'https://youtu.be/0mFkgNtjftk',
    videoTitulo: 'Creación de Bases de Datos, Propiedades y Parámetros',
    videoDuracion: '14:20',
    explicacionBreve:
      'Dejá de usar texto plano para anotar lo que debés. Las Bases de Datos son el motor de Notion. Aprenderemos a crear una tabla inteligente donde cada tarea tiene propiedades (Materia, Estado, Fecha límite) para que nada se pierda.',
    explicacionDetallada: [
      'Una Base de Datos en Notion no es como Excel; es un conjunto dinámico de páginas. Cada fila de tu tabla no es solo un texto, sino una página entera que podés abrir para agregar resúmenes o archivos adentro.',
      'Para crearla usamos /database inline. A partir de ahí, configuramos "Propiedades" (las columnas). Las más importantes para un estudiante son: Select o Multi-select (para etiquetar a qué materia pertenece la tarea), Date (para la fecha del parcial o entrega) y Status (Pendiente, En Progreso, Terminado).',
      'Al tener todo categorizado, el caos de "anotar en papelitos" desaparece porque toda la cursada está parametrizada.',
    ],
    pdf: {
      titulo: 'Diccionario de Propiedades: Entendiendo las Bases de Datos',
      url: '/pdfs/guia-3.pdf',
    },
    clave: ['Atajo clave', '/database inline para insertar la tabla'],
  },
  {
    id: 'sec4',
    corto: 'Vistas',
    logro: 'Ver esas mismas entregas como tablero Kanban o como calendario del mes, sin duplicar nada.',
    num: 'Sección 4 · Vistas Visuales',
    titulo: 'Control Visual del Tiempo: Tableros Kanban y Calendarios',
    tag: 'Kanban & Calendarios',
    videoSrc: 'https://youtu.be/rRNDw2sclAA',
    videoTitulo: 'Múltiples Vistas para los Mismos Datos: Board y Calendar',
    videoDuracion: '2:09',
    explicacionBreve:
      'Una misma información, múltiples formas de verla. A partir de la base de datos que creamos, aprenderemos a transformarla con un clic en un Calendario mensual y en un Tablero visual por columnas (Kanban) para gestionar entregas.',
    explicacionDetallada: [
      'La magia de Notion es que los datos y la forma de visualizarlos son independientes. Si tenés una base de datos de tareas, podés agregar "Vistas" (Views).',
      'Si configurás una vista de "Tablero" (Board), Notion agrupa automáticamente tus tareas según la propiedad Status, creando columnas (Pendiente, En Curso, Finalizado). Podés arrastrar tarjetas de una columna a otra y el estado se actualizará solo.',
      'Si agregás una vista de "Calendario", Notion leerá la propiedad Date y ubicará tus parciales y trabajos en los días correspondientes del mes. Esto elimina la necesidad de anotar una tarea dos veces en lugares distintos.',
    ],
    pdf: {
      titulo: 'Las 6 Vistas de Notion y cuándo usar cada una',
      url: '/pdfs/guia-4.pdf',
    },
    clave: ['Tip', 'Arrastrá tarjetas en el Board para cambiar su estado'],
  },
  {
    id: 'sec5',
    corto: 'Filtros',
    logro: 'Ver solo lo que vence esta semana, ordenado por urgencia.',
    num: 'Sección 5 · Filtros & Foco',
    titulo: 'Filtros, Ordenamiento y "Mi Día Hoy"',
    tag: 'Filtros & Sorts',
    videoSrc: 'https://youtu.be/SPmtSxDQJN0',
    videoTitulo: 'Reducción de Ruido Visual: Filtros Dinámicos y Vistas "Hoy"',
    videoDuracion: '12:10',
    explicacionBreve:
      'Reducí el ruido visual. Si tenés 50 tareas para todo el semestre, no necesitas verlas todas juntas. Aprenderemos a usar Filtros y Ordenamientos para que Notion te muestre exclusivamente lo que tenés que resolver hoy.',
    explicacionDetallada: [
      'Una base de datos saturada genera estrés. Para evitarlo, usamos la función Filter. Podés decirle a Notion: "Ocultame todo lo que tenga estado Finalizado". O crear una regla dinámica: filtrar la propiedad Fecha para que solo muestre las tareas donde "Date is Today" (La fecha es hoy) o "Date is This week" (Esta semana).',
      'El complemento perfecto es la función Sort (Ordenamiento). Podés pedirle que ordene las tareas pendientes tomando la fecha límite de forma Ascendente; así, lo más urgente siempre aparecerá primero en la lista.',
      'De esta forma, el sistema trabaja para vos, mostrándote qué sigue sin esfuerzo cognitivo.',
    ],
    pdf: {
      titulo: 'Lógica de Filtros: Cómo crear vistas dinámicas',
      url: '/pdfs/guia-5.pdf',
    },
    clave: ['Regla de oro', 'Date is Today para el foco diario'],
  },
  {
    id: 'sec6',
    corto: 'Dashboard',
    logro: 'Juntar todo en un dashboard de inicio en columnas, con tus bases vinculadas.',
    num: 'Sección 6 · Arquitectura Final',
    titulo: 'El Hub Central del Estudiante (Dashboard Principal)',
    tag: 'Dashboard Maestro',
    videoSrc: 'https://youtu.be/ePpSRGgOn0A',
    videoTitulo: 'Construcción del Dashboard: Linked Databases y Multi-Columnas',
    videoDuracion: '15:45',
    explicacionBreve:
      'Unimos todas las piezas. Llegó el momento de armar tu "Dashboard" o página central: un panel de control estético y funcional que consolide tus materias, recursos y bases de datos filtradas en una sola pantalla de inicio.',
    explicacionDetallada: [
      'El Dashboard es tu "pantalla de inicio" de la universidad. Para que sea eficiente, usamos el bloque de Linked Database (Vista de base de datos enlazada). Esto te permite insertar la base de tareas que creaste en la Sección 3 directamente en tu página de inicio, pero aplicando los filtros de "Mi día hoy" que vimos en la Sección 5.',
      'La estructura ideal de un Dashboard incluye maquetación en columnas. Arrastrando los bloques hacia los extremos de la pantalla podés crear dos o tres columnas.',
      'En la izquierda, podés dejar accesos directos elegantes a las páginas de tus materias; en el centro, tu calendario semanal; y a la derecha, tu lista de tareas para el día. Todo en un solo vistazo sin necesidad de entrar a múltiples carpetas.',
    ],
    pdf: {
      titulo: 'Layouts y Columnas: Diseño de Interfaces en Notion',
      url: '/pdfs/guia-6.pdf',
    },
    clave: ['Bloque clave', '/linked database para espejar tus datos'],
  },
]
