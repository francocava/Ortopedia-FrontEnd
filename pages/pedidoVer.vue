<template>
  <v-data-table
    :headers="headers"
    :items="pedidos"
    sort-by="monto"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Pedidos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fechaIngresoAut"
                      label="Fecha Ingreso"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cliente"
                      label="Cliente"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.sucursal"
                      label="Sucursal"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.nroCotizacion"
                      label="Nro Cotizacion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.fechaRetiro"
                      label="Fecha Retiro"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.importeFac"
                      label="Importe Factura"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.flCt"
                      label="FL/CT"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      v-model="editedItem.nroRecibo"
                      label="Nro Recibo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
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
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Estas seguro que queres eliminar el item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Fecha Ingreso',
          align: 'start',
          sortable: false,
          value: 'fechaIngresoAut',
        },
        { text: 'Cliente', value: 'cliente',sortable: false, },
        { text: 'Sucursal', value: 'sucursal',sortable: false,},
        { text: 'Empleado', value: 'empleado',sortable: false, },
        { text: 'Nro Cotizacion', value: 'nroCotizacion',sortable: false, },
        { text: 'Fecha Retiro', value: 'fechaRetiro',sortable: false, },
        { text: 'Importe', value: 'importeFac' },
        { text: 'FL/CT', value: 'flCt',sortable: false, },
        { text: 'Nro Recibo', value: 'nroRecibo',sortable: false, },
        { text: 'Cancelado', value: 'cancelado',sortable: false, },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      pedidos: [],
      editedIndex: -1,
      editedItem: {
        fechaIngresoAut: '',
        cliente: '',
        sucursal: '',
        empleado: '',
        nroCotizacion: '',
        fechaRetiro: '',
        importeFac: '',
        flct: '',
        nroRecibo: '',
        cancelado: '',
      },
      defaultItem: {
        fechaIngresoAut: '',
        cliente: '',
        sucursal: '',
        empleado: '',
        nroCotizacion: '',
        fechaRetiro: '',
        importeFac: '',
        flct: '',
        nroRecibo: '',
        cancelado: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.pedidos = [
          {
            fechaIngresoAut: '10/12/20',
            cliente: 'Juan Carlos',
            sucursal: 'Floresta',
            empleado: 'Nico Ravielli',
            nroCotizacion : '5',
            fechaRetiro: '12/12/20',
            importeFac: '$'+'2346',
            flCt: 'fl',
            nroRecibo: '2345',
            cancelado: 'No',
          },
          {
            fechaIngresoAut: '09/10/20',
            cliente: 'Gaston Perez',
            sucursal: 'Floresta',
            empleado: 'Maria Arriada',
            nroCotizacion : '8',
            fechaRetiro: '13/10/20',
            importeFac: '$'+'1236',
            flCt: 'ct',
            nroRecibo: '2399',
            cancelado: 'No',
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.pedidos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.pedidos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.pedidos.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.pedidos[this.editedIndex], this.editedItem)
        } else {
          this.pedidos.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>