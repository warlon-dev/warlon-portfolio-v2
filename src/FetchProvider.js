import { createContext, useContext, useState } from "react";

const FetchContext = createContext({
    isExperiencesComplete: false,
    isProjectsComplete: false,
    isSkillsComplete: false,
});

export function useFetchContext() {
    return useContext(FetchContext);
}

export function FetchProvider({ children }) {
    const [isExperiencesComplete, setIsExperiencesComplete] = useState(false);
    const [isProjectsComplete, setIsProjectsComplete] = useState(false);
    const [isSkillsComplete, setIsSkillsComplete] = useState(false);

    return (
        <FetchContext.Provider 
            value={{ 
                isExperiencesComplete,
                setIsExperiencesComplete,
                isSkillsComplete,
                setIsSkillsComplete,
                isProjectsComplete,
                setIsProjectsComplete,
            }}
        >
            {children}
        </FetchContext.Provider>
    )
}
