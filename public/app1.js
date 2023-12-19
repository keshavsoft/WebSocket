// app.js
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
let localStream;
let peerConnection;

startButton.addEventListener('click', startCall);
endButton.addEventListener('click', endCall);

async function startCall() {
    try {
        // Get user media (in this case, video and audio)
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // Display local stream
        const localVideo = document.createElement('video');
        localVideo.srcObject = localStream;
        localVideo.autoplay = true;
        document.body.appendChild(localVideo);

        // Create RTCPeerConnection
        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        peerConnection = new RTCPeerConnection(configuration);

        // Add local stream to peer connection
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        // Set up event handlers for the peer connection
        peerConnection.onicecandidate = handleICECandidateEvent;
        peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
        peerConnection.ontrack = handleTrackEvent;

        // Enable the "End Call" button
        endButton.disabled = false;
        startButton.disabled = true;

    } catch (error) {
        console.error('Error starting call:', error);
    }
}

async function handleNegotiationNeededEvent() {
    try {
        // Create offer and set it as the local description
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        // Send the offer to the remote peer (you'll need a signaling server for this in a real application)
        sendOffer(offer);
    } catch (error) {
        console.error('Error creating offer:', error);
    }
}

function handleICECandidateEvent(event) {
    if (event.candidate) {
        // Send the ICE candidate to the remote peer (you'll need a signaling server for this in a real application)
        sendICECandidate(event.candidate);
    }
}

function handleTrackEvent(event) {
    // Display remote stream
    const remoteVideo = document.createElement('video');
    remoteVideo.srcObject = event.streams[0];
    remoteVideo.autoplay = true;
    document.body.appendChild(remoteVideo);
}

function endCall() {
    // Close the peer connection and stop local stream
    if (peerConnection) {
        peerConnection.close();
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }

    // Disable the "End Call" button and enable the "Start Call" button
    endButton.disabled = true;
    startButton.disabled = false;
}

// You'll need to implement these functions to handle signaling (e.g., using a WebSocket)
function sendOffer(offer) {
    // Implement sending the offer to the remote peer (e.g., through a WebSocket)
}

function sendICECandidate(candidate) {
    // Implement sending the ICE candidate to the remote peer (e.g., through a WebSocket)
}
