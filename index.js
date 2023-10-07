async function classifyImage() {
    const uploadedImage = document.querySelector('.file-upload-image');
    const resultsDiv = document.getElementById('results');

    // Load MobileNet model
    const model = await mobilenet.load();

    // Create a TensorFlow.js tensor from the uploaded image
    const image = tf.browser.fromPixels(uploadedImage);

    // Classify the image using the model
    const predictions = await model.classify(image);

    resultsDiv.innerHTML = '';

    if (predictions.length > 0) {
      resultsDiv.innerHTML = `Detected as: ${predictions[0].className}`;
    } else {
      resultsDiv.innerHTML = 'Unable to identify the image.';
    }
  }

  function triggerFileInput() {
    const fileInput = document.querySelector('.file-upload-input');
    fileInput.click();
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
        const imageUploadWrap = document.querySelector('.image-upload-wrap');
        const fileUploadImage = document.querySelector('.file-upload-image');
        const imageTitle = document.querySelector('.image-title');
        const resultsDiv = document.getElementById('results');

        imageUploadWrap.style.display = 'none';
        fileUploadImage.src = e.target.result;
        document.querySelector('.file-upload-content').style.display = 'block';
        imageTitle.innerHTML = input.files[0].name;
        classifyImage(); // Call the classification function
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      removeUpload();
    }
  }

  function removeUpload() {
    const fileInput = document.querySelector('.file-upload-input');
    fileInput.parentNode.replaceChild(fileInput.cloneNode(true), fileInput);

    const fileUploadContent = document.querySelector('.file-upload-content');
    fileUploadContent.style.display = 'none';

    const imageUploadWrap = document.querySelector('.image-upload-wrap');
    imageUploadWrap.style.display = 'block';

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear the results
  }

  const imageUploadWrap = document.querySelector('.image-upload-wrap');
  imageUploadWrap.addEventListener('dragover', function () {
    imageUploadWrap.classList.add('image-dropping');
  });

  imageUploadWrap.addEventListener('dragleave', function () {
    imageUploadWrap.classList.remove('image-dropping');
  });