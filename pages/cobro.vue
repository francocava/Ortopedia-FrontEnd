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
          v-model="selectForma"
          :items="formas"
          :rules="[(v) => !!v || 'Item is required']"
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
  data: () => ({
    valid: true,
    
    form: {
      pedido_id: '', //con este no hace falta porque lo ponen a manopla 
      monto: '',
      forma_pago_id:'', ///

    },
    montoRules: [(v) => !!v || 'Falta el monto'],
    selectForma: null,
    formas: ['Debito', 'Credito', 'Efectivo' ],
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