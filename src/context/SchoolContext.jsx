import { useState, createContext} from "react";

export const SchoolContext = createContext(null);

const baseUrl = "https://school-manager-i86s.onrender.com/api/v1/";

export const SchoolProvider = ({children})=>{

    const [user, setUser] = useState(null);


    return(
        <SchoolContext.Provider value={{user}}>
            {children}
        </SchoolContext.Provider>
    )
}