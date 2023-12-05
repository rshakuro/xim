document.addEventListener("DOMContentLoaded", function () {
  // Features Section (Horisontal scroll)
  var slideIndexS = 1;
  var sliding = false;


  // GSAP Delay 
  var timeoutId;
  var animationStatus = false;

  // Viddeo Asssets
  var introVideo = document.getElementById("cg-video-intro");
  var unboxingVideo = document.getElementById("cg-unboxing-video");
  var boxingVideo = document.getElementById("cg-boxing-video");
  var hopperVideo = document.getElementById("hopper-video");
  var smartDeviceVideo = document.getElementById("smart-device-video");
  var cleaningCycleVideo = document.getElementById("cleaning-cycle-video");

  // Triggers
  var introSection = ".fluid-screen-bg";
  var navBar = ".navbar";
  var navBarContainer = ".navbar-container";
  var featureItem = ".feature-item";

  
  // Unboxing Sequence
  let unboxingSequenceComplete = 0;
  let unboxingSequence = canvasSequence({
    urls: new Array(112).fill().map((o, i) => `https://raw.githubusercontent.com/rshakuro/xim/main/unboxing-sequence/${(i+1).toString().padStart(4, '0')}.webp`),
    canvas: "#unboxing-sequence-canvas",
    clear: true,
    paused: true,
    onComplete: () => {
      // Show features labels
      gsap .to(featureItem, { 
        scale: "1", y: "1", 
        duration: 0.8, 
        ease: "power4.inOut",
      }).delay(0);

      unboxingSequenceComplete = 1;
    }
  });

  // Hopper Sequence

  let hopperSequence = canvasSequence({
    urls: new Array(100).fill().map((o, i) => `https://github.com/rshakuro/xim/raw/main/hopper-webp/${(i+1).toString().padStart(4, '0')}.webp`),
    canvas: "#hopper-sequence-canvas",
    clear: true,
    paused: true,
    onComplete: () => {
     // hopperSequence.repeat();
    }
  });


  // 360 Sequence
  let rotateSequence = canvasSequence({
    urls: new Array(200).fill().map((o, i) => `https://raw.githubusercontent.com/rshakuro/xim/main/rotate-360/${(i+1).toString().padStart(4, '0')}.webp`),
    canvas: "#rotate-sequence-canvas",
    clear: true,
    paused: true,
    repeat: -1,
    onComplete: () => {}
  });


 
  
  // Hide features labels
  gsap.set(featureItem, { 
    scale: "0", 
    y: 0
  });

  // Hide X45
  // gsap.set("#unboxing-sequence-box", { 
  //   top: "50%"
  // });

  // Set intro-title position
  // gsap.set("#intro-title-box", { 
  //   top: "0"
  // });

  // Snap scroll 
  $("#fullpage").fullpage({
    licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
    verticalCentered: true,
    scrollingSpeed: 800,
    scrollBar: false,
    css3: true,
    easingcss3: "ease-in-out",
    scrollOverflow: false,
    navigation: false,
    anchors: ["1", "2", "3", "4", "5", "6", "7", "8"],
    menu: "#myMenu",
    loopHorizontal: false,
    controlArrows: false,
    lazyLoading: false,

    onLeave: function (origin, destination, direction) {
      clearTimeout(timeoutId);

      // SCREEN #1 --> SCREEN #2
      if (origin.index == 0 && direction == "down") {
        gsap.to(introSection, { width: "96%", height: "96%", borderRadius: "40px", duration: 0.8, ease: "power4.inOut",}).delay(0); // Intro section transform
        gsap.to(navBarContainer, { width: "96%", marginTop: "2%", duration: 0.8, ease: "power4.inOut", }).delay(0); // Nav transform

        timeoutId = setTimeout(() => {
          animationStatus = true;

          fullpage_api.moveTo(destination.index + 1);
          
          // Hide nav
          gsap .to(navBar, { 
            top: "-200", 
            duration: 0.8, 
            ease: "power4.in",
          }).delay(0.1); 

          // Hide section hero title
          gsap.to("#intro-title-box", { 
            top: "-110%",
            opacity: "0",
            duration: 2, 
            ease: "power4.in",
          }).delay(1); 

           // Show X45
          //  gsap.to("#unboxing-sequence-box", { 
          //   top: 0,
          //   duration: 2, 
          //   ease: "power4.in",
          // }).delay(1.1); 

          // Start unboxung sequence
          unboxingSequence.play().delay(2.5);
        }, 10);
        return animationStatus;
      }

      // SCREEN #2 --> SCREEN #1
      if (origin.index == 1 && direction == "up" && slideIndexS == 1) {
        // Intro section transform reset
        gsap.to(introSection, {
          width: "100%", 
          height: "100%", 
          borderRadius: "0", 
          duration: 0.8, 
          ease: "power4.inOut",
        }).delay(.5);

        // Nav transform reset
        gsap.to(navBarContainer, { 
          width: "100%", 
          marginTop: "0", 
          duration: 0.8, 
          ease: "power4.inOut", 
        }).delay(.5); 

        // Show section hero title
        gsap.to("#intro-title-box", { 
          top: 0,
          opacity: "100",
          duration: .2, 
          ease: "power4.in",
        }).delay(1); 

         // Hide X45
        //  gsap.to("#unboxing-sequence-box", { 
        //   top: 0,
        //   duration: 2, 
        //   ease: "power4.in",
        // }).delay(1); 
        

        timeoutId = setTimeout(() => {
          animationStatus = false;
          fullpage_api.moveTo(destination.index - 1); 

          // Show nav
          gsap.to(navBar, { 
            top: "0", 
            duration: 0.8, 
            ease: "power4.inOut"
          }).delay(0.1);

          // Hide features labels
          gsap.to(featureItem, { 
            scale: "0", y: "100", 
            duration: 0.8, 
            ease: "power4.inOut",
          }).delay(0); 

          // Reverse unboxung sequence
          unboxingSequence.reverse().delay(1); 
        }, 10);
        return animationStatus;
      }

      // SCREEN #2 --> SCREEN #3
      if (origin.index == 1 && direction == "down") {

        rotateSequence.play().delay(.5);
        
      }

      // Horisontal scrolling – X45 Features
      //------------------------------------------
      if (origin.index == 1 && !sliding) {
        if (direction == "down" && slideIndexS < 8) {
          $.fn.fullpage.moveSlideRight();
          return false;
        } else if (direction == "up" && slideIndexS > 1) {
          $.fn.fullpage.moveSlideLeft();
          return false;
        }
      } else if (sliding) {
        return false;
      }
    },

    afterSlideLoad: function (section, origin, destination, direction) {

      // Fullpage Slide #1
      if (destination.index == 1) {

        hopperSequence.play(); // Start hopper video

        console.log("Slide:" + destination.index); 

      } else {
        hopperSequence.pause(); // Pause hopper video
      }

      // Fullpage Slide #2
      if (destination.index == 2) {
        console.log("Slide:" + destination.index); 
      }

      // Fullpage Slide #3
      if (destination.index == 3) {
        console.log("Slide:" + destination.index); 
      }

      // Fullpage Slide #4
      if (destination.index == 4) {
        console.log("Slide:" + destination.index); 
      }

      // Fullpage Slide #5
      if (destination.index == 5) {
        console.log("Slide:" + destination.index); 
      }

      // Fullpage Slide #6
      if (destination.index == 6) {
        console.log("Slide:" + destination.index); 
      }

      // Fullpage Slide #7
      if (destination.index == 7) {
        console.log("Slide:" + destination.index);
      }

      slideIndexS = destination.index + 1;
    },
  });


  // GSAP Canvas Sequence
  function canvasSequence(config) {
    let playhead = {frame: 0},
        canvas = gsap.utils.toArray(config.canvas)[0] || console.warn("canvas not defined"),
        ctx = canvas.getContext("2d"),
        curFrame = -1,
        onUpdate = config.onUpdate,
        onComplete = config.onComplete,
        images,
        updateImage = function() {
          let frame = Math.round(playhead.frame);
          if (frame !== curFrame) { // only draw if necessary
            config.clear && ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
            curFrame = frame;
            onUpdate && onUpdate.call(this, frame, images[frame]);
          }
        };
    images = config.urls.map((url, i) => {
      let img = new Image();
      img.src = url;
      i || (img.onload = updateImage);
      return img;
    });
    
    return gsap.to(playhead, {
      frame: images.length - 1,
      ease: "none",
      onUpdate: updateImage,
      onComplete: onComplete,
      duration: images.length / (config.fps || 30),
      paused: !!config.paused,
      repeat: config.repeat || 0,
      
    });
  }
});




 







 
  // function sequenceLoad() {
    




  //   images = config.urls.map((url, i) => {
  //     let img = new Image();
  //     img.src = url;
  //     i || (img.onload = updateImage);
  //     return img;
  //   });


    
  // }



  // Sequence assets load
  // let sequenceLoad = (url) => {
  //   url.map((i) => {
  //     let img = new Image();
  //     img.src = i;
  //     img.onload = console.log(img);
  //     return img;
  //   });
  // }

  // // Sequence Start

  // let sequencePlay = (canvas, ) => {

  // }

  // function sequence() {}

  // sequenceLoad(unboxungUrls);


  //function imgSequence(settings) {}

  // imageSequence({
  //   urls,
  //   canvas: "#unboxing-sequence",
  //   //clear: true, // only necessary if your images contain transparency
  //   //onUpdate: (index, image) => console.log("drew image index", index, ", image:", image),
  // });

  // function imageSequence(config) {
  //   let playhead = {frame: 0},
  //       canvas = gsap.utils.toArray(config.canvas)[0] || console.warn("canvas not defined"),
  //       ctx = canvas.getContext("2d"),
  //       curFrame = -1,
  //       onUpdate = config.onUpdate,
  //       images,
  //       updateImage = function() {
  //         let frame = Math.round(playhead.frame);
  //         if (frame !== curFrame) { // only draw if necessary
  //           config.clear && ctx.clearRect(0, 0, canvas.width, canvas.height);
  //           ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
  //           curFrame = frame;
  //           onUpdate && onUpdate.call(this, frame, images[frame]);
  //         }
  //       };

  //   images = config.urls.map((url, i) => {
  //     let img = new Image();
  //     img.src = url;
  //     i || (img.onload = updateImage);
  //     return img;
  //   });

  //   return gsap.to(playhead, {
  //     frame: images.length - 1,
  //     ease: "none",
  //     onUpdate: updateImage,
  //     duration: images.length / (config.fps || 30),
  //     paused: !!config.paused
  //   });
  // }
  // -------------------------------
  





// console.log(img);

// setInterval(function(){
//   if (currentSegment == options.segments - 1){
    
//     //reset the segments
//     currentSegment = 1;
//     for (var x=0; x<options.segments; x++){
//       segments[x].anglePercent = 0;
//     }
//   }
//   else{
//     currentSegment++;
//   }
  
//   addActiveSegment(currentSegment);
// }, 2000);


/*$("video").each((i, v) => {
    $(v).attr("data-autoplay", "");
    v.play();
  });*/

// setTimeout(() => {

// }, 1000);

// afterLoad: function (origin, index, destination, direction, trigger) {
//   if (index == 1) {
//     introVideo.play();
//   }
// },

// onLeave: function (origin, index, destination, direction, trigger) {
//   // 1 - Hero
//   if ((index = 1)) {
//   }

//   // 2 - Unboxing
//   if ((index = 2)) {
//     unboxingVideo.currentTime = 0;
//     unboxingVideo.play();
//   }
// },

//https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.min.js
// //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js


