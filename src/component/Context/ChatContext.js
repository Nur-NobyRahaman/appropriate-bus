import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../firebase.init";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useReducer } from "react";

export const ChatContext = createContext();



export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId: 'null',
        user: {}
    }
    console.log("🚀 ~ file: ChatContext.js:21 ~ ChatContextProvider ~ INITIAL_STATE:", INITIAL_STATE)

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser?.uid > action.payload?.uid ?
                        currentUser?.uid + action.payload?.uid :
                        action.payload?.uid + currentUser?.uid,
                };

            default: return state;

        }
    };
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )


}