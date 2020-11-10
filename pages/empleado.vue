<template>
<div>
  <v-card>
    <v-card-title>Empleado Nuevo</v-card-title>

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

        <!-- <v-text-field
          type="number"
          v-model="dni"
          :rules="dniRules"
          label="DNI"
          required
        ></v-text-field>

        <v-text-field
          type="number"
          :rules="dniRules"
          label="Teléfono"
          required
        ></v-text-field> -->

        <v-select
          v-model="form.rol_id"
          :items="roles"
          item-value="id"
          item-text="nombre"
          :rules="[(v) => !!v || 'Falta el rol']"
          label="Rol"
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
    this.roles = await this.$http.$get('rol')
  },
  data: () => ({

    snackbar: {
      display: false,
      text: '',
      color: 'black',
    },

    valid: true,

    form: {
      nombre: '',
      apellido: '', 
      rol_id: null,
    },
    nombreRules: [
      (v) => !!v || 'Falta el nombre del empleado',
      (v) => (v && v.length <= 15) || 'Nombre muy largo',
    ],
    apellidoRules: [
      (v) => !!v || 'Falta el apellido del empleado',
      (v) => (v && v.length <= 25) || 'Apellido muy largo',
    ],
    roles: [],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('usuario', this.form )
        console.log(res)
        this.$refs.form.reset()

        this.showSnackbar('Empleado agregado con exito', 'success')
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
