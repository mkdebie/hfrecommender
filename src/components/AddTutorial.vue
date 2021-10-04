<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Tutorial</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="tutorial.table"
          :rules="[(v) => !!v || 'Table is required']"
          label="Table"
          required
        ></v-text-field>

        <v-text-field
          v-model="tutorial.recommendation"
          :rules="[(v) => !!v || 'Recommendation is required']"
          label="Recommendation"
          required
        ></v-text-field>

        <v-text-field
          v-model="tutorial.class"
          :rules="[(v) => !!v || 'Class is required']"
          label="Class"
          required
        ></v-text-field>
                
        <v-text-field
          v-model="tutorial.loe"
          :rules="[(v) => !!v || 'Level of Evidence is required']"
          label="Level of Evidence"
          required
        ></v-text-field>

      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveTutorial">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Tutorial.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="primary" @click="newTutorial" outlined>Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        guideline: "2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure: Developed by the Task Force for the diagnosis and treatment of acute and chronic heart failure of the European Society of Cardiology (ESC) With the special contribution of the Heart Failure Association (HFA) of the ESC ",
        table: "",
        recommendation: "",
        class: "",
        loe: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        guideline: this.tutorial.guideline,
        table: this.tutorial.table,
        recommendation: this.tutorial.recommendation,
        class: this.tutorial.class,
        loe: this.tutorial.loe,
        published: this.tutorial.published,
      };

      TutorialDataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data._id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial =  {
        id: null,
        guideline: "2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure: Developed by the Task Force for the diagnosis and treatment of acute and chronic heart failure of the European Society of Cardiology (ESC) With the special contribution of the Heart Failure Association (HFA) of the ESC ",
        table: this.tutorial.table,
        recommendation: "",
        class: "",
        loe: "",
        published: false,
      };
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 900px;
}
</style>