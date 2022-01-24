import types from '../../types';

export const ChatReducer = (state, action) => {
	switch (action.type) {
		case types.GET_USER_LIST:
			return { ...state, users: [...action.payload] };

		case types.SET_USER_FOR_CHATTING:
			if (state.activeChat === action.payload) return state;
			return {
				...state,
				activeChat: action.payload,
				messages: [],
			};

		case types.NEW_MESSAGE:
			if (
				state.activeChat === action.payload.from ||
				state.activeChat === action.payload.to
			) {
				return {
					...state,
					messages: [...state.messages, action.payload],
				};
			}
			return state;

		case types.GET_HISTORY_MESSAGES:
			return {
				...state,
				messages: action.payload,
			};

		case types.CLEAN_ON_LOGOUT:
			return action.payload;

		default:
			return state;
	}
};
