import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'


const NavbarTab = ({navigation}) => {
    return (
        <View>
            <View style={{
                flexDirection:"row",
                justifyContent:"space-around",
                borderBottomColor:"#05050538",
                borderBottomWidth:1
            }}>    
               {/* Home */}
                   <TouchableOpacity onPress={() => navigation.push("HomeScreen")}>
                         <Image source={require("../../assets/Home.png")} 
                         style={{
                             width:30,
                             height:30,
                             resizeMode:"contain"
                         }}
                         />
                    </TouchableOpacity>
                    {/* Friends */}
                    <TouchableOpacity onPress={() => navigation.push("FriendScreen")}>
                         <Image source={require("../../assets/Friends.png")} 
                         style={{
                             width:30,
                             height:30,
                             resizeMode:"contain"
                         }}
                         />
                    </TouchableOpacity>
                    {/* Messages */}
                    <TouchableOpacity onPress={() => navigation.push("MessagesScreen")}>
                         <Image source={require("../../assets/Messages.jpg")} 
                         style={{
                             width:35,
                             height:35,
                             resizeMode:"contain"
                         }}
                         />
                    </TouchableOpacity>
                    {/* Notifications */}
                    <TouchableOpacity onPress={() => navigation.push("NotificationsScreen")}>
                         <Image source={require("../../assets/Bell.png")} 
                         style={{
                             width:30,
                             height:30,
                             resizeMode:"contain"
                         }}
                         />
                    </TouchableOpacity>
                    {/* Pages */}
                    <TouchableOpacity onPress={() => navigation.push("PagesScreen")}>
                         <Image source={require("../../assets/Pages.png")} 
                         style={{
                             width:30,
                             height:30,
                             resizeMode:"contain"
                         }}
                         />
                    </TouchableOpacity>

            </View>
        </View>
    )
}

export default NavbarTab