// Zoomer v. 1.3
(function(window, document, undefined){
    var getTime = Date.now || function() {return new Date().getTime();};
    function Zoom(params) {
        this.params        = params;
        this.canvas        = document.getElementById(this.params.canvas);
        this.ctx           = this.canvas.getContext('2d');
        this.image         = new Image();
        this.CANVAS_BASE_X = this.CANVAS_BASE_Y = 0;
        this.easing        = params.easing || function easeInOutQuad(n,u,e,t){return(n/=t/2)<1?e/2*n*n+u:-e/2*(--n*(n-2)-1)+u};
        this.currentStep   = 1;

        this.canvas.setAttribute('width', this.params.format.width);
        this.canvas.setAttribute('height', this.params.format.height);

        var ref = document.getElementById(this.params.img);
        ref.style.opacity = 0;
        this.image.src = ref.src;

        this.reset();
    }

    var p = Zoom.prototype;
        
        p.reset = function() {
            this.ctx.clearRect(0, 0, this.params.format.width, this.params.format.height)
            this.ctx.drawImage(
                this.image, 
                this.params.steps[0].x,
                this.params.steps[0].y,
                this.params.steps[0].width, 
                this.params.steps[0].height, 
                this.CANVAS_BASE_X, this.CANVAS_BASE_Y, this.params.format.width, this.params.format.height
            );

            this.clock = 0;
        }

        p.start = function() {
            this.startTime = getTime();
            this.animate();
        }

        p.animate = function() {
            if (!this.startTime) this.startTime = getTime();
            this.clock = getTime() - this.startTime;

            this.ctx.clearRect(0, 0, this.params.format.width, this.params.format.height);

            var frameZoomLevelX = this.easing(this.clock, this.params.steps[this.currentStep-1].width, this.params.steps[this.currentStep].width - this.params.steps[this.currentStep-1].width, this.params.steps[this.currentStep].duration),
                frameZoomLevelY = this.easing(this.clock, this.params.steps[this.currentStep-1].height, this.params.steps[this.currentStep].height - this.params.steps[this.currentStep-1].height, this.params.steps[this.currentStep].duration),
                frameX = this.easing(this.clock, this.params.steps[this.currentStep-1].x, this.params.steps[this.currentStep].x - this.params.steps[this.currentStep-1].x, this.params.steps[this.currentStep].duration),
                frameY = this.easing(this.clock, this.params.steps[this.currentStep-1].y, this.params.steps[this.currentStep].y - this.params.steps[this.currentStep-1].y, this.params.steps[this.currentStep].duration);

            this.ctx.drawImage(
                this.image, 
                frameX, 
                frameY, 
                frameZoomLevelX, 
                frameZoomLevelY, 
                this.CANVAS_BASE_X, this.CANVAS_BASE_Y, this.params.format.width, this.params.format.height
            );

            if (this.clock < this.params.steps[this.currentStep].duration) requestAnimationFrame(this.animate.bind(this));
            else if (this.currentStep < this.params.steps.length - 1) {
                this.currentStep ++;
                this.clock = 0;
                this.start();
            }
        }

    window.Zoom = Zoom;
})(window, document);