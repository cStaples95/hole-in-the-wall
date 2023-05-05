import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log("Error saving data" + e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
    console.log("Error reading data" + e);
  }
};

export const login = (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  axios
    .post("http://localhost:8000/users/login", formData)
    .then((response) => {
      if (response.status === 200) {
        navigation.navigate("Home Screen");
        // This will get chansged to a more secure method of storage after more research.
        storeData("token", response.data.access_token);
        storeData("");
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        alert("Invalid username or password");
        return 0;
      }
    });
};

export const createPost = async (data) => {
  const token = await getData("token");
  const { title, pictureFile, description, inputLocation } = data;
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("location", inputLocation);

  if (pictureFile) {
    const fileTypeMatch = pictureFile.match(
      /data:image\/([a-zA-Z0-9]+);base64,/
    );
    if (!fileTypeMatch) {
      alert("Invalid image format");
      return;
    }

    const fileType = fileTypeMatch[1];
    const allowedTypes = ["jpg", "jpeg", "png", "gif"];

    if (!allowedTypes.includes(fileType.toLowerCase())) {
      alert("Only JPG, JPEG, PNG, and GIF image types are allowed");
      return;
    }
    // Get the base64 data from the string
    const base64Data = pictureFile.split(",")[1];

    // Convert the base64 data to a Blob object
    const blob = new Blob([Buffer.from(base64Data, "base64")], {
      type: `image/${fileType}`,
    });

    // Append the Blob object to the FormData
    formData.append("picture", blob, `picture.${fileType}`);
    formData.append("picture_ext", fileType);
  }

  if (!token) {
    alert("You are not authorized");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:8000/posts/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
};

export const updateProfile = async (bio, pictureFile) => {
  const formData = new FormData();
  formData.append("bio", bio);
  if (pictureFile) {
    const fileTypeMatch = pictureFile.match(
      /data:image\/([a-zA-Z0-9]+);base64,/
    );
    if (!fileTypeMatch) {
      alert("Invalid image format");
      return;
    }

    const fileType = fileTypeMatch[1];
    const allowedTypes = ["jpg", "jpeg", "png", "gif"];

    if (!allowedTypes.includes(fileType.toLowerCase())) {
      alert("Only JPG, JPEG, PNG, and GIF image types are allowed");
      return;
    }
    // Get the base64 data from the string
    const base64Data = pictureFile.split(",")[1];

    // Convert the base64 data to a Blob object
    const blob = new Blob([Buffer.from(base64Data, "base64")], {
      type: `image/${fileType}`,
    });

    // Append the Blob object to the FormData
    formData.append("picture", blob, `picture.${fileType}`);
    formData.append("picture_ext", fileType);
  }

  const token = await getData("token");

  if (!token) {
    alert("You are not authorized");
    return;
  }

  try {
    const response = await axios.put(
      `http://localhost:8000/profiles/update`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
};
