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

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  //cria um state para que possa ser gerenciado o visible do modal
  //é inciado como true para que ja mostre o banner modal na inicializacao
 //jdsagfhjkagsdhjkfgkhjasdf
 //ahdfjasdhjbajsdf
 //Deuzito

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginText}
        >Wellcome to YourBank :D
      </Text>
      <Text style={styles.loginText}
        >Press the button to log in</Text>
      <TouchableOpacity style={styles.button}//no toque do botao autenticar, é feito a leitura
        onPress={() => {
          authenticate();
        }}
      >
        <Text>Authenticate</Text>
      </TouchableOpacity>

      
      {Platform.OS === "android" && (
      //esse modal so é exibito nos dispositivos android
      //pra isso é necessrio fazer a verificacao
      
        <Modal
          animationType="slide"
          transparent={true}//pra que o modal nao cubra a tela de branco
          visible={isModalVisible}//definida baseada no state do react
          onShow={authenticate}//chama a funcao autenticacao
        >
          <View style={styles.modal}>
            <Text style={styles.authText}>
              Authemticate using your finger print
            </Text>
            <TouchableOpacity
              onPress={() => {
                LocalAuthentication.cancelAuthenticate();//cancela a autenticacao pelo usuário
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
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
