/* Magic Mirror Module: MMM-NOAA-NHC helper
 * Version: 1.0.0
 *
 * By Akira Heid https://github.com/akiraheid/
 * MIT Licensed.
 */

const NodeHelper = require('node_helper')
const request = require('request')
const DOMParser = require('xmldom').DOMParser

module.exports = NodeHelper.create({

	start: function () {
		// Set up local values
		this.result = null
	},


	getData: function(payload) {
		const that = this
		this.url = payload

		request({url: this.url, method: 'GET'}, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				const result = {}
				const doc = new DOMParser().parseFromString(body)
				const descriptions = doc.getElementsByTagName('description')

				result.atlanticActive = that.isAreaActive(descriptions[2].textContent)
				result.pacificActive = that.isAreaActive(descriptions[3].textContent)
				that.result = result
			}

			that.sendSocketNotification(
				'GOT-TROPICAL-DATA', {'url': that.url, 'result': that.result})
		})
	},


	isAreaActive: function(cdata) {
		// Parse CDATA text and determine if there is activity
		const doc = new DOMParser().parseFromString(cdata)
		const text = doc.getElementsByTagName('div')[1].textContent
		return text.search(/formation is not expected/) == -1
	},


	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET-TROPICAL-DATA') {
			this.getData(payload)
		}
	}

})
