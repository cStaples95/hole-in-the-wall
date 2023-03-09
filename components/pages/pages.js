import React from 'react'
import { View, Text, Image } from 'react-native'

const pages = () => {
    return (
        <View>
            <Text style={{fontSize:18,fontWeight:"bold",paddingVertical:10,paddingLeft:5}}>Groups</Text>
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                paddingVertical:10,
                paddingHorizontal:10
            }}>
                <Image source={require("../../assets/Sushi.jpeg")}
                style={{
                    width:30,
                    height:30,
                    borderRadius:50,
                }}
                />
                <View style={{
                    flexDirection:"column"
                }}>
                <Text>{"  "}Foodie Group Sushi</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                 <View style={{width:10,height:10,backgroundColor:"blue",marginLeft:5,borderRadius:50}}></View>
                <Text>{"  "}25 new</Text>
                </View>
                </View>
            </View>
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                paddingVertical:10,
                paddingHorizontal:10
            }}>
                <Image source={require("../../assets/Sushi.jpeg")}
                style={{
                    width:30,
                    height:30,
                    borderRadius:50,
                }}
                />
                <View style={{
                    flexDirection:"column"
                }}>
                <Text>{"  "}Foodie Group Burgers</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                 <View style={{width:10,height:10,backgroundColor:"blue",marginLeft:5,borderRadius:50}}></View>
                <Text>{"  "}12 new</Text>
                </View>
                </View>
            </View>
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                paddingVertical:10,
                paddingHorizontal:10
            }}>
                <Image source={require("../../assets/Sushi.jpeg")}
                style={{
                    width:30,
                    height:30,
                    borderRadius:50,
                }}
                />
                <View style={{
                    flexDirection:"column"
                }}>
                <Text>{"  "}Foodie Group Pizza</Text>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                 <View style={{width:10,height:10,backgroundColor:"blue",marginLeft:5,borderRadius:50}}></View>
                <Text>{"  "}70 new</Text>
                </View>
                </View>
            </View>
        </View>
    )
}

export default pages