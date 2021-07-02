<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Suppliers</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Supplier Id"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.name" label="Supplier"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.email" label="Email"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.number" label="Number"></v-text-field>
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
import SuppliersApiService from "@/services/suppliers-api.service";

export default {
  name: "edit-suppliers",
  data() {
    return {
      item: {
        id: 0,
        name: '',
        email: '',
        number: 0
      }
    }
  },
  methods: {
    retrieveSupplier(id) {
      SuppliersApiService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      SuppliersApiService.update(this.item.id, this.item)
          .then(() => {
            this.navigateToSuppliers();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToSuppliers();
    },
    navigateToSuppliers() {
      this.$router.push({name: 'products'});
    }
  },
  created() {
    this.retrieveSupplier(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
