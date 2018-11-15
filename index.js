window.onload = () => {
  function detectFace(canvas) {
    const w = canvas.width;
    const h = canvas.height;

    const img_u8 = new window.jsfeat.matrix_t(w, h, window.jsfeat.U8_t | window.jsfeat.C1_t);
    const ii_sum = new Int32Array((w + 1) * (h + 1));
    const ii_sqsum = new Int32Array((w + 1) * (h + 1));
    const ii_tilted = new Int32Array((w + 1) * (h + 1));

    const classifier = window.jsfeat.haar.frontalface;
    const imageData = canvas.getContext('2d').getImageData(0, 0, w, h);

    window.jsfeat.imgproc.grayscale(imageData.data, w, h, img_u8);
    window.jsfeat.imgproc.compute_integral_image(
      img_u8, ii_sum, ii_sqsum, classifier.tilted ? ii_tilted : null,
    );
    window.jsfeat.haar.edges_density = 0.5;
    let rects = window.jsfeat.haar.detect_multi_scale(
      ii_sum, ii_sqsum, ii_tilted, null, img_u8.cols, img_u8.rows, classifier, 1.2, 2,
    );
    rects = window.jsfeat.haar.group_rectangles(rects, 1);

    return rects;
  }

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
    if (!timestamp || timestamp < 15000) {
      ctx.drawImage(video, 0, 0);
    }

    const result = detectFace(canvas);
    console.log(result);

    result.forEach(face => {
      const { x, y, width, height } = face;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x, y);

      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 5;
      ctx.stroke();
    });
    requestAnimationFrame(loop);
  };

  loop();
};
