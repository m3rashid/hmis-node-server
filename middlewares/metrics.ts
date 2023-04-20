import type { ExpressStatusMonitorConfig } from 'express-status-monitor'
import config from 'helpers/config'
import path from 'path'

const monitorConfig: ExpressStatusMonitorConfig = {
	title: `${config.appName} Server Metrics`, // Default title
	theme: path.join('default.css'), // Default styles
	path: '/metrics',
	socketPath: '/socket.io', // In case you use a custom path
	// websocket: existingSocketIoInstance,
	spans: [
		{
			interval: 1, // Every second
			retention: 60 // Keep 60 dataPoints in memory
		},
		{
			interval: 5, // Every 5 seconds
			retention: 60
		},
		{
			interval: 15, // Every 15 seconds
			retention: 60
		}
	],
	chartVisibility: {
		cpu: true,
		mem: true,
		load: true,
		// eventLoop: true,
		heap: true,
		responseTime: true,
		rps: true,
		statusCodes: true
	},
	// TODO: Add HealthCheck endpoints
	healthChecks: [],
	ignoreStartsWith: '/admin'
}

export default monitorConfig
