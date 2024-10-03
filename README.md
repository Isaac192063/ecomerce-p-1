
# Primer Parcial Arquitectura Orientada a Servicios

Ecomerce Primer Parcial 

## Descripción 

Proyecto de eCommerce desarrollado con Express y PostgreSQL que implementa un sistema completo de CRUD (Crear, Leer, Actualizar, Eliminar) para usuarios y categorías de productos.

### Funcionalidades:

- CRUD para usuarios y categorías de productos.
- Autenticación con JWT.
- Autorización basada en roles (admin/cliente).
- Validación de datos con Joi/Express Validator.

### Tecnologías:

- Backend: Express.js
- Base de datos: PostgreSQL


## Instalación

### Clonar Repositorio 

```bash
  git clone https://github.com/Isaac192063/back-service.git
  cd back-service
```
### Instalar Dependencias 

```bash
  npm install
```

    
## Tabla de Contenido

- [Variables de Entorno](#Variables-de-Entorno)
- [Comandos](#Comandos)
- [Estructura Proyecto](#Estructura-Proyecto)
- [API Reference](#Estructura-Proyecto)
    - [Autenticación](#API-Reference)
    - [Categoria](#Categoria)
    - [Producto](#Producto)
    - [User](#User)
- [Autores](#Authors)
    
## Variables de Entorno

Para ejecutar este proyecto, deberá añadir las siguientes variables de entorno a su archivo .env

```
###> CONFIG SERVER <####
PORT=8080
###> CONFIG SERVER <####

###> SECRET_KEY <####
SECRET_KEY=password
###> SECRET_KEY <####

###> URL_DB <####
URL_DB=postgres://username:password@host:port/database
###> URL_DB <####

###> HOST <####
HOST=localhost
###> HOST <####
```




## Comandos

Run Local:
```
    npm run dev
```

## Estructura Proyecto 


```
src\
 |--config\         # Variables de entorno y configuración
 |--controller\     # Controladores
 |--db\             # SQL de las tablas DB
 |--middleware\     # Middleware Personalizados
 |--model\          # MongoDB models (data layer)
 |--public\img\     # Imagenes publicas
 |--routes\         # Rutas del sistema
 |--service\        # Servicios de conexión BD y Token
 |--utils\          # Utilidades
 |--validator\      # Esquemas de validación
 |--index.js        # Express app

```

## API Reference

#### Login de Usuario

<code> POST /auth/login</code> 
- Request
    - **body:**
        - **username** : string, requerido 
        - **password** : string, requerido 
- Response
    - **success** : boolean 
    - **message** :  string
    - **token** : string

### Registrar Usuario

<code> POST /auth/register</code> 
- Request
    - **body:**
        - **name** : string, requerido 
        - **lastname** : string, requerido 
        - **birthdate** : date, requerido 
        - **username** : string, requerido 
        - **password** : string, requerido 
        - **email** : string, requerido 
        - **role** : string user/admin, requerido 
        - **image** : string base 64, No requerido 
- Response
    - **success** : boolean 
    - **message** :  string


## Categoria

#### Agregar Categoria
<code> POST /api/category</code> 
- Request
    - **body:**
        - **name** : string, requerido 
        - **description** : string, requerido
- Response
    - **success** : boolean 
    - **data:** 
        - **name** : string 
        - **description** : string 


### Listar Categoria
<code> GET /api/category</code> 
- Response
    - **success** : boolean 
    - **data** : array 


### Obtener Categorias por ID
<code> GET /api/category/:id</code> 
- Request
    - **params:**
        - **id** : number, requerido 
- Response
    - **success** : boolean 
    - **data:** 
        - **name** : string 
        - **description** : string 


### Actualizar Categoria
<code> PUT /api/category/:id</code> 
- Request
    - **params:**
        - **id** : number, requerido
    - **body:**
        - **name** : string, No requerido 
        - **description** : string, No requerido 
- Response
    - **success** : boolean 
    - **data:** 
        - **name** : string 
        - **description** : string 


### Listar Productos por Categoria
<code> GET /api/category/:id/product</code> 
- Request
    - **params:**
        - **id** : number, requerido 
- Response
    - **success** : boolean 
    - **data:** : array


### Eliminar Categoria
<code> DELETE /api/category/:id</code> 
- Request
    - **params:**
        - **id** : number, requerido 
- Response
    - **success** : boolean 
    - **data:** 
        - **name** : string 
        - **description** : string 
## Producto

####  Agregar Producto
<code> POST /api/product</code> 
- Request
    - **body:**
        - **name** : string, requerido 
        - **price** : number, requerido 
        - **description** : string, requerido 
        - **id_cty** : number, llave foranea category, requerido 
        - **image** : string, base 64, No requerido 
- Response
    - **name** : string 
    - **price** : number 
    - **description** : string 
    - **id_cty** : number 
    - **image** : string 

### Listar Producto
<code> GET /api/product</code> 
- Request
    - **query:**
        - **page** : number, No requerido 
        - **limit** : number, No requerido 
- Response
    - **success** : boolean 
    - **data:** 
        - **totalProducts**: number
        - **totalPages**: number
        - **currentPage**: number
        - **products**: array

### Listar Producto por ID
<code> GET /api/product/:id</code> 
- Request
    - **params:**
        - **id** : number, requerido 
- Response
    - **success** : boolean 
    - **data:**
        - **name** : string 
        - **price** : number 
        - **description** : string 
        - **id_cty** : number 
        - **image** : string 

### Eliminar Producto por ID
<code> DELETE /api/product/:id</code> 
- Request
    - **params:**
        - **id** : number, requerido 
- Response
    - **success** : boolean 
    - **data:** 
            - **name** : string 
        - **price** : number 
        - **description** : string 
        - **id_cty** : number 
        - **image** : string 

### Actualizar Producto por ID
<code> PUT /api/product/:id</code> 
- Request
    - **body:**
        - **name** : string, No requerido 
        - **price** : number, No requerido 
        - **description** : string, No requerido 
        - **image** : string, base 64 No requerido 
- Response
    - **success** : boolean 
    - **data:**     
        - **name** : string 
        - **price** : number 
        - **description** : string 
        - **id_cty** : number 
        - **image** : 
## User


### Agregar Usuario
<code> GET /api/user</code> 
- Response
    - **success** : boolean 
    - **data** : array



### Obtener Usuario por ID
<code> GET /api/user/:id</code> 
- Request
    - **params:**
        - **id** : number, requerido 
- Response
    - **success** : boolean 
    - **data:**
        - **id_user** : string 
        - **name** : string 
        - **lastname** : string 
        - **birthdate** : date 
        - **username** : string 
        - **password** : string 
        - **email** : string 
        - **role** : string user/admin
        - **image** : string base 64


### Actualizar Usuario por ID

<code> PUT /api/user/:id</code> 
- Request
    - **body:**
        - **name** : string, requerido 
        - **price** : number, requerido 
        - **description** : string, requerido 
        - **id_cty** : number, llave foranea category, requerido 
        - **image** : string, base 64, No requerido 
    - **params:**
        - **id** : number, requerido 
- Response
    - **success** : boolean 
    - **data:**
        - **id_user** : string 
        - **name** : string 
        - **lastname** : string 
        - **birthdate** : date 
        - **username** : string 
        - **password** : string 
        - **email** : string 
        - **role** : string user/admin
        - **image** : string base 64


### Eliminar Usuario por ID
<code> DELETE /api/user/:id</code> 
- Request
    - **params:**
        - **id** : number, requerido 
- Response
    - **success** : boolean 
    - **data:** 
        - **id_user** : string 
        - **name** : string 
        - **lastname** : string 
        - **birthdate** : date 
        - **username** : string 
        - **password** : string 
        - **email** : string 
        - **role** : string user/admin
        - **image** : string base 64

## Authors

- [@Isaac192063](https://github.com/Isaac192063)
- [@JuanCPerdomo](https://github.com/JuanCPerdomo)

