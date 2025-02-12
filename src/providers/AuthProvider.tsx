import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData ={
    session : Session | null
    loading :boolean

}

const AuthContext = createContext<AuthData>({
    session: null,
    loading:true
});

export default function AuthProvider({children}:PropsWithChildren){
   const [session, setsession] = useState<Session | null>(null)
   const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const fetchsession = async ()=>{
          const {data, error} =  await supabase.auth.getSession()
          setsession(data.session);
          setLoading(false)
          


        }
        fetchsession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setsession(session);
          });

        
    },[])
    return <AuthContext.Provider value={{session,loading}}>{children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)