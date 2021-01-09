<template>
<div>
  <v-card>
    <v-card-title>Cobro Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form"  lazy-validation>
        <v-text-field
          v-model="form.monto"
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
  <v-snackbar v-model="snackbar.display" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
</div>
</template>

<script>
export default {

  async fetch() {
    this.formas = await this.$http.$get('formaPago')
    //this.clientes = await this.$http.$get('cliente')
  },

  data: () => ({
    valid: true,

    snackbar: {
      display: false,
      text: '',
      color: 'black',
    },
    
    form: {
      pedido_id: null, //este va a manopla
      monto: '',
      forma_pago_id: null, 
      //cliente_id: null,

    },
    montoRules: [(v) => !!v || 'Falta el monto'],
    formas: [],
    //clientes: [],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('cobro', this.form )

        this.$refs.form.reset()

        this.showSnackbar('Cobro agregado con exito', 'success')
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