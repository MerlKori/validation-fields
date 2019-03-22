const errTypes = {
	empty: 1,
	invalidUrl: 2,
	invalidIP: 3,
	range: 4,
	maxCharacters: 5,
	isNan: 6,
	invalidLang: 7,
	isDomainName: 8,
	isServerName: 9,
	isNotDomainName: 10
};

/* Private methods */
const _createError = (key, type, msg) => ({key, type, msg});

const _removeError = (arr, el) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].key === el.key && arr[i].type === el.type) {
			arr.splice(i, 1);
			break;
		}
	}
};

const _addError = (list, el) => {
	if (list.some(i => i.key === el.key && i.type === el.type)) return;
	list.push(el);
};

const _addOrRemoveError = (errList, err, status) => {
	if (status) {
		_addError(errList, err);
	} else {
		_removeError(errList, err);
	}
};

/* Checks */
const checkOnEmpty = (errList, key, value) => {
	const err = _createError(key, errTypes.empty, 'Field must be filled!');
	const check = _addOrRemoveError.bind(null, errList, err);

	if (typeof value === 'string') {
		check(value.trim().length === 0);
	} else if (value === null || value === undefined) {
		check(true);
	} else {
		check(false);
	}
};

const isURL = (errList, key, url) => {
	const err = _createError(key, errTypes.invalidUrl, 'Invalid url!');
	if (url.length === 0) {
		_removeError(errList, err);
		return;
	}
	const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
	_addOrRemoveError(errList, err, !regex.test(url));
};

const isIP = (errList, key, ip) => {
	const err = _createError(key, errTypes.invalidIP, 'Invalid address: You must enter a valid IPv4 address.');
	if (ip.length === 0) {
		_removeError(errList, err);
		return;
	}
	const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	_addOrRemoveError(errList, err, !regex.test(ip));
};

const inRange = (errList, key, number, options) => {
	const min = (!options || !options.min) ? 0 : options.min;
	const max = (!options || !options.max) ? 1000000 : options.max;
	const msg = `Invalid value! \n Value cannot be more than ${max} and less than ${min}`;
	const err = _createError(key, errTypes.range, msg);
	_addOrRemoveError(errList, err, !(min <= number && max >= number));
};

const isStrMaxLength = (errList, key, str, options) => {
	if (typeof str !== 'string') return false;

	const max = (!options || !options.max) ? 30 : options.max;
	const msg = `Invalid value! \n Value cannot contain more than ${max} characters.`;
	const err = _createError(key, errTypes.maxCharacters, msg);
	const ln = str.trim().length;
	_addOrRemoveError(errList, err, !(ln >= 0 && ln <= max));
};

const isNumber = (errList, key, number) => {
	const msg = 'Invalid value! \n The value can only be a number.';
	const err = _createError(key, errTypes.isNan, msg);
	_addOrRemoveError(errList, err, Number.isNaN(+number));
};

const checkLang = (errList, key, valueStr) => {
	const reg = /[А-Яа-яёЁ]/;
	const msg = 'Only Latin characters allowed.';
	const err = _createError(key, errTypes.invalidLang, msg);
	_addOrRemoveError(errList, err, reg.test(valueStr));
};

const isDomainName = (errList, key, valueStr, options) => {
	const msg = 'Invalid domain name! \n Enter the domain name or use "@" to represent the domain name.';
	const err = _createError(key, errTypes.isDomainName, msg);
	const domainName = options.domainTableMultipleMode ? null : options.selectDomains[0].name;
	const reg = valueStr.includes(domainName) ? new RegExp(` *${domainName}$`) : /^@$/;

	_addOrRemoveError(errList, err, !reg.test(valueStr));
};

const isServerName = (errList, key, valueStr) => {
	const msg = 'Invalid server name! \n Enter the server name or use "@" to represent the server name.';
	const err = _createError(key, errTypes.isServerName, msg);
	const regEunam = /^@$/;
	const regName = /[a-z-A-Z]\.[a-z-A-Z]/;

	_addOrRemoveError(errList, err, !(regEunam.test(valueStr) || regName.test(valueStr)));
};

const isNotDomainName = (errList, key, valueStr, options) => {
	const msg = 'CNAME content cannot reference itself.';
	const err = _createError(key, errTypes.isNotDomainName, msg);
	const domainName = options.domainTableMultipleMode ? null : options.selectDomains[0].name;
	const reg = valueStr.includes(domainName) ? new RegExp(` *${domainName}$`) : /^@$/;
	_addOrRemoveError(errList, err, reg.test(valueStr));
};

const isEmail = (errList, key, valueStr) => {
	const msg = 'Invalid email address.';
	const err = _createError(key, errTypes.isNotDomainName, msg);
	const reg = /\S+@\S+\.\S+/;
	_addOrRemoveError(errList, err, !reg.test(valueStr));
};

export default {
	checkOnEmpty,
	isURL,
	isIP,
	inRange,
	isStrMaxLength,
	isNumber,
	checkLang,
	isDomainName,
	isServerName,
	isNotDomainName,
	isEmail
};
