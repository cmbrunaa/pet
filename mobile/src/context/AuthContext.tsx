import React,
{
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  saveToken,
  getToken,
  removeToken
} from "../services/storage";

type AuthContextType = {

  userToken: string | null;

  loading: boolean;

  login: (
    email: string,
    senha: string
  ) => Promise<void>;

  logout: () => Promise<void>;

};

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

type Props = {

  children: React.ReactNode;

};

export function AuthProvider({
  children
}: Props) {

  const [userToken,setUserToken] =
    useState<string | null>(null);

  const [loading,setLoading] =
    useState(true);

  // ===============================
  // CARREGAR TOKEN
  // ===============================

  useEffect(()=>{

    async function loadToken(){

      try{

        const token =
          await getToken();

        if(token){

          setUserToken(token);

        }

      }catch(error){

        console.log(
          "Erro ao carregar token:",
          error
        );

      }finally{

        setLoading(false);

      }

    }

    loadToken();

  },[]);

  // ===============================
  // LOGIN
  // ===============================

  async function login(
    email:string,
    senha:string
  ){

    try{

      const response =
        await api.post(
          "/api/login",
          {
            email,
            senha
          }
        );

      const token =
        response.data?.token;

      if(!token){

        throw new Error(
          "Token não recebido"
        );

      }

      await saveToken(token);

      setUserToken(token);

    }catch(error:any){

      console.log(
        "Erro login:",
        error?.response?.data || error
      );

      throw error;

    }

  }

  // ===============================
  // LOGOUT
  // ===============================

  async function logout(){

    await removeToken();

    setUserToken(null);

  }

  return(

    <AuthContext.Provider
      value={{
        userToken,
        loading,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth(){

  return useContext(AuthContext);

}