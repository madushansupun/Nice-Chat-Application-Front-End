import { registerRootComponent } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { View,StyleSheet, ScrollView ,Text, Pressable, Alert} from "react-native";
import * as SplashScrren from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { router } from "expo-router";


SplashScrren.preventAutoHideAsync();

export default function home(){

  const[getchatArray,setchatArray] = useState([]);

    const [loaded,error] = useFonts(

        {
         "PlaywriteDEGrund-VariableFont_wght" : require("../assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf"),
         "EduAUVICWANTGuides-VariableFont_wght" : require("../assets/fonts/EduAUVICWANTGuides-VariableFont_wght.ttf"),
           "Lobster-Regular"  : require("../assets/fonts/Lobster-Regular.ttf"),
           "Oswald-VariableFont_wght" : require("../assets/fonts/Oswald-VariableFont_wght.ttf"),
           "LilitaOne-Regular" : require("../assets/fonts/LilitaOne-Regular.ttf"),
           "AbrilFatface-Regular" : require("../assets/fonts/AbrilFatface-Regular.ttf"),
        }
     
     
       );

       useEffect(
         ()=>{
          async function fetchData(){

            let userJson = await AsyncStorage.getItem("user");
            let user = JSON.parse(userJson);
            let response = await  fetch(process.env.EXPO_PUBLIC_URL+"/NiceChat/LoadHome?id="+user.id);

            if(response.ok){
           let json = await response.json();
                if(json.success){
                  let chatArray = json.JsonChatArray;
               
                  setchatArray(chatArray);
                  
                }
            }

          }
          fetchData();
         },[]

       );


       useEffect(()=>{
   
        if(loaded || error){
         SplashScrren.hideAsync(); 
         
     
        }
     
     
       },[loaded,error]
     );

     if(!loaded && !error){
        return null;
     }


  return(

    <LinearGradient colors={["#A1D6E2","#1995AD"]} style={stylesheet.view1}>
         <StatusBar hidden={true}/>
         <View style={stylesheet.messageView}>
          <Text style={stylesheet.messagetxt}>Message</Text>
         </View>

         <FlashList
                  data={getchatArray}

                  renderItem={
                    ({ item })=>

                    <Pressable style={stylesheet.view5} onPress={
                      ()=>{
                      
                       // router.push("/chat?other_user_Id="+item.other_user_Id);
                       router.push(
                        {
                          pathname:"/chat",
                          params:item
                        }
                       );
                      }
                    }>
                    <View style={item.other_user_status==1? stylesheet.view6_2 : stylesheet.view6_1 }>
                     { 
                     item.icon_Image_found ?
                    <Image source={process.env.EXPO_PUBLIC_URL+"/NiceChat/IconImags/"+item.other_user_mobile+".png"} contentfit="contain" style={stylesheet.image1}/>
                    :
                     <Text style={stylesheet.text7}>{item.other_user_icon_letters}</Text>
                     }

                    </View>
     
                     <View style={stylesheet.view4}>
                     <Text style={stylesheet.text6}>{item.other_user_name}</Text>
                     <Text style={stylesheet.text4} numberOfLines={1}>{item.message}</Text>
                     
                     <View style={stylesheet.view7}>
                     <Text style={stylesheet.text5}>{item.dateTime}</Text>
                     <FontAwesome6 name={ "check" } color={item.chat_status_id==1? "white" : "blue" } size={20}/>
                     
                     </View>
     
                  </View>
     
                 </Pressable>
     
            
                 
                 }
                estimatedItemSize={200}
                />

    </LinearGradient>



  );


}



const stylesheet = StyleSheet.create(

{
    view1:{
     flex:1,
     paddingVertical:70,
     paddingHorizontal:20,
    },

    

    text1:{
      fontFamily:"PlaywriteDEGrund-VariableFont_wght",
      fontSize:23,
    },

    text2:{
        fontFamily:"PlaywriteDEGrund-VariableFont_wght",
      fontSize:16,
    },

    text3:{
        fontFamily:"PlaywriteDEGrund-VariableFont_wght",
        fontSize:14,
        alignSelf:"flex-end",
    },

    view4:{
        flex:1,
    },

    view5:{
        flexDirection:"row",
        marginVertical:10,
        columnGap:20,
    },

    view6_1:{
       width:80,
       height:80,
       borderRadius:40,
       backgroundColor:"white",
       borderStyle:"solid",
       borderWidth:5,
       borderColor:"red",
       justifyContent:"center",
       alignItems:"center",
    },

    view6_2:{
      width:80,
      height:80,
      borderRadius:40,
      backgroundColor:"white",
      borderStyle:"dotted",
      borderWidth:5,
      borderColor:"green",
      justifyContent:"center",
      alignItems:"center",
   },

    text4:{
        fontFamily:"PlaywriteDEGrund-VariableFont_wght",
        fontSize:20,
    },

    text5:{
        fontFamily:"PlaywriteDEGrund-VariableFont_wght",
        fontSize:14,
        
    },

    scrollerview1:{
      marginTop:10,
    },

    view7:{
        flexDirection:"row",
        columnGap:10,
        alignSelf:"flex-end",
        alignItems:"center",
    },

    text6:{
        fontFamily:"LilitaOne-Regular",
        fontSize:23,
      },

      text7:{
        fontFamily:"Lobster-Regular",  // "Lobster-Regular" //"Oswald-VariableFont_wght"
        fontSize:28,

      },

      image1:{
      width:70,
      height:70,
      borderRadius:35,
      backgroundColor:"white",
      justifyContent:"center",
      alignItems:"center",
      columnGap:10,
      },

      messageView:{
        justifyContent:"center",
        alignItems:"center",
       
      },

      messagetxt:{
       fontSize:40,
       fontFamily: "EduAUVICWANTGuides-VariableFont_wght",
       columnGap:15,
       marginBottom:30,
       

       
       
       
      
       

       

      },

}

);