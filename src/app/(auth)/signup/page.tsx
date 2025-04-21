import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
  } from "react-native";
  import colors from "@/constants/color";
  import { router } from "expo-router";
  import { Ionicons } from "@expo/vector-icons";
  import { useState } from "react";
  import { supabase } from "@/lib/supabase";
  
  export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    async function handleSignUp() {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        }
      });

      if (error) {
        Alert.alert("Erro", error.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      router.replace("/(auth)/signin/page")
    }
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                  >
                    <Ionicons name="arrow-back" size={24} color={colors.white} />
                  </Pressable>
                  <Text style={styles.logoText}>
                    App<Text style={{ color: colors.green }}>Auth</Text>
                  </Text>
  
                  <Text style={styles.sloganText}>Criar uma conta</Text>
                </View>
  
                <View style={styles.form}>
                  <View>
                    <Text style={styles.label}>Nome completo</Text>
                    <TextInput
                      placeholder="Nome completo..."
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                  <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      placeholder="Digite seu email..."
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                  <View>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                      placeholder="Digite sua senha..."
                      secureTextEntry={true}
                      style={styles.input}
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>
  
                  <Pressable style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>
                      {loading ? "Carregando..." : "Cadastrar"}
                    </Text>
                  </Pressable>
                </View>
              </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
  

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.zinc,
    },
    header: {
       
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    sloganText: {
        fontSize: 16,
        color: colors.white,
        marginBottom: 34,
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14,
    },
    label: {
        color: colors.zinc,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
    },
    button: {
        backgroundColor: colors.green,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: '100%',
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    }
})