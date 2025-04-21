import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/contexts/AuthContext";
import { router } from "expo-router";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

export default function Profile(){
    const { setAuth } = useAuth();

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();
        setAuth(null);

        if (error) {
            Alert.alert('error', error.message);
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Text>Pagina Profile</Text>

            <Button
                title="Sair"
                onPress={handleSignOut}
            />
        </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})