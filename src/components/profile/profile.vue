<template>
  <v-card-text class="mt-16">
    <h1
        class="text-center display-1 teal--text text--accent-3"
    >Perfil</h1>
    <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
            color="deep-blue"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>


      <v-card-title>Jouse Huerta</v-card-title>

      <v-card-text>
        <v-row
            align="center"
            class="mx-0"
        >

        </v-row>

        <div >Fecha de Ingreso: 01/12/2021</div>
        <div>Correo: Joga@gmail.com</div>
        <div>Cuidad: Lima</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn
            color="deep-purple lighten-2"
            text
            @click="reserve"
        >
          Editar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card-text>
</template>

<script>
export default {
name: "profile"
}
</script>

<style scoped>

</style>
