import api from "@/services/Api";

export default {
  register(credentials) {
    console.log("trying");
    return api().post("api/account", credentials);
  }
};

// AuthenticationService.register({
//     email: something,
//     password: '123456'
// })
