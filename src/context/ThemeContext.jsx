import { createContext , useContext, useState, useEffect} from "react"

const ThemeContext = createContext();

export const useTheme = () => {
    const conext = useContext(ThemeContext);
    if(!conext) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return conext;
}

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        if(isDarkTheme){
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [isDarkTheme]);

    const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    }

    return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>        
    )
}


