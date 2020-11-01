<template>
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

        <v-text-field
          v-model="form.contacto"
          label="Contacto"
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="form.telefono"
          :rules="dniRules"
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
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
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
</template>

<script>
export default {
  data: () => ({
    valid: true,

    form: {
      nombre: '',
      contacto: '',
      apellido: '',
      dni: '',
      telefono: '',
      obra_id: '',
      nroAfiliado: '', //que onda las obras socialesss
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
    select: null,
    items: ['Osecac', 'Pami', 'Osbba', 'Swiss Medical'], //No se como hacer con esto
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('http://127.0.0.1:8000/api/cliente', this.form )
        console.log(res)
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
