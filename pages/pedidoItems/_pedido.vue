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
      :items="items"
      :search="search"
      sort-by=""
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Items de pedidos/proformas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                to="/pedido"
              >
                Nuevo
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
                        v-model="editedItem.pedido_id"
                        label="Nro Cotizacion"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.producto_id"
                        label="Producto"
                        :items="productos"
                        item-value="id"
                        item-text="nombre"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.accesorio_id"
                        :items="accesorios"
                        item-value="id"
                        item-text="nombre"
                        label="Accesorio"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.precio_item"
                        label="Precio"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.porcentaje_os"
                        label="Porcentaje"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cantidad"
                        label="Cantidad"
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Estas seguro que queres eliminar el item?</v-card-title
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:item.precio_item="{ item }">
        ${{ item.precio_item }}
      </template>

      <template v-slot:item.producto.nombre="{ item }">
        {{ item.producto ? item.producto.nombre : " - " }}
      </template>

      <template v-slot:item.accesorio.nombre="{ item }">
        {{ item.accesorio ? item.accesorio.nombre : " - " }}
      </template>

      <template v-slot:item.precio_final="{ item }">
        ${{ item.precio_final }}
      </template>

      <template v-slot:item.porcentaje_os="{ item }">
        {{ item.porcentaje_os }}%
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
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Numero Cotizacion',
        align: 'start',
        sortable: true,
        value: 'pedido_id',
      },
      {
        text: 'Producto',
        value: 'producto.nombre',
        sortable: true,
      },
      {
        text: 'Accesorio',
        value: 'accesorio.nombre',
        sortable: true,
      },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Precio', value: 'precio_item', filterable: false },
      {
        text: 'Porcentaje Cobertura',
        value: 'porcentaje_os',
        sortable: true,
      },
      {
        text: 'Precio Final',
        value: 'precio_final',
        sortable: true,
      },
      { text: 'Actions', value: 'actions', sortable: false, filterable: false },
    ],
    editedIndex: -1,
    editedItem: {
      pedido_id: 0,
      proveedor_id: null,
      precio_item: 0,
      porcentaje_os: '',
      precio_final: 0,
      producto_id: null,
      accesorio_id: null,
      cantidad: '',
    },
    defaultItem: {
      pedido_id: 0,
      proveedor_id: null,
      precio_item: 0,
      porcentaje_os: '',
      precio_final: 0,
      producto_id: null,
      accesorio_id: null,
      cantidad: '',
    },
    items: [],
    productos: [],
    accesorios: [],
  }),

  async fetch() {
    if (this.$route.params.pedido) {
      const rsp = await this.$http.$get(`pedido/${this.$route.params.pedido}`)
      this.items = rsp.items
    } else {
      this.items = await this.$http.$get('pedidoItem')
    }

    this.productos = await this.$http.$get('producto')
    this.accesorios = await this.$http.$get('accesorio')
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Editar Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    initialize() {
      this.$fetch()
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      try {
        const res = await this.$http.$delete(`pedidoItem/${this.editedItem.id}`)

        this.items.splice(this.editedIndex, 1)

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

    async save() {
      try {
        const res = await this.$http.$put(
          `pedidoItem/${this.editedItem.id}`,
          this.editedItem
        )

        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.$fetch()
        this.close()
      } catch (error) {
        console.error(error.response ?? error)
      }
    },
  },
}
</script>
