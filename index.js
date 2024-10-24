import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet,Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SplashScrren from "expo-splash-screen";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";


SplashScrren.preventAutoHideAsync();

 export default function index(){
  
    const[getimage,setimage] = useState(null);
    const[getmobile,setmobile] = useState("");
    const[getpassword,setpassword] = useState("");
    const [getName,setName] = useState("");

  const [loaded,error] = useFonts(

   {
    "PlaywriteDEGrund-VariableFont_wght" : require("../assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf"),
    "EduAUVICWANTGuides-VariableFont_wght" : require("../assets/fonts/EduAUVICWANTGuides-VariableFont_wght.ttf"),
      "Lobster-Regular"  : require("../assets/fonts/Lobster-Regular.ttf"),
   }


  );


useEffect(

   ()=>{
    async function userCheck() {
      
     
      try {
        let userJson = await AsyncStorage.getItem("user");
            if(userJson != null){
             ///  router.replace("/home");
            }
  
  
      } catch (e) {
        console.log(e);
        
      }
     
    }
    userCheck();


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

const imagepath = require("../assets/images/nicechat1.png");


   return(
   
    <LinearGradient colors={["#A1D6E2","#1995AD"]} style={stylesheet.backgroundcolor}>
    <StatusBar hidden={true}/>
    
    <ScrollView>

     <View style={stylesheet.view1} >

     <Image source={imagepath} contentFit={"contain"} style={stylesheet.image1}/>

     <Text style={stylesheet.text1}>Nice Chat SignIn   <View  style={stylesheet.avatar} >

       <Text style={stylesheet.text5}>{getName}</Text>
     
     </View></Text>

     <Text style={stylesheet.text2}>Hello!!! Welcome Nice Char let's Start & enjoy Conversation.</Text>

     <Text style={stylesheet.text3}>Mobile</Text>
     <TextInput style={stylesheet.input1} inputMode="tel" placeholder="Type Your Mobile Number" cursorColor={"#2BFF00"} keyboardType={"number-pad"} maxLength={10} onChangeText={
      (text)=>{
         setmobile(text);
        
         
     }
     } onEndEditing={
       async()=>{
        if(getmobile.length == 10){
         
         let response  = await fetch(process.env.EXPO_PUBLIC_URL+"/NiceChat/GetLetters?mobile="+getmobile);

        if(response.ok){
           let json = await response.json();
           setName(json.letters);
        }



         }

     }
     }/>
     
     <Text style={stylesheet.text3}>Password</Text>
     <TextInput style={stylesheet.input1} inputMode="text" placeholder="Type Your Password" cursorColor={"#2BFF00"} keyboardType={"default"} secureTextEntry={true} maxLength={20} onChangeText={
      (text)=>{
          setpassword(text);
      }
      }/>

     <Pressable style={stylesheet.pressable1} onPress=
     {async()=>{
       
         let response = await fetch(
        
          "http://192.168.8.182:8080/NiceChat/SignIn",
         {
          method:"POST",
          body:JSON.stringify(
           
            {
                mobile:getmobile,
                password:getpassword,
            }


          ),
          headers:{
            "Content-Type":"application/json"
          }
          
         }

         );

         if(response.ok){
          let json = await response.json();
          
          if(json.success){
          // User SignIn Complete
          let user = json.user;
          
          try {
              
           await AsyncStorage.setItem("user",JSON.stringify(user));
                router.replace("/home");
         
          } catch (e) {
            Alert.alert("Error","Unable to Process Request");
            
          }

          }else{
            // Problem Occur
            Alert.alert("Error",json.message);

          }

         }

     }
     }>
     <FontAwesome6 name={"right-to-bracket"} color={"white"} size={20}/>
      <Text style={stylesheet.text4}>SignIn</Text>
     </Pressable>
     

     <Pressable style={stylesheet.pressable2} onPress={()=>{
           router.replace("/signup");
     }}>
     <Text style={stylesheet.txt}> Create Account</Text>
     </Pressable>

     </View>

      
    </ScrollView>






    </LinearGradient>





   );
   

}




const stylesheet = StyleSheet.create(

  {
    backgroundcolor:{
      flex:1,
      justifyContent:"center",
    },

    view1:{
      flex:1,
      paddingHorizontal:15,
      paddingVertical:38,
      rowGap:10,

    },


    image1:{
      width:"100%",
      height:120,
      
    },

    text1:{
      fontSize:32,
      fontFamily: "EduAUVICWANTGuides-VariableFont_wght",
      fontWeight:"black",
      flexDirection:"row",
      marginStart:27,
      rowGapGap:35,
      
      
    },

    text2:{
      fontSize:20,
      fontFamily:"Lobster-Regular",
      
    },

    avatar:{
      width:80,
      height:80,
      borderRadius:40,
      backgroundColor:"white",
      justifyContent:"center",
      alignItems:"center",
      
      
      
      },

      text3:{
        fontSize:17,
        fontFamily:"PlaywriteDEGrund-VariableFont_wght",
        color:"black",
       
      },

      input1:{
        width:"100%",
        height:52,
        borderWidth:2,
        borderStyle:"solid",
        borderRadius:16,
        paddingStart:10,
        fontSize:19,
        fontFamily:"PlaywriteDEGrund-VariableFont_wght",
        borderColor:"black",
        
      },

      pressable1:{
       height:50,
       justifyContent:"center",
       alignItems:"center",
       borderRadius:15,
       marginTop:7,
       flexDirection:"row",
       columnGap:14,
       backgroundColor:"#333300",
       borderColor:"black",
      },

      text4:{
        fontSize:16,
        fontFamily:"PlaywriteDEGrund-VariableFont_wght",
        color:"white",

      },

      pressable2:{
        height:18,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        marginTop:10,
      },

      txt:{
        fontSize:17,
      fontWeight:"black",
      },

      text5:{
        fontSize:35,
        fontFamily:  "Lobster-Regular"  ,
        fontWeight:"black",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        
        
        
      },

  }

);
