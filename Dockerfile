FROM node:18

# Directorio de trabajo
WORKDIR /frontend

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia el archivo .env al contenedor
COPY .env /frontend/.env

# Copia solo los archivos necesarios para instalar dependencias (mejor caché)
COPY frontend/package.json frontend/pnpm-lock.yaml ./

# Instala las dependencias
RUN pnpm install --frozen-lockfile

# Copia el resto del código
COPY frontend/ ./

# Construye la aplicación
RUN pnpm run build

# Expone el puerto
EXPOSE 4324

# Comando de ejecución
CMD ["pnpm", "start", "-p", "4324"]

