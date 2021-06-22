<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Product</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Product Id"></v-text-field>
          </v-col>

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
  name: "edit-product",
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
    retrieveProduct(id) {
      ProductsApiService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      ProductsApiService.update(this.item.id, this.item)
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
  },
  created() {
    this.retrieveProduct(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>