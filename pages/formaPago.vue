<template>
<div>
  <v-card>
    <v-card-title>Forma de Pago Nueva</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.tipo"
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
      tipo: '',
    },
    formaRules: [
      (v) => !!v || 'Completar',
      (v) => (v && v.length <= 35) || 'Muy largo',
    ],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('formaPago', this.form )
        console.log(res)
        this.$refs.form.reset()
        this.showSnackbar('Forma de pago agregada con exito', 'success')
      } catch (error) {
        console.log(error)
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
