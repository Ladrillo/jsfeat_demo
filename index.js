window.onload = () => {
  const video = document.querySelector('#vid');
  const canvas = document.querySelector('#canv');
  const ctx = canvas.getContext('2d');

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
    if (!timestamp || timestamp < 15000) {
      ctx.drawImage(video, 0, 0);
    }

    requestAnimationFrame(loop);
  };

  loop();
};
