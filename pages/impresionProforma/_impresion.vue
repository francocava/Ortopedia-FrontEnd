<template>
  <div>
    <v-container class="mx-auto my-12">
      <v-row align="center" no-gutters>
        <v-col>
          <v-card class="pa-2" outlined tile align="center">
            <v-img
              src="https://i.imgur.com/RFwozBU.jpg"
              max-height="111"
              max-width="309"
            ></v-img>
            <v-card-text>Av. Rivadavia 8860</v-card-text>
            <v-card-text>Tel: 4672-9996</v-card-text>
            <v-card-text>IVA Responsable Inscripto</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-2" outlined tile align="center">
            <v-card-text> Nro Cotización: {{ pedido.id }} </v-card-text>
            <v-card-text>
              Fecha: {{ pedido.fecha_ingreso_autorizacion }}
            </v-card-text>
            <v-card-text>CUIT Nro: 20-13515459-9</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card outlined style="height: 150px">
            <!--             <v-card-text>
              Cliente: {{ pedido.cliente.nombre }} {{ pedido.cliente.apellido }}
            </v-card-text>
            <v-card-text>
              Obra Social: {{ pedido.cliente.obra_social.nombre }}
            </v-card-text> -->
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined style="height: 150px">
            <!--             <v-card-text>
              Afiliado: {{ pedido.cliente.nro_afiliado }}
            </v-card-text>
            <v-card-text>
              Teléfono: {{ pedido.cliente.telefono }}
            </v-card-text> -->
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined style="height: 150px">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Nombre</th>
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
      <v-row align="center" no-gutters>
        <v-col>
          <v-card outlined min-height="50px" width="200px"
            >Total: ${{ pedido.importe }}</v-card
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card flat>
            <v-card-text
              >IMPORTANTE: Ante una repentina devaluación de la moneda los
              precios pueden verse modificados sin mediar preaviso
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined style="height: 100px">
            <v-card-title>Observaciones</v-card-title>
            <v-card-text>{{ pedido.observaciones }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined style="height: 150px">
          <v-card-title>Condiciones Comerciales</v-card-title>
          <v-card-text>- Condición de Pago: Pago previo a entrega</v-card-text>
          <v-card-text>- Plazo de entrega: 30 días</v-card-text>
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
    pedido: [],
    alignments: ['start', 'center', 'end'],
  }),

  async fetch() {
    console.log(this.$route.params.impresion)
    const rsp = await this.$http.$get(`pedido/${this.$route.params.impresion}`)
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