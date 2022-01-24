import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/chat/ChatContext';
import { fetchWToken } from '../helpers/fetchRequest';
import { scrollToBottom } from '../helpers/scrollToBottom';
import types from '../types';

const SidebarItem = ({ name, online, uid }) => {
	const { chatState, dispatch } = useContext(ChatContext);
	const [showOnline, setOnline] = useState(false);
	useEffect(() => {
		setOnline(online);
	}, [online]);

	const onClick = async () => {
		dispatch({
			type: types.SET_USER_FOR_CHATTING,
			payload: uid,
		});

		// Get the messages from a chat
		if (chatState.activeChat !== uid) {
			const resp = await fetchWToken(`messages/${uid}`);
			dispatch({
				type: types.GET_HISTORY_MESSAGES,
				payload: resp.messages,
			});
			scrollToBottom('chatbox');
		}
	};

	return (
		<div
			className={`chat_list ${uid === chatState.activeChat && 'active_chat'}`}
			onClick={onClick}
		>
			<div className='chat_people'>
				<div className='chat_img'>
					<img
						src='https://ptetutorials.com/images/user-profile.png'
						alt='sunil'
					/>
				</div>
				<div className='chat_ib'>
					<h5>{name}</h5>
					{showOnline ? (
						<span className='text-success'>Online</span>
					) : (
						<span className='text-danger'>Offline</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default SidebarItem;
