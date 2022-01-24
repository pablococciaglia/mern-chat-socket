import moment from 'moment';

const dateTransform = (date) => {
	return moment(date).format('DD MMMM YYYY | HH:mm');
};

export default dateTransform;
