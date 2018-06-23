/* Magic Mirror Module: MMM-NOAA-NHC-warnings
 * Version: 1.0.0
 *
 * By Akira Heid https://github.com/akiraheid/
 * MIT Licensed.
 */

Module.register('MMM-NOAA-NHC-warnings', {

	defaults: {
		updateInterval: 60 * 60 * 1000 // Every hour
	},

	start: function() {
		Log.info('Starting module: ' + this.name)

		if (this.data.classes === 'MMM-AirNow') {
			this.data.classes = 'bright medium'
		}

		// Set up the local values, here we construct the request url to use
		this.loaded = false

		// Trigger the first request
		this.getData()
	},

	getData: function() {
		// Make the initial request to the helper then set up the timer to perform the updates
		//this.sendSocketNotification('GET-AIR-QUALITY', that.url);
		setTimeout(this.getData, this.config.interval, this);
	},

	getStyles: function() {
		return ['MMM-NOAA-NHC-warnings.css']
	},

	getDom: function() {
		// Set up the local wrapper
		var wrapper = document.createElement('div')


		if (this.loaded) {
			wrapper.className = 'small'
		} else {
			// Otherwise lets just use a simple div
			wrapper.innerHTML = 'Loading NOAA NHC data...'
		}

		return wrapper
	},

	socketNotificationReceived: function(notification, payload) {
		/*
		// check to see if the response was for us and used the same url
		if (notification === 'GOT-AIR-QUALITY' && payload.url === this.url) {
			// we got some data so set the flag, stash the data to display then request the dom update
			this.loaded = true
			this.location = payload.location
			this.result = payload.result
			this.updateDom(1000)
		}
		*/
	}
})
