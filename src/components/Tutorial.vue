<template>

 <div v-if="currentTutorial" class="gecentreerd">
   <v-card elevation="2">
     <v-card-title>View Recommendation</v-card-title>
     <v-card-subtitle>{{currentTutorial.recommendation}}</v-card-subtitle>
   </v-card><p></p>

   <v-card elevation="2"> 
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col cols="6" class="pa-8">
          
          <v-textarea
            v-model="currentTutorial.table"
            :rules="[(v) => !!v || 'Table is required']"
            label="Table"
            auto-grow
            rows="2"
            required
          ></v-textarea>

          <v-textarea
            v-model="currentTutorial.recommendation"
            :rules="[(v) => !!v || 'Recommendation is required']"
            label="Recommendation"
            auto-grow
            rows="2"
            required
          ></v-textarea>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="currentTutorial.class"
                :rules="[(v) => !!v || 'Class is required']"
                label="Class"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="currentTutorial.loe"
                :rules="[(v) => !!v || 'LOE is required']"
                label="LOE"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="pa-8">
          <div v-if="currentTutorial.supportOf">
            <v-card elevation="2" class="pa-2">
            Supports 
            <li v-for="support in currentTutorial.supportOf" :key="support.value">
              {{support.value}}
            </li>
            </v-card>
          </div>
          <p></p>
          <div v-if="currentTutorial.prereq">
            <v-card elevation="2" class="pa-2">
              List of prerequisites
              <li v-for="prereq in currentTutorial.prereq" :key="prereq.prereq">
                {{prereq.key}} | {{prereq.val}}
              </li>
            </v-card>
          </div>

          <v-divider class="my-5"></v-divider>

          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}

          <v-divider class="my-5"></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="center">
          <v-btn v-if="currentTutorial.published"
            @click="updatePublished(false)"
            color="primary" small class="mr-2"
          >
            UnPublish
          </v-btn>

          <v-btn v-else
            @click="updatePublished(true)"
            color="primary" small class="mr-2" outlined>
            Publish
          </v-btn>

          <v-btn color="error" small class="mr-2" @click="deleteTutorial" outlined>
            Delete
          </v-btn>

          <v-btn color="success" small class="mr-2" @click="updateTutorial" outlined>
            Update
          </v-btn>

          <v-btn color="primary" small class="mr-2" @click="addSupportOf = !addSupportOf" outlined>
            + Supports
          </v-btn>

          <v-btn color="primary" @click="addPrereq = !addPrereq" outlined small>
            + Prereq
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
      
    <div v-if="addSupportOf">
      <v-form ref="addSupportOfForm" lazy-validation>
        <v-text-field
          v-model="supportOfValue"
          :rules="[(v) => !!v || 'Supports is required']"
          label="Supports"
          required
          ></v-text-field>
          <v-text-field
          v-model="supportOfType"
          :rules="[(v) => !!v || 'Value is required']"
          label="Support Type"
          required
          ></v-text-field>

          <v-btn color="primary" @click="addNewSupportOf()" outlined small>
            Push
          </v-btn>
        </v-form>
    </div>

      <div v-if="addPrereq">
        <v-form ref="prereqform" lazy-validation>
        <v-text-field
          v-model="prereqKey"
          :rules="[(v) => !!v || 'Prerequisite is required']"
          label="Prerequisite"
          required
          ></v-text-field>
          <v-text-field
          v-model="prereqVal"
          :rules="[(v) => !!v || 'Value is required']"
          label="Value"
          required
          ></v-text-field>

          <v-btn color="primary" @click="addPrerequisite()" outlined small>
            Push
          </v-btn>
        </v-form>
      </div>

    <p class="mt-3">{{ message }}</p>
   </v-card>
  </div>
  
  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: "",
      addPrereq: false,
      addSupportOf: false,
      prereqVal: "",
      prereqKey: "",
      newPrereq: "",
      newSupportOf: "",
      supportOfValue: "",
      supportOfType: "",
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      this.currentTutorial.published = status;
      TutorialDataService.update(this.currentTutorial._id, this.currentTutorial)
        .then((response) => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial._id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    addPrerequisite() {
      this.newPrereq = {
        key: this.prereqKey,
        val: this.prereqVal
      }
      this.currentTutorial.prereq.push(this.newPrereq)
    },

    addNewSupportOf() {
      this.newSupportOf = {
        value: this.supportOfValue,
        type: this.supportOfType
      }
      this.currentTutorial.supportOf.push(this.newSupportOf)
    }
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 950px;
  margin: auto;
}

.gecentreerd {
  margin: auto;
  width: 80%;
}
</style>