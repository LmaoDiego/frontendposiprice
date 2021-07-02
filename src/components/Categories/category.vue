<template>
  <v-card>
    <v-card-title>
      Categories
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
                    :items="displayCategories"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1" ref="categoriesTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="navigateToEditCategory(item.id)">mdi-pen</v-icon>
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
                      <v-text-field v-model="editedItem.name" label="Category"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
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
          @click="navigateToAddCategory"
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
          @click="navigateToEditCategory"

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
          @click="deleteCategory"
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import CategoriesApiService from '../../services/categories-api.service';
export default {
  name: "categories",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Description', value: 'description'}
      ],
      categories: [],
      displayCategories: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        description: ''
      },
      defaultItem: {
        id: 0,
        name: '',
        description: ''
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
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
    retrieveCategory() {
      CategoriesApiService.getAll()
          .then(response => {
            this.categories = response.data;
            this.displayCategories = response.data.map(this.getDisplayCategory);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayCategory(category) {
      return {
        id: category.id,
        name: category.name,
        description: category.description
      };
    },

    refreshList() {
      this.retrieveCategory();
    },

    removeAllCategories() {
      CategoriesApiService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayCategories.indexOf(item);
      console.log(item);
      this.editedItem = this.categories[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayCategories.indexOf(item);
      this.editedItem = Object.assign({}, this.categories[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteCategory(this.editedItem.id);
      this.categories.splice(this.editedIndex, 1);
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
        this.categories[this.editedIndex] = this.editedItem;
        this.displayCategories[this.editedIndex] = this.getDisplayCategory(this.categories[this.editedIndex]);
        CategoriesApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        CategoriesApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.categories.push(item);
              this.displayCategories.push(this.getDisplayCategory(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteCategory(id) {
      CategoriesApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToAddCategory() {
      this.$router.push({name: 'add-category'});
    },
    navigateToEditCategory(id) {
      this.$router.push({name: 'edit-category', params: { id: id}});
    }


  },
  mounted() {
    this.retrieveCategory();
  }
}

</script>

<style scoped>

</style>
