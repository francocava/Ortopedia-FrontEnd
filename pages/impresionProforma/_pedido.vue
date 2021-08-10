<template>
  <div>
    <v-container class="mx-auto my-12" v-if="pedido">
      <v-row align="center" class="col">
        <v-col>
          <v-card class="pa-2" outlined tile align="center">
            <v-img src="/img/logo.jpg" max-height="150" max-width="309"></v-img>
            <v-card-text class="black--text font--text">
              <div>Av. Rivadavia 8860</div>
              <div>Tel: 4672-9996</div>
              <div>IVA Responsable Inscripto</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-2 h-100" outlined tile align="center">
            <v-card-text class="black--text font--text top--margin">
              <div class="bold--text especial--padding">
                Nro Cotización: {{ pedido.id }}
              </div>
              <div class="bold--text especial--padding">
                Fecha: {{ pedido.fecha_ingreso_autorizacion }}
              </div>
              <div class="bold--text especial--padding">CUIT Nro: 20-13515459-9</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row  class="col">
        <v-col>
          <v-card outlined align="center">
            <v-card-text class="black--text font--text">
              <v-row>
                <v-col>
                  <v-card flat>
                    <div>
                      <span class="bold--text especial--padding">Cliente:</span> {{ pedido.cliente.nombre }}
                      {{ pedido.cliente.apellido }}
                    </div>
                    <div>
                      <span class="bold--text especial--padding"> Obra Social:</span> {{ pedido.cliente.obra_social.nombre }}
                    </div>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card flat>
                    <div><span class="bold--text especial--padding"> Afiliado:</span> {{ pedido.cliente.nro_afiliado }}</div>
                    <div><span class="bold--text especial--padding"> Teléfono:</span> {{ pedido.cliente.telefono }}</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row  class="col">
        <v-col>
          <v-card outlined>
            <v-simple-table fixed-header>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left font--text">Nombre</th>
                    <th class="text-left font--text">Descripción</th>
                    <th class="text-left font--text">Cantidad</th>
                    <th class="text-left font--text">Precio Unitario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in pedido.items"
                    :key="item.nombre"
                    class="font--text"
                  >
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
                    <td>{{ item.cantidad }}</td>
                    <td>${{ item.precio_final/item.cantidad }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-card flat align="end" class="d-flex flex-row-reverse font--text total--padding">
              <v-card-text class="black--text bold--text bigger--text">
                Total: ${{ pedido.importe }}
              </v-card-text>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
      <v-row  class="col">
        <v-col>
          <v-card outlined class="font--text">
            <v-card-title>Observaciones</v-card-title>
            <v-card-text>{{ pedido.observaciones ? pedido.observaciones : "-------" }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row  class="col">
        <v-col>
          <v-card outlined class="font--text">
            <v-card-title>Condiciones Comerciales</v-card-title>
            <v-card-text>
              <div>- Condición de Pago: Pago previo a entrega</div>
              <div>- Plazo de entrega: 30 días</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row> -->
      <v-row  class="col">
        <v-col>
          <v-card flat align="center">
            <v-card-text class="black--text font--text"
              ><span class="bold--text">IMPORTANTE: </span
              ><span class="italic--text">
                Ante una repentina devaluación de la moneda los precios pueden
                verse modificados sin mediar preaviso </span
              >
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
        `pedido/${this.$route.params.pedido}`
      )

      this.productos = await this.$http.$get('producto')
      this.accesorios = await this.$http.$get('accesorio')
    } catch (error) {
      console.error(error.response ?? error)
    }
  },
}
</script>

<style scoped>
.black--text {
  color: #000 !important;
}
.bold--text {
  font-weight: bolder;
}
.italic--text {
  font-style: italic;
}
.font--text {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.bigger--text {
  font-size: larger;
}
.h-100 {
  height: 100%;
}
.top--margin {
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.especial--padding {
  padding: 7px;
}
.total--padding {
  padding-right: 10px;
}
.col {
  padding: 4px;
}
.v-sheet--outlined {
  border: solid rgba(0, 0, 0, 0.7) !important;
}
.v-sheet--flat {
  border: hidden;
}
th {
  font-size: 1rem !important;
  text-align: left !important;
}
</style>