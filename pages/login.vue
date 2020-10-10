<template>
    <v-card>
      <v-card-title > Inicio </v-card-title>
      <v-card-text>
      <v-text-field
      label="Usuario"
      outlined>

      </v-text-field>
      <v-text-field
      label="Contrasenia"
      outlined>
      </v-text-field>

      <v-btn
          color="success"
          class="mr-4"
        >
          Entrar
        </v-btn>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
    //
  }),
}
</script>