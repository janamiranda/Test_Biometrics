import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Platform
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Login from './Login';

export default function App() {

  //VERIFICA SE O USUARIO

  const [isModalVisible, setIsModalVisible] = useState(true);
  //cria um state para que possa ser gerenciado o visible do modal
  //é inciado como true para que ja mostre o banner modal na inicializacao
 //jdsagfhjkagsdhjkfgkhjasdf
 //ahdfjasdhjbajsdf

  async function authenticate() {
    //transformacao em funcao asincrona pra utilizar o away(??)

    const hasPassword = await LocalAuthentication.isEnrolledAsync();
    //isEnrolledAsync() diz se o usuario tem alguma biometria salva
    //se nao tem senha salva nao ha como altenticar o usuário

    if (!hasPassword) return;
    //se nao ha senha, retorna ao inicio da funcao

    const { success, error } = await LocalAuthentication.authenticateAsync();
    //authenticateAsync() faz a leitura do senseor e avisa quando for autenticado
    //desestrutura o retorno em success e error (que sao booleans)

    if (success) {
      Alert.alert("Device authenticated");
      //nesse exemplo ele esta exibindo um banner
      //Nós iremos direcionar para outra tela

    } else {
      Alert.alert("Authentication failed. Please, insert your password!");
    }

    setIsModalVisible(false);
    //caso o usuário nao consiga fazer autenticacao com a biometria
    //o banner modal fica invisivel para que ele possa digitar uma senha
  }

  Platform.OS === "ios" && authenticate();
  //verifica se a plataforma a ser utilizada é iOS

  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
);


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#19181f",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#7159c1",
    backgroundColor: "#7159c1",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  loginText: {
    color: "#7159c1",
    fontSize: 16,
    paddingBottom: 10,
  },
  modal: {
    backgroundColor: "#333",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "40%"
  },
  cancelText: {
    color: "red",
    fontSize: 16
  },
  authText: {
    color: "white",
    fontSize: 16
  }
});
