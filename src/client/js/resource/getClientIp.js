// getClientIp.js
'use strict';
// https://stackoverflow.com/a/32841164/2605764

const noop = () => null;
const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

const getClientIp = () =>
  new Promise(resolve => {
    //compatibility for firefox and chrome
    const myPeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;
    if (!myPeerConnection) {
      resolve('');
    }

    const pc = new myPeerConnection({ iceServers: [] });

    //create a bogus data channel
    pc.createDataChannel('');

    // create offer and set local description
    pc.createOffer(sdp => {
      pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    //listen for candidate events
    pc.onicecandidate = ice => {
      try {
        const [ip] = ice.candidate.candidate.match(ipRegex).slice(-1);
        resolve(ip);
      } catch (error) {
        resolve('');
      }
    };
  });

export default getClientIp;
