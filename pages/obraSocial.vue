<template>
  <div>
    <v-card>
      <v-card-title>Obra Social Nueva</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.nombre"
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
    <v-snackbar v-model="snackbar.display" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: {
      display: false,
      text: '',
      color: 'black',
    },

    valid: true,
    form: {
      nombre: '',
    },
    nombreRules: [
      (v) => !!v || 'Falta el nombre de la obra',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('obraSocial', this.form)

        this.$refs.form.reset()

        this.showSnackbar('Obra Social agregada con exito', 'success')
      } catch (error) {
        console.error(error.response ?? error)

        this.showSnackbar(`Ocurrió un error: ${error.message}`, 'red')
      }
    },
    showSnackbar(message, color) {
      this.snackbar.display = true
      this.snackbar.text = message
      this.snackbar.color = color ?? 'black'
    },
  },
}
</script>