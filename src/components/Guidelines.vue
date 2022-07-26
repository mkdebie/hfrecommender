<template>
    <div class="gecentreerd">
       <p class="headline">
           <v-card elevation="2">
               Guidelines
           </v-card>
        <div v-if="guidelines">
           <li v-for="guideline in guidelines.data" :key="guideline._id">
               <div @click="goDeep(guideline._id)"> 
                {{guideline._id}}
               ({{guideline.details.length}})
               </div>
           </li>
       </div>
       <v-btn to="/tutorials" color="primary" small outlined>
           Terug
       </v-btn>

    </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
    name:"Guidelines",
    data() {
        return {
            guidelines: [],
        };
    },
    methods: {
       retrieveTutorials() {
           TutorialDataService.getGuidelines()
           .then((response) => {
                this.guidelines = response.data;
                console.log (this.guidelines.data[0]._id)
           })
           
           .catch((e) => {
               console.log(e);
           });
       },
       goDeep(id) {
        this.$router.push({ name: "searchview", params: { param: id } });
       }

    },
    mounted() {
        this.retrieveTutorials();
    }
}
</script>
<style>
.gecentreerd {
  margin: auto;
  width: 80%;
}
</style>