<template>
  <v-card width="400" outlined class="mx-auto mt-16">
    <v-card-title> Inicio </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          label="Usuario"
          outlined
          required
          :rules="[(v) => !!v || 'Ingrese Usuario']"
        >
        </v-text-field>
        <v-text-field
          type="password"
          label="Contraseña"
          outlined
          required
          :rules="[(v) => !!v || 'Ingrese Contraseña']"
        >
        </v-text-field>

        <div class="text-center">
          <v-btn
            color="success"
            outlined
            to="/pedido"
            :disabled="!valid"
            @click="validate"
          >
            Entrar
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
    valid: true,
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
