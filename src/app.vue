<template>
  <v-app>
    <v-app-bar app dark fixed>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>PosiPrice</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/products">Products</v-btn>
        <v-btn text to="/orders">Orders</v-btn>
        <!--  Forzar push-->
        <v-btn text to="/about">About</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {

  }
};
</script>
