# QuestEditor

**QuestEditor** es una plataforma web para la creación y edición de preguntas interactivas basadas en secuencias numéricas. Está diseñada para facilitar a los profesores la elaboración de actividades dinámicas que pueden ser visualizadas desde la perspectiva del estudiante.

Cada pregunta se construye a partir de una secuencia inicial y un conjunto de transformaciones predefinidas, permitiendo generar múltiples soluciones posibles. La herramienta ofrece funcionalidades intuitivas para crear, listar, editar, eliminar y previsualizar preguntas con una experiencia fluida y clara.

## Tecnologías utilizadas

#### Backend
- [NestJS](https://nestjs.com/)
- PostgreSQL 17
- Docker + Docker Compose

#### Frontend
- [React](https://es.react.dev/)
- TypeScript
- Vite

## Cómo correr el proyecto localmente (desarrollo)

#### Requisitos previos

- Node.js v22.16
- Docker y Docker Compose

---

#### 1. Clonar el repositorio

```sh
git clone https://github.com/sae0-3/bit-a-bit.git
cd /bit-a-bit
```

#### 2. Configurar base de datos

```sh
cd database
docker compose up -d
```

Esto iniciará el contenedor con PostgreSQL y ejecutará automáticamente el archivo init.sql dentro de `structure/`

#### 3. Ejecutar el backend (NestJS)

```sh
cd backend
npm install
node --run start:dev
```

#### 4. Ejecutar el frontend (React + Vite)

```sh
cd frontend
npm install
node --run dev
```

#### 5. Acceder a la aplicación

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Cómo correr el proyecto localmente (producción)

#### Requisitos previos

- Docker y Docker Compose

---

#### 1. Clonar el repositorio

```sh
git clone https://github.com/sae0-3/bit-a-bit.git
cd /bit-a-bit
```

#### 2. Ejecutar con Docker Compose

```sh
docker compose up -d --build
```

#### 3. Acceder a la aplicación

- Frontend: https://localhost
- Backend: https://localhost/api
