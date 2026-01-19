# APIS REST con Node, Typescript y Firebase

## Descripción

Apis Rest para gestión de productos desarrollado con Node.js y Express.

Utiliza Firebase Firestore como base de datos para almacenar la información de los productos y Firebase Authentication para gestionar la autenticación de usuarios mediante JWT (JSON Web Tokens).

Express validator se utiliza para validar las solicitudes entrantes y asegurar que los datos sean correctos antes de procesarlos.

## Pre requisitos

- Node.js (v18 o superior)
- pnpm

## Instalación

1. Clonar el repositorio.

2. Instalar pnpm si no lo tienes instalado.

```shell
npm install -g pnpm
```

3.Instalar dependencias.

```shell
pnpm install
```

4.Configurar variables de entorno:

Copia el archivo `example.env` y renombrado a `.env`. Luego, completa los valores requeridos.

```shell
cp example.env .env
```

Las variables de entorno son las siguientes:

- `PORT`: Puerto en el que correrá el servidor.
- `FIREBASE_API_KEY`: Tu clave de API de Firebase.
- `FIREBASE_AUTH_DOMAIN`: Tu dominio de autenticación de Firebase.
- `FIREBASE_PROJECT_ID`: Tu ID de proyecto de Firebase.
- `FIREBASE_STORAGE_BUCKET`: Tu bucket de almacenamiento de Firebase.
- `FIREBASE_MESSAGING_SENDER_ID`: Tu ID de remitente de mensajería de Firebase.
- `FIREBASE_APP_ID`: Tu ID de aplicación de Firebase.
- `FIREBASE_MEASUREMENT_ID`: Tu ID de medición de Firebase.
- `JWT_SECRET`: Una cadena secreta para firmar los tokens JWT.
- `ADMIN_EMAIL`: Email del usuario administrador (se crea automáticamente al iniciar el servidor).
- `ADMIN_PASSWORD`: Contraseña del usuario administrador (debe cumplir requisitos de seguridad).

### Requisitos de Contraseña

Todas las contraseñas (tanto para usuarios normales como para el administrador) deben cumplir los siguientes requisitos de seguridad:

- ✅ Mínimo 8 caracteres
- ✅ Al menos 1 letra mayúscula
- ✅ Al menos 1 letra minúscula
- ✅ Al menos 1 número
- ✅ Al menos 1 símbolo especial (ej: `*`, `!`, `@`, `#`, etc.)

**Ejemplo de contraseña válida:** `MiPassword123*`

> **Nota:** El usuario administrador se crea automáticamente al iniciar el servidor por primera vez usando las credenciales definidas en `ADMIN_EMAIL` y `ADMIN_PASSWORD`. Si ya existe un usuario con ese email, el servidor no lo recreará.

### Atención

La variable `NODE_ENV` se puede establecer en `development` no se usa en producción. Esto es para usar swagger solo en desarrollo, no en producción.

- `NODE_ENV`: Establece el entorno de ejecución (`development`).

## Uso

### Ejecutar en modo desarrollo

```shell
pnpm run dev
```

### Ejecutar en modo producción

```shell
# Compilar el proyecto
pnpm run build

# Iniciar el servidor
pnpm start
```

## Documentación de la API

### Autenticación

Para acceder a las rutas protegidas, primero debes registrar un usuario y luego iniciar sesión para obtener un token de autenticación.

#### Registrar un usuario

- **POST** `/api/auth/register`
- **Descripción:** Registra un nuevo usuario.
- **Body (JSON):**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

- **Respuesta:**

```json
{
  "id": "someuserid",
  "email": "user@example.com"
}
```

#### Iniciar sesión

- **POST** `/api/auth/login`
- **Descripción:** Inicia sesión y devuelve un token JWT.
- **Body (JSON):**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

