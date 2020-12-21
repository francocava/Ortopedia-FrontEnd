<template>
  <v-card>
    <v-card-text>wepa la pepa</v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'empty',
  data: () => ({
    pedido: [],
  }),

  async fetch() {
    console.log(this.$route.params.pedido)
    const rsp = await this.$http.$get(`pedido/${this.$route.params.pedido}`)
    this.pedido = rsp
    console.log(this.pedido)

    this.productos = await this.$http.$get('producto')
    this.accesorios = await this.$http.$get('accesorio')
  },

  method: {
    initialize() {
      this.$fetch()
    },
  },
}
</script>