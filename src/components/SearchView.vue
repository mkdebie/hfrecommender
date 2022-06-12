<template>
 <div class="gecentreerd">
   <v-card elevation="2">
     <v-card-title><span class="title">{{searchparam.id}}</span></v-card-title>
     <v-card-subtitle>Table list ({{tutorials.length}})</v-card-subtitle>
  </v-card><p>


        <div v-if="tutorials">
            <v-expansion-panels accordion>
                <v-expansion-panel v-for="tutorial in tutorials" :key="tutorial._id">
                    <v-expansion-panel-header>
                        {{tutorial._id}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-list dense>
                        <v-list-item-group>
                          <v-list-item v-for="recommendation in tutorial.details" :key="recommendation.id" @click="editTutorial(recommendation.id)">
                            <v-icon small class="mr-2" >mdi-dots-horizontal</v-icon>
                            <v-list-item-content>
                              {{recommendation.recommendation}}
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>

                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
       </div>
      

       <v-btn to="/tutorials" color="primary" small outlined>
           Terug
       </v-btn>
 </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "searchview",
  data() {
    return {
      searchparam:"",
      tutorials: [],
    };
  },

  methods: {
      getTutorials() {
      TutorialDataService.getGuideline(this.searchparam.id)
        .then((response) => {
          console.log(response.data.data)
          this.tutorials = response.data.data;
          console.log(this.tutorials);
        })
        .catch((e) => {
          console.log(e);
        });
      },
      editTutorial(id) {
        console.log(id);
        this.$router.push({ name: "tutorial-details", params: { id: id } });
  },
 },

 
  
  mounted() {
    this.searchparam = {
        id: this.$route.params.param,
    }
    this.getTutorials();
  },
};
</script>

<style>
.title {
white-space: wrap;
word-break: normal;
overflow: hidden ; 
text-overflow: ellipsis;
}

.gecentreerd {
  margin: auto;
  width: 80%;
}
</style>