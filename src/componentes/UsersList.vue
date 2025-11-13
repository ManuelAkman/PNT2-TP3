<template>
  <div>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <table v-if="!loading && users.length > 0" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(u, idx) in users" :key="u.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ u.nombre || u.name || '-' }}</td>
          <td>{{ u.email || '-' }}</td>
          <td>{{ u.telefono || u.phone || '-' }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && !users.length && !error" class="text-muted">
      No se encontraron usuarios.
    </div>
  </div>
</template>

<script>
import api from '../services-api.js'
import { ref, onMounted } from 'vue'

export default {
  name: 'UsersList',
  props: {
    resource: { type: String, default: 'usuarios' }
  },
  setup(props) {
    const users = ref([])
    const loading = ref(false)
    const error = ref('')

    const load = async () => {
      loading.value = true
      error.value = ''
      try {
        const res = await api.get(`/${props.resource}`)
        users.value = res.data
      } catch (err) {
        if (err.response) {
          error.value = `Error ${err.response.status}: ${err.response.data?.message || 'No se pudo obtener los datos'}`
        } else if (err.request) {
          error.value = 'No se pudo conectar con el servidor. Verifica la URL de MockAPI.'
        } else {
          error.value = `Error: ${err.message}`
        }
        console.error('Error completo:', err)
        console.error('URL intentada:', `${api.defaults.baseURL}/${props.resource}`)
      } finally {
        loading.value = false
      }
    }

    onMounted(load)

    return { users, loading, error }
  }
}
</script>
