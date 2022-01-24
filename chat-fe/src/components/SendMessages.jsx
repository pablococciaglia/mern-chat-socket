import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';

const SendMessages = () => {
	const { socket } = useContext(SocketContext);
	const { auth } = useContext(AuthContext);
	const { chatState } = useContext(ChatContext);
	const [message, setMessage] = useState('');
	const onChange = ({ target }) => {
		setMessage(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (message.length === 0) return;

		// Emit a socket event to send the message
		socket.emit('personal-message', {
			from: auth.uid,
			to: chatState.activeChat,
			message,
		});

		// Clean the textbox
		setMessage('');
	};

	return (
		<form onSubmit={onSubmit}>
			<div className='type_msg row'>
				<div className='input_msg_write col-sm-9'>
					<input
						type='text'
						className='write_msg'
						placeholder='Write a message'
						value={message}
						onChange={onChange}
					/>
				</div>
				<div className='col-sm-3 text-center'>
					<button className='msg_send_btn mt-3' type='submit'>
						send
					</button>
				</div>
			</div>
		</form>
	);
};

export default SendMessages;
