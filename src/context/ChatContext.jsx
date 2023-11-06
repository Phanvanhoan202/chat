import { createContext, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId: 'null',
        user: {},
        showChat: false,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                state = {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                    showChat: action.showChat,
                };
                return state;
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    console.log(state);

    return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};
