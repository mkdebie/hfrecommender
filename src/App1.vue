<template>
  <v-app>
    <v-app-bar app dark dense>

      <v-btn to="/tutorials" small text>
        Recs
      </v-btn>

      <v-btn to="/add" small text>
        Add
      </v-btn>
      
      <v-btn to="/prereqs" small text>
        PreReqs 
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>