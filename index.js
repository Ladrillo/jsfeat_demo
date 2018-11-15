window.onload = () => {
  const video = document.querySelector('#vid');
  const canvas = document.querySelector('#canv');

  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    });

  const loop = (timestamp) => {
    // do stuff
    if (!timestamp || timestamp < 5000) {
      console.log(timestamp);
      document.write('|');
    }

    requestAnimationFrame(loop);
  };

  loop();
};
