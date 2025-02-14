import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData ={
    session : Session | null
    loading :boolean
    profile :null
    isAdmin: boolean

}

const AuthContext = createContext<AuthData>({
    session: null,
    loading:true,
    profile:null,
    isAdmin:false
});

export default function AuthProvider({children}:PropsWithChildren){
   const [session, setsession] = useState<Session | null>(null)
   const [loading,setLoading] = useState(true)
   const [profile,setProfile] = useState(null)
    useEffect(()=>{
        const fetchsession = async ()=>{
          const {data:{session}} =  await supabase.auth.getSession()
          setsession(session);


          if (session) {
            // fetch profile
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            setProfile(data || null);
          }
          setLoading(false)

          


        }
        fetchsession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setsession(session);
          });

        
    },[])
console.log(profile);


    return <AuthContext.Provider value={{session,loading,profile,isAdmin: profile?.group === 'ADMIN'}}>{children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)