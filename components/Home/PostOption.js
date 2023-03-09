import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const PostOption = () => {
    return (
        <View 
        style={{
            paddingHorizontal:10
        }}
        >

            <View
            style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-around"
            }}
            >
                <View>
                    <TouchableOpacity>
                    <Image source={require("../../assets/Persona.png")} 
                    style={{
                        width:40,
                        height:40,
                        borderRadius:50,
                    }}
                     />
                   </TouchableOpacity>
                </View>
                  <View style={{
                      justifyContent:"flex-start"
                }}>
                      <TouchableOpacity>
                      <Image source={require("../../assets/Placeholder.jpeg")}
                       style={{
                           width:300,
                           height:40,
                           resizeMode:"contain"
                       }}
                      />
                      </TouchableOpacity>
                  </View>
                  <View>
                      <TouchableOpacity>
                      <Image source={require("../../assets/photo.jpg")} 
                      style={{
                          height:50,
                          width:50,
                          resizeMode:"contain"
                      }}
                      />
                      </TouchableOpacity>
                  </View>
            </View>

            <View style={{
                marginTop: -20
            }}>
                <TouchableOpacity>
                <Image source={require("../../assets/activity.jpg")} 
                 style={{
                     width:"100%",
                     resizeMode:"contain"
                 }}
                />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostOption;