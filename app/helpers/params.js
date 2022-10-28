

let getParam = (params, property, defaultValue ) => {
    if(params.hasOwnProperty(property) && params[property] !== undefined && params[property] !== 'site.webmanifest'){
		return params[property];
	}

	return defaultValue;
}

module.exports = {
    getParam
}