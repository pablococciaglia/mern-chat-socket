import { useContext } from 'react';

import SidebarItem from './SidebarItem';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
	const { chatState } = useContext(ChatContext);
	const { auth } = useContext(AuthContext);
	return (
		<div className='inbox_chat'>
			{chatState.users
				.filter(({ uid }) => uid !== auth.uid)
				.map(({ name, email, online, uid }) => (
					<SidebarItem key={email} name={name} online={online} uid={uid} />
				))}

			{/* <!-- Scroll extra space --> */}
			<div className='extra_space'></div>
		</div>
	);
};

export default Sidebar;
