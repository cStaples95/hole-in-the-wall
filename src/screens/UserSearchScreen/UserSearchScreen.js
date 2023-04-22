import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import axios from "axios";
import { color } from "react-native-reanimated";

const UserSearchScreen = () => {
  const [nameList, setNameList] = useState([]);
  const [search, setSearch] =useState("")

  useEffect(()=>{
    axios
      .get("http://127.0.0.1:8000/users/all")
      .then((response) => {
        console.log(response.data)
        setNameList(response.data)
      })}, []);
   
      
const toProfile = (username) => {
  alert('You clicked ' + username);
}

  return (
    <div className="UserSearchScreen">
      <h1>User Search</h1>
      <input type="text" placeholder="Type to search..." onChange={(e) => setSearch(e.target.value)}/>
      {nameList.filter((item) => {
        if (search===""){
          return ""
        }
        else if(item.Username.toLowerCase().includes(search.toLowerCase())){
          return item
        }
      })
        .map((item) => {
          return <div className="nameContainer" key={item.Username}> <button onClick={() => toProfile(item.Username)}>{item.Username}</button></div>
        })}
    <View style={styles.nav}>
      <BottomNavBar/>
    </View>
    </div>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 50
  },
  
  nav:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 20,
    paddingRight: 20,
  }
});

export default UserSearchScreen;
