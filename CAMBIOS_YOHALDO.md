# Sistema de Gestión de Citas - Frontend (Rama: yohaldo)

## 📋 Resumen de Cambios Implementados

### ✅ Completado en esta fase:

#### 1. **Modelos de Datos** (Basados en el diagrama de BD)
Se crearon interfaces TypeScript para todas las entidades del sistema:

- **`paciente.model.ts`**: Modelo de pacientes
- **`clinica.model.ts`**: Modelo de clínicas
- **`cita.model.ts`**: Modelo de citas médicas
- **`doctor.model.ts`**: Modelos de doctores, especialidades y relaciones
- **`empleado.model.ts`**: Modelos de empleados, usuarios, roles y funciones
- **`resena.model.ts`**: Modelo de reseñas de servicios

#### 2. **Servicios para API REST**
Se implementaron servicios para comunicación con el backend:

- **`paciente.service.ts`**: CRUD de pacientes + búsqueda por DNI
- **`clinica.service.ts`**: CRUD de clínicas
- **`cita.service.ts`**: Gestión de citas (crear, modificar, cancelar, listar por doctor/paciente/especialidad)
- **`doctor.service.ts`**: CRUD de doctores + filtros por clínica/especialidad
- **`auth.service.ts`**: Login, logout, registro de usuarios, validación de tokens
- **`resena.service.ts`**: Gestión de reseñas (crear, aprobar, rechazar)

#### 3. **Página: Adquirir Servicio** 💳
Página completa con proceso de registro en 4 pasos:

**Características:**
- ✅ Paso 1: Datos del administrador (nombres, apellidos, teléfono, email)
- ✅ Paso 2: Creación de credenciales (usuario y contraseña)
- ✅ Paso 3: Datos de la clínica (nombre, dirección completa)
- ✅ Paso 4: Métodos de pago (Tarjeta, Yape, Plin, Efectivo)
- ✅ Validaciones en cada paso
- ✅ Stepper visual de progreso
- ✅ Al finalizar exitosamente, redirige automáticamente al panel de administrador
- ✅ Diseño responsive con colores del sistema (#c8a2d0 y #80d4c8)

**Archivos:**
- `adquirir-servicio.ts`
- `adquirir-servicio.html`
- `adquirir-servicio.css`
- `adquirir-servicio.spec.ts`

#### 4. **Página: Reseñas** ⭐
Página completa para gestionar reseñas de servicios:

**Características:**
- ✅ Vista de reseñas aprobadas con sistema de estrellas (1-5)
- ✅ Panel de estadísticas (promedio, distribución de calificaciones)
- ✅ Formulario para escribir nuevas reseñas
- ✅ Filtros por calificación
- ✅ Ordenamiento (recientes, antiguos, mejor/peor calificación)
- ✅ Las reseñas quedan pendientes de aprobación por el administrador
- ✅ Diseño con avatares, tarjetas y animaciones
- ✅ Responsive design

**Archivos:**
- `resenas.ts`
- `resenas.html`
- `resenas.css`
- `resenas.spec.ts`

#### 5. **Configuración**
- ✅ Actualizado `app.routes.ts` con las nuevas rutas
- ✅ Actualizado `app.config.ts` con HttpClient para llamadas API
- ✅ Estructura de carpetas organizada (`models/`, `services/`, `pages/`)

---

## 🗂️ Estructura de Archivos Creados

```
src/app/
├── models/
│   ├── paciente.model.ts
│   ├── clinica.model.ts
│   ├── cita.model.ts
│   ├── doctor.model.ts
│   ├── empleado.model.ts
│   └── resena.model.ts
├── services/
│   ├── paciente.service.ts
│   ├── clinica.service.ts
│   ├── cita.service.ts
│   ├── doctor.service.ts
│   ├── auth.service.ts
│   └── resena.service.ts
├── pages/
│   ├── adquirir-servicio/
│   │   ├── adquirir-servicio.ts
│   │   ├── adquirir-servicio.html
│   │   ├── adquirir-servicio.css
│   │   └── adquirir-servicio.spec.ts
│   └── resenas/
│       ├── resenas.ts
│       ├── resenas.html
│       ├── resenas.css
│       └── resenas.spec.ts
└── app.config.ts (actualizado)
    app.routes.ts (actualizado)
```

---

## 🎨 Diseño y UX

- **Paleta de colores principal:**
  - Lila: `#c8a2d0`
  - Turquesa: `#80d4c8`
  - Gradientes suaves entre ambos colores

- **Características de diseño:**
  - Cards con sombras suaves
  - Botones con efectos hover y elevación
  - Animaciones de entrada
  - Responsive design (mobile-first)
  - Iconos emoji para mejor UX

---

## 🔗 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/adquirir-servicio` | AdquirirServicioComponent | Registro de nueva clínica + pago |
| `/resenas` | ResenasComponent | Vista pública de reseñas |

---

## 📝 Pendientes / Próximas Tareas

### Backend Requirements:
Los servicios creados esperan estos endpoints en el backend:

**Clínicas:**
- `POST /api/clinicas` - Crear clínica
- `GET /api/clinicas` - Listar clínicas
- `GET /api/clinicas/{id}` - Obtener clínica por ID
- `PUT /api/clinicas/{id}` - Actualizar clínica
- `DELETE /api/clinicas/{id}` - Eliminar clínica

**Reseñas:**
- `GET /api/resenas` - Listar todas las reseñas
- `GET /api/resenas/aprobadas` - Listar reseñas aprobadas
- `GET /api/resenas/clinica/{id}` - Reseñas por clínica
- `POST /api/resenas` - Crear reseña
- `PUT /api/resenas/{id}/aprobar` - Aprobar reseña
- `PUT /api/resenas/{id}/rechazar` - Rechazar reseña
- `DELETE /api/resenas/{id}` - Eliminar reseña

**Auth:**
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/validate` - Validar token
- `GET /api/auth/current` - Usuario actual

### Mejoras Futuras:
- [ ] Implementar guards de autenticación
- [ ] Agregar interceptor para tokens JWT
- [ ] Manejo de errores global
- [ ] Paginación en listados
- [ ] Loading skeletons
- [ ] Notificaciones toast
- [ ] Panel de administración de reseñas
- [ ] Integración real con pasarelas de pago
- [ ] Validación de tarjetas de crédito
- [ ] Tests unitarios completos

---

## 🚀 Para Ejecutar

```bash
# Instalar dependencias (si no están instaladas)
npm install

# Ejecutar en modo desarrollo
ng serve

# Acceder a las nuevas páginas
http://localhost:4200/adquirir-servicio
http://localhost:4200/resenas
```

---

## 📌 Notas Importantes

1. **Prioridad al diagrama de BD**: Todos los modelos se basan exactamente en el diagrama de base de datos proporcionado.

2. **API URL**: Los servicios apuntan a `http://localhost:8080/api`. Cambiar según configuración del backend.

3. **Standalone Components**: Se usaron componentes standalone de Angular 17+.

4. **Validaciones**: Implementadas en el frontend, pero el backend debe tener sus propias validaciones.

5. **Estados de Reseñas**: Las reseñas tienen 3 estados: `pendiente`, `aprobada`, `rechazada`.

---

## 👤 Autor
**Rama:** yohaldo  
**Fecha:** Noviembre 2025  
**Sistema:** Gestión de Citas para Clínicas
