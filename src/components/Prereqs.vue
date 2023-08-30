<template>
    <div>
       <p class="headline">Overview of prerequisites</p>
       <div v-if="prereqs">
           <li v-for="prereq in prereqs" :key="prereq">
               {{prereq}} <a @click="goDeep(prereq)">Click</a>
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
            pagesize: 999999999,
            page: 0 
        };
    },
    methods: {
       retrieveTutorials() {
           const params = {
               size: this.pagesize,
               page: this.page
           }
           TutorialDataService.getAll(params)
           .then((response) => {
                const { tutorials, totalPages } = response.data;
                this.tutorials = tutorials.map(this.getDisplayTutorial);
                this.totalPages = totalPages;
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
        goDeep(id) {
        this.$router.push({ name: "searchview", params: { param: id, type: "Prereqs" } });
       },
    },
    mounted() {
        this.retrieveTutorials();
    }
}
</script>
<style>
</style>