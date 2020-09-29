<template>
  <v-layout>
    <v-card elevation="5" outlined>
       <v-col class="d-flex align-center">
      <div class="text-center">
      <v-card-title>Ingresar Cliente Nuevo</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nombre"
          :rules="nombreRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="apellido"
          :rules="apellidoRules"
          label="Apellido"
          required
        ></v-text-field>

        <v-text-field
          v-model="dni"
          :rules="dniRules"
          label="DNI"
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
      </div>
       </v-col>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      nombre: '',
      nombreRules: [
        v => !!v || 'Falta el nombre del cliente',
        v => (v && v.length <= 15) || 'Nombre muy largo',
      ],
      apellido: '',
      apellidoRules: [
        v => !!v || 'Falta el apellido del cliente',
        v => (v && v.length <= 25) || 'Apellido muy largo',
      ],
      dni:'',
      dniRules: [
        v => !!v || 'Falta el DNI del cliente',
        //regla para que solo entren numeros
      ],
      select: null,
      items: [
        'Osecac',
        'Pami',
        'Osbba',
        'Swiss Medical',
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      /* reset () {
        this.$refs.form.reset()
      }, */
      /* resetValidation () {
        this.$refs.form.resetValidation()
      }, */
    },
  }
</script>
