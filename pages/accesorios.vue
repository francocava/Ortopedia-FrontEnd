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
      :items="accesorios"
      :search="search"
      sort-by="nombre"
      class="elevation-1"
      show-expand
      :single-expand="true"
      :expanded-sync="productosExpandidos"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Accesorios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                to="/accesorio"
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
                        v-model="editedItem.nro_articulo"
                        label="Nro Articulo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.proveedor_id"
                        :items="proveedores"
                        item-value="id"
                        item-text="nombre"
                        :rules="[(v) => !!v || 'Item is required']"
                        label="Proveedor"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.precio"
                        label="Precio"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-combobox
                        v-model="editedItem.productos"
                        :items="todosLosProductos"
                        item-value="id"
                        item-text="nombre"
                        :rules="[(v) => !!v || 'Seleccionar producto/s']"
                        label="Productos"
                        required
                        multiple
                        return-object
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-textarea
                        outlined
                        v-model="editedItem.descripcion"
                        label="Descripcion"
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

          <v-dialog v-model="dialogDelete" max-width="570px">
            <v-card>
              <v-card-title class="headline"
                >Estas seguro que queres eliminar el accesorio?</v-card-title
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

          <v-dialog v-model="dialogDeleteProducto" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Eliminar el producto?</v-card-title
              >

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteProducto"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirmProducto"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogAgregarProducto" max-width="500px">
            <v-card>
              <v-card-title class="headline">Editar Productos</v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-combobox
                        v-model="editedItem.productos"
                        :items="todosLosProductos"
                        item-value="id"
                        item-text="nombre"
                        :rules="[(v) => !!v || 'Seleccionar producto/s']"
                        label="Productos"
                        required
                        multiple
                        return-object
                      ></v-combobox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAgregarProducto"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="agregarItemConfirmProducto"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDescripciones" max-width="500px">
            <v-card>
              <v-card-title class="headline">Descripcion</v-card-title>
              <v-row>
                <v-col>
                  <v-card-text class="mx-5">
                    {{ editedItem.descripcion }}
                  </v-card-text>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDescripciones"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.descripcion="{ item }">
        <v-icon @click="mostrarDescripcion(item)">
          mdi-card-text-outline
        </v-icon>
      </template>

      <template v-slot:item.data-table-expand="{ item, expand, isExpanded }">
        <v-icon
          @click="
            getProductos(item)
            expand(!isExpanded)
          "
          >mdi-arrow-down-drop-circle-outline</v-icon
        >
      </template>

      <template v-slot:expanded-item="{ headers }">
        <v-card>
          <v-list nav dense outlined>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(producto, i) in productosExpandidos"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="producto.nombre"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="agregarProducto">
                <v-list-item-title>Editar</v-list-item-title>
                <v-icon>mdi-plus</v-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </template>

      <template v-slot:item.precio="{ item }"> {{ item.precio ? "$" + item.precio : "-" }} </template>

      <template v-slot:item.nro_articulo ="{ item }">
        {{item.nro_articulo ? item.nro_articulo : " - "}}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
    dialogDeleteProducto: false,
    dialogAgregarProducto: false,
    dialogDescripciones: false,
    headers: [
      {
        text: 'Numero Articulo',
        align: 'start',
        sortable: true,
        value: 'nro_articulo',
      },
      { text: 'Nombre', value: 'nombre' },
      { text: 'Proveedor', value: 'proveedor.nombre', sortable: true },
      { text: 'Precio', value: 'precio' },
      { text: 'Descripcion', value: 'descripcion', sortable: false },
      { text: 'Productos', align: 'center', value: 'data-table-expand' },
      { text: 'Opciones', value: 'actions', sortable: false },
    ],
    accesorios: [],
    proveedores: [],
    productosExpandidos: [],
    todosLosProductos: [],
    productosParaAgregar: [],
    editedIndex: -1,
    editedItem: {
      nro_articulo: 0,
      nombre: '',
      proveedor_id: '',
      precio: 0,
      productos: [],
      descripcion: '',
    },
    defaultItem: {
      nro_articulo: 0,
      nombre: '',
      proveedor_id: '',
      precio: 0,
      productos: [],
      descripcion: '',
    },
  }),

  async fetch() {
    this.accesorios = await this.$http.$get('accesorio')
    this.proveedores = await this.$http.$get('proveedor')
    this.todosLosProductos = await this.$http.$get('producto')
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Editar Accesorio'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogDeleteProducto(val) {
      val || this.closeDeleteProducto()
    },
    dialogAgregarProducto(val) {
      val || this.closeAgregarProducto()
    },
    dialogDescripciones(val) {
      val || this.closeDescripciones()
    },
  },

  methods: {
    initialize() {
      this.$fetch()
    },

    editItem(item) {
      this.getProductos(item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.accesorios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemProducto(producto) {
      const deleteIndex = this.editedItem.productos.findIndex(
        (element) => (element.id = producto.id)
      )
      this.editedItem.productos.splice(deleteIndex, 1)

      this.dialogDeleteProducto = true
    },

    agregarProducto() {
      this.dialogAgregarProducto = true
    },

    mostrarDescripcion(item) {
      this.editedIndex = this.accesorios.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDescripciones = true
    },

    async agregarItemConfirmProducto() {
      try {
        const res = await this.$http.$put(
          `accesorio/${this.editedItem.id}`,
          this.editedItem
        )

        this.closeAgregarProducto()
      } catch (error) {
        console.error(error.response ?? error)
      }
    },

    async deleteItemConfirm() {
      try {
        const res = await this.$http.$delete(`accesorio/${this.editedItem.id}`)

        this.accesorios.splice(this.editedIndex, 1)

        this.closeDelete()
      } catch (error) {
        console.error(error.response ?? error)
      }
    },

    async deleteItemConfirmProducto() {
      //console.info('item', this.editedItem)
      try {
        const res = await this.$http.$put(
          `accesorio/${this.editedItem.id}`,
          this.editedItem
        )

        this.closeDeleteProducto()
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

    closeDeleteProducto() {
      this.dialogDeleteProducto = false
    },

    closeAgregarProducto() {
      this.dialogAgregarProducto = false
    },

    closeDescripciones() {
      this.dialogDescripciones = false

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async getProductos(item) {
      this.editedIndex = this.accesorios.indexOf(item)
      this.editedItem = Object.assign({}, item)

      const accesorioConProductos = await this.$http.$get(
        `accesorio/${this.editedItem.id}`,
        this.editedItem
      )

      this.productosExpandidos = accesorioConProductos.productos
      this.editedItem.productos = this.productosExpandidos
      //console.info(this.editedItem)
    },

    async save() {
      try {
        const res = await this.$http.$put(
          `accesorio/${this.editedItem.id}`,
          this.editedItem
        )

        if (this.editedIndex > -1) {
          Object.assign(this.accesorios[this.editedIndex], this.editedItem)
        } else {
          this.accesorios.push(this.editedItem)
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
