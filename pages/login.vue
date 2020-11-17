<template>
  <v-card width="400" outlined class="mx-auto mt-16">
    <v-card-title> Inicio </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.usuario"
          label="Usuario"
          outlined
          required
          :rules="[(v) => !!v || 'Ingrese Usuario']"
        >
        </v-text-field>
        <v-text-field
          v-model="form.password"
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
    form: {
      usuario: '',
      password: '',
    },
  }),
  methods: {
    async validate() {
      this.$refs.form.validate()

      try {
        const res = await this.$http.$post('token', this.form)

        localStorage.setItem('token', res.token)

        this.$router.push('/')
      } catch (error) {
        console.error(error.response ?? error)
      }
    },
  },
}
</script>
