var peer = new Peer();
var personal_id;

peer.on('open', function(id) {
	document.getElementById('ID').innerHTML = id;
	personal_id = id;
});

peer.on('call', function(call) {
  getUserMedia({video: true, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
    	showStream(stream);
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});

function callSomeone(partnerID){
	getUserMedia({video: true, audio: true}, function(stream) {
  	var call = peer.call('another-peers-id', stream);
  	call.on('stream', function(remoteStream) {
    	showStream(stream);
  	});
	}, function(err) {
  		console.log('Failed to get local stream' ,err);
	});
}

function showStream(stream){
	var video = document.querySelector('video');
	video.srcObject = stream
	video.onloadedmetadata = function (e){
		video.play();
	}
}

document.getElementById("caller").addEventListener("click", function() {
	callSomeone(document.getElementById("partnerID").value)});