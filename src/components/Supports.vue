<template>
    <div>
       <p class="headline">Overview of Supports</p>
       <div v-if="supports">
            <v-expansion-panels accordion>
                <v-expansion-panel v-for="support in supports.data" :key="support._id">
                    <v-expansion-panel-header>
                      <p>{{support._id.value}}</p>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-list dense>
                        <v-list-item-group>
                          <v-list-item v-for="recommendation in support.details" :key="recommendation.id" @click="editTutorial(recommendation.id)">
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
    name:"Supports",
    data() {
        return {
            supports: [],
        };
    },
    methods: {
       retrieveSupports() {
           TutorialDataService.getSupports()
           .then((response) => {
                this.supports = response.data;
                console.log (this.prereqs)
           })
           .catch((e) => {
               console.log(e);
           });
       },
        goDeep(id) {
        this.$router.push({ name: "searchview", params: { param: id, type: "Prereqs" } });
       },
    },
    mounted() {
        this.retrieveSupports();
    }
}
</script>
<style>
</style>