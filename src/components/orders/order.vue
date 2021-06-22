<template>
  <v-card>
    <v-card-title>
      Orders
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
                    :items="displayOrders"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1" ref="ordersTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="navigateToEditOrder(item.id)">mdi-pen</v-icon>
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
                      <v-text-field v-model="editedItem.user_id" label="User Id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.date" label="Date"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.order_amount" label="Order Amount"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.delivery_date" label="Delivery Date"></v-text-field>
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
  </v-card>
</template>

<script>
import OrderApiService from '../services/orders-api.service';
export default {
  name: "orders",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'UserId', value: 'user_id'},
        {text: 'Date', value: 'date'},
        {text: 'Order Amount', value: 'order_amount'},
        {text: 'Delivery Date', value: 'delivery_date'},
      ],
      orders: [],
      displayOrders: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        user_id: 0,
        date:'',
        order_amount: 0,
        delivery_date: ''
      },
      defaultItem: {
        id: 0,
        user_id: 0,
        date:'',
        order_amount: 0,
        delivery_date: ''
      },
    }
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
    retrieveOrders() {
      OrderApiService.getAll()
          .then(response => {
            this.orders = response.data;
            this.displayOrders = response.data.map(this.getDisplayOrder());
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayOrder(order) {
      return {
        id: order.id,
        user_id: order.user_id,
        date: order.date,
        order_amount: order.order_amount,
        delivery_date:order.delivery_date
      };
    },

    refreshList() {
      this.retrieveOrders();
    },

    removeAllOrders() {
      OrderApiService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.displayOrders.indexOf(item);
      console.log(item);
      this.editedItem = this.orders[this.editedIndex];
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayOrders.indexOf(item);
      this.editedItem = Object.assign({}, this.orders[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteOrder(this.editedItem.id);
      this.orders.splice(this.editedIndex, 1);
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
        this.orders[this.editedIndex] = this.editedItem;
        this.displayOrders[this.editedIndex] = this.getDisplayOrder(this.orders[this.editedIndex]);
        OrderApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        OrderApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.orders.push(item);
              this.displayOrders.push(this.getDisplayOrder(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteOrder(id) {
      OrderApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToAddOrder() {
      this.$router.push({name: 'add-order'});
    },
    navigateToEditOrder(id) {
      this.$router.push({name: 'edit-order', params: { id: id}});
    }


  },
  mounted() {
    this.retrieveOrders();
  }
}

</script>

<style scoped>

</style>