const isURL = url => {
	const regex = /^(http(s)?|ftp):\/\/([^\s / .]+\.\S{2})\S*$/i;
	return regex.test(url);
};

const isIP = ip => {
	const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return regex.test(ip);
};

const isLatinLang = str => {
	const reg = /[А-Яа-яёЁ]/;
	return !reg.test(str);
};

const isEmail = email => {
	const reg = /^[a-z0-9!'#$%&*+ /=?^_`{|}~-]+(?:\.[a-z0-9!'#$%&*+ /=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-zA-Z]{2,}$/i;
	return reg.test(email);
};

const isJSON = json => {
	try {
		const date = JSON.parse(json);
		if (typeof date !== 'object') return false;
		return true;
	} catch (e) {
		return false;
	}
};

const isEmptyStr = str => {
	if (str === null) return true;
	return str.trim().length === 0;
};

export default {
	isURL,
	isIP,
	isLatinLang,
	isEmail,
	isJSON,
	isEmptyStr
};
