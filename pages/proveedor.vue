<template>
  <v-card>
    <v-card-title>Proveedor Nuevo</v-card-title>

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
</template>

<script>
export default {
  data: () => ({
    valid: true,
    form:{
      nombre: '',
    },
    nombreRules: [
      (v) => !!v || 'Falta el nombre del proveedor',
      (v) => (v && v.length <= 50) || 'Nombre muy largo',
    ],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('proveedor', this.form )
        console.log(res)
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }

    },
  },
}
</script>