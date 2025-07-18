# 💰 SaldoFacile

![Portada](https://saldofacile.ndnestor.com/assets/images/page.webp)

**SaldoFacile** es una aplicación web moderna para gestionar tus finanzas personales, calcular impuestos y simular créditos o hipotecas. Pensada para personas que desean tener un control claro de sus ingresos, gastos, balances mensuales, y planificar mejor su economía.

Con SaldoFacile podrás:

- ✅ Registrar ingresos (sueldos, bonos, extras)
- ✅ Registrar gastos únicos y recurrentes
- ✅ Visualizar balances e historial de movimientos
- ✅ Gestionar categorías de ingresos y gastos
- ✅ Usar calculadoras de impuestos, créditos e hipotecas
- ✅ Recibir consejos financieros basados en tus registros

---

## ⚙️ Tecnologías utilizadas

- **Laravel 10+** – Backend robusto en PHP
- **React.js** – Frontend interactivo
- **Inertia.js** – Navegación fluida sin recargas
- **Laravel Socialite** – Autenticación con terceros (Google, etc.)
- **Tailwind CSS** – Estilos modernos y responsivos
- **MySQL** – Base de datos relacional

---

## 📦 Instalación

```bash
git clone https://github.com/tuusuario/saldofacile.git
cd saldofacile

# Instalar dependencias de PHP
composer install

# Instalar dependencias de JavaScript
npm install && npm run dev

# Copiar y configurar entorno
cp .env.example .env
php artisan key:generate

# Configura tu base de datos en .env
php artisan migrate
```

Opcionalmente, puedes ejecutar:

```bash
php artisan db:seed
```

---

## 📜 Rutas principales

### 🏠 Home y Dashboard

- `/` → Home de bienvenida  
- `/dashboard` → Vista con resumen de categorías, ingresos, gastos y recurrentes

---

### 💸 Gastos

- `/expenses/` (GET) → Ver todos los gastos  
- `/expenses/create` (POST) → Crear nuevo gasto  
- `/expenses/destroy/{expense}` (DELETE) → Eliminar un gasto  
- `/expenses/recurrent` (GET) → Ver gastos recurrentes  
- `/expenses/recurrent` (POST) → Crear gasto recurrente  
- `/expenses/recurrent/destroy/{recurrentExpense}` (DELETE) → Eliminar gasto recurrente  
- `/expenses/history` (GET) → Historial de gastos  
- `/expenses/category` (GET) → Ver categorías de gastos  
- `/expenses/category` (POST) → Crear categoría de gastos  
- `/expenses/category/{category}` (DELETE) → Eliminar categoría de gastos

---

### 💰 Ingresos

- `/incomes/` (GET) → Ver todos los ingresos  
- `/incomes/create` (POST) → Crear nuevo ingreso  
- `/incomes/destroy/{income}` (DELETE) → Eliminar un ingreso  
- `/incomes/recurrent` (GET) → Ver ingresos recurrentes  
- `/incomes/recurrent` (POST) → Crear ingreso recurrente  
- `/incomes/recurring/destroy/{recurrentIncome}` (DELETE) → Eliminar ingreso recurrente  
- `/incomes/history` (GET) → Historial de ingresos  
- `/incomes/category` (GET) → Ver categorías de ingresos  
- `/incomes/category` (POST) → Crear categoría de ingresos  
- `/incomes/category/{category}` (DELETE) → Eliminar categoría de ingresos

---

### 🛠️ Calculadoras

- `/tools/mortgage` (GET) → Calculadora de hipotecas  
- `/tools/credit` (GET) → Calculadora de créditos  
- `/tools/tax` (GET) → Calculadora de impuestos

---

### 📈 Consejos financieros

- `/advice/` (GET) → Ver consejos financieros personalizados

---

### 👤 Perfil

- `/profile/` (GET) → Editar perfil  
- `/profile` (PATCH) → Actualizar perfil  
- `/profile` (DELETE) → Eliminar perfil

---

### 🔐 Autenticación

- `/login` → Inicio de sesión  
- `/register` → Registro de usuario  
- `/logout` → Cierre de sesión

---

## 🙏 Contribuciones

Este proyecto está en constante mejora. Si deseas contribuir, envía un Pull Request o crea un issue con sugerencias.

---

## © Licencia

Listana es un proyecto personal. Todos los derechos reservados. Puedes usarlo con fines educativos o personales.
