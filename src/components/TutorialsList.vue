<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn outlined raised small @click="searchTitle">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Recommendations {{totalItems}}</v-card-title>
        <v-btn small outlined @click="published = !published; getUnpublished()">
          Published
        </v-btn>

        <v-data-table
          :headers="headers"
          :items="tutorials"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-col cols="12" sm="12">
          <v-row>
            <v-col cols="12" sm="12">
              <v-pagination
                v-model="page"
                :length="totalPages"
                total-visible="5"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                @input="handlePageChange"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-col>
        <v-card-actions v-if="tutorials.length > 0">
          <v-btn small color="error">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      bladwijzer: [{}],
      title: "",
      headers: [
        { text: "Table", align: "start", sortable: false, value: "table" },
        { text: "Recommendation", value: "recommendation", sortable: false },
        { text: "Class", value: "class", sortable: false },
        { text: "LOE", value: "loe", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      published: false,
      query: {},
      page: 1,
      totalPages: 0,
      totalItems:'',
      pageSize: 10,
    };
  },

  methods: {
    getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params["title"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }
      if (this.published) 
      {
        params["query"] = '{"published": true}'
      }
      else
      {
        params["query"] = '{}'
      }

      
      return params;
    },
    retrieveTutorials() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );
      TutorialDataService.getAll(params)
        .then((response) => {
          const { tutorials, totalPages } = response.data;
          this.tutorials = tutorials.map(this.getDisplayTutorial);
          this.totalPages = totalPages;
          console.log(response.data);
          this.generateIndex();
        })
        .catch((e) => {
          console.log(e);
        });
      },

    
    handlePageChange(value) {
      this.page = value;
      this.getUnpublished();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveTutorials();
    },

    refreshList() {
      this.retrieveTutorials();
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then((response) => {
          this.tutorials = response.data.map(this.getDisplayTutorial);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getUnpublished() {
      const params = this.getRequestParams(
        this.query,
        this.page,
        this.pageSize,
      )
      TutorialDataService.getUnpublished(params)
      .then((response) => {
        const { tutorials, totalPages, totalItems } = response.data;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
        console.log(response.data)
        this.tutorials = tutorials.map(this.getDisplayTutorial);
      })
      .then (() => {
        this.generateIndex();
      })
      .catch((e) => {
        console.log(e);
      }); 
      },

    editTutorial(id) {
      console.log (id)
      this.$router.push({ name: "tutorial-details", params: { id: id } });
    },

    deleteTutorial(id) {
      TutorialDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayTutorial(tutorial) {
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

    generateIndex () {
      console.log (this.tutorials.length)
      for (let i = 1; i < this.tutorials.length; i++ ) {
        console.log ("Hallo" + i)
      }

    }
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>

<style>
.list {
  max-width: 1200px;
}
</style>