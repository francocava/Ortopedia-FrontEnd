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
      :items="clientes"
      :search="search"
      sort-by="nombre"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Clientes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
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
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.apellido"
                        label="Apellido"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.dni"
                        label="DNI"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.contacto"
                        label="Contacto"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.telefono"
                        label="Telefono"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.obraSocial"
                        label="Obra Social"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.numeroAfiliado"
                        label="Afiliado"
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
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre',
      },
      { text: 'Apellido', value: 'apellido' },
      { text: 'DNI', value: 'dni', sortable: true },
      { text: 'Contacto', value: 'contacto'},
      { text: 'Teléfono', value: 'dni', sortable: true },
      { text: 'Obra Social', value: 'obraSocial', sortable: true },
      { text: 'Número Afiliado', value: 'dni', sortable: true },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    pagos: [],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      apellido: '',
      dni: 0,
      contacto: '',
      telefono: 0,
      obraSocial: '',
    },
    defaultItem: {
      nombre: '',
      apellido: '',
      dni: 0,
      obraSocial: '',
    },
  }),

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

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.clientes = [
        {
          nombre: 'Micaela',
          apellido: 'Rodriguez',
          dni: '17998356',
          contacto: '',
          telefono: '49496060',
          obraSocial: 'Osecac',
          numeroAfiliado: '101010',
        },
        {
          nombre: 'Tomas',
          apellido: 'Rodriguez',
          dni: '17888356',
          contacto: 'Mariela',
          telefono: '43439090',
          obraSocial: 'Pami',
          numeroAfiliado: '96969',
        },
        {
          nombre: 'Juan',
          apellido: 'Carlos',
          dni: '14888678',
          contacto: '',
          telefono: '239402',
          obraSocial: 'OSSBA',
          numeroAfiliado: '324456',
        },
      ]
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

    deleteItemConfirm() {
      this.pagos.splice(this.editedIndex, 1)
      this.closeDelete()
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pagos[this.editedIndex], this.editedItem)
      } else {
        this.pagos.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
