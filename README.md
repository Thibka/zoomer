Description
==================
A CSS scale transition/animation can lead to blurry images.

Besides, when combined with a transform-origin or translate, it can be tricky to precisely anticipate what the result of the scale transformation will be.

This class provides a light and precise zoom/dezoom animation with constant image sharpness.

[Demo](https://jsfiddle.net/Wonderbanners/bc2xdsfq/11/).



Usage
==================

```html
<img id="image" src="image.jpg" style="opacity: 0">
<canvas id="canvas" class="full"></canvas>
```

The `<img>` tag allows the JS class to start its initialization on the `load` event.

However, the actual rendering will only take place in the canvas, hence the `opacity: 0` applied on the `img` tag..

```javascript
var zoom = new Zoom({
    format   : {width: 300, height: 250},
    canvas   : "COM_canvas",
    img      : "COM_img",
    start    : {x: 74, y: 30, width: 300, height: 250},
    end      : {x: 0,  y: 0,  width: 448, height: 373},
    duration : 6000,
    easing   : function() { } // Optional. easeInOutQuad by default.
});
	
zoomer.start();
```


Easing
==================

By default, the Zoomer uses an easeInOutQuad easing.
However, others equations can be used. See [Robert Penners equations](https://forum.kirupa.com/t/robert-penners-easing-equations-in-pure-js-no-jquery/330985).