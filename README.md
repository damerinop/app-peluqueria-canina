# 🐾 Sistema de Gestión de Peluquería Canina

Una aplicación web interactiva construida con **React** y **Next.js (App Router)** para la gestión integral de una peluquería canina (tutores, mascotas, razas, citas, herramientas y servicios de cosmética).

---

## 🛠️ Tecnologías Utilizadas

* **[React](https://react.dev/)**: Biblioteca principal para la creación de interfaces de usuario basadas en componentes interactivos, manejo de estados (`useState`) y efectos de ciclo de vida (`useEffect`).
* **[Next.js](https://nextjs.org/)**: Framework sobre React que proporciona enrutamiento basado en archivos (App Router), optimizaciones e integración cliente/servidor.
* **TypeScript / JSX**: Tipado estático y sintaxis declarativa para React.
* **JSON Server**: API REST simulada que sirve y persiste los datos desde una base de datos local JSON.

---

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
* **Node.js** (versión 18.0 o superior recomendada).
* **npm**, **yarn** o **pnpm** como gestor de paquetes.

---

## 🚀 Pasos para Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto en un entorno local:

### 1. Clonar e Instalar Dependencias
Abre la terminal en la raíz del proyecto y ejecuta:

```bash
npm install
```

### 2. Iniciar la API Simulada (`JSON Server`)
El proyecto consume datos desde `datos_peluqueria.json`. Para iniciar la API REST en el puerto `4000`, abre una terminal y ejecuta:

```bash
npx json-server --watch datos_peluqueria.json --port 4000
```

> **Servicios activos:**
> * Tutores: `http://localhost:4000/tutor`
> * Mascotas: `http://localhost:4000/mascota`
> * Razas: `http://localhost:4000/raza`
> * Citas: `http://localhost:4000/citas`

### 3. Iniciar la Aplicación React / Next.js
En **otra ventana de la terminal**, ejecuta el servidor de desarrollo de Next.js:

```bash
npm run dev
```

### 4. Acceder a la Aplicación
Abre tu navegador e ingresa a: **`http://localhost:3000`**

---

## 📁 Estructura Completa del Proyecto

```text
peluqueria-canina/
├── app/                        # Enrutador principal de Next.js (App Router)
│   ├── layout.tsx              # Diseño global / Wrapper principal de React
│   ├── page.tsx                # Página de inicio / Dashboard principal
│   ├── tutor/                  # Módulo de Tutores
│   │   ├── page.tsx            # Lista y búsqueda de tutores
│   │   └── nuevo/
│   │       └── page.tsx        # Formulario React para registro de tutores
│   └── mascota/                # Módulo de Mascotas
│       ├── page.tsx            # Lista de mascotas y detalles
│       └── nuevo/
│           └── page.tsx        # Formulario React con relaciones (Tutores y Razas)
├── components/                 # Componentes reutilizables de React (Botones, Modales, Navbars)
├── public/                     # Archivos estáticos (imágenes, favicons, fuentes)
├── datos_peluqueria.json       # Base de datos simulada en formato JSON
├── package.json                # Dependencias y scripts del proyecto
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Documentación del proyecto
```

---

## 🧪 Ejecución de Pruebas

Para validar la lógica y los componentes de React, puedes ejecutar las pruebas mediante:

```bash
npm run test
```