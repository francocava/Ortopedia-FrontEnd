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
      :expanded.sync="expandido"
      :loading="loading"
      loading-text="Cargando..."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Proformas</v-toolbar-title>
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
                        v-model="editedItem.nro_recibo_proveedor"
                        label="Nro Recibo"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.vigencia_presupuesto"
                        label="Vigencia"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.plazo_entrega"
                        label="Plazo de entrega"
                      ></v-text-field>
                    </v-col>

                    <v-select
                        v-model="editedItem.forma_pago_id"
                        :items="formasPagos"
                        item-value="id"
                        item-text="tipo"
                        :rules="[(v) => !!v || 'Ingrese forma de pago']"
                        label="Forma de pago"
                        required
                      ></v-select>

                    <v-col cols="12" sm="6" md="12">
                      <v-textarea
                        v-model="editedItem.observaciones"
                        label="Observaciones"
                      ></v-textarea>
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

          <v-dialog v-model="dialogConfirmar" max-width="500px">
            <v-card>
              <v-card-title class="headline">Confirmar Proforma</v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fecha_ingreso_autorizacion"
                        label="Fecha Ingreso Autorizacion"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fecha_retiro"
                        label="Fecha Retiro"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeConfirmar">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveConfirmar">
                  Confirmar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="headline"
                >Estas seguro que queres eliminar la proforma?</v-card-title
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

      <template v-slot:item.cancelado="{ item }">
        <v-icon>{{
          item.cancelado
            ? 'mdi-check-circle-outline'
            : 'mdi-alpha-x-circle-outline'
        }}</v-icon>
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

      <template v-slot:item.cliente.apellido="{ item }">
        {{ item.cliente.nombre }} {{ item.cliente.apellido }}
      </template>

      <template v-slot:item.nro_recibo_proveedor ="{ item }">
        {{ item.nro_recibo_proveedor ? item.nro_recibo_proveedor : "-" }}
      </template>

      <template v-slot:item.importe="{ item }"> ${{ item.importe }} </template>

      <template v-slot:item.created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>

      <template v-slot:item.observaciones="{ item }">
        <v-icon @click="mostrarObservaciones(item)">
          mdi-card-text-outline
        </v-icon>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="confirmarProforma(item)">
              <v-icon small class="mr-2"> mdi-check-outline </v-icon>
              <v-list-item-title> Confirmar</v-list-item-title>
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
    dialogConfirmar: false,
    dialogObservaciones: false,
    headers: [
      { text: 'Nro Cotizacion', value: 'id', sortable: true, align: 'start' },
      { text: 'Creacion', value: 'created_at' },
      { text: 'Cliente', value: 'cliente.apellido', sortable: true },
      { text: 'OS', value: 'cliente.obra_social.nombre', sortable: true },
      { text: 'Sucursal', value: 'sucursal.nombre', sortable: false },
      { text: 'Empleado', value: 'usuario.usuario', sortable: false },
      { text: 'Importe', value: 'importe' },
      { text: 'Nro Recibo', value: 'nro_recibo_proveedor', sortable: false },
      { text: 'Items', value: 'data-table-expand', sortable: false },
      { text: 'Obs.', value: 'observaciones', sortable: false },
      { text: 'Opciones', value: 'actions', sortable: false },
    ],
    pedidos: [],
    pedidosSinConfirmar: [],
    itemsExpandidos: [],
    sucursales: [],
    clientes: [],
    expandido: [],
    editedIndex: -1,
    editedItem: {
      fecha_ingreso_autorizacion: '',
      clie_id: '',
      suc_id: '',
      usuario_id: '',
      id: '',
      fecha_retiro: '',
      importe: '',
      nro_recibo_proveedor: '',
      cancelado: '',
      confirmado: '',
      items: [],
      observaciones: '',
      created_at: '',
    },
    defaultItem: {
      fecha_ingreso_autorizacion: '',
      clie_id: '',
      suc_id: '',
      usuario_id: '',
      id: '',
      fecha_retiro: '',
      importe_fac: '',
      nro_recibo_proveedor: '',
      cancelado: '',
      confirmado: '',
      items: [],
      observaciones: '',
      created_at: '',
    },
  }),

  async fetch() {
    this.pedidos = await this.$http.$get('pedido?confirmado=0')
    this.sucursales = await this.$http.$get('sucursal')
    this.clientes = await this.$http.$get('cliente')
    this.loading = false
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Editar Proforma'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogConfirmar(val) {
      val || this.closeConfirmar()
    },
    dialogObservaciones(val) {
      val || this.closeObservaciones()
    },
  },

  methods: {
    formatDate(item) {
      //Acomoda el formato feo del created_at
      const dateObj = new Date(item)

      const year = dateObj.getFullYear()
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
      const date = dateObj.getDate().toString().padStart(2, '0')
      const result = `${year}-${month}-${date}`

      return result
    },

    initialize() {
      this.$fetch()
    },

    goToItems(item) {
      this.$router.push(`/pedidoItems/${item.id}`)
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

    confirmarProforma(item) {
      this.editedIndex = this.pedidos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogConfirmar = true
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

    closeConfirmar() {
      this.dialogConfirmar = false
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

    async saveConfirmar() {
      this.editedItem.confirmado = true

      try {
        const res = await this.$http.$put(
          `pedido/${this.editedItem.id}`,
          this.editedItem
        )

        this.pedidos.splice(this.editedIndex, 1)

        this.closeConfirmar()
      } catch (error) {
        console.error(error.response ?? error)
      }
    },

    agregarItems() {
      //this.dialogAgregarItem = true // hay que hacer este dialog
      console.log('item', this.editedItem)
    },

    async getItems(item) {
      this.editedIndex = this.pedidos.indexOf(item)
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