- **Respuesta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhSYk94bVhsMkdqVzE3c05WTzkxIiwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTc2MjEyNDkzMCwiZXhwIjoxNzYyMTI4NTMwfQ.dsg7tuUDgZ8IY60co6ySlnu6KnM784qgUWVPrQuygTE"
}
```

### Usuario Administrador

La API implementa un sistema de control de acceso basado en roles. Solo el **usuario administrador** tiene permisos para modificar productos.

#### Creación Automática del Administrador

Al iniciar el servidor (`pnpm run dev` o `pnpm start`), el sistema verifica si existe un usuario con el email configurado en `ADMIN_EMAIL`. Si no existe, lo crea automáticamente usando las credenciales del archivo `.env`:

- ✅ Si es la primera vez: `"✅ Usuario administrador creado: admin@admin.com"`
- ℹ️ Si ya existe: `"ℹ️ El admin admin@admin.com ya existe. Todo bien!"`

#### Permisos del Administrador

Solo el usuario con el email configurado en `ADMIN_EMAIL` puede:

- ✅ Crear productos nuevos
- ✅ Actualizar productos existentes
- ✅ Eliminar productos

Los usuarios normales pueden:

- ✅ Ver todos los productos (GET)
- ✅ Gestionar su propia lista de productos favoritos
- ❌ **NO** pueden crear, editar o eliminar productos del catálogo principal

#### Ejemplo de login como Admin

```json
POST /api/auth/login
{
  "email": "admin@admin.com",
  "password": "your_admin_password"
}
```

> **Importante:** Asegúrate de usar el mismo email y contraseña configurados en las variables de entorno `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

#### Códigos de respuesta de autorización

- **200 OK** - Usuario autenticado correctamente (normal o admin)
- **401 Unauthorized** - Token no proporcionado o inválido
- **403 Forbidden** - Usuario válido pero sin permisos de administrador

### Tabla de Permisos

| Endpoint                        | Usuario Normal   | Administrador | Requiere Auth |
| ------------------------------- | ---------------- | ------------- | ------------- |
| `GET /api/products`             | ✅ Permitido     | ✅ Permitido  | No            |
| `GET /api/products/search`      | ✅ Permitido     | ✅ Permitido  | No            |
| `GET /api/products/:id`         | ✅ Permitido     | ✅ Permitido  | No            |
| `POST /api/products`            | ❌ 403 Forbidden | ✅ Permitido  | Sí (Admin)    |
| `PUT /api/products/:id`         | ❌ 403 Forbidden | ✅ Permitido  | Sí (Admin)    |
| `PATCH /api/products/:id`       | ❌ 403 Forbidden | ✅ Permitido  | Sí (Admin)    |
| `DELETE /api/products/:id`      | ❌ 403 Forbidden | ✅ Permitido  | Sí (Admin)    |
| `GET /api/user/products`        | ✅ Permitido     | ✅ Permitido  | Sí            |
| `POST /api/user/products`       | ✅ Permitido     | ✅ Permitido  | Sí            |
| `DELETE /api/user/products/:id` | ✅ Permitido     | ✅ Permitido  | Sí            |

### Rutas Protegidas

Las siguientes rutas requieren un token JWT en la cabecera `Authorization` como `Bearer token` **y permisos de administrador** (`admin@admin.com`):

- `POST /api/products` - Solo admin
- `PUT /api/products/:id` - Solo admin
- `PATCH /api/products/:id` - Solo admin
- `DELETE /api/products/:id` - Solo admin

### Productos

#### Obtener todos los productos

- **GET** `/api/products`
- **Descripción:** Devuelve una lista de todos los productos.
- **Parámetros (query):**
  - `categories` (opcional): Filtra productos por categoría
- **Ejemplo de uso con filtro:** `/api/products?categories=Consola`
- **Respuesta de ejemplo con filtro por categoría:**

