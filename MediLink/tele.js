// WebRTC for Consultation Page
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream, peerConnection;
const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

async function startCall() {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  peerConnection = new RTCPeerConnection(servers);
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
  };

  // Placeholder for signaling (use a proper signaling server in production)
  peerConnection.onicecandidate = event => console.log(event.candidate);

  // Create an offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
}

document.getElementById('startCall').addEventListener('click', startCall);
document.getElementById('endCall').addEventListener('click', () => peerConnection?.close());