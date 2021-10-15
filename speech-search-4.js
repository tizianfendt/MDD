var voice = {
  // (A) INIT SPEECH RECOGNITION
  sform : null, // HTML SEARCH FORM
  sfield : null, // HTML SEARCH FIELD
  sbtn : null, // HTML VOICE SEARCH BUTTON
  recog : null, // SPEECH RECOGNITION OBJECT
  init : function () {
    // (A1) GET HTML ELEMENTS
    voice.sfrom = document.getElementById("voice-search-form");
    voice.sfield = document.getElementById("search-voice-result-text");
    voice.sbtn = document.getElementById("search-speech");

    // (A2) SPEECH RECOGNITION SUPPORTED - ASK FOR ACCESS PERMISSION
    if (window.hasOwnProperty("SpeechRecognition") || window.hasOwnProperty("webkitSpeechRecognition")) {
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        // CREATE SPEECH RECOGNITION OBJECT
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        voice.recog = new SpeechRecognition();

        // SPEECH RECOGNITION SETTINGS
        voice.recog.lang = "en-US";
        voice.recog.continuous = false;
        voice.recog.interimResults = false;

        // ON SPEECH RECOGNITION ERROR
        voice.recog.onerror = function (evt) {
          console.log(evt);
        };

        // ON SPEECH RECOGNITION - RUN CORRESPONDING COMMAND
        voice.recog.onresult = function (evt) {
          let said = evt.results[0][0].transcript.toLowerCase();
          voice.sfield.value = said;
          // voice.sform.submit();
          // OR RUN AN AJAX/FETCH SEARCH
          voice.stop();
          
          console.log("USER JUST SAID SOMETHING");
          
          // WHAT HAPPENS AFTER VOICE END
          /*setTimeout(function(){
          
          
          }, 2000);*/
          /* pass url parameter*/
          
        };

        // READY!
        voice.sbtn.disabled = false;
        voice.stop();
      })
      .catch(function(err) {
        voice.sbtn.value = "Please enable access and attach microphone.";
      });
      
      // LISTEN AS SOON AS WEBSITE LOADS    
      /*setTimeout(function(){
      voice.start();    
          
          }, 2000);*/
     

    }

    // (A3) SPEECH RECOGNITION NOT SUPPORTED
    else {
      voice.sbtn.value = "Speech Recognition not supported.";
    }
  },

  // (B) START SPEECH RECOGNITION
  start : function () {
    //console.log("start listening");
    voice.recog.start();
    voice.sbtn.onclick = voice.stop;
    voice.sbtn.value = "Speak Now Or Click Again To Cancel";
  },

  // (C) STOP/CANCEL SPEECH RECOGNITION
  stop : function () {
    voice.recog.stop();
    voice.sbtn.onclick = voice.start;
    voice.sbtn.value = "Press To Speak";
  }
};
window.addEventListener("DOMContentLoaded", voice.init);
