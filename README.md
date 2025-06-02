# Liberty Month Profile Picture Frame

A web application that allows users to upload their profile pictures and overlay them with the Liberty Month frame. Users can zoom, scale, and position their photos within the frame before downloading the result.

## Features

- **Photo Upload**: Upload any image file (JPG, PNG, GIF, etc.)
- **Interactive Controls**: 
  - Scale/zoom your photo from 10% to 300%
  - Position your photo horizontally and vertically
  - Mouse wheel support for quick zooming
  - Click and drag to reposition your photo
- **Real-time Preview**: See your changes instantly on the canvas
- **High-Quality Download**: Download your framed profile picture as a PNG file
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Upload Your Photo**: Click the "Choose Photo" button and select your image
3. **Adjust Your Photo**:
   - Use the scale slider or mouse wheel to zoom in/out
   - Use the position sliders or click and drag to move your photo
   - Use the "Reset Position" button to return to default settings
4. **Download**: Click "Download Image" to save your framed profile picture

## Technical Details

- **Pure JavaScript**: No external dependencies required
- **HTML5 Canvas**: Uses canvas for high-quality image manipulation
- **Responsive CSS Grid**: Modern layout that adapts to different screen sizes
- **File API**: Secure client-side image processing
- **Cross-browser Compatible**: Works in all modern browsers

## File Structure

```
libertyMonth/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── image/
│   └── LibertyMonth.png # Frame overlay image
└── README.md           # This file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Getting Started

Simply open `index.html` in your web browser - no server setup required!
