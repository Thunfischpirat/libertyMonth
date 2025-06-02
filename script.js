class ProfileFrameEditor {
    constructor() {
        this.canvas = document.getElementById('preview-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.frameImage = new Image();
        this.processedFrameCanvas = null;
        this.userImage = null;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.frameSize = 400;
        
        this.initializeElements();
        this.loadFrameImage();
        this.setupEventListeners();
    }

    initializeElements() {
        this.photoUpload = document.getElementById('photo-upload');
        this.editorSection = document.getElementById('editor-section');
        this.scaleSlider = document.getElementById('scale-slider');
        this.xPositionSlider = document.getElementById('x-position');
        this.yPositionSlider = document.getElementById('y-position');
        this.scaleValue = document.getElementById('scale-value');
        this.xValue = document.getElementById('x-value');
        this.yValue = document.getElementById('y-value');
        this.resetBtn = document.getElementById('reset-btn');
        this.downloadBtn = document.getElementById('download-btn');
        
        this.canvas.width = this.frameSize;
        this.canvas.height = this.frameSize;
    }

    loadFrameImage() {
        this.frameImage.onload = () => {
            this.drawCanvas();
        };
        this.frameImage.src = 'image/LibertyMonth.png';
    }

    processFrameImage() {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCanvas.width = this.frameSize;
        tempCanvas.height = this.frameSize;
        
        tempCtx.drawImage(this.frameImage, 0, 0, tempCanvas.width, tempCanvas.height);
        
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            if (r > 250 && g > 250 && b > 250) {
                data[i + 3] = 0;
            }
        }
        
        tempCtx.putImageData(imageData, 0, 0);
        this.processedFrameCanvas = tempCanvas;
    }

    setupEventListeners() {
        this.photoUpload.addEventListener('change', (e) => this.handleFileUpload(e));
        this.scaleSlider.addEventListener('input', () => this.updateScale());
        this.xPositionSlider.addEventListener('input', () => this.updatePosition());
        this.yPositionSlider.addEventListener('input', () => this.updatePosition());
        this.resetBtn.addEventListener('click', () => this.resetPosition());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    }

    handleFileUpload(event) {
        const target = event.target;
        const file = target.files?.[0];
        
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.userImage = new Image();
                this.userImage.onload = () => {
                    this.editorSection.style.display = 'block';
                    this.resetPosition();
                    this.drawCanvas();
                };
                this.userImage.src = e.target?.result;
            };
            reader.readAsDataURL(file);
        }
    }

    updateScale() {
        this.scale = parseFloat(this.scaleSlider.value);
        this.scaleValue.textContent = `${Math.round(this.scale * 100)}%`;
        this.drawCanvas();
    }

    updatePosition() {
        this.offsetX = parseInt(this.xPositionSlider.value);
        this.offsetY = parseInt(this.yPositionSlider.value);
        this.xValue.textContent = `${this.offsetX}px`;
        this.yValue.textContent = `${this.offsetY}px`;
        this.drawCanvas();
    }

    resetPosition() {
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        
        this.scaleSlider.value = '1';
        this.xPositionSlider.value = '0';
        this.yPositionSlider.value = '0';
        
        this.scaleValue.textContent = '100%';
        this.xValue.textContent = '0px';
        this.yValue.textContent = '0px';
        
        this.drawCanvas();
    }

    handleWheel(event) {
        event.preventDefault();
        
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        const newScale = Math.max(0.1, Math.min(3, this.scale + delta));
        
        this.scale = newScale;
        this.scaleSlider.value = newScale.toString();
        this.scaleValue.textContent = `${Math.round(newScale * 100)}%`;
        
        this.drawCanvas();
    }

    handleMouseDown(event) {
        if (!this.userImage) return;
        
        let isDragging = true;
        const startX = event.clientX;
        const startY = event.clientY;
        const startOffsetX = this.offsetX;
        const startOffsetY = this.offsetY;

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            this.offsetX = startOffsetX + deltaX;
            this.offsetY = startOffsetY + deltaY;
            
            this.offsetX = Math.max(-200, Math.min(200, this.offsetX));
            this.offsetY = Math.max(-200, Math.min(200, this.offsetY));
            
            this.xPositionSlider.value = this.offsetX.toString();
            this.yPositionSlider.value = this.offsetY.toString();
            this.xValue.textContent = `${this.offsetX}px`;
            this.yValue.textContent = `${this.offsetY}px`;
            
            this.drawCanvas();
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.userImage) {
            this.ctx.save();
            
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            
            this.ctx.translate(centerX + this.offsetX, centerY + this.offsetY);
            this.ctx.scale(this.scale, this.scale);
            
            const imageAspect = this.userImage.width / this.userImage.height;
            const canvasAspect = this.canvas.width / this.canvas.height;
            
            let drawWidth, drawHeight;
            
            if (imageAspect > canvasAspect) {
                drawHeight = this.canvas.height;
                drawWidth = drawHeight * imageAspect;
            } else {
                drawWidth = this.canvas.width;
                drawHeight = drawWidth / imageAspect;
            }
            
            this.ctx.drawImage(
                this.userImage, 
                -drawWidth / 2, 
                -drawHeight / 2, 
                drawWidth, 
                drawHeight
            );
            
            this.ctx.restore();
        }
        
        if (this.frameImage.complete) {
            this.ctx.globalCompositeOperation = 'multiply';
            this.ctx.drawImage(this.frameImage, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalCompositeOperation = 'source-over';
        }
    }

    downloadImage() {
        const link = document.createElement('a');
        link.download = 'liberty-month-profile.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfileFrameEditor();
}); 