import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import IncomingMessages from './IncomingMessages';
import OutgoingMessages from './OutgoingMessages';
import SendMessages from './SendMessages';

const ChatboxMessages = () => {
	const { auth } = useContext(AuthContext);
	const { chatState } = useContext(ChatContext);

	return (
		<div className='mesgs'>
			<div className='msg_history' id='chatbox'>
				{chatState.messages.map((msg) =>
					msg.from !== auth.uid ? (
						<IncomingMessages key={msg._id} msg={msg} />
					) : (
						<OutgoingMessages key={msg._id} msg={msg} />
					)
				)}
			</div>
			<SendMessages />
		</div>
	);
};

export default ChatboxMessages;
