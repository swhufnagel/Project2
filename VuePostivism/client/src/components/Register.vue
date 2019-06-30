<template>
  <v-content>
    <h1>Register</h1>
    <form action="POST">
      <v-text-field
        v-model="firstName"
        :counter="20"
        label="First Name"
        id="firstName"
        required
        @input="$v.firstName.$touch()"
        @blur="$v.firstName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :counter="20"
        label="Last Name"
        id="lastName"
        required
        @input="$v.lastName.$touch()"
        @blur="$v.lastName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="userName"
        :counter="25"
        label="User Name"
        id="userName"
        required
        @input="$v.userName.$touch()"
        @blur="$v.userName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="E-mail"
        id="email"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        id="password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="passwordRepeat"
        label="Confirm Password"
        id="password-repeat"
        type="password"
        required
        @input="$v.passwordRepeat.$touch()"
        @blur="$v.passwordRepeat.$touch()"
      ></v-text-field>

      <v-btn id="submit" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-content>
</template>

<script>
/* eslint-disable no-new */
// new Vue({ el: '#app' })
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email }
  },

  data: () => ({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordRepeat: ""
  }),

  computed: {
    // checkboxErrors () {
    //   const errors = []
    //   if (!this.$v.checkbox.$dirty) return errors
    //   !this.$v.checkbox.checked && errors.push('You must agree to continue!')
    //   return errors
    // },
    // firstNameErrors () {
    //   const errors = []
    //   // if (!this.$v.firstname.$dirty) return errors
    //   !this.$v.firstName.maxLength && errors.push('Name must be at most 20 characters long')
    //   !this.$v.firstName.required && errors.push('Name is required.')
    //   return errors
    // },
    // lastNameErrors () {
    //   const errors = []
    //   // if (!this.$v.lastname.$dirty) return errors
    //   !this.$v.lastName.maxLength && errors.push('Name must be at most 20 characters long')
    //   !this.$v.lastName.required && errors.push('Name is required.')
    //   return errors
    // },
    // userNameErrors () {
    //   const errors = []
    //   if (!this.$v.userName.$dirty) return errors
    //   !this.$v.userName.maxLength && errors.push('Name must be at most 25 characters long')
    //   !this.$v.userName.required && errors.push('Name is required.')
    //   return errors
    // },
    //   emailErrors () {
    //     const errors = []
    //     // if (!this.$v.email.$dirty) return errors
    //     !this.$v.email.email && errors.push('Must be valid e-mail')
    //     !this.$v.email.required && errors.push('E-mail is required')
    //     return errors
    //   }
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.firstName = "";
      this.lastName = "";
      this.userName = "";
      this.email = "";
      this.password = "";
      this.passwordRepeat = "";
      this.checkbox = false;
    },
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
        // this.$store.dispatch('setToken', response.data.token)
        // this.$store.dispatch('setUser', response.data.user)
        // this.$router.push({
        //   name: 'songs'
        // })
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>
