module.exports = {
	parse: function(str) {
	    var args = [].slice.call(arguments, 1),
	        i = 0;

	    return str.replace(/%s/g, function() { return args[i++];});
	},
	sleep: function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
};