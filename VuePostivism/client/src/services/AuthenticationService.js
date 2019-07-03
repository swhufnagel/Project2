import api from "@/services/api";

export default {
  register(credentials) {
    console.log("trying");
    return api().post("login", credentials);
  }
};

// AuthenticationService.register({
//     email: something,
//     password: '123456'
// })
