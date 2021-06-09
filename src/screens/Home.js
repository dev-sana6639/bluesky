import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Input from '../containers/input/Input'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import image from '../asset/home_background_image.jpg';
import { getwether } from '../modules/Api/services'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Home = () => {
    const [city, setCity] = useState('');
    const [cityError, setcityError] = useState('');
    const [loading,setloading] = useState(false)
    const [data, setData] = useState(null);
    const [banglore, setbanglore] = useState('');
    const [mumbai, setmumbai] = useState('');
    const [Hydarabad, setHydarabad] = useState('');
    const [wrongcity,setwrongcity] = useState('');

    const handleinput = (value) => {
        setcityError('')
        setCity(value);
    }

    const handlesearch = async () => {
        setcityError('')
        if (city != '') {
            setloading(true)
            const data = await getwether(city);
            if(data.cod == 200){
            setData(data);
            } else {
                setData(null)
                setwrongcity('wrong city')
            }
        } else {
            setwrongcity('enter city')
        }
    }

 
   
    console.log(data)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <ImageBackground source={image} style={styles.image}>
                <View style={styles.Searchbar}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name={'search1'} size={20} color={'#080808'} />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <Input

                            value={city}
                            placeholder={"Enter a City Name"}
                            onChangeText={handleinput}

                            height={40}
                            color={"#080808"}
                            backgroundColor={"#CED5DA"}
                            borderRadius={10}
                            placeholderTextColor={"#848586"}
                            selectionColor={"#848586"}


                        />
                    </View>
                    <View style={{ marginLeft: 10, borderWidth: 1, padding: 5, borderRadius: 10 }}>
                        <TouchableOpacity onPress={handlesearch}>
                            <Text>Go</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>


                </View>
                <Text style={{ width: '80%', alignSelf: 'center' }}>

                    {
                        cityError && (

                            <Text style={{ color: 'red' }}>*{cityError}</Text>

                        )
                    }
                </Text>

                <View style={{ width: '70%', alignSelf: 'center' }}>
                    {
                       data != null &&  data.cod == 200 ? (


                            <View style={styles.card}>
                                <View style={styles.location}>
                                    <View>
                                     <Text style={{fontWeight:'bold',marginLeft:10}}>{data.name}</Text>
                                     </View>
                                     <View>
                                         {/* <Text>coordinat's are: {data.coord.lat} and {data.coord.lon}</Text> */}
                                         </View>
                                     
                                </View>

                                <View style={{marginTop:20}}>
                                    <View style={{marginLeft:10}}>
                                         <Text><Text style={{fontWeight:'bold'}}>humidity:</Text>  {data.main.humidity}</Text>
                                         <Text><Text style={{fontWeight:'bold'}}>pressure:</Text>  {data.main.pressure}</Text>
                                         <Text><Text style={{fontWeight:'bold'}}>Temperature:</Text>  {data.main.temp}</Text>
                                         <Text><Text style={{fontWeight:'bold'}}>Max Temperature:</Text>  {data.main.temp_max}</Text>
                                         <Text><Text style={{fontWeight:'bold'}}>Min Temperature :</Text>  {data.main.temp_min}</Text>
                                   </View>

                                   <View  style={{marginLeft:10,marginTop:10}}> 
                                       
                                       <Text><Text style={{fontWeight:'bold'}}>Sun Rise:</Text>  {data.sys.sunrise}</Text>

                                         <Text><Text style={{fontWeight:'bold'}}>sun Set:</Text>  {data.sys.sunset}</Text>

                                         <Text><Text style={{fontWeight:'bold'}}>Visibility:</Text>  {data.visibility}</Text>

                                       </View>

                                       <View style={{marginTop:20,marginLeft:10}}> 
                                           <Text style={{fontWeight:'bold'}}>Wind</Text>
                                           <Text><Text style={{fontWeight:'bold'}}>wind Temp:</Text> {data.wind.deg}</Text>
                                           <Text><Text style={{fontWeight:'bold'}}>Speed:</Text> {data.wind.speed}</Text>
                                           <Text><Text style={{fontWeight:'bold'}}>Gust:</Text> {data.wind.gust}</Text>
                                           </View>
                                </View>
                            </View>
                        )
                        :
                        (
                            <View>
                                
                                <Text style={{fontSize:30}}>Weather Forecast</Text>
                              <Text> {
                                   wrongcity !='' && (
                                       <Text style={{color:'red'}}>***{wrongcity}</Text>
                                   )
                               }
                               </Text>

                               <Text>as i am using free API, so it has few  request Limit</Text>
                                
                            </View>
                        )
                    }
                </View>


                <View style={{ marginBottom: 50 }} />
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
   
    },
    Searchbar: {
        width: '70%',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height:'100%',
        width: '100%',
    },
    card:{
       
        shadowColor:'black',
        backgroundColor:'white',
        borderRadius:10,
        justifyContent:'center'

    },
    location:{
     
    },
})
export default Home;