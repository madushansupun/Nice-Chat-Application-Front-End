import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet,Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SplashScrren from "expo-splash-screen";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";


SplashScrren.preventAutoHideAsync();

export default function signup(){

    const[getimage,setimage] = useState(null);
    const[getmobile,setmobile] = useState("");
    const[getfirstName,setfirstName] = useState("");
    const[getlastName,setlastName] = useState("");
    const[getpassword,setpassword] = useState("");

  const [loaded,error] = useFonts(

   {
    "PlaywriteDEGrund-VariableFont_wght" : require("../assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf"),
    "EduAUVICWANTGuides-VariableFont_wght" : require("../assets/fonts/EduAUVICWANTGuides-VariableFont_wght.ttf"),
      "Lobster-Regular"  : require("../assets/fonts/Lobster-Regular.ttf"),
   }


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
   
    <LinearGradient colors={["#A1D6E2","#80ed99"]} style={stylesheet.backgroundcolor}>
      <StatusBar hidden={true}/>
    <ScrollView>

     <View style={stylesheet.view1} >

     <Image source={imagepath} contentFit={"contain"} style={stylesheet.image1}/>

     <Text style={stylesheet.text1}>Create Your Account<Pressable onPress={async()=>{
       let result =  await  ImagePicker.launchImageLibraryAsync(

       {}

       );

       if(!result.canceled){
            setimage(result.assets[0].uri);
       }

        }} style={stylesheet.mainImage}>


     <Image source={getimage} style={stylesheet.avatar} contentFit={"contain"}/>
     </Pressable></Text>

     <Text style={stylesheet.text2}>Hello!!! Welcome to Nice Chat, let's Start & enjoy Conversation.</Text>

     <Text style={stylesheet.text3}>Mobile</Text>
     <TextInput style={stylesheet.input1} inputMode="tel" placeholder="Type Your Mobile Number" cursorColor={"#2BFF00"} keyboardType={"number-pad"} maxLength={10} onChangeText={
      (text)=>{
         setmobile(text);
     }
     }/>
     
     <Text style={stylesheet.text3}>First Name</Text>
     <TextInput style={stylesheet.input1} inputMode="text" placeholder="Type Your First Name" cursorColor={"#2BFF00"} keyboardType={"default"} onChangeText={
      (text)=>{
        setfirstName(text);
     }
     }/>
     
     <Text style={stylesheet.text3}>Last Name</Text>
     <TextInput style={stylesheet.input1} inputMode="text" placeholder="Type Your Last Name" cursorColor={"#2BFF00"} keyboardType={"default"} onChangeText={
      (text)=>{
         setlastName(text);
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
            
       let formdata = new FormData();
       formdata.append("mobile",getmobile);
       formdata.append("firstname",getfirstName);
       formdata.append("lastname",getlastName);
       formdata.append("password",getpassword);

       if(getimage != null){
        
        formdata.append("iconImage",
          {
           name:"icon.png",
           type:"image/png",
           uri:getimage,
         });

       }

       


         let response = await fetch(
         
          process.env.EXPO_PUBLIC_URL+"/NiceChat/SignUp",
         {
          method:"POST",
          body:formdata,
          
         }

         );

         if(response.ok){
          let json = await response.json();
          
          if(json.success){
          // User Registration Complete
          Alert.alert("success",json.message);
          router.replace("/");

          }else{
            // Problem Occur
            Alert.alert("Error",json.message);

          }

         }

     }}>
     <FontAwesome6 name={"user-plus"} color={"white"} size={20}/>
      <Text style={stylesheet.text4}>SignUp</Text>
     </Pressable>
     

     <Pressable style={stylesheet.pressable2} onPress={()=>{
          router.replace("/");
     }}>
     <Text style={stylesheet.txt}>Are you Alredy Registered? Go to Sign In</Text>
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
      height:100,
    },

    text1:{
      fontSize:32,
      fontFamily: "EduAUVICWANTGuides-VariableFont_wght",
      fontWeight:"black",
      flexDirection:"row",
      marginStart:26,
      
      
    },

    text2:{
      fontSize:19,
      fontFamily:"Lobster-Regular",
      
    },

    mainImage:{
      width:80,
      height:80,
      borderRadius:40,
      backgroundColor:"white",
      justifyContent:"center",
      alignItems:"center",
      columnGap:10,
      
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
        fontSize:16,
      fontWeight:"black",
      fontStyle:"normal",
      
      },

      avatar:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        },

  }

);
