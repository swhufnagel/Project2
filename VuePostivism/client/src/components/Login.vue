<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card id="loginBox" class="elevation-12">
            <v-toolbar dark color="purple darken-3">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form action="POST">
                <v-text-field
                  v-model="loginUserName"
                  prepend-icon="person"
                  name="userName"
                  label="Username"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="loginPassword"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="purple darken-3">Login</v-btn>
            </v-card-actions>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="secondary" dark small absolute bottom left fab v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dark color="purple darken-2">
                  <v-toolbar-title>New User</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                      <v-flex xs12 sm8 md12 lg12>
                        <form action="POST" @submit="postPost()">
                          <v-text-field
                            v-model="regFirstName"
                            :counter="20"
                            label="First Name"
                            id="firstName"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="regLastName"
                            :counter="20"
                            label="Last Name"
                            id="lastName"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="regUserName"
                            :counter="25"
                            label="User Name"
                            id="userName"
                            required
                          ></v-text-field>
                          <v-text-field v-model="regEmail" label="E-mail" id="email" required></v-text-field>
                          <v-text-field
                            v-model="regPassword"
                            label="Password"
                            type="password"
                            id="regPassword"
                            required
                          ></v-text-field>
                          <v-text-field
                            v-model="regPasswordRepeat"
                            label="Confirm Password"
                            id="password-repeat"
                            type="password"
                            required
                          ></v-text-field>
                        </form>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                  <v-btn type="submit" color="blue darken-1" @click="register" flat>Submit</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
          <div>
            <p
              id="newAccount"
              left
              offset-x="true"
            >Click here to sign-up for a new Postivism account!</p>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
/* eslint-disable no-new */
// new Vue({ el: '#app' })
import AuthenticationService from "@/services/AuthenticationService";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  data: () => {
    return {
      dialog: null,
      loginUserName: "",
      loginPassword: "",
      regFirstName: "",
      regLastName: "",
      regUserName: "",
      regEmail: "",
      regPassword: "",
      regPasswordRepeat: ""
    };
  },
  methods: {
    // async post() {
    //   console.log("clicked");
    //   await axios
    //     .post("http://localhost:8080/#/", {
    //       regFirstName: this.regFirstName,
    //       regLastName: this.regLastName,
    //       regUserName: this.regUserName,
    //       regEmail: this.regEmail,
    //       regPassword: this.regPassword,
    //       regPasswordRepeat: this.regPasswordRepeat
    //     })
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //       this.errors.push(e);
    //     });
    // },
    register() {
      var response = AuthenticationService.register({
        regFirstName: this.regFirstName,
        regLastName: this.regLastName,
        regUserName: this.regUserName,
        regEmail: this.regEmail,
        regPassword: this.regPassword,
        regPasswordRepeat: this.regPasswordRepeat
      }).then(function(response) {
        console.log("authenticated ", response);
      });
    }
  }
};
</script>

<style scoped>
#newAccount {
  width: 800px;
  text-align: center;
  color: rgb(189, 189, 189);
  position: relative;
  top: 23px;
}
#loginBox {
  min-width: 350px;
}
</style>