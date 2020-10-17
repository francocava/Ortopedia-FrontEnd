<template>
  <v-card>
    <v-card-title>Forma de Pago Nueva</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="forma"
          :rules="formaRules"
          label="Tipo"
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
    forma: '',
    formaRules: [
      (v) => !!v || 'Completar',
      (v) => (v && v.length <= 35) || 'Muy largo',
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
