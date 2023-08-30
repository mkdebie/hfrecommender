<template>
    <div>
        <div>
            Hallo dit wordt de testpagina voor decision support
        </div>
        <div v-if="preReqs.length > 0">
            <h2>List of Unanswerd Questions</h2>
            <ul>
            <li v-for="(doc, index) in preReqs" :key="index">
                <span>{{ doc.prereq.key }}</span>
            <v-radio-group v-model="doc.selectedOption" @change="handleChangeUnanswerdQ(index)">
                <v-radio :label="`other`" :value="`other`"></v-radio>
                <v-radio :label="doc.prereq.value" :value="doc.prereq.value"></v-radio>
            </v-radio-group>
            </li>
            </ul> 
        </div>
        <div v-if="answerdPreReqs.length > 0">
            <h2>List of Answerd Questions</h2>
            <ul>
            <li v-for="(doc, index) in answerdPreReqs" :key="index">
                <span>{{ doc.prereq.key }}</span><v-icon @click="pushBackUnanswerdQ(index)">mdi-undo </v-icon>
            </li>
            </ul> 
        </div>
        <div v-if="recommendations.length > 0">
            <h2>List of Recommendationss</h2>
            <ul>
            <li v-for="(doc, index) in recommendations" :key="index">
                <span>{{ doc.rec }}</span>
                <span>{{ doc.loe }}</span>
            </li>
            </ul> 
        </div>
    </div>
  </template>
  
  <script>
//   import TutorialDataService from "../services/TutorialDataService";
  
  export default {
      name:"supportTest",
      data() {
          return {
            selectedOption:null,
            preReqs: [{"prereq": {key:"pijn op de borst", "value": "true"}, "recommendation" : {rec:"test"}, selectedOption:null}, 
            {"prereq": {key:"Dyspnoe", "value": "true"}, "recommendation" : {rec:"test2", loe:"A"}, selectedOption:null}],
            answerdPreReqs: [],
            recommendations: [],
            };
      },
      methods: {
        handleChangeUnanswerdQ(key) {
            console.log("Changed", this.preReqs[key].selectedOption, key)
            this.answerdPreReqs.push(this.preReqs[key])
            this.checkForRecommendation (key)
            this.preReqs.splice(key,1)
        },
        pushBackUnanswerdQ(index) {
            console.log(index)
            this.preReqs.push(this.answerdPreReqs[index])
            this.answerdPreReqs.splice(index, 1)
        },
        checkForRecommendation(key) {
            if (this.preReqs[key].selectedOption === this.preReqs[key].prereq.value) {
                this.recommendations.push(this.preReqs[key].recommendation);
                console.log(this.recommendations)
            }
        }

      },
      mounted() {
      }
  }
  </script>
  
  <style scoped>
  /* Component-specific styles go here */
  </style>
  