import { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function Messages() {
    const [messages, setMessages] = useState([]);

    const { data } = useContext(ChatContext);
    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messenger);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <div className="messages">
            {messages &&
                messages.map((m) => {
                    return <Message message={m} key={m.id}></Message>;
                })}
        </div>
    );
}

export default Messages;
