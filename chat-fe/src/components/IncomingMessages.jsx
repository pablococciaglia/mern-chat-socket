import dateTransform from '../helpers/dateTransform';

const IncomingMessages = ({ msg }) => {
	return (
		<div className='incoming_msg'>
			<div className='incoming_msg_img'>
				<img
					src='https://ptetutorials.com/images/user-profile.png'
					alt='sunil'
				/>
			</div>
			<div className='received_msg'>
				<div className='received_withd_msg'>
					<p>{msg.message}</p>
					<span className='time_date'>{dateTransform(msg.createdAt)}</span>
				</div>
			</div>
		</div>
	);
};

export default IncomingMessages;
