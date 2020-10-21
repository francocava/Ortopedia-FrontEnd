<template>
  <v-card>
    <v-card-title>Pago Nuevo</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          type="number"
          :rules="montoRules"
          label="Monto"
          required
        ></v-text-field>

        <v-select
          v-model="selectProv"
          :items="proveedores"
          :rules="[(v) => !!v || 'Item is required']"
          label="Proveedor"
          required
        ></v-select>

        <v-text-field
          type="number"
          v-model="nroCot"
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
    nroCot: '',
    monto: '',
    montoRules: [(v) => !!v || 'Falta el monto'],
    selectProv: null,
    selectForma: null,
    proveedores: ['Osecac', 'Pami', 'Osbba', 'Swiss Medical'],
    formas: ['Debito', 'Credito', 'Efectivo' ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>