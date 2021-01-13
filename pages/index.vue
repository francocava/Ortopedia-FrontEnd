<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pedidos"
      :search="search"
      sort-by="monto"
      class="elevation-1"
      show-expand
      :single-expand="true"
      :expanded-sync="itemsExpandidos"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Pedidos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                to="/pedido"
              >
                Nueva
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fecha_ingreso_autorizacion"
                        label="Fecha Ingreso"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.cliente_id"
                        :items="clientes"
                        item-value="id"
                        item-text="apellido"
                        label="Cliente"
                        :rules="[(v) => !!v || 'Elija un Cliente']"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.sucursal_id"
                        :rules="[(v) => !!v || 'Elija una Sucursal']"
                        :items="sucursales"
                        item-value="id"
                        item-text="nombre"
                        label="Sucursal"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="Nro Cotizacion"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fecha_retiro"
                        label="Fecha Retiro"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nro_recibo_proveedor"
                        label="Nro Recibo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogAdjuntar" max-width="500px">
            <v-card>
              <v-card-title class="headline">Adjuntar Factura</v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fecha_ingreso_autorizacion"
                        label="Fecha"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.importe"
                        label="Importe"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAdjuntar">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveFactura">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="525px">
            <v-card>
              <v-card-title class="headline"
                >Estas seguro que queres eliminar el pedido?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogObservaciones" max-width="500px">
            <v-card>
              <v-card-title class="headline">Observaciones</v-card-title>
              <v-row>
                <v-col>
                  <v-card-text class="mx-5">
                    {{ editedItem.observaciones }}
                  </v-card-text>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeObservaciones"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.observaciones="{ item }">
        <v-icon @click="mostrarObservaciones(item)">
          mdi-card-text-outline
        </v-icon>
      </template>

      <template v-slot:item.cancelado ="{ item }">
        <v-icon v-if="item.cancelado === 0"> mdi-alpha-x-circle-outline</v-icon>
        <v-icon v-if="item.cancelado === 1"> mdi-minus-circle-outline</v-icon>
        <v-icon v-if="item.cancelado === 2"> mdi-check-circle-outline</v-icon>
      </template>

      <template v-slot:item.nro_recibo_proveedor ="{ item }">
        {{ item.nro_recibo_proveedor ? item.nro_recibo_proveedor : "-" }}
      </template>

      <template v-slot:item.data-table-expand="{ item, expand, isExpanded }">
        <v-icon
          @click="
            getItems(item)
            expand(!isExpanded)
          "
          >mdi-arrow-down-drop-circle-outline</v-icon
        >
      </template>

      <template v-slot:expanded-item="{ headers }">
        <v-card>
          <v-list nav dense outlined flat disabled>
            <v-list-item-group color="primary">
              <v-list-item v-for="(itemPedido, i) in itemsExpandidos" :key="i">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="
                      itemPedido.producto
                        ? itemPedido.producto.nombre
                        : itemPedido.accesorio.nombre
                    "
                  ></v-list-item-title>
                  <v-list-item-subtitle>
                    ${{ itemPedido.precio_final / itemPedido.cantidad }} x{{
                      itemPedido.cantidad
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </template>

      <template v-slot:item.importe="{ item }"> ${{ item.importe }} </template>

      <template v-slot:item.cliente.apellido="{ item }">
        {{ item.cliente.nombre }} {{ item.cliente.apellido }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="adjuntarFactura(item)">
              <v-icon small class="mr-2"> mdi-alpha-f-circle-outline </v-icon>
              <v-list-item-title> Adjuntar Factura</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToItems(item)">
              <v-icon small class="mr-2"> mdi-clipboard-edit-outline </v-icon>
              <v-list-item-title> Items</v-list-item-title>
            </v-list-item>
            <v-list-item @click="editItem(item)">
              <v-icon small class="mr-2"> mdi-pencil </v-icon>
              <v-list-item-title> Editar</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteItem(item)">
              <v-icon small class="mr-2"> mdi-delete </v-icon>
              <v-list-item-title> Eliminar</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <nuxt-link :to="{name: 'impresionProforma-pedido', params: { pedido:item.id } }">
                <v-icon small class="mr-2"> mdi-printer </v-icon>
              </nuxt-link>

              <v-list-item-title> Imprimir</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    search: '',
    dialog: false,
    dialogDelete: false,
    dialogAdjuntar: false,
    dialogObservaciones: false,
    headers: [
      { text: 'Nro Cotizacion', value: 'id', sortable: true },
      {
        text: 'Fecha Ingreso',
        align: 'start',
        sortable: true,
        value: 'fecha_ingreso_autorizacion',
      },
      { text: 'Cliente', value: 'cliente.apellido', sortable: true },
      { text: 'OS', value: 'cliente.obra_social.nombre', sortable: true },
      { text: 'Sucursal', value: 'sucursal.nombre', sortable: false },
      { text: 'Empleado', value: 'usuario.usuario', sortable: false },
      { text: 'Fecha Retiro', value: 'fecha_retiro', sortable: false },
      { text: 'Importe', value: 'importe' },
      { text: 'Nro Recibo', value: 'nro_recibo_proveedor', sortable: false },
      { text: 'Items', value: 'data-table-expand', sortable: false },
      { text: 'Obs.', value: 'observaciones', sortable: false },
      { text: 'Cancelado', value: 'cancelado', sortable: false },
      { text: 'Opciones', value: 'actions', sortable: false },
    ],
    pedidos: [],
    sucursales: [],
    clientes: [],
    itemsExpandidos: [],
    editedIndex: -1,
    editedItem: {
      fecha_ingreso_autorizacion: '',
      clie_id: '',
      suc_id: '',
      usuario_id: '',
      id: '',
      fecha_retiro: '',
      nro_recibo_proveedor: '',
      cancelado: '',
      items: [],
      observaciones: '',
    },
    defaultItem: {
      fecha_ingreso_autorizacion: '',
      clie_id: '',
      suc_id: '',
      usuario_id: '',
      id: '',
      fecha_retiro: '',
      nro_recibo_proveedor: '',
      cancelado: '',
      items: [],
      observaciones: '',
    },
  }),

  async fetch() {
    this.pedidos = await this.$http.$get('pedido?confirmado=1')
    this.sucursales = await this.$http.$get('sucursal')
    this.clientes = await this.$http.$get('cliente')

    this.loading = false
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Editar Pedido'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogAdjuntar(val) {
      val || this.closeAdjuntar()
    },
    dialogObservaciones(val) {
      val || this.closeObservaciones()
    },
  },

  methods: {
    initialize() {
      this.$fetch()
    },

    editItem(item) {
      this.editedIndex = this.pedidos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.pedidos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    mostrarObservaciones(item) {
      this.editedIndex = this.pedidos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogObservaciones = true
    },

    async deleteItemConfirm() {
      try {
        const res = await this.$http.$delete(`pedido/${this.editedItem.id}`)

        this.pedidos.splice(this.editedIndex, 1)

        this.closeDelete()
      } catch (error) {
        console.error(error.response ?? error)
      }
    },

    adjuntarFactura(item) {
      // La idea es que aca me muestre una pantalla como la de edit pero para
      // adjuntar una factura (crearla). Se activa cuando tocas el boton de f al lado del de edit.
      this.editedIndex = this.pedidos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogAdjuntar = true
    },

    goToItems(item) {
      this.$router.push(`/pedidoItems/${item.id}`)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeAdjuntar() {
      this.dialogAdjuntar = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeObservaciones() {
      this.dialogObservaciones = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async saveFactura() {
      try {
        const res = await this.$http.$post('factura', this.editedItem)
      } catch (error) {
        console.error(error.response ?? error)
      }

      this.closeAdjuntar()
    },

    agregarItems() {
      this.dialogAgregarAccesorio = true // hay que hacer este dialog
    },

    async getItems(item) {
      this.editedItem = Object.assign({}, item)

      const pedidoConItems = await this.$http.$get(
        `pedido/${this.editedItem.id}`,
        this.editedItem
      )

      this.itemsExpandidos = pedidoConItems.items

      this.editedItem.items = this.itemsExpandidos
    },

    async save() {
      try {
        const res = await this.$http.$put(
          `pedido/${this.editedItem.id}`,
          this.editedItem
        )

        if (this.editedIndex > -1) {
          Object.assign(this.pedidos[this.editedIndex], this.editedItem)
        } else {
          this.pedidos.push(this.editedItem)
        }
      } catch (error) {
        console.error(error.response ?? error)
      }

      this.$fetch()
      this.close()
    },
  },
}
</script>
