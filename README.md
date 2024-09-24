markdown
Copiar código
# Método Deductivo App

Este proyecto es una aplicación web diseñada para facilitar la creación y gestión de métodos deductivos al estilo de Sherlock Holmes o Dr. House. Permite a los usuarios formular hipótesis, recolectar hechos y realizar experimentos para validar o refutar estas hipótesis.

## Características

- Creación de múltiples métodos deductivos.
- Añadir y gestionar hipótesis por método.
- Recolección de hechos como chips o etiquetas.
- Realización de experimentos para cada hipótesis con resultados verificables.
- Interfaz de usuario que permite expandir y colapsar las secciones de hipótesis para una navegación limpia.

## Tecnologías Utilizadas

- React
- Zustand para manejo del estado
- Styled Components para estilos
- Firebase Hosting para despliegue

## Estructura del Proyecto

```plaintext
/src
  /components       # Componentes de UI reutilizables
  /styles           # Estilos globales y de temas
  App.tsx           # Componente principal de la aplicación
  index.tsx         # Punto de entrada de la aplicación
  store.ts          # Store de Zustand para manejo de estado
Código Principal
App.tsx
El componente App.tsx maneja la lógica principal para añadir métodos, hipótesis, hechos y experimentos.

typescript
Copiar código
// Ejemplo simplificado para añadir un nuevo método
const handleCreateNewMethod = () => {
  addMethod(problem);
  setProblem('');
};
Store.ts
La store de Zustand define la estructura del estado y las acciones para modificar este estado.

typescript
Copiar código
import create from 'zustand';

const useStore = create((set) => ({
  methods: [],
  addMethod: (problem) => set((state) => ({
    methods: [...state.methods, { problem, clues: [], hypotheses: [] }],
  })),
}));
Configuración y Despliegue
Para configurar y desplegar el proyecto:

Instala las dependencias con npm install.
Genera el build de producción con npm run build.
Despliega el build a Firebase usando firebase deploy.
Contribuciones
Las contribuciones son bienvenidas. Para contribuir al proyecto, crea un fork del repositorio, haz tus cambios y envía un pull request.

r
Copiar código

Este README ofrece una descripción clara de lo que hace el proyecto, cómo 