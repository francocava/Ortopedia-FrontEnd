<template>
  <v-card>
    <v-card-title>Obra Social Nueva</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nombre"
          :rules="nombreRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Enviar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    nombre: '',
    nombreRules: [
      (v) => !!v || 'Falta el nombre de la obra',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>