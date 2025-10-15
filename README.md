# StayFinder - Taller de Desarrollo Web

StayFinder es una aplicación web construida con React y Vite que implementa un CRUD completo de alojamientos y un sistema de autenticación de usuarios, utilizando Supabase como backend.

## Demostración

![StayFinder Screenshot 1](/screenshots/desktop-home.png)
![StayFinder Screenshot 2](/screenshots/desktop-explore.png)
![StayFinder Screenshot 3](/screenshots/mobile-home.png)
![StayFinder Screenshot 4](/screenshots/mobile-explore.png)

## Objetivos de Aprendizaje Cumplidos

Este proyecto fue desarrollado como parte de un taller de desarrollo web, cumpliendo con los siguientes objetivos de aprendizaje:

- **Configuración de Proyecto Moderno:** Uso de Vite para una configuración rápida y eficiente de un proyecto React con TypeScript.
- **Autenticación y Autorización:** Implementación de un sistema de registro e inicio de sesión de usuarios utilizando Supabase Auth, con roles de `usuario` y `administrador`.
- **CRUD Completo:** Diseño e implementación de operaciones CRUD (Crear, Leer, Actualizar, Borrar) para la entidad "Alojamiento".
- **Backend como Servicio (BaaS):** Utilización de Supabase como backend para la base de datos, autenticación y almacenamiento de imágenes.
- **Enrutamiento y Rutas Protegidas:** Aplicación de enrutamiento del lado del cliente con React Router, incluyendo rutas protegidas que requieren autenticación y rutas de administrador.
- **Documentación:** Creación de documentación clara y concisa del proyecto.

## Stack Tecnológico

- **Frontend:**
  - [React](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Backend:**
  - [Supabase](https://supabase.io/) (Base de datos, Autenticación, Almacenamiento)
- **Gestión de Estado:**
  - [Zustand](https://github.com/pmndrs/zustand)
- **Enrutamiento:**
  - [React Router](https://reactrouter.com/)
- **Notificaciones:**
  - [React Hot Toast](https://react-hot-toast.com/)
- **Iconos:**
  - [Lucide React](https://lucide.dev/)

## Requisitos Previos

- Node.js 18+
- `npm` o `pnpm` instalado.
- Conocimientos básicos de JavaScript/TypeScript y React.
- Una cuenta de Supabase.

## Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/crcascr/stay-finder.git
    cd stay-finder
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    - Crea una copia del archivo `.env.example` y renómbrala a `.env`.
      ```bash
      cp .env.example .env
      ```
    - Inicia sesión en [Supabase](https://supabase.io/) y crea un nuevo proyecto.
    - Ve a `Project Settings` > `API`.
    - Copia el `Project URL` y la `Project API key` (public anon key).
    - Pega estos valores en tu archivo `.env` como se indica.

4.  **Ejecutar el proyecto:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## Variables de Entorno

El archivo `.env` es necesario para conectar la aplicación con tu instancia de Supabase.

```
# URL de tu proyecto de Supabase
VITE_SUPABASE_URL=https://tu-id-de-proyecto.supabase.co

# Llave anónima pública de tu proyecto de Supabase
VITE_SUPABASE_ANON_KEY=tu-llave-anonima-publica
```

## Decisiones Técnicas

- **Vite en lugar de Create React App:** Se eligió Vite por su increíble velocidad de desarrollo (HMR) y su configuración más simple y moderna.
- **Supabase como Backend:** Para simplificar la infraestructura y enfocarnos en el frontend, se optó por Supabase. Provee una solución integral (base de datos, auth, storage) que es fácil de configurar y escalar.
- **Tailwind CSS para Estilos:** Se utilizó Tailwind CSS por su enfoque "utility-first", que permite construir interfaces de usuario complejas y consistentes rápidamente sin salir del HTML/JSX.
- **Zustand para la Gestión de Estado:** En lugar de Redux o Context API, se eligió Zustand por su simplicidad, bajo boilerplate y excelente rendimiento para gestionar el estado global de la aplicación (sesión de usuario, datos del dashboard, etc.).
