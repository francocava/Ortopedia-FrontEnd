<template>
  <div>
    <v-container class="mx-auto my-12" v-if="pedido">
      <v-row align="center">
        <v-col>
          <v-card class="pa-2" outlined tile align="center">
            <v-img src="/img/logo.jpg" max-height="111" max-width="309"></v-img>
            <v-card-text class="black--text">
              <div>Av. Rivadavia 8860</div>
              <div>Tel: 4672-9996</div>
              <div>IVA Responsable Inscripto</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-2 h-100" outlined tile align="center">
            <v-card-text class="black--text">
              <div>Nro Cotización: {{ pedido.id }}</div>
              <div>Fecha: {{ pedido.fecha_ingreso_autorizacion }}</div>
              <div>CUIT Nro: 20-13515459-9</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined align="center">
            <v-card-text class="black--text">
              <div>
                Cliente: {{ pedido.cliente.nombre }}
                {{ pedido.cliente.apellido }}
              </div>
              <div>Obra Social: {{ pedido.cliente.obra_social.nombre }}</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined align="center">
            <v-card-text class="black--text">
              <div>Afiliado: {{ pedido.cliente.nro_afiliado }}</div>
              <div>Teléfono: {{ pedido.cliente.telefono }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-simple-table fixed-header>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left font-weight-black">Nombre</th>
                    <th class="text-left">Descripción</th>
                    <th class="text-left">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in pedido.items" :key="item.nombre">
                    <td>
                      {{
                        item.producto
                          ? item.producto.nombre
                          : item.accesorio.nombre
                      }}
                    </td>
                    <td>
                      {{
                        item.producto
                          ? item.producto.descripcion
                          : item.accesorio.descripcion
                      }}
                    </td>
                    <td>${{ item.precio_final }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined align="end" class="d-flex flex-row-reverse">
            <v-card-text class="black--text"> Total: ${{ pedido.importe }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-card-text
              >IMPORTANTE: Ante una repentina devaluación de la moneda los
              precios pueden verse modificados sin mediar preaviso
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="pedido.observaciones">
        <v-col>
          <v-card outlined>
            <v-card-title>Observaciones</v-card-title>
            <v-card-text>{{ pedido.observaciones }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-card-title>Condiciones Comerciales</v-card-title>
            <v-card-text>
              <div>- Condición de Pago: Pago previo a entrega</div>
              <div>- Plazo de entrega: 30 días</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'empty',

  data: () => ({
    pedido: '',
  }),

  async fetch() {
    try {
      this.pedido = await this.$http.$get(
        `pedido/${this.$route.params.impresion}`
      )

      this.productos = await this.$http.$get('producto')
      this.accesorios = await this.$http.$get('accesorio')
    } catch (error) {
      console.error(error.response ?? error)
    }
  },
}
</script>

<style>
.black--text {
  color: #000 !important;
}
.h-100 {
  height: 100%;
}
.col {
  padding: 2px;
}
.v-sheet--outlined {
    border: thin solid rgba(0, 0, 0, 0.7) !important;
}
th {
  font-size: 1rem !important;
  text-align: left !important;
}
</style>