```json
[
  {
    "categories": ["Consola", "Gamer"],
    "description": "Consola para jugar todos los generos de juegos actuales.",
    "id": "WiUEIyalLdDWUORKwxXA",
    "image": "https://imgs.search.brave.com/WXxQqOq0gILbZ7Z70-Wq3MSCrloUNFms6MFdOleuQpw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbGF0/Zm9ybS50aGV2ZXJn/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/L3NpdGVzLzIvY2hv/cnVzL3VwbG9hZHMv/Y2hvcnVzX2Fzc2V0/L2ZpbGUvMjU2Mzk5/NTEvcHM1X3Byb19z/ZWFuX2hvbGxpc3Rl/cl92ZXJnZV8wMDEu/anBnP3F1YWxpdHk9/OTAmc3RyaXA9YWxs/JmNyb3A9MjEuODcw/MzcwMzcwMzcsMCw1/Ni4yNTkyNTkyNTky/NTksMTAwJnc9MjQw/MA",
    "name": "PS5 PRO",
    "price": 600
  },
  {
    "categories": ["Deportes", "Fitness"],
    "description": "Remera GyM",
    "id": "xEnD9axJWh4rbodRQ3aa",
    "image": "https://imgs.search.brave.com/GxMam_DrPh5sZRRwGVYzbg0t_LEXnKzh30epYIWwhTI/rs:fit:860:0:0:0/g:ce/a",
    "name": "Remera Deportiva",
    "price": 20
  },
  {
    "categories": ["GyM", "Fitness"],
    "description": "Ideales para levantamiento de pesas y tus rutinas de ejercicio.",
    "id": "evy46ZarBavusVwSclXC",
    "image": "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw30692432/produ",
    "name": "Guantes Nike Fitness",
    "price": 4
  }
]
```

### Buscar productos por nombre

- **GET** `/api/products/search`
- **Descripción:** Busca productos por nombre
- **Parámetros (query):**
  - `name` (requerido): Texto a buscar en el nombre del producto
- **Ejemplo de uso:** `/api/products/search?name=remera deportiva`
- **Respuesta ejemplo:**

```json
[
  {
    "categories": ["Deportes", "Fitness"],
    "categories_lower": ["deportes", "fitness"],
    "description": "Remera GyM",
    "description_lower": "remera gym",
    "id": "xEnD9axJWh4rbodRQ3aa",
    "image": "https://imgs.search.brave.com/GxMam_DrPh5sZRRwGVYzbg0t_LEXnKzh30epYIWwhTI/rs:fit:860:0:0:0/g:ce/a",
    "name": "Remera Deportiva",
    "name_lower": "remera deportiva",
    "price": 20
  }
]
```

#### Filtrar productos por categorías

- **GET** `/api/products?categories=example`
- **Descripción:** Devuelve una lista de productos que pertenecen a al menos una de las categorías especificadas.
- **Parámetros:**
  - `categories` (query, opcional): Una o más categorías por las que filtrar.
- **Ejemplo de uso:** `/api/products?categories=CPU`

```json
[
  {
    "categories": ["CPU", "Gama Alta"],
    "description": "Procesador de alto rendimiento",
    "id": "abc123def456ghi789",
    "image": "https://rec-line.com/img/productos/800x800/ryzen9_7900x.jpeg",
    "name": "AMD Ryzen 9 7900X",
    "price": 450
  }
]
```

#### Obtener producto por ID

- **GET** `/api/products/:id`
- **Descripción:** Devuelve un producto especifico por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto.
- **Ejemplo de uso:** `api/products/wnET9pH69hTb0lu1SxbD`
- **Repuesta de ejemplo:**

```json
 {
        "categories": [
            "Celular",
            "Premium"
        ],
        "description": "Smartphone de gama alta con cámara profesional y rendimiento avanzado",
        "id": "wnET9pH69hTb0lu1SxbD",
        "image": "https://imgs.search.brave.com/7kyfAnQhn9G9Fjfq5p2ypLfAydi1vXW1Fw3im7tms1I/rs:fit:860:0:0:0/g:ce/a",
        "name": "Samsung Galaxy S25 Ultra",
        "price": 1200
    },
```

#### Crear un producto

- **POST** `/api/products`
- **Descripción:** Crea un producto nuevo. ⚠️ **Solo administradores** (Ruta protegida)
- **Requiere:** Token JWT de usuario administrador (`admin@admin.com`)
- **Body (JSON):**

```json
{
  "name": "Intel I5 14400k",
  "price": 130,
  "description": "CPU",
  "categories": ["CPU", "Gama Media"],
  "image": "https://rec-line.com/img/productos/800x800/bx8071514400_2.jpeg"
}
```

#### Actualizar un producto

- **PUT** `/api/products/:id`
- **Descripción:** Actualiza todos los campos de un producto. ⚠️ **Solo administradores** (Ruta protegida)
- **Requiere:** Token JWT de usuario administrador (`admin@admin.com`)
- **Parámetros:**
  - `id` (path, requerido): ID del producto a actualizar.
