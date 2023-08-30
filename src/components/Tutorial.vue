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
              {{support.value}} | {{ support.type }}
            </li>
            </v-card>
          </div>
          <p></p>
          <div v-if="currentTutorial.prereq">
            <v-card elevation="2" class="pa-2">
              List of prerequisites
              <li v-for="prereq in currentTutorial.prereq" :key="prereq.prereq">
                {{prereq.key}} | {{prereq.val}} | <v-icon @click="changePrereq(prereq.key)">mdi-pencil </v-icon><v-icon @click="removePrereq(prereq.key)">mdi-delete</v-icon>
              </li>
            </v-card>
          </div>

          <v-divider class="my-5"></v-divider>

          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}

          <v-divider class="my-5"></v-divider>
        </v-col>
      </v-row>
    </v-form>

    <div v-if="addSupportOf" class="pa-8">
      <v-card>
        <v-card-title>Information about what this receommendation supports</v-card-title>
        <v-form ref="addSupportOfForm" lazy-validation>
          <v-combobox
          v-model="selectedItemSupportValue"
          :items="filteredItemsSupportValue"
          :search-input.sync="searchSupportValue"
          label="What does this recommendation support ?"
          @change="handleChangeSupportValue"
          class="relative-combobox-width"
          ></v-combobox>


          <v-combobox
            v-model="selectedItemSupportType"
            :items="filteredItemsSupportType"
            :search-input.sync="searchSupportType"
            label="What type of Support is this ?"
            @change="handleChangeSupportType"
            class="relative-combobox-width"
          ></v-combobox>
        </v-form>
        <v-card-actions class="pt-0">
          <v-btn color="primary" @click="addNewSupportOf()" outlined small>
          Add to list
          </v-btn>
        </v-card-actions>
      </v-card>

    </div>

      <div v-if="addPrereq" class="pa-8">
        <v-card>
        <v-card-title>Information about prerequisites for this recommendation</v-card-title>
        <v-form ref="addPrereqForm" lazy-validation>
          <v-combobox
          v-model="selectedPrereqKey"
          :items="filteredItemsPrereqKey"
          :search-input.sync="searchPrereqKey"
          label="Give Prereq"
          @change="handleChangePrereqKey"
          class="relative-combobox-width"
          ></v-combobox>
          <v-text-field
          class="relative-combobox-width"
            v-model="prereqVal"
            :rules="[(v) => !!v || 'Value is required']"
            label="Value"
            required
            ></v-text-field>
        </v-form>
        <v-card-actions class="pt-0">
          <v-btn color="primary" @click="addPrerequisite()" outlined small>
            Add to list
          </v-btn>
        </v-card-actions>
      </v-card>
      </div>
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

      <div class="pa-8">
        <v-alert v-if="showAlert" type="success" dismissible @input="dismissAlert">
      {{message}}
    </v-alert>
  </div>
   </v-card>

         <v-btn color="primary" small class="mr-2" @click="goBack()" outlined>Back</v-btn>
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
      addPrereq: false,
      addSupportOf: false,
      prereqVal: "",
      prereqKey: "",
      newPrereq: "",
      newSupportOf: "",
      supportOfValue: "",
      supportOfType: "",
      removedPrereq:"",
      // autocomplete variables
      supports: [],
      supportTypes: [],
      prereqs: [],
      selectedItemSupportValue: null,
      selectedItemSupportType: null,
      selectedPrereqKey: null,
      searchSupportValue: "",
      searchSupportType: "",
      searchPrereqKey: "",
      itemsSupportValue: [],
      itemsSupportType: [],
      itemsPrereqKey: [],
      //
      showAlert : false,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data;
        })
        .catch((e) => {
          console.log(e);
        })
      },
    // Dit zou waarschijnlijk sneller kunnen met 1 call, ik laat het nu zo
    retrieveSupports() {
        TutorialDataService.getSupportsMin()
        .then((response2) => {
            this.itemsSupportValue = response2.data.data;
        })
        .catch((e) => {
            console.log(e);
        });
      },
    retrieveSupportTypes() {
      TutorialDataService.getSupportsMinType()
      .then((response) => {
        this.itemsSupportType = response.data.data;
      })
        .catch((e) => {
          console.log(e);
      });
    },
    retrievePrereqKeys() {
      TutorialDataService.getPrereqMinKey()
      .then((response) => {
        this.itemsPrereqKey = response.data.data;
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
          this.message = response.data.message
        })
        .catch((e) => {
          console.log(e);
        });
        this.showAlertfx();
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

    removePrereq(prereq) {
      console.log (prereq)
      const index = this.currentTutorial.prereq.map(object => object.key).indexOf(prereq)
      this.removedPrereq = this.currentTutorial.prereq.splice(index,1);
    },

    changePrereq(prereq) {
      const index = this.currentTutorial.prereq.map(object=>object.val).indexOf(prereq)
      this.removedPrereq = this.currentTutorial.prereq.splice(index,1);
      this.prereqVal = this.removedPrereq[0].val;
      this.prereqKey = this.removedPrereq[0].key;
      console.log (this.removedPrereq[0])
      this.addPrereq = true;
    },

    addNewSupportOf() {
      this.newSupportOf = {
        value: this.supportOfValue,
        type: this.supportOfType
      }
      this.currentTutorial.supportOf.push(this.newSupportOf)
    },
    
    goBack() {
    this.$router.back();
    },
    handleChangePrereqKey(value) {
      if (this.itemsPrereqKey.indexOf(value) === -1) {
        this.itemsPrereqKey.push(value);
      }
      this.prereqKey= value
    },

    handleChangeSupportValue(value) {
      if (this.itemsSupportValue.indexOf(value) === -1) {
        this.itemsSupportValue.push(value);
      }
      this.supportOfValue = value
    },
    handleChangeSupportType(value) {
      if (this.itemsSupportType.indexOf(value) === -1) {
        this.itemsSupportType.push(value);
      }
      this.supportOfType = value
    },
    showAlertfx() {
    this.showAlert = true;

    setTimeout(() => {
      this.dismissAlert();}, 3000)
    },
  
    dismissAlert() {
    this.showAlert = false;
    },
  },


  computed: {
    filteredItemsSupportValue() {
      const itemsSupportValue = [...this.itemsSupportValue];
      if (this.searchSupportValue && this.itemsSupportValue.indexOf(this.search) === -1) {
        itemsSupportValue.push(this.searchSupportValue);
      }
      return itemsSupportValue;
    },
    filteredItemsSupportType() {
      const itemsSupportType = [...this.itemsSupportType];
      if (this.searchSupportType && this.itemsSupportType.indexOf(this.search) === -1) {
        itemsSupportType.push(this.searchSupportType);
      }
      return itemsSupportType;
    },
    filteredItemsPrereqKey() {
    const itemsPrereqKey = [...this.itemsPrereqKey];
    if (this.searchPrereqKey && this.itemsPrereqKey.indexOf(this.search) === -1) {
      itemsPrereqKey.push(this.searchPrereqKey);
    }

      return itemsPrereqKey;
    },
  },

  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
    this.retrieveSupports();
    this.retrieveSupportTypes();
    this.retrievePrereqKeys();
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

.relative-combobox-width {
  width: 95%;
  margin:auto;
}


</style>