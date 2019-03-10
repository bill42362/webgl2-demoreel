// getVideoJsConfig.js
'use strict';

const getVideoJsConfig = () => ({
  controls: false,
  autoplay: 'muted',
  loop: true,
  preload: 'auto',
  techOrder: ['html5'],
  children: {
    mediaLoader: true, // minimal children
    posterImage: true,
  },

  html5: {
    nativeAudioTracks: false,
    nativeVideoTracks: false,
    hls: {
      overrideNative: true,
    },
  },
});

export default getVideoJsConfig;