- **Body (JSON):**

```json
{
  "name": "NVIDIA RTX 4090",
  "price": 1500,
  "description": "Tarjeta gráfica actualizada",
  "categories": ["GPU", "Gama Alta"],
  "image": "https://rec-line.com/img/productos/800x800/rtx4090.jpeg"
}
```

#### Actualizar un producto parcialmente

- **PATCH** `/api/products/:id`
- **Descripción:** Actualiza solo los campos proporcionados de un producto. ⚠️ **Solo administradores** (Ruta protegida)
- **Requiere:** Token JWT de usuario administrador (`admin@admin.com`)
- **Parámetros:**
  - `id` (path, requerido): ID del producto a actualizar.
- **Body (JSON):** Solo incluir los campos que quieres actualizar

```json
{
  "price": 1400,
  "description": "Tarjeta gráfica en oferta"
}
```

#### Eliminar un producto

- **DELETE** `/api/products/:id`
- **Descripción:** Elimina un producto por su ID. ⚠️ **Solo administradores** (Ruta protegida)
- **Requiere:** Token JWT de usuario administrador (`admin@admin.com`)
- **Parámetros:**
  - `id` (path, requerido): ID del producto a eliminar
- **Respuesta:** 204 No Content

## Submódulo de Productos de Usuario (Rutas Protegidas)

Estas rutas permiten a un usuario autenticado gestionar su propia lista de productos (ej. favoritos, carrito). Todas requieren un token JWT.

#### Añadir un producto a la lista del usuario

- **POST** `/api/user/products`
- **Descripción:** Agrega un producto existente a la lista personal del usuario. (Ruta protegida)
- **Body (JSON):**

```json
{
  "productId": "el_id_del_producto_a_agregar"
}
```

- **Respuesta:**

```json
{
  "message": "Producto añadido a la lista del usuario."
}
```

#### Obtener la lista de productos del usuario

- **GET** `/api/user/products`
- **Descripción:** Devuelve la lista completa de productos en la colección personal del usuario. (Ruta protegida)
- **Respuesta de ejemplo:**

```json
[
  {
    "id": "el_id_del_producto_1",
    "name": "Producto 1",
    "price": 100,
    "categories": ["Categoría A"],
    "description": "Descripción del producto 1",
    "image": "url_de_la_imagen_1"
  }
]
```

#### Eliminar un producto de la lista del usuario

- **DELETE** `/api/user/products/:productId`
- **Descripción:** Elimina un producto de la lista personal del usuario. (Ruta protegida)
- **Parámetros:**
  - `id` (path, requerido): ID del producto a eliminar.
- **Respuesta:**

```json
{
  "message": "Producto eliminado de la lista del usuario."
}
```

#### Deploy en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com/) si no tienes una.
2. Crea un nuevo "Web Service" y conecta tu repositorio de GitHub.
3. Configura las variables de entorno necesarias (por ejemplo, las credenciales de Firebase).
4. Vercel se encargará del resto, construyendo y desplegando tu API automáticamente.

- **sitio de prueba:** [https://apis-rest-node-ts-firebase.vercel.app](https://apis-rest-node-ts-firebase.vercel.app)

## Swagger UI solo en desarrollo

### Para entornos de desarrollo. Tener una documentación interactiva de la API es muy útil para probar y entender los endpoints disponibles

Si estás ejecutando la aplicación en modo desarrollo (`NODE_ENV=development`), puedes acceder a la documentación interactiva de la API a través de Swagger UI.

- **URL de Swagger UI:** `http://localhost:PORT/doc`
- **Documentación interactiva (/doc)**
  La ruta /doc sirve la interfaz Swagger UI para explorar la API de forma interactiva cuando la aplicación está en modo desarrollo. Esto está controlado por la variable de entorno NODE_ENV: si NODE_ENV=development podrás acceder a la documentación en `http://localhost:PORT/doc` En entornos de producción la ruta no está disponible y responderá con un 404 (no muestra la documentación en producción y responde con un 404 not found).

- Cada ves que cambies algo en tu API, recarga la documentación interactiva de swagger para ver los cambios reflejados.

- ** Comando:** `pnpm swagger`

### Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
