<template>
    <div v-if="guidelines" class="gecentreerd">
       <p class="headline">
           <v-card elevation="2">
            <v-card-title><span class="title">Guideline overview</span></v-card-title>
            <v-card-subtitle>Number of guidelines ({{guidelines.data.length}})</v-card-subtitle>
           </v-card><p>

        <div >
            <v-card elevation="2">
                <v-simple-table v-if="guidelines">
                    <template v-slot:default>
                        <tbody>
                            <tr v-for="guideline in guidelines.data" :key="guideline._id">
                                <td @click="goDeep(guideline._id)">{{ guideline._id }}</td>   
                            </tr> 
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>

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
           })
           
           .catch((e) => {
               console.log(e);
           });
       },
       goDeep(id) {
        this.$router.push({ name: "searchview", params: { param: id, type: "Guideline" } });
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