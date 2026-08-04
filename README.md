# Pokémon Microfrontends

Solución desarrollada como parte del reto técnico para la posición de **Frontend Senior**.

La solución está compuesta por una aplicación **Host (Shell)** y dos **Microfrontends** independientes, integrados mediante **Module Federation**.

## Funcionalidades

- Login y gestión de sesión.
- Home con categorías de Pokémon.
- Buscador con búsqueda exacta e Infinite Scroll.
- Microfrontend de detalle de Pokémon.
- Microfrontend de historial de visitas.
- Tema claro / oscuro.
- Toast con el último Pokémon visitado.

---

# Estructura del Proyecto

El proyecto está organizado en tres aplicaciones independientes.

```text
.
├── shell/                # Host de la aplicación
├── mf-detail-pokemon/    # Microfrontend de detalle del Pokémon
├── mf-history/           # Microfrontend de historial
└── README.md
```

## Responsabilidades

### Shell

Aplicación principal encargada de:

- Login y gestión de sesión.
- Home.
- Navegación.
- Modal de búsqueda.
- Tema claro / oscuro.
- Toast global.
- Integración de los Microfrontends.

### MF Detail Pokémon

Microfrontend responsable de mostrar la información detallada del Pokémon seleccionado.

### MF History

Microfrontend responsable de visualizar el historial de Pokémon visitados.

---

# Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| React 19 | Biblioteca para la interfaz de usuario |
| Vite | Bundler y servidor de desarrollo |
| Module Federation | Integración de Microfrontends |
| Zustand | Gestión de estado global |
| TanStack Query | Data Fetching, caché e Infinite Query |
| Tailwind CSS v4 | Estilos |
| Zod | Validación de respuestas |
| TypeScript | Tipado estático |

---

# Instalación

Clonar el repositorio.

```bash
git clone https://github.com/victorporta/prueba-mf-frs
```

Instalar las dependencias de cada aplicación.

### Shell

```bash
cd shell
npm install
```

### MF Detail Pokémon

```bash
cd ../mf-detail-pokemon
npm install
```

### MF History

```bash
cd ../mf-history
npm install
```

---

# Scripts

Cada aplicación dispone de los siguientes scripts:

| Script | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Ejecuta la versión compilada |
| `npm run lint` | Ejecuta ESLint |

---

# Ejecución

Levantar cada aplicación en una terminal diferente.

| Aplicación | URL |
|------------|-------------------------|
| Shell | http://localhost:3000 |
| MF Detail Pokémon | http://localhost:3001 |
| MF History | http://localhost:3002 |

### Terminal 1 - Shell

```bash
cd shell
npm run dev
```

### Terminal 2 - MF Detail Pokémon

```bash
cd mf-detail-pokemon
npm run dev
```

### Terminal 3 - MF History

```bash
cd mf-history
npm run dev
```

---

# Decisiones Técnicas

## Arquitectura

El proyecto utiliza una **arquitectura modular basada en Features**, organizada mediante **Layered Architecture**.

La solución separa claramente las responsabilidades en tres capas:

- Domain
- Infrastructure
- Presentation

Se tomaron principios de **Clean Architecture**, manteniendo el dominio desacoplado de la infraestructura y de la interfaz de usuario. Dado el alcance del reto, no se incorporó una capa de **Use Cases**, ya que la lógica de negocio consiste principalmente en operaciones de consulta sobre la PokeAPI y su incorporación habría añadido complejidad innecesaria.

---

## Microfrontends

Se utilizó **Module Federation** para desacoplar el **Shell** de los Microfrontends.

El **Shell** concentra las funcionalidades transversales de la aplicación (Login, Home, Theme, Search y Toast), mientras que **Pokémon Detail** e **History** se implementan como aplicaciones independientes, facilitando su mantenimiento, evolución y despliegue sin afectar al Host.

---

## Gestión del Estado

Se eligió **Zustand** para gestionar únicamente el estado global de la aplicación, como:

- Tema.
- Autenticación.
- Estado del buscador.

Los datos remotos no se almacenan en Zustand, evitando duplicar responsabilidades con TanStack Query.

---

## Data Fetching

Se eligió **TanStack Query** para el consumo de la PokeAPI debido a sus capacidades integradas de:

- Caché.
- Revalidación.
- Manejo de estados de carga.
- Manejo de errores.
- Reintentos automáticos.
- Infinite Query para el buscador.

---

## Cliente HTTP

Se utilizó la API nativa **Fetch**, manteniendo una solución ligera y sin dependencias adicionales. El ciclo de vida de las peticiones es gestionado por TanStack Query.

---

## Validación

Todas las respuestas provenientes de la PokeAPI son validadas mediante **Zod** antes de ser transformadas al modelo de dominio, reduciendo el riesgo de inconsistencias ante posibles cambios en el contrato de la API.

---

## Repository Pattern

La capa de presentación nunca consume directamente la PokeAPI.

Toda la comunicación se realiza mediante el patrón **Repository**, desacoplando la infraestructura de la lógica de la aplicación y facilitando futuras modificaciones del origen de datos.

---

## DTO + Mapper

Los DTO obtenidos desde la PokeAPI son transformados mediante **Mappers** a entidades del dominio, evitando que la interfaz dependa directamente del contrato externo.

---

## Historial

El historial se implementó mediante un servicio respaldado por **localStorage**, permitiendo compartir la misma información entre el **Shell** y los **Microfrontends** sin depender de un estado global en memoria.

La estrategia implementada permite:

- Persistencia entre recargas.
- Evitar registros duplicados.
- Incrementar automáticamente el contador de visitas.
- Obtener el último Pokémon visitado para el Toast global.