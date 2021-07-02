<template>
  <v-card>
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers"
                    :items="displayProducts"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1" ref="productsTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="navigateToEditProduct(item.id)">mdi-pen</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">¡SOLICITA NUEVO PRODUCTO¡</v-btn>
            </template>
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
                      <v-text-field v-model="editedItem.name" label="Product name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-img

                          src="https://picsum.photos/id/11/500/300"
                      ></v-img>
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
          @click="navigateToAddProduct"
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
          @click="navigateToEditProduct"

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
          @click="deleteProduct"
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import ProductApiService from '../../services/products-api.service';
export default {
  name: "products",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Price', value: 'price'},
        {text: 'Description', value: 'description'},
        {text: 'Image', value: 'url'},
      ],
      products: [],
      displayProducts: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        price: 0,
        description: '',
        url:''
      },
      defaultItem: {
        id: 0,
        name: '',
        price: 0,
        description: '',
        url:''
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
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
    retrieveProducts() {
      ProductApiService.getAll()
          .then(response => {
            this.products = response.data;
            this.displayProducts = response.data.map(this.getDisplayProduct);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayProduct(product) {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        url:product.url
      };
    },

    refreshList() {
      this.retrieveProducts();
    },

    removeAllProducts() {
      ProductApiService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayProducts.indexOf(item);
      console.log(item);
      this.editedItem = this.products[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayProducts.indexOf(item);
      this.editedItem = Object.assign({}, this.products[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteProduct(this.editedItem.id);
      this.products.splice(this.editedIndex, 1);
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
        this.products[this.editedIndex] = this.editedItem;
        this.displayProducts[this.editedIndex] = this.getDisplayProduct(this.products[this.editedIndex]);
        ProductApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        ProductApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.products.push(item);
              this.displayProducts.push(this.getDisplayProduct(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteProduct(id) {
      ProductApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToAddProduct() {
      this.$router.push({name: 'add-product'});
    },
    navigateToEditProduct(id) {
      this.$router.push({name: 'edit-product', params: { id: id}});
    }


  },
  mounted() {
    this.retrieveProducts();
  }
}

</script>

<style scoped>

</style>
