import { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse, User } from "../type/type";
import { AccessTokenResponse } from "../type/type";
import APIURL from "./APIURL";

interface AuthProviderProps{
    children:React.ReactNode
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: ()=> {},
    saveUser: (userData: AuthResponse)=>{}
})
export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState<string>('');
    const [refreshToken, setRefreshToken] = useState<string>('');
    const [user, setUser] = useState<User>();


    useEffect(()=>{
        checkAuth();
    },[])

    async function requestNewAccessToken(refreshToken:string){
        try{
            console.log(`${APIURL}/refreshtoken`)
            const response = await fetch(`${APIURL}/refreshtoken`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });
            
            if(response.ok){
                const data = await response.json() as AccessTokenResponse;
                if(data.error){
                    throw new Error(data.error);
                }
                return data.body.accessToken;
            } else {
                throw new Error(response.statusText)
            }

        }catch(err){
            console.log(err);
            return null
        }
    }

    async function getUserInfo(accessToken:string) {
        try{
            const response = await fetch(`${APIURL}/user`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Autorization': `Bearer ${accessToken}`
                },
            });

            if(response.ok){
                const data = await response.json();
                if(data.error){
                    throw new Error(data.error);
                }
                return data;
            } else {
                throw new Error(response.statusText)
            }

        }catch(err){
            console.log(err);
            return null
        }
    }

    async function checkAuth(){
        if(accessToken){
            
        } else {
            const token = await getRefreshToken();
            if(token){
                const newAccessToken = await requestNewAccessToken(token);
                if(newAccessToken){
                    const userInfo = await getUserInfo(newAccessToken);
                    if(userInfo){
                        /* setAccessToken(accessToken);
                        //setRefreshToken(refreshToken);

                        setUser(userInfo);
                        localStorage.setItem('token', JSON.stringify(token));
                        setIsAuthenticated(true); */
                        saveSessionInfo(
                            userInfo,
                            newAccessToken,
                            token
                        );
                        
                    }
                }
            }
        }
    }

    function saveSessionInfo(userInfo:User, accessToken:string, refreshToken:string){
        setAccessToken(accessToken);
        localStorage.setItem('token', refreshToken);
        setIsAuthenticated(true);
        setUser(userInfo);
    }

    function getRefreshToken():string | null{
        const tokenData = localStorage.getItem('token');
        if(tokenData){
            /* const token = JSON.parse(tokenData); */
            return tokenData
        }
        return null
    }

    const getAccessToken = ():string =>{
        return accessToken;
    }

    function saveUser(userData: AuthResponse){
        saveSessionInfo(
            userData.body.user,
            userData.body.accessToken,
            userData.body.refreshToken
        );
        /* setAccessToken(userData.body.accessToken);
        setRefreshToken(userData.body.refreshToken);

        setUser(userData.body.user);
        localStorage.setItem('token', JSON.stringify(userData.body.refreshToken));
        setIsAuthenticated(true); */
    }
    return <AuthContext.Provider value={{isAuthenticated, getAccessToken, saveUser}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)