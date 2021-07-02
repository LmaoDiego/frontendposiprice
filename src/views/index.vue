<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-card-text class="mt-16">
                        <h1
                            class="text-center display-1 teal--text text--accent-3"
                        >Ingresa PosiPricer!</h1>
                        <v-form>
                          <v-text-field
                              label="Usuario"
                              name="Usuario"
                              prepend-icon="fas fa-user"
                              type="text"
                              color="teal accent-3"
                          />

                          <v-text-field
                              id="Contraseña"
                              label="Contraseña"
                              name="contraseña"
                              prepend-icon="lock"
                              type="contraseña"
                              color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-3" dark>Entrar</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="40" class="teal accent-3">
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">REGISTRAR</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1"></h1>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">REGRESAR</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-1 teal--text text--accent-3">CREAR CUENTA</h1>

                        <v-form>
                          <v-text-field
                              label="Usuasrio"
                              name="Usuario"
                              prepend-icon="person"
                              type="text"
                              color="teal accent-3"
                          />
                          <v-text-field
                              label="Correo"
                              name="Correo"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                          />

                          <v-text-field
                              id="contraseña"
                              label="Contraseña"
                              name="contraseña"
                              prepend-icon="lock"
                              type="password"
                              color="teal accent-3"
                          />
                          <v-text-field
                              id="cuidad"
                              label="Cuidad"
                              name="cuidad"
                              prepend-icon="mdi-map-marker"
                              type="text"
                              color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-3" dark>REGISTRAR</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    step: 1
  }),
  props: {
    source: String
  }
};
</script>
