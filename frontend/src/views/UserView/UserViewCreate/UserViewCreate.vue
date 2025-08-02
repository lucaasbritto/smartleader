<template>
  <div class="q-pa-md">
    <q-card style="max-width: 600px; margin: auto;">
      <q-card-section class="row items-center q-pb-none bg-dark text-white">
        <q-icon name="person_add" class="q-mr-sm" />
        <div class="text-h6">Criar novo usuário</div>
      </q-card-section>

      <q-card-section>
        <auth-form
          :mode="'registerUser'"
          :loading="loading"
          :error="error"
          :errors="errors"
          @submit="handleSubmit"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-pt-none">
        <q-btn label="Voltar" flat @click="$router.back()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
    import UserViewCreateScript from './UserViewCreate.js'

    export default UserViewCreateScript

</script>