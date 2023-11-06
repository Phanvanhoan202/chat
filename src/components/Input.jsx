import { useContext, useState } from 'react';
import Attach from '../images/attach.png';
import Img from '../images/img.png';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Input() {
    const [text, setText] = useState('');
    const [img, setImg] = useState('');
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'chats', data.chatId), {
                        messenger: arrayUnion({
                            id: uuid(),
                            text,
                            senderID: currentUser.uid,
                            date: Timestamp.now(),
                            image: downloadURL,
                        }),
                    });
                });
            });
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messenger: arrayUnion({
                    id: uuid(),
                    text,
                    senderID: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessenger']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessenger']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });
        setText('');
        setImg('');
    };
    return (
        <div className="input">
            <input type="text" value={text} placeholder="Type something..." onChange={(e) => setText(e.target.value)} />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Input;
