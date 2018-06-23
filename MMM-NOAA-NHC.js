/* Magic Mirror Module: MMM-NOAA-NHC
 * Version: 1.0.0
 *
 * By Akira Heid https://github.com/akiraheid/
 * MIT Licensed.
 */

Module.register('MMM-NOAA-NHC', {

	defaults: {
		showOnlyActive: true,
		showPacific: true,
		showAtlantic: true,
		updateInterval: 60 * 60 * 1000, // Every hour
	},


	start: function() {
		Log.info('Starting module: ' + this.name)

		if (this.data.classes === 'MMM-NOAA-NHC') {
			this.data.classes = 'bright medium'
		}

		// Set up the local values, here we construct the request url to use
		this.loaded = false
		this.tropicalGraphicalURL = 'https://www.nhc.noaa.gov/gtwo.xml'

		// Trigger the first request
		this.getData(this)
	},


	getData: function(that) {
		// Make the initial request to the helper then set up the timer to perform
		// the updates
		that.sendSocketNotification(
				'GET-TROPICAL-DATA', that.tropicalGraphicalURL);

		setTimeout(that.getData, that.config.interval, that);
	},


	getStyles: function() {
		return []
	},


	getDom: function() {
		// Set up the local wrapper
		var wrapper = document.createElement('div')

		if (this.loaded) {
			var row = document.createElement('tr')
			if (this.config.showPacific) {
				var column = document.createElement('td')
				if (this.result.pacificActive) {
					var img = document.createElement('img')
					img.setAttribute('src', 'https://www.nhc.noaa.gov/xgtwo/resize/two_pac_5d0_resize.gif')
					img.setAttribute('alt', 'Could not load Pacific image')
					column.appendChild(img)
				} else {
					var span = document.createElement('span')
					span.innerHTML = 'No<br/>Pacific>br/>Activity'
					span.className = 'small vert-center'
					column.appendChild(span)
				}
				row.appendChild(column)
			}

			if (this.config.showAtlantic) {
				var column = document.createElement('td')
				if (this.result.atlanticActive) {
					var img = document.createElement('img')
					img.setAttribute('src', 'https://www.nhc.noaa.gov/xgtwo/resize/two_atl_5d0_resize.gif')
					img.setAttribute('alt', 'Could not load Atlantic image')
					column.appendChild(img)
				} else {
					var span = document.createElement('span')
					span.innerHTML = 'No<br/>Atlantic<br/>Activity'
					span.className = 'small vert-center'
					column.appendChild(span)
				}
				row.appendChild(column)
			}

			var imageTable = document.createElement('table')
			imageTable.appendChild(row)
			wrapper.appendChild(imageTable)
		} else {
			wrapper.innerHTML = "Loading NOAA NHC data..."
		}

		return wrapper
	},


	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GOT-TROPICAL-DATA') {
			this.loaded = true
			this.result = payload.result
			this.updateDom(1000)
		}
	}
})
