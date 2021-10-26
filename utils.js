const fs = require('fs'),
  exec = require('child_process').exec

let connectCounter = 0

function counterAdd() {
  return ++connectCounter
}

function counterLess() {
  return --connectCounter
}

function serverHandler(req, res) {
  fs.readFile(__dirname + '/index.html', function (err, data) {
    if (err) {
      console.log(err)
      res.writeHead(500)
      res.end('Error loading index.html')
    } else {
      res.writeHead(200)
      res.end(data)
    }
  })
}

function errorHandler(err) {
  console.error('exec error: ' + err)
}

function execHandler(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, function (error, stdout, stderr) {
      if (error) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}

module.exports = {
  serverHandler,
  execHandler,
  errorHandler,
  counterAdd,
  counterLess
}
