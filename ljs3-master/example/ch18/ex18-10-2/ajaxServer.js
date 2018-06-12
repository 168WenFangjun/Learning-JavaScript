const http = require('http');

const server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({  // stringifyは、JavaScriptの値をJSON文字列に変換する
    platform: process.platform,
    nodeVersion: process.version,
    uptime: Math.round(process.uptime()),
  }));
});

const port = 7070;
server.listen(port, function() {
  console.log(`Ajax server started on port ${port}`);
});