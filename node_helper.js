/* Magic Mirror Module: MMM-NOAA-NHC helper
 * Version: 1.0.0
 *
 * By Akira Heid https://github.com/akiraheid/
 * MIT Licensed.
 */

var NodeHelper = require('node_helper')
var request = require('request')
var DOMParser = require('xmldom').DOMParser

module.exports = NodeHelper.create({

	start: function () {
		console.log('MMM-NOAA-NHC helper, started...')

		// Set up local values
		this.result = null
	},


	getData: function(payload) {

		var that = this
		this.url = payload

		request({url: this.url, method: 'GET'}, function(error, response, body) {
			// Check to see if we are error free and got an OK response
			if (!error && response.statusCode == 200) {
				var result = {}
				var doc = new DOMParser().parseFromString(body)
				var atlanticActive = false
				var pacificActive = false
				var descriptions = doc.getElementsByTagName('description')

				result.atlanticActive = that.isAreaActive(descriptions[2].textContent)
				result.pacificActive = that.isAreaActive(descriptions[3].textContent)
				that.result = result
			} else {
				// In all other cases it's some other error
			}

			that.sendSocketNotification(
					'GOT-TROPICAL-DATA', {'url': that.url, 'result': that.result})
		})
	},


	isAreaActive: function(cdata) {
		console.log(cdata)
		var doc = new DOMParser().parseFromString(cdata)
		var text = doc.getElementsByTagName('div')[1].textContent
		return text.search(/formation is not expected/) == -1
	},


	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET-TROPICAL-DATA') {
			this.getData(payload)
		}
	}

})
