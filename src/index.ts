import config from 'config'
import http from 'http'
import app from './app'

/*
function f() {
	console.log("Hello world")
}

f()
*/

const httpServer = http.createServer(app)
const serverConfig: { port: number } = config.get('server')

httpServer.listen(serverConfig.port).on('listening', () => {
	console.log(`Server started on port ${serverConfig.port}`)
})