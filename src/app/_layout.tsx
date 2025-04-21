import { Stack, router } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function RootLayout() { 
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}
function MainLayout(){
  const { setAuth } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {

      if(session){
        setAuth(session.user);
        router.replace('/(painel)/profile/page');
        return;
      }

      setAuth(null);
      router.replace('/(auth)/signin/page');
    })
  }, [])

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="(auth)/signup/page" 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="(auth)/signin/page" 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="(painel)/profile/page" 
        options={{headerShown: false}} 
      />
    </Stack>
  )
}