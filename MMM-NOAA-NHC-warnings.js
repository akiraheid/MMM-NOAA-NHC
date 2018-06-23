/* Magic Mirror Module: MMM-NOAA-NHC-warnings
 * Version: 1.0.0
 *
 * By Akira Heid https://github.com/akiraheid/
 * MIT Licensed.
 */

Module.register('MMM-NOAA-NHC-warnings', {

	defaults: {
		showPacific: true,
		showAtlantic: true,
		updateInterval: 60 * 60 * 1000, // Every hour
	},

	start: function() {
		console.log('starting ' + this.name)
		Log.info('Starting module: ' + this.name)

		if (this.data.classes === 'MMM-NOAA-NHC-warnings') {
			this.data.classes = 'bright medium'
		}

		// Set up the local values, here we construct the request url to use
		this.loaded = false
		this.tropicalGraphicalURL = 'https://www.nhc.noaa.gov/gtwo.xml'

		// Trigger the first request
		this.getData()
	},

	getData: function() {
		// Make the initial request to the helper then set up the timer to perform
		// the updates
		this.sendSocketNotification(
				'UPDATE-TROPICAL-DATA', this.tropicalGraphicalURL);

		setTimeout(this.getData, this.config.interval, this);
	},

	getStyles: function() {
		return ['MMM-NOAA-NHC-warnings.css']
	},

	getDom: function() {
		console.error('getdom')
		// Set up the local wrapper
		var wrapper = document.createElement('div')

		var row = document.createElement('tr')
		if (this.config.showPacific) {
			var column = document.createElement('td')
			var img = document.createElement('img')
			img.setAttribute('src', 'https://www.nhc.noaa.gov/xgtwo/resize/two_pac_5d0_resize.gif')
			img.setAttribute('alt', 'Could not load Pacific image')
			column.appendChild(img)
			row.appendChild(column)
		}

		if (this.config.showAtlantic) {
			console.log('atlantic')
			var column = document.createElement('td')
			var img = document.createElement('img')
			img.setAttribute('src', 'https://www.nhc.noaa.gov/xgtwo/resize/two_atl_5d0_resize.gif')
			img.setAttribute('alt', 'Could not load Atlantic image')
			column.appendChild(img)
			row.appendChild(column)
		}

		var imageTable = document.createElement('table')
		imageTable.appendChild(row)
		wrapper.appendChild(imageTable)

		return wrapper
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'UPDATE-TROPICAL-DATA') {
			this.updateDom(1000)
		}
	}
})
