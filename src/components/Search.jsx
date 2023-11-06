import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

function Search() {
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', userName));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setUser(doc.data());
            });
        } catch (error) {
            setError(true);
        }
    };
    useEffect(() => {
        if (!userName) {
            setUser(null);
        }
    }, [userName]);

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();
    };

    const handlSelect = async () => {
        const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        const res = await getDoc(doc(db, 'chats', combinedID));

        if (!res.exists()) {
            // create a chats in chats collection
            await setDoc(doc(db, 'chats', combinedID), { messenger: [] });

            await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [combinedID + '.userInfo']: {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                },
                [combinedID + '.date']: serverTimestamp(),
            });

            await updateDoc(doc(db, 'userChats', user.uid), {
                [combinedID + '.userInfo']: {
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid,
                },
                [combinedID + '.date']: serverTimestamp(),
            });

            dispatch({
                type: 'CHANGE_USER',
                payload: user,
                showChat: 'true',
            });
        }

        setUserName('');
        setUser(null);
    };
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    value={userName}
                    type="text"
                    placeholder="Find a user"
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKey}
                />
            </div>
            {error && <span>User not found</span>}
            {user && (
                <div className="userChat" onClick={handlSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
