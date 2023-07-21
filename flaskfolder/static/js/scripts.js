/*!
* Start Bootstrap - Scrolling Nav v5.0.6 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 
console.log("BOX THING")
window.addEventListener('DOMContentLoaded', event => {

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          rootMargin: '0px 0px -40%',
      });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });

});
console.log("Next step before dragdrop")
const fileInput = document.getElementById('fileInput');
// Get the dropzone element
const dropzone = document.getElementById('dropzone');

// Function to handle file selection when a file is dropped on the dropzone
function handleDrop(event) {
  event.preventDefault();
  dropzone.style.border = "dashed 2px #ccc"; // Reset border style
  const files = event.dataTransfer.files;
  if (files.length > 0) {
      uploadFile(files[0]);
  }
}

// Function to display the selected file name
function displayFile(file) {
  const fileName = file.name;
  console.log(`Selected file: ${fileName}`);
}

// Function to handle file selection when the button is clicked
function handleFileSelect() {
  fileInput.click();
}

// Function to handle file selection when a file is chosen via the file input
fileInput.addEventListener('change', () => {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
      uploadFile(selectedFile);
  }
});

// function handleResponse(responseText) {
//   // Assuming the server returns the content of "transcribed.txt"
//   // Update the content of the "outputBox" div with the transcribed text
//   const jsonResponse = JSON.parse(responseText);
        
//         // Extract the 'sentence' value from the JSON response
//   const sentence = jsonResponse.sentence;
//   document.getElementById('outputBox').textContent = sentence;
// }

// Function to upload the selected file to the Flask backend
function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload', true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("xhr stuff")
        // Handle the response from the server
        handleResponse(xhr.responseText);
      } else {
        // Handle error responses from the server
        console.error('Error:', xhr.responseText);
      }
    }
  };

  xhr.send(formData);
}

function handleResponse(responseText) {
  const jsonResponse = JSON.parse(responseText);
  const sentence = jsonResponse.sentence;
  document.getElementById('outputBox').textContent = sentence;

  // Call service two after service one is done
  const xhr2 = new XMLHttpRequest();
  xhr2.open('GET', `/audio?nocache=${Date.now()}`, true);
  xhr2.responseType = 'blob'; // Set the response type to 'blob' to receive binary data
  xhr2.onreadystatechange = function () {
    if (xhr2.readyState === XMLHttpRequest.DONE) {
      if (xhr2.status === 200) {
        // Handle the response from service two (audio file)
        const audioBlob = xhr2.response;
        // Create an object URL for the Blob data
        const objectURL = URL.createObjectURL(audioBlob);

        // Get the audio element
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.pause();
        audioPlayer.innerHTML = '';
        console.log("AFTER CLEARING",audioPlayer.outerHTML);
        // Set the audio source using innerHTML
        audioPlayer.innerHTML = `<source src="${objectURL}" type="audio/mpeg">`;
        console.log("POST CLEARING",audioPlayer.outerHTML);
        // Play the audio
        audioPlayer.play();
      } else {
        // Handle error responses from service two
        console.error('Error in service two:', xhr2.responseText);
      }
    }
  };
  xhr2.send();
}

document.getElementById("uploadForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const fileInput = document.getElementById("fileInput").files[0];
  if (!fileInput) {
      alert("Please select a file.");
      return;
  }

  const formData = new FormData();
  formData.append('file', fileInput);

    // fetch('/upload', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //     const sentence = data.sentence;
    //     console.log("OUTPUT BOX THING")
    //     document.getElementById('outputBox').innerText = sentence;
    //     console.log("OUTPUT BOX THING")

    //     const audioPlayer = document.getElementById('audioPlayer');
    //     fetch('/audio')
    //     .then(response => response.blob())
    //     .then(blobData => {
    //       // Create an object URL for the Blob data
    //       const objectURL = URL.createObjectURL(blobData);

    //       // Set the audio source to the object URL
    //       const sourceElement = document.createElement('source');
    //       sourceElement.src = objectURL;
    //       sourceElement.type = 'audio/mpeg';
    //       console.log(sourceElement)
    //       // Append the source element to the audio player
    //       audioPlayer.appendChild(sourceElement);

    //       // Play the audio
    //       audioPlayer.play();
    //     })
    //     .catch(error => {
    //       console.error('Error in service two:', error);
    //     });
    // })
    // .catch(error => console.error('Error:', error));
    });

// Prevent default behavior for drag events to enable dropping files
dropzone.addEventListener('dragenter', (event) => {
  event.preventDefault();
  dropzone.style.border = "dashed 2px #0080ff"; // Show a visual indicator
});

dropzone.addEventListener('dragleave', (event) => {
  event.preventDefault();
  dropzone.style.border = "dashed 2px #ccc"; // Reset border style
});

dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropzone.style.border = "dashed 2px #0080ff"; // Show a visual indicator
});

dropzone.addEventListener('drop', handleDrop);

// const audioElement = document.getElementById("myAudio");
        
// // Add an event listener to perform actions when the audio starts playing
// audioElement.addEventListener("play", function() {
//     console.log("Audio started playing!");
//     // You can add more actions here, like showing a message or changing CSS styles.
// });

// // Add an event listener to perform actions when the audio stops playing
// audioElement.addEventListener("ended", function() {
//     console.log("Audio playback ended!");
//     // You can add more actions here if needed.
// });

const reloadButton = document.getElementById('reloadButton');
        reloadButton.addEventListener('click', () => {
            window.location.reload(); // Reload the page
        });