import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import colors from "@/constants/color";


export default function index(){

    
    return (
        <View style={styles.container}>
            <ActivityIndicator size={44} color={colors.green}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    }
})