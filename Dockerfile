FROM node
#Definimos una imagen base: node esto lo toma del dockerhub

WORKDIR /app
#Aca estamos creando una carpeta interna donde guarda el proyecto

COPY package.json .
#Copiamos el package.json a la nueva carpeta el . es la carpeta de destino que creamos

RUN npm install
#Se ejecuta para hacer la instalacion de dependencias del proyecto

COPY . .
#esto copia todo el cdigo de mi aplicacion

EXPOSE 8080
#Le decimos que puerto queremos escuchar

CMD ["npm", "start"]
#tiene que ejecutar "npm start" para que funcione el script

#Escriobir en consola para construir la imagen
# ~ docker build -t [name del proyecto] . ~   --> "No olvidar el punto al final"
#para levantar el contenedor docker run -p 8081:8080 holamundillo

#para loguearte docker login