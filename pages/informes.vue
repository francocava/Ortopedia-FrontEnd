<template>
  <div>
    <v-card class="mr-auto text-center" color="green" dark max-width="500">
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">Ventas Última Semana</div>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>

    <v-card class="ml-auto text-center" color="green" dark max-width="500">
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">Ventas Última Semana</div>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>

  </div>
</template>

<script>
export default {
  data: () => ({
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
}
</script>
