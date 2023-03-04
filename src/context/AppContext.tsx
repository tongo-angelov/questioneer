import { createContext, useEffect, useState } from "react";

import { HiddenQuestion, Question } from "./types";
import useStorage from "../useStorage";

type ContextType = {
    isLoading: boolean,
    questions: Question[],
    hidden: HiddenQuestion[],
    hideQuestion: (id: string) => void,
    showQuestion: (id: string) => void,
};

export const AppContext = createContext<ContextType>({
    isLoading: true,
    questions: [],
    hidden: [],
    hideQuestion: () => { },
    showQuestion: () => { }
});

type AppContextProviderProps = {
    children: JSX.Element;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [hidden, setHidden] = useStorage<HiddenQuestion[]>('hidden', []);

    useEffect(() => {
        fetch("./data.json").then(res => res.json()).then(data => setQuestions(data)).then(() => setIsLoading(false));
    }, []);

    const hideQuestion = (id: string) => {
        const exists = questions.find(q => q.id === id);
        if (exists)
            setHidden((hidden: HiddenQuestion[]) => [...hidden, { id, question: exists.question }]);
    };
    const showQuestion = (id: string) => {
        setHidden((hidden: HiddenQuestion[]) => hidden.filter(q => q.id !== id));
    };

    const context = {
        isLoading,
        questions,
        hidden,
        hideQuestion,
        showQuestion,
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
};