<template>
  <div class="container py-4">
    <h2>Usuarios (API)</h2>
    <users-list resource="ListaUsuarios" />
  </div>
</template>

<script>
import UsersList from '../componentes/UsersList.vue'

export default {
  name: 'UsersView',
  components: { 
    UsersList 
  }
}
</script>
