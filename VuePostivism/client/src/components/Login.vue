<template>
  <v-content>
    <v-container v-resize="callback" fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card id="loginBox" v-resize="callback" class="elevation-12">
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
                        <form action="POST">
                          <v-text-field
                            v-model="regFirstName"
                            :counter="20"
                            label="First Name"
                            id="firstName"
                            required
                            @input="$v.firstName.$touch()"
                            @blur="$v.firstName.$touch()"
                          ></v-text-field>
                          <v-text-field
                            v-model="regLastName"
                            :counter="20"
                            label="Last Name"
                            id="lastName"
                            required
                            @input="$v.lastName.$touch()"
                            @blur="$v.lastName.$touch()"
                          ></v-text-field>
                          <v-text-field
                            v-model="regUserName"
                            :counter="25"
                            label="User Name"
                            id="userName"
                            required
                            @input="$v.userName.$touch()"
                            @blur="$v.userName.$touch()"
                          ></v-text-field>
                          <v-text-field
                            v-model="regEmail"
                            label="E-mail"
                            id="email"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                          ></v-text-field>
                          <v-text-field
                            v-model="regPassword"
                            label="Password"
                            type="password"
                            id="password"
                            required
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                          ></v-text-field>
                          <v-text-field
                            v-model="regPasswordRepeat"
                            label="Confirm Password"
                            id="password-repeat"
                            type="password"
                            required
                            @input="$v.passwordRepeat.$touch()"
                            @blur="$v.passwordRepeat.$touch()"
                          ></v-text-field>
                        </form>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                  <v-btn type="submit" color="blue darken-1" flat @click="dialog = false">Submit</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
          <div>
            <v-text
              id="newAccount"
              left
              offset-x="true"
            >Click here to sign-up for a new Postivism account!</v-text>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
/* eslint-disable no-new */
// new Vue({ el: '#app' })
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  data: () => {
    return {
      dialog: null,
      loginUserName: "Enter your User Name",
      loginPassword: "",
      regFirstName: "",
      regLastName: "",
      regUserName: "",
      regEmail: "",
      regPassword: "",
      regPasswordRepeat: ""
    };
  },
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required }
  },

  data: () => ({
    email: "",
    password: ""
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
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