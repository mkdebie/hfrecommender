<template>
    <div>
       <p class="headline">Overview of prerequisites</p>
       <div v-if="prereqs">
           <li v-for="prereq in prereqs" :key="prereq">
               {{prereq}}
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
    name:"Prereqs",
    data() {
        return {
            tutorials: [],
            prereqs:[],
        };
    },
    methods: {
       retrieveTutorials() {
           TutorialDataService.getAll()
           .then((response) => {
               this.tutorials = response.data.map(this.getDisplayTutorial);
               console.log (this.prereqs)
           })
           
           .catch((e) => {
               console.log(e);
           });
       },
    
        getDisplayTutorial(tutorial) {

            if (tutorial.prereq.length >0) {
                console.log(tutorial.prereq)
                for (var i=0; i < tutorial.prereq.length; i++)
                {
                    console.log(tutorial.prereq[i].key)
                    if (!this.prereqs.includes(tutorial.prereq[i].key)) {
                        this.prereqs.push(tutorial.prereq[i].key)
                    }
                }
            }
            return {
                id: tutorial._id,
                guideline: tutorial.guideline,
                table: tutorial.table.length > 50 ? tutorial.table.substr(0, 50) + "..." : tutorial.title,
                recommendation: tutorial.recommendation.length > 50 ? tutorial.recommendation.substr(0, 50) + "..." : tutorial.description,
                class: tutorial.class,
                loe: tutorial.loe,
                status: tutorial.published ? "Published" : "Pending",
            };
        },
    },
    mounted() {
        this.retrieveTutorials();
    }
}
</script>
<style>
</style>