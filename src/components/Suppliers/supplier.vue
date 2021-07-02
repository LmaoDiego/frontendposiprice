<template>
  <v-card>
    <v-card-title>
      Suppliers
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-lines
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers"
                    :items="displaySuppliers"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1" ref="suppliersTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="navigateToEditSupplier(item.id)">mdi-pen</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Supplier"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.number" label="Number"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Item</v-card-title>
              <v-card-text>
                <p>Are you sure you want to delete the item <b>{{ editedItem.title }}</b></p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <!--      <v-btn small color="primary" @click="navigateToAddProduct">Add</v-btn>-->
      <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          x-small
          @click="navigateToAddSupplier"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="yellow"
          @click="navigateToEditSupplier"

      >
        <v-icon dark>
          mdi-pencil
        </v-icon>

      </v-btn>
      <!--      <v-btn small color="primary" @click="navigateToEditProduct">Edit</v-btn>-->
      <!--      <v-btn small color="error" @click="deleteProduct">Remove</v-btn>-->
      <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="error"
          @click="deleteSupplier"
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import SuppliersApiService from '../../services/suppliers-api.service';
export default {
  name: "suppliers",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Email', value: 'email'},
        {text: 'Number', value: 'number'},
      ],
      suppliers: [],
      displaySuppliers: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        email: '',
        number: 0
      },
      defaultItem: {
        id: 0,
        name: '',
        email: '',
        number: 0
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Supplier' : 'Edit Supplier'
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
    retrieveSupplier() {
      SuppliersApiService.getAll()
          .then(response => {
            this.suppliers = response.data;
            this.displaySuppliers = response.data.map(this.getDisplaySupplier);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplaySupplier(supplier) {
      return {
        id: supplier.id,
        name: supplier.name,
        email: supplier.email,
        number: supplier.number
      };
    },

    refreshList() {
      this.retrieveSupplier();
    },

    removeAllSuppliers() {
      SuppliersApiService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displaySuppliers.indexOf(item);
      console.log(item);
      this.editedItem = this.suppliers[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displaySuppliers.indexOf(item);
      this.editedItem = Object.assign({}, this.suppliers[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteSupplier(this.editedItem.id);
      this.suppliers.splice(this.editedIndex, 1);
      this.closeDelete();
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
        this.suppliers[this.editedIndex] = this.editedItem;
        this.displaySuppliers[this.editedIndex] = this.getDisplaySupplier(this.suppliers[this.editedIndex]);
        SuppliersApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        SuppliersApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.suppliers.push(item);
              this.displaySuppliers.push(this.getDisplaySupplier(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteSupplier(id) {
      SuppliersApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToAddSupplier() {
      this.$router.push({name: 'add-supplier'});
    },
    navigateToEditSupplier(id) {
      this.$router.push({name: 'edit-supplier', params: { id: id}});
    }


  },
  mounted() {
    this.retrieveSupplier();
  }
}

</script>

<style scoped>

</style>
