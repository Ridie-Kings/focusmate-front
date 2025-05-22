# SherpApp - Para que estudiar no sea cuesta arriba

SherpApp es una herramienta de productividad diseñada para estudiantes y opositores que quieren organizar su estudio, medir su progreso y alcanzar sus metas académicas.

![SherpApp](https://via.placeholder.com/800x400?text=SherpApp)

## Características Principales

- **Dashboard**: Vista general que muestra tareas, hábitos, estadísticas y acceso rápido al pomodoro.
- **Sistema de Hábitos**: Crea y realiza seguimiento de hábitos diarios, semanales y mensuales.
- **Calendario**: Agenda y planifica tus actividades y tareas de estudio.
- **Pomodoro**: Técnica de estudio con temporizador para mantener la concentración.
- **Estadísticas**: Seguimiento detallado de tu progreso a través del tiempo.
- **Perfil de Usuario**: Personaliza tu información y gestiona tu cuenta.

## Tecnologías

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.IO](https://socket.io/) para funcionalidades en tiempo real
- Backend con API RESTful

## Estructura del Proyecto

```
focusmate-front/
├── app/                # Rutas y páginas de la aplicación
│   ├── (Nav & Top)/    # Páginas con navbar y barra superior
│   ├── (Nav)/          # Páginas solo con navbar
│   └── (no Layout)/    # Páginas sin layout predeterminado (login, registro)
├── components/         # Componentes reutilizables
│   ├── Elements/       # Elementos pequeños y específicos
│   ├── Layouts/        # Componentes de estructura principal
│   ├── Pages/          # Componentes específicos para páginas
│   ├── Provider/       # Proveedores de contexto
│   └── Reusable/       # Componentes reutilizables generales
├── config/             # Archivos de configuración
├── interfaces/         # Tipos y interfaces TypeScript
├── lib/                # Utilidades y funciones helper
├── public/             # Archivos estáticos
└── services/           # Servicios de API y conexiones externas
```

## Requisitos

- Node.js 18.0 o superior
- npm, yarn o pnpm

## Instalación

1. **Clona el repositorio**
    ```bash
    git clone https://github.com/tu-usuario/focusmate-front.git
    cd focusmate-front
    ```

2. **Instala las dependencias**
    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

3. **Configura las variables de entorno**
    ```bash
    cp .env.example .env.local
    ```
    Edita el archivo `.env.local` con tus configuraciones locales.

4. **Inicia el servidor de desarrollo**
    ```bash
    npm run dev
    # o
    yarn dev
    # o
    pnpm dev
    ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run start` - Inicia la aplicación compilada
- `npm run lint` - Ejecuta el linter para verificar errores de código

## Flujo de Autenticación

La aplicación utiliza un sistema de autenticación basado en tokens JWT:

- Los usuarios pueden registrarse o iniciar sesión desde `/register` y `/login`.
- Se utilizan tokens de acceso y refresco para mantener la sesión.
- Las rutas protegidas verifican la autenticación mediante middleware.

## Componentes Principales

### Dashboard (`/`)
- Panel central que agrupa las principales funcionalidades.
- Widgets para tareas, hábitos, pomodoro y calendario.

### Hábitos (`/habits`)
- Gestión de hábitos personales.
- Seguimiento de progreso y estadísticas.

### Calendario (`/calendar`)
- Vista de calendario semanal y mensual.
- Programación de tareas y eventos.

### Pomodoro (`/pomodoro`)
- Temporizador configurable.
- Seguimiento de sesiones de estudio.

### Feedback (`/support`)
- Centro de soporte para usuarios.
- Formulario de contacto para problemas o sugerencias.

## Contribuir

1. Crea un fork del repositorio.
2. Crea una rama para tu función:
    ```bash
    git checkout -b feature/amazing-feature
    ```
3. Realiza tus cambios y haz commit:
    ```bash
    git commit -m 'Add amazing feature'
    ```
4. Haz push a la rama:
    ```bash
    git push origin feature/amazing-feature
    ```
5. Abre un Pull Request.

## Licencia

MIT

## Contacto

SherpApp - [contacto@sherpapp.com](mailto:contacto@sherpapp.com)
