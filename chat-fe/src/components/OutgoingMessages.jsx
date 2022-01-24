import dateTransform from '../helpers/dateTransform';

const OutgoingMessages = ({ msg }) => {
	return (
		<div className='outgoing_msg'>
			<div className='sent_msg'>
				<p>{msg.message}</p>
				<span className='time_date'>{dateTransform(msg.createdAt)}</span>
			</div>
		</div>
	);
};

export default OutgoingMessages;
