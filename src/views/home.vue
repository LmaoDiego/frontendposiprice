<template>
  <div class="home">
<!--    <img alt="RAM logo" src="../assets/Ram.png">-->
    <v-card-title>
      Busca ahora!
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Example: Memory RAM"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
<!---->
      <v-app id="inspire">
        <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
        >
          <template slot="progress">
            <v-progress-linear
                color="deep-blue"
                height="10"
                indeterminate
            ></v-progress-linear>
          </template>

          <v-img
              height="280"
              src="../assets/Ram.png"
          ></v-img>

          <v-card-title>TridentZ RGB G Zkill (16GB RAM)</v-card-title>

          <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
              <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
              ></v-rating>

              <div class="grey--text ms-4">
                4.5 (413)
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              350$ • 20%-
            </div>

            <div>MEMORIA G.SKILL RGB 16GB 3000 MHZ (8X2)</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>!Recien Llegado!</v-card-title>

          <v-card-actions>
            <v-btn
                color="deep-blue lighten-2"
                text
                @click="reserve"
            >
              COMPRAR AHORA
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-app>
<!--    -->

    <v-app id="inspire">
      <v-footer
          dark
          padless
      >
        <v-card
            flat
            tile
            class="indigo lighten-1 white--text text-center"
        >
          <v-card-text>
            <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4 white--text"
                icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0">

          </v-card-text>

          <v-divider></v-divider>
          Tu mejor opcion de ahorro en estos tiempos donde los precios estan por cielos. Asumimos el compromiso de tener los mejores productos actualizados y precios por mayor a tu disposición en cualquier momento: De tus amigos de SILVERFOXMEDIA
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>PosiPrice</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-app>
  </div>
</template>


