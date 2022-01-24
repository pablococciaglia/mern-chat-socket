import { useContext } from 'react';
import ChatboxMessages from '../components/ChatboxMessages';
import InboxPeople from '../components/InboxPeople';
import SelectAChat from '../components/SelectAChat';
import { ChatContext } from '../context/chat/ChatContext';
import '../css/chat.css';

const ChatPage = () => {
	const { chatState } = useContext(ChatContext);

	return (
		<div className='messaging'>
			<div className='inbox_msg'>
				<InboxPeople />
				{chatState.activeChat ? <ChatboxMessages /> : <SelectAChat />}
			</div>
		</div>
	);
};

export default ChatPage;
