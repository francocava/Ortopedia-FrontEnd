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
      :items="productos"
      :search="search"
      sort-by="nombre"
      class="elevation-1"
      show-expand
      :single-expand="true"
      :expanded-sync="accesoriosExpandidos"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Productos</v-toolbar-title>
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
                to="/producto"
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
                        v-model="editedItem.accesorios"
                        :items="todosLosAccesorios"
                        item-value="id"
                        item-text="nombre"
                        :rules="[(v) => !!v || 'Seleccionar accesorio/s']"
                        label="Accesorios"
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

          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="headline"
                >Estas seguro que queres eliminar el producto?</v-card-title
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

          <v-dialog v-model="dialogDeleteAccesorio" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Eliminar el accesorio?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteAccesorio"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirmAccesorio"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogAgregarAccesorio" max-width="500px">
            <v-card>
              <v-card-title class="headline">Editar Accesorios</v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-combobox
                        v-model="editedItem.accesorios"
                        :items="todosLosAccesorios"
                        item-value="id"
                        item-text="nombre"
                        :rules="[(v) => !!v || 'Seleccionar accesorio/s']"
                        label="Accesorios"
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
                <v-btn color="blue darken-1" text @click="closeAgregarAccesorio"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="agregarItemConfirmAccesorio"
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
            getAccesorios(item)
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
                v-for="(accesorio, i) in accesoriosExpandidos"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="accesorio.nombre"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="agregarAccesorio">
                <v-list-item-title>Editar</v-list-item-title>
                <v-icon>mdi-plus</v-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </template>

      <template v-slot:item.precio="{ item }"> {{ item.precio ? "$" + item.precio : "-" }} </template>

      <template v-slot:item.nro_articulo ="{ item }">
        {{item.nro_articulo ? item.nro_articulo : "-"}}
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
    dialogDeleteAccesorio: false,
    dialogAgregarAccesorio: false,
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
      { text: 'Accesorios', align: 'center', value: 'data-table-expand' },
      { text: 'Opciones', value: 'actions', sortable: false },
    ],
    productos: [],
    editedIndex: -1,
    editedItem: {
      nro_articulo: 0,
      nombre: '',
      proveedor_id: '',
      precio: 0,
      accesorios: [],
      descripcion: '',
    },
    defaultItem: {
      nro_articulo: 0,
      nombre: '',
      proveedor_id: '',
      precio: 0,
      accesorios: [],
      descripcion: '',
    },
    proveedores: [],
    accesoriosExpandidos: [],
    todosLosAccesorios: [],
  }),

  async fetch() {
    this.productos = await this.$http.$get('producto')
    this.proveedores = await this.$http.$get('proveedor')
    this.todosLosAccesorios = await this.$http.$get('accesorio')
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Editar Producto'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogDeleteAccesorio(val) {
      val || this.closeDeleteAccesorio()
    },
    dialogAgregarAccesorio(val) {
      val || this.closeAgregarAccesorio()
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
      this.getAccesorios(item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.productos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemAccesorio(accesorio) {
      const deleteIndex = this.editedItem.accesorios.findIndex(
        (element) => (element.id = accesorio.id)
      )

      this.editedItem.accesorios.splice(deleteIndex, 1)

      this.dialogDeleteAccesorio = true
    },

    mostrarDescripcion(item) {
      this.editedIndex = this.productos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDescripciones = true
    },

    agregarAccesorio() {
      this.dialogAgregarAccesorio = true
    },

    async agregarItemConfirmAccesorio() {
      try {
        const res = await this.$http.$put(
          `producto/${this.editedItem.id}`,
          this.editedItem
        )

        this.closeAgregarAccesorio()
      } catch (error) {
        console.error(error.response ?? error)
      }
    },
    async deleteItemConfirm() {
      try {
        const res = await this.$http.$delete(`producto/${this.editedItem.id}`)

        this.productos.splice(this.editedIndex, 1)

        this.closeDelete()
      } catch (error) {
        console.error(error.response ?? error)
      }
    },

    async deleteItemConfirmAccesorio() {
      try {
        const res = await this.$http.$put(
          `producto/${this.editedItem.id}`,
          this.editedItem
        )

        this.closeDeleteAccesorio()
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

    closeDeleteAccesorio() {
      this.dialogDeleteAccesorio = false
    },

    closeAgregarAccesorio() {
      this.dialogAgregarAccesorio = false
    },

    closeDescripciones() {
      this.dialogDescripciones = false

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async getAccesorios(item) {
      this.editedIndex = this.productos.indexOf(item)
      this.editedItem = Object.assign({}, item)

      const productoConAccesorios = await this.$http.$get(
        `producto/${this.editedItem.id}`,
        this.editedItem
      )

      this.accesoriosExpandidos = productoConAccesorios.accesorios

      this.editedItem.accesorios = this.accesoriosExpandidos
    },

    async save() {
      try {
        const res = await this.$http.$put(
          `producto/${this.editedItem.id}`,
          this.editedItem
        )

        if (this.editedIndex > -1) {
          Object.assign(this.productos[this.editedIndex], this.editedItem)
        } else {
          this.productos.push(this.editedItem)
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
