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
                      <v-text-field
                        v-model="editedItem.cliente_id"
                        label="Cliente"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.sucursal_id"
                        label="Sucursal"
                      ></v-text-field>
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
                        v-model="editedItem.importe_fac"
                        label="Importe Factura"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fl_ct"
                        label="FL/CT"
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
                        v-model="editedItem.cancelado"
                        label="Cancelado"
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
        <v-icon small class="mr-2" @click="adjuntarFactura(item)">
          mdi-alpha-f-circle-outline
        </v-icon>
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
      { text: 'Importe', value: 'importe_fac' },
      { text: 'FL/CT', value: 'fl_ct', sortable: false },
      { text: 'Nro Recibo', value: 'nro_recibo_proveedor', sortable: false },
      { text: 'Cancelado', value: 'cancelado', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    pedidos: [],
    editedIndex: -1,
    editedItem: {
      fecha_ingreso_autorizacion: '',
      clie_id: '',
      suc_id: '',
      usuario_id: '',
      id: '',
      fecha_retiro: '',
      importe_fac: '',
      fl_ct: '',
      nro_recibo_proveedor: '',
      cancelado: '',
    },
    defaultItem: {
      fecha_ingreso_autorizacion: '',
      clie_id: '',
      suc_id: '',
      usuario_id: '',
      id: '',
      fecha_retiro: '',
      importe_fac: '',
      fl_ct: '',
      nro_recibo_proveedor: '',
      cancelado: '',
    },
  }),

  async fetch() {
    this.pedidos = await this.$http.$get('pedido')
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
      this.editedIndex = this.pedidos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.pedidos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.pedidos.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    adjuntarFactura(item) {
      /*
        La idea es que aca me muestre una pantalla como la de edit pero para
        adjuntar una factura (crearla). Se activa cuando tocas el boton de f al lado del de edit.
      */
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
          `pedido/${this.editedItem.id}`,
          this.editedItem
        )

        if (this.editedIndex > -1) {
          Object.assign(this.pedidos[this.editedIndex], this.editedItem)
        } else {
          this.pedidos.push(this.editedItem)
        }
      } catch (error) {
        console.log(error)
      }

      this.close()
    },
  },
}
</script>
