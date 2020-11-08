<template>
  <div>
    <v-card>
      <v-card-title>Cliente Nuevo</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.nombre"
            :rules="nombreRules"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.apellido"
            :rules="apellidoRules"
            label="Apellido"
            required
          ></v-text-field>

          <v-text-field
            type="number"
            v-model="form.dni"
            :rules="dniRules"
            label="DNI"
            required
          ></v-text-field>

          <v-text-field v-model="form.contacto" label="Contacto"></v-text-field>

          <v-text-field
            type="number"
            v-model="form.telefono"
            :rules="telefonoRules"
            label="Teléfono"
            required
          ></v-text-field>

          <v-text-field
            type="number"
            v-model="form.nroAfiliado"
            label="Numero Afiliado"
            required
          ></v-text-field>

          <v-select
            v-model="form.obra_id"
            :items="obras"
            item-value="id"
            item-text="nombre"
            :rules="[(v) => !!v || 'Ingresar obra social']"
            label="Obra Social"
            required
          ></v-select>

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
  async fetch() {
    this.obras = await this.$http.$get('http://127.0.0.1:8000/api/obraSocial')
  },

  data: () => ({
    snackbar: {
      display: false,
      text: '',
      color: 'black',
    },
    valid: true,
    obras: [],

    form: {
      nombre: '',
      contacto: '',
      apellido: '',
      dni: '',
      telefono: '',
      obra_id: null,
      nroAfiliado: '',
    },

    nombreRules: [
      (v) => !!v || 'Falta el nombre del cliente',
      (v) => (v && v.length <= 15) || 'Nombre muy largo',
    ],
    apellidoRules: [
      (v) => !!v || 'Falta el apellido del cliente',
      (v) => (v && v.length <= 25) || 'Apellido muy largo',
    ],
    dniRules: [(v) => !!v || 'Falta el DNI del cliente'],
    telefonoRules: [(v) => !!v || 'Falta el telefono del cliente'],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post(
          'http://127.0.0.1:8000/api/cliente',
          this.form
        )

        this.$refs.form.reset()

        this.showSnackbar('Cliente agregado con exito', 'success')
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
