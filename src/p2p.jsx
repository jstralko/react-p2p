var React = require('react');
var Peer = require('peerjs');

module.exports = React.createClass({
	propTypes: {
		opts: React.PropTypes.object
	},

	getInitialState: function(){
		return {
			peer: new Peer({key: this.props.opts.peerjs_key}), //for testing
			/*
			//for production:
			peer = new Peer({
			  host: 'yourwebsite.com', port: 3000, path: '/peerjs',
			  debug: 3,
			  config: {'iceServers': [
			    { url: 'stun:stun1.l.google.com:19302' },
			    { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
			  ]}
			})
			*/
			my_id: '',
			peer_id: '',
			initialized: false
		};
	},

	componentWillMount: function() {
		this.state.peer.on('open', (id) => {
			console.log('My peer ID is: ' + id);
			this.setState({
				my_id: id,
				initialized: true
			});
		});

		this.state.peer.on('connection', (connection) => {
			console.log("We have established a connection");

			this.setState({
				conn: connection
			}, () => {
				this.state.conn.on('open', () => {
					this.setState({
						connected: true
					});
				});

				this.state.conn.on('data', this.onReceiveData);
			});
		});
	},

	componentWillUnmount: function(){
		this.state.peer.destroy();
	},

	connect: function(){
		var peer_id = this.state.peer_id;
		var connection = this.state.peer.connect(peer_id);

		this.setState({
		    conn: connection
		}, () => {
			this.state.conn.on('open', () => {
				this.setState({
					connected: true
				});
			});
			this.state.conn.on('data', this.onReceiveData);
		});
	},

	onReceiveData: function(data){
		console.log('Received', data);
	},

	handleTextChange: function(event){
		this.setState({
		  peer_id: event.target.value
		});
	},

	render: function() {
		var result;

		if(this.state.initialized){
			result = (
				<div>
					<div>
            <span>Your PeerJS ID: </span>
            <strong>{this.state.my_id}</strong>
					</div>
					{this.state.connected ? this.renderConnected() : this.renderNotConnected()}
				</div>
			);
		} else {
			result = <div>Loading...</div>;
		}

		return result;
	},

	renderNotConnected: function () {
		return (
			<div>
				<hr />
				<div>
					<input type="text" onChange={this.handleTextChange} />
				</div>
				<button onClick={this.connect}>Connect</button>
			</div>
		);
	},

	renderConnected: function () {
		return (
			<div>
				<h2>We are P2P connected!</h2>
			</div>
		);
	}
});
