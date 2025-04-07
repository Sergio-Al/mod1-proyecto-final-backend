# Proyecto API RESTful Gestion de tareas

## Descripción
Proyecto final para la materia de fundamentos del desarrollo full stack. Este proyecto es una API RESTful construida con Node.js y Express.js, utilizando Sequelize como ORM para interactuar con una base de datos PostgreSQL. El objetivo es proporcionar una base sólida para el desarrollo de aplicaciones web modernas.
La API incluye autenticación, autorización y una estructura modular para facilitar el mantenimiento y la escalabilidad.

## Stack Tecnológico
- Node.js
- Express.js
- Sequelize ORM
- Docker
- PostgreSQL (o la base de datos que utilices)
- Otras tecnologías relevantes (ej. Redis, JWT, etc.)

## Requisitos Previos
- [Node.js](https://nodejs.org/) (v14.x o superior)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación y Configuración

### Clonar el Repositorio
```bash
git clone https://github.com/usuario/nombre-repositorio.git
cd nombre-repositorio
```

### Instalar Dependencias
```bash
npm install
# o
yarn install
```

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# DB configuration for PostgreSQL
POSTGRES_DB=my_database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Node.js configuration
NODE_ENV=development
PORT=3000

# JWT configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
JWT_ISSUER=your_jwt_issuer
JWT_AUDIENCE=your_jwt_audience

# Redis configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

## Configuración de Docker

El proyecto utiliza Docker para gestionar la base de datos. Para iniciar los servicios:

```bash
docker-compose up -d
```

Este comando iniciará los contenedores definidos en el archivo `docker-compose.yml`.

### Estructura del docker-compose.yml
```yaml
version: '3.8'

services:
  project_db:
    image: postgres:14.4
    container_name: project_db
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASS}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:

```

## Configuración de Sequelize

El proyecto utiliza Sequelize como ORM para interactuar con la base de datos.

### Estructura de directorios para Sequelize
```
/models       # Modelos de datos
/migrations   # Migraciones de la base de datos
/seeders      # Datos iniciales
/config       # Configuración de la conexión
```

### Ejecutar Migraciones
```bash
npx sequelize-cli db:migrate
```

### Cargar Datos Iniciales
```bash
npx sequelize-cli db:seed:all
```

## Ejecución del Proyecto

### Modo Desarrollo
```bash
npm start
# o
yarn start
```

### Modo Producción
```bash
npm start
# o
yarn start
```

## Documentación de la API
Documentacion de la api...

## Scripts Disponibles
- `npm start`: Inicia el servidor 

## Despliegue
Instrucciones para desplegar la aplicación en un entorno de producción.

