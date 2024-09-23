# Usa una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará el servidor
EXPOSE 8080

# Define el comando para ejecutar la aplicación
CMD ["npx", "json-server", "db.json", "--port", "8080"]
