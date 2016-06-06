var React = require("react");
var ReactDOM = require('react-dom');
var P2P = require('./p2p.jsx');

var options = {
	peerjs_key: 'ubxnt4vwdx11yvi'
};

var main = document.getElementById('main');

ReactDOM.render(<P2P opts={options} />, main);
