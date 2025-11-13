<template>
  <div class="container py-4">
    <h2>Formulario de Registro</h2>
    <form @submit.prevent="onSubmit" class="mt-4">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.nombre }"
          id="nombre"
          v-model="form.nombre"
          @blur="validateField('nombre')"
          @input="validateField('nombre')"
        />
        <div v-if="errors.nombre" class="invalid-feedback">
          {{ errors.nombre }}
        </div>
      </div>

      <div class="mb-3">
        <label for="edad" class="form-label">Edad</label>
        <input
          type="number"
          class="form-control"
          :class="{ 'is-invalid': errors.edad }"
          id="edad"
          v-model.number="form.edad"
          @blur="validateField('edad')"
          @input="validateField('edad')"
        />
        <div v-if="errors.edad" class="invalid-feedback">
          {{ errors.edad }}
        </div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
          id="email"
          v-model="form.email"
          @blur="validateField('email')"
          @input="validateField('email')"
        />
        <div v-if="errors.email" class="invalid-feedback">
          {{ errors.email }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
        Agregar
      </button>
    </form>

    <div class="mt-5" v-if="submittedData.length > 0">
      <h3>Datos Ingresados</h3>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in submittedData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.edad }}</td>
            <td>{{ item.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-muted mt-5">Los datos se mostrarán en una tabla aquí cuando sean válidos.</p>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'

export default {
  name: 'FormView',
  setup() {
    const form = reactive({ nombre: '', edad: null, email: '' })
    const errors = reactive({ nombre: '', edad: '', email: '' })
    const submittedData = ref([])

    const validateField = (field) => {
      if (field === 'nombre') {
        if (!form.nombre) errors.nombre = 'Campo requerido.'
        else if (form.nombre.length < 5 || form.nombre.length > 15) 
          errors.nombre = 'Nombre entre 5 y 15 caracteres.'
        else errors.nombre = ''
      }

      if (field === 'edad') {
        if (form.edad === null || form.edad === '') errors.edad = 'Campo requerido.'
        else if (!Number.isInteger(Number(form.edad)) || form.edad < 18 || form.edad > 120) 
          errors.edad = 'Edad entre 18 y 120 años.'
        else errors.edad = ''
      }

      if (field === 'email') {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!form.email) errors.email = 'Campo requerido.'
        else if (!re.test(form.email)) errors.email = 'Email inválido.'
        else errors.email = ''
      }
    }

    const isFormValid = computed(() => {
      validateField('nombre')
      validateField('edad')
      validateField('email')
      return !errors.nombre && !errors.edad && !errors.email && 
             form.nombre && form.edad !== null && form.email
    })

    const onSubmit = () => {
      if (isFormValid.value) {
        submittedData.value.push({
          nombre: form.nombre,
          edad: form.edad,
          email: form.email
        })
        
        form.nombre = ''
        form.edad = null
        form.email = ''
        errors.nombre = ''
        errors.edad = ''
        errors.email = ''
      }
    }

    return { form, errors, validateField, isFormValid, onSubmit, submittedData }
  }
}
</script>
