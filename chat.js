import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { View,StyleSheet,Text, TextInput, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import * as SplashScrren from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from 'expo-media-library';



SplashScrren.preventAutoHideAsync();

export default function chat(){

    // get parameter
    const item = useLocalSearchParams();
   
   

     // get parameters
     const[getchatArray,setchatArray] = useState([]);
     const[getchatText,setchatText]  = useState("");

    const [loaded,error] = useFonts(

        {
          "PlaywriteDEGrund-VariableFont_wght" : require("../assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf"),
            "EduAUVICWANTGuides-VariableFont_wght" : require("../assets/fonts/EduAUVICWANTGuides-VariableFont_wght.ttf"),
              "Lobster-Regular"  : require("../assets/fonts/Lobster-Regular.ttf"),
              "Oswald-VariableFont_wght" : require("../assets/fonts/Oswald-VariableFont_wght.ttf"),
              "LilitaOne-Regular" : require("../assets/fonts/LilitaOne-Regular.ttf"),
        
        }
     
     
       );

       useEffect(()=>{
   
        if(loaded || error){
         SplashScrren.hideAsync(); 
         
     
        }
     
     
       },[loaded,error]
     );

     // fetch chat array from server

        useEffect(
          ()=>{
           async function fetchChatArray(){

            let userJson = await AsyncStorage.getItem("user");
            let user = JSON.parse(userJson);

             let response = await fetch(process.env.EXPO_PUBLIC_URL+"/NiceChat/ChatLoad?log_user_id="+user.id+"&other_user_Id="+item.other_user_Id);
               if(response.ok){
                 let chatArray = await response.json();
                 setchatArray(chatArray);
                
               }

           }
           fetchChatArray();
           
           setInterval(() => {
            fetchChatArray();
           }, 5000);


          },[]

        );



     if(!loaded && !error){
        return null;
     }




       return(

        <LinearGradient colors={["#A1D6E2","#1995AD"]} style={stylesheet.view1}>
            <StatusBar hidden={true}/>

          <View style={stylesheet.view2}>
            <View style={item.other_user_status==1? stylesheet.view3_1:stylesheet.view3_2}>

                {
                    item.icon_Image_found == "true"
                   ?<Image style={stylesheet.image1} source={process.env.EXPO_PUBLIC_URL+"/NiceChat/IconImags/"+item.other_user_mobile+".png"} 
                    contentFit={"contain"}/>
                    : <Text style={stylesheet.text1}>{item.other_user_icon_letters}</Text>
                }
                
                
            </View>
            <View style={stylesheet.view4}>
                <Text style={stylesheet.text2}>{item.other_user_name}</Text>
                <Text style={stylesheet.text3}>{item.other_user_status==1?"Online":"Offline"}</Text>
            </View>
          </View>
         <View style={stylesheet.centerview} >

            <FlashList
              data={getchatArray}
              renderItem={
                ({item})=>

                    <View style={item.side=="right"?stylesheet.view5_1:stylesheet.view5_2}>
                    <Text style={stylesheet.text3}>{item.message}</Text>
                    
                    <View style={stylesheet.view6}>
        
                    <Text style={stylesheet.text4}>{item.datetime}</Text>
                    {
                        item.side=="right"?
                        <FontAwesome6 name={item.status == 1? "check-double":"check"} color={item.status == 1? "blue" : "red"} size={20}/>
                        :null
        
                    }
                    
        
                    </View>
                    
                  </View>

              }
              estimatedItemSize={200}
            />

          

         
          </View>

          <View style={stylesheet.view7}>
            <TextInput style={stylesheet.input1} value={getchatText} onChangeText={
              (text)=>{
                setchatText(text);
              }
            }/>
            <TouchableOpacity style={stylesheet.press1} onPress={
             async ()=>{

              if(getchatText.length==0){
               Alert.alert("Error","Please Enter Your Message");
              }else{
                let userJson = await AsyncStorage.getItem("user");
                let user = JSON.parse(userJson);
  
                 let response = await fetch(process.env.EXPO_PUBLIC_URL+"/NiceChat/ChatSend?log_user_id="+user.id+"&other_user_Id="+item.other_user_Id+"&message="+getchatText);
                  if(response.ok){
                  let json = await response.json();
  
                      if(json.success){
                          console.log("success");

                          setchatText("");
                          
                      }
  
                  }
                
              }


             

              }
            }>
            <FontAwesome6 name={"paper-plane"} color={true? "green" : "red"} size={20}/>
            </TouchableOpacity>
          </View>

        </LinearGradient>


       );


}

const stylesheet = StyleSheet.create(

  {


   view1:{
   flex:1,


   },

   view2:{
      marginTop:20,
      paddingHorizontal:20,
      flexDirection:"row",
      columnGap:15,
      justifyContent:"center",
      alignItems:"center",

   },

   view3_1:{
    backgroundColor:"white",
    width:80,
    height:80,
    borderRadius:40,
    justifyContent:"center",
    alignItems:"center",
    borderStyle:"solid",
    borderColor:"green",
    borderWidth:2,

  },

  view3_2:{
   backgroundColor:"white",
   width:80,
   height:80,
   borderRadius:40,
   justifyContent:"center",
   alignItems:"center",
   borderStyle:"solid",
   borderColor:"red",
   borderWidth:2,

 },


   image1:{
    width:70,
     height:70,
     borderRadius:32,
   },

   text1:{
     fontSize:32,
     fontFamily: "Oswald-VariableFont_wght",

   },

   view4:{
    rowGap:5,
   },

   text2:{
     fontSize:26,
     fontFamily:"LilitaOne-Regular",
   },

   text3:{
    fontSize:20,
    fontFamily: "Lobster-Regular",
  },

view5_1:{
    backgroundColor:"white",
    borderRadius:10,
    marginHorizontal:20,
    marginVertical:5,
    padding:10,
    justifyContent:"center",
    alignSelf:"flex-end",
    rowGap:5,
    borderColor:"#000000",

    


},

view5_2:{
    backgroundColor:"white",
    borderRadius:10,
   marginHorizontal:20,
    marginVertical:5,
    padding:10,
    justifyContent:"center",
    alignSelf:"flex-start",
    rowGap:5,
    borderColor:"#000000",
    


},

view6:{
    flexDirection:"row",
    columnGap:10,
},

text4:{
    fontSize:18,
    fontFamily: "Lobster-Regular",
  },

  view7:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    columnGap:10,
    paddingHorizontal:20,
    marginVertical:20,
    
  },

  input1:{
    height:45,
    borderRadius:10,
    borderStyle:"solid",
    borderWidth:1,
    fontFamily:"Oswald-VariableFont_wght",
    fontSize:20,
    flex:1,
    paddingStart:10,
    borderColor:"#000000",
   
},

press1:{
    backgroundColor:"white",
    borderRadius:20,
    padding:10,
    justifyContent:"center",
    alignContent:"center",
    borderColor:"#000000",



},

centerview:{
    flex:1,
    marginVertical:20,
   // width:'100%', 
   // height:'100%'
},

  }

);