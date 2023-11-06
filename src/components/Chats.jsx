import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Chats() {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unSub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unSub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u, showChat: true });
    };

    return (
        <div className="Chats">
            {chats &&
                Object.entries(chats)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => {
                        return (
                            <div className={`userChat`} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                                <img src={chat[1].userInfo.photoURL} alt=""></img>
                                <div className="userChatInfo">
                                    <span>{chat[1].userInfo.displayName}</span>
                                    <p className="lastMessenger">{chat[1].lastMessenger?.text}</p>
                                </div>
                            </div>
                        );
                    })}
        </div>
    );
}

export default Chats;
