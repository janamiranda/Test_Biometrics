import React from "react";
import { View, Text, Button } from "react-native";

export default function Home(props){

    console.log(props);
    return (
    
    <View>
        <Text>Esse eh o componente Home</Text>
        <Button title='Ir para Login' onPress={()=>props.navigation.navigate('Login',)}></Button>
    </View>
    
    );
}