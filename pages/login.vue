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
            outlined
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            to="/pedido"
            
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


//el :to se saltea las validaciones


</script>


