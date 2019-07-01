<template>
  <div class="main-content">
    <v-container grid-list-md text-sm-center>
      <v-layout row id="topRow">
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-toolbar color="purple lighten-3">
              <v-img v-model="userImage" :src="UserImage" alt="userImage" />
              <v-toolbar-title>Post Feed</v-toolbar-title>

              <v-spacer></v-spacer>
              <div class="text-xs-center">
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn color="purple" dark v-on="on" small absolute bottom right fab>
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>

                  <v-card id="newPostCont">
                    <v-card-title class="headline purple lighten-3" primary-title>Make a New Post</v-card-title>
                    <v-form>
                      <v-flex xs12>
                        <v-textarea
                          hide-details
                          solo
                          id="newPostBox"
                          v-model="message"
                          name="newPost"
                          full-width
                        ></v-textarea>
                      </v-flex>
                    </v-form>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="purple lighten-2" flat @click="dialog = false">Post It!</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-toolbar>

            <v-list two-line>
              <template v-for="(item, index) in items">
                <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-tile v-else :key="item.title" avatar>
                  <v-list-tile-avatar>
                    <img :src="item.avatar" />
                  </v-list-tile-avatar>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      items: [],
      message: "Prove it!"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#topRow {
  margin-top: 5%;
}
#newPostBox {
  border: purple;
}
#newPostCont {
  border-radius: 10px;
}
</style>
