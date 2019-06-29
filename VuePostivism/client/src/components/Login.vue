<template>
            <v-content>
                <v-layout>
                    <h1> Login</h1>
                    <form action="POST">
                            <v-text-field
                              v-model="email"
                              :error-messages="emailErrors"
                              label="Email"
                              required
                              @input="$v.email.$touch()"
                              @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                              v-model="password"
                              :error-messages="password"
                              label="Password"
                              required
                              @input="$v.email.$touch()"
                              @blur="$v.email.$touch()"
                            ></v-text-field>

                            <v-btn @click="submit">submit</v-btn>
                            <v-btn @click="clear">clear</v-btn>
                          </form>
                </v-layout>
            </v-content>
</template>

<script>
      /* eslint-disable no-new */
        // new Vue({ el: '#app' })
        import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        }
      }
    },

    data: () => ({
      email: '',
      password: ''
    }),

     computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.firstName = ''
        this.lastName = ''
        this.displayName = ''
        this.email = ''
        this.checkbox = false
      }
    }
  }
</script>
