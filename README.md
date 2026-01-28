# Sistema de Control de Inventario – Frontend

Proyecto frontend desarrollado en **ReactJS** que consume una **API REST en Django**, implementando autenticación, control de acceso por roles y separación entre parte pública y privada (admin).


## Tecnologías utilizadas

- ReactJS + TypeScript
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Django REST Framework 
- Autenticación por Token

---

##  Estructura del proyecto

src/
│── api/ # Servicios Axios para la API
│── auth/ # Login, logout y rutas protegidas
│── components/ # Componentes reutilizables
│── layouts/ # Layout público y privado
│── pages/
│ ├── public/ # Páginas públicas
│ └── admin/ # Páginas privadas (admin)
│── routes/ # Enrutamiento
│── types/ # Tipos y modelos

## 🌐 Parte pública

Accesible sin iniciar sesión:

- Home
- Catálogo
- Contacto
- Login


## 🔐 Parte privada (Admin)

Accesible solo con autenticación:

- Dashboard
- Gestión de productos
- Formularios CRUD
- Restricciones por rol

---

## 👥 Roles y permisos

| Rol       | Permisos |
|----------|----------|
| ADMIN    | Crear, editar y eliminar |
| OPERADOR | Solo visualizar |


## 🔑 Autenticación

- Login contra la API Django
- Token enviado automáticamente en cada request con Axios
- Rutas protegidas para `/admin`

---

## Consumo de la API


- `GET /productos/`
- `POST /productos/`
- `PUT /productos/:id`
- `DELETE /productos/:id`

- `GET /cliente/`
- `POST /cliente/`
- `PUT /cliente/:id`
- `DELETE /cliente/:id`


---

## Variables de entorno



VITE_API_URL=http://paredes-inventario-api.desarrollo-software.xyz/


##  Instalación y ejecución

git clone https://github.com/Fernando200114/CONTROL-DE-INVENTARIO.git

# Entrar al proyecto

cd proyecto

# Instalar dependencias

npm install

# Ejecutar en desarrollo

npm run dev

# Compilar para producción

npm run build

🧪 Credenciales de prueba
Usuario:nicolas
Contraseña: epku3758
Rol: ADMIN

usuario:prueba
contraseña:inventario
Rol:operador

| Usuarios     | Contraseña |  Rol |
|----------|----------|---------|
|nicolas |     epku3758|       ADMIN|
|prueba   |    inventario|     operador|

Evidencia funcional

Incluida en el README o PDF:
Pantalla pública principal
![alt text](image.png)
Login
![alt text](image-1.png)
Dashboard privado
![alt text](image-2.png)
Formulario crear/editar
![alt text](image-3.png)
![alt text](image-4.png)

Ejemplo de restricción por rol

 Video demostrativo

Video de 3 a 5 minutos mostrando:
Parte pública
Login
Acceso al admin
Verificación de roles
CRUD funcionando con la API

🚀 CI/CD – Despliegue
![alt text](image-8.png)


