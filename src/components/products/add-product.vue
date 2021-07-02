<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Product</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.name" label="Product Title"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.price" label="Price"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.description" label="Description"></v-text-field>
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
</template>

<script>
import ProductsApiService from "@/services/products-api.service";

export default {
  name: "add-product",
  data() {
    return {
      item: {
        id: 0,
        name: '',
        price: 0,
        description: ''
      }
    }
  },
  methods: {

    save() {
      ProductsApiService.create(this.item)
          .then(() => {
            this.navigateToProducts();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToProducts();
    },
    navigateToProducts() {
      this.$router.push({name: 'products'});
    }
  }
}
</script>

<style scoped>

</style>
