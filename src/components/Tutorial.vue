<template>
  <div v-if="currentTutorial" class="edit-form py-3">
    <p class="headline">Edit Tutorial</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentTutorial.table"
        :rules="[(v) => !!v || 'Table is required']"
        label="Table"
        required
      ></v-text-field>

      <v-textarea
        v-model="currentTutorial.recommendation"
        :rules="[(v) => !!v || 'Recommendation is required']"
        label="Recommendation"
        auto-grow
        rows="2"
        required
      ></v-textarea>

      <v-text-field
        v-model="currentTutorial.class"
        :rules="[(v) => !!v || 'Class is required']"
        label="Class"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentTutorial.loe"
        :rules="[(v) => !!v || 'LOE is required']"
        label="LOE"
        required
      ></v-text-field>

      <div v-if="currentTutorial.prereq">
        List of prerequisites
        <li v-for="prereq in currentTutorial.prereq" :key="prereq.prereq">
          {{prereq.key}} | {{prereq.val}}
        </li>
      </div>

      <v-divider class="my-5"></v-divider>

      <label><strong>Status:</strong></label>
      {{ currentTutorial.published ? "Published" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn v-if="currentTutorial.published"
        @click="updatePublished(false)"
        color="primary" small class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn v-else
        @click="updatePublished(true)"
        color="primary" small class="mr-2"
      >
        Publish
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteTutorial">
        Delete
      </v-btn>

      <v-btn color="success" small class="mr-2" @click="updateTutorial">
        Update
      </v-btn>

      <v-btn color="primary" @click="addPrereq = !addPrereq" outlined small>
        + Prereq
      </v-btn>

    </v-form>
      
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
      prereqVal: "",
      prereqKey: "",
      newPrereq: "",
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
</style>