<template>
  <v-card>
    <v-card-title>Cobro Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="form.monto" lazy-validation>
        <v-text-field
          type="number"
          :rules="montoRules"
          label="Monto"
          required
        ></v-text-field>


        <v-text-field
          type="number"
          v-model="form.pedido_id"
          :rules="montoRules"
          label="Nro Cotizacion (Pedido)"
          required
        ></v-text-field>

        <v-select
          v-model="form.forma_pago_id"
          :items="formas"
          item-value="id"
          item-text="tipo"
          :rules="[(v) => !!v || 'Ingrese forma de pago']"
          label="Forma de pago"
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

  async fetch() {
    this.formas = await this.$http.$get('http://127.0.0.1:8000/api/formaPago')
  },

  data: () => ({
    valid: true,
    
    form: {
      pedido_id: null, //este va a manopla
      monto: 0,
      forma_pago_id: null, 

    },
    montoRules: [(v) => !!v || 'Falta el monto'],
    formas: [],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('http://127.0.0.1:8000/api/cobro', this.form )
        console.log(res)
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }

    },
  },
}
</script>