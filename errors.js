const createErr = (key, label) => fieldId => ({fieldId, key, label});

const errKeys = {
	empty: 1,
	invalidLang: 2,
	invalidJson: 3,
	invalidUrl: 4,
	invalidIP: 5,
	invalidNumber: 6,
	maxLength: 7,
	invalidEmail: 8
};

const get = {
	isEmpty: createErr(errKeys.empty, 'Field must be filled!'),
	isInvalidLang: createErr(errKeys.invalidLang, 'Only Latin characters allowed!'),
	isInvalidJson: createErr(errKeys.invalidJson, 'Is invalid json!'),
	isInvalidUrl: createErr(errKeys.invalidUrl, 'Invalid url!'),
	isInvalidIP: createErr(errKeys.invalidIP, 'Invalid address: You must enter a valid IPv4 address!'),
	isNaN: createErr(errKeys.invalidNumber, 'Invalid value! \n The value can only be a number!'),
	isInvalidMaxLn: (max, id) => createErr(errKeys.maxLength, `Invalid value! \n Value cannot contain more than ${max} characters.`)(id),
	isInvalidEmail: createErr(errKeys.invalidEmail, 'Invalid email address!')
};

const add = (errList, fieldId, errorTemplate) => {
	if (errList.some(err => err.key === errorTemplate.key && err.id === fieldId)) return errList;
	return [...errList, errorTemplate];
};

const remove = (errList, fieldId, errorTemplate) => errList.filter(err => {
	if (err.id === fieldId) {
		return err.key !== errorTemplate.key;
	}
	return true;
});

const dataHandler = (errlist, key, err, condition) => {
	if (condition) {
		return add(errlist, key, err); /* add new error */
	}
	return remove(errlist, key, err); /* remove old error */
};

export default {
	get,
	dataHandler
};
