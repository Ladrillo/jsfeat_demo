window.onload = () => {
  const video = document.querySelector('#vid');

  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    });
};
