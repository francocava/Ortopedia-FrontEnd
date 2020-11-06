<template>
  <v-card>
    <v-card-title>Pago Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="form.monto"
          type="number"
          :rules="montoRules"
          label="Monto"
          required
        ></v-text-field>

        <v-select
          v-model="form.proveedor_id"
          :items="proveedores"
          item-value="id"
          item-text="nombre"
          :rules="[(v) => !!v || 'Item is required']"
          label="Proveedor"
          required
        ></v-select>

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
    this.proveedores = await this.$http.$get('http://127.0.0.1:8000/api/proveedor')
  },


  data: () => ({
    valid: true,
    form: {
      pedido_id: null,
      monto: '',
      proveedor_id: null,
      forma_pago_id: null,
    },

    montoRules: [(v) => !!v || 'Falta el monto'],
    proveedores: [],
    formas: [],
  }),

  methods: {
    async validate() {
      this.$refs.form.validate()
      try {
        const res = await this.$http.$post('http://127.0.0.1:8000/api/pago', this.form )
        console.log(res)
        this.$refs.form.reset()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>