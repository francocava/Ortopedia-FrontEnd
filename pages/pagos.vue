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
      :items="pagos"
      :search="search"
      sort-by="monto"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Pagos</v-toolbar-title>
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
                to="/pago"
              >
                Nuevo Item
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
                        v-model="editedItem.monto"
                        label="Monto"
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
                      <v-select
                        v-model="editedItem.forma_pago_id"
                        :items="formasPagos"
                        item-value="id"
                        item-text="tipo"
                        :rules="[(v) => !!v || 'Ingrese forma de pago']"
                        label="Forma de pago"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.pedido_id"
                        label="Nro Cotizacion"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nro_confirmacion"
                        label="Nro Confirmacion"
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

      <template v-slot:item.monto="{ item }"> ${{ item.monto }} </template>

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
    headers: [
      {
        text: 'Monto',
        align: 'start',
        sortable: true,
        value: 'monto',
      },
      { text: 'Forma de pago', value: 'forma_pago.tipo' },
      { text: 'Nro Cotizacion', value: 'pedido_id' },
      { text: 'Proveedor', value: 'proveedor.nombre' },
      { text: 'Nro Confirmacion', value: 'nro_confirmacion' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    pagos: [],
    formasPagos: [],
    proveedores: [],
    editedIndex: -1,
    editedItem: {
      monto: 0,
      forma_pago_id: '',
      pedido_id: '',
      proveedor_id: '',
      nro_confirmacion: '',
    },
    defaultItem: {
      monto: 0,
      forma_pago_id: '',
      pedido_id: '',
      proveedor_id: '',
      nro_confirmacion: '',
    },
  }),

  async fetch() {
    this.pagos = await this.$http.$get('pago')
    this.formasPagos = await this.$http.$get('formaPago')
    this.proveedores = await this.$http.$get('proveedor')
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
      this.editedIndex = this.pagos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.pagos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      try {
        const res = await this.$http.$delete(`pago/${this.editedItem.id}`)

        this.pagos.splice(this.editedIndex, 1)

        this.closeDelete()
      } catch (error) {
        console.log(error)
        console.log(error.response)
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
          `pago/${this.editedItem.id}`,
          this.editedItem
        )
        console.log(res)

        if (this.editedIndex > -1) {
          Object.assign(this.pagos[this.editedIndex], this.editedItem)
        } else {
          this.facturas.pagos(this.editedItem)
        }
      } catch (error) {
        console.log(error)
      }
      this.$fetch()
      this.close()
    },
  },
}
</script>
