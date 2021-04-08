import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import App from './App'; 

export default function Login(props){

    return( 
    <SafeAreaView>
    <Text>
      Wellcome to YourBank :D
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
            Authenticate using your finger print
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





    const styles = StyleSheet.create({
        container: {
          backgroundColor: "#19181f",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        },
        loginText: {
            color: "#7159c1",
            fontSize: 16,
            paddingBottom: 10,
          }
        });
}