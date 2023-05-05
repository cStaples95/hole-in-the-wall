import axios from "axios";
import DataHandling from "../DataHandling";

const ApiLogin = (username, password) => {
  const form_data = new FormData();
  form_data.append("username", username);
  form_data.append("password", password);

  axios
    .post("http://localhost:8000/users/login", form_data)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        alert("Login successful");
        navigation.navigate("Home Screen");
        // This will get chansged to a more secure method of storage after more research.
        console.log("The token is " + response.data.access_token);
        DataHandling.storeData("token", response.data.access_token);
      }
    })
    .then(() => {
      console.log("The token is " + DataHandling.getData("token"));
      return 1;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        alert("Invalid username or password");
        return 0;
      }
    });
};
export default ApiLogin;
