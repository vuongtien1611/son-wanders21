const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const inDesktop = path.join(__dirname, '../website_download/images/video-banner/hero-desktop.mp4');
const outMobilePub = path.join(__dirname, '../website_download/images/video-banner/hero-mobile.mp4');
const outMobileSrc = path.join(__dirname, '../src/images/video-banner/hero-mobile.mp4');

console.log('=== RE-ENCODING MOBILE 9:16 VERTICAL VIDEO FROM 1080P SOURCE ===');
const t0 = Date.now();

execFileSync(ffmpeg.path, [
  '-y',
  '-i', inDesktop,
  '-vf', 'crop=608:1080:720:0,scale=1080:1920:flags=lanczos,unsharp=5:5:0.7:3:3:0.0',
  '-c:v', 'libx264',
  '-preset', 'medium',
  '-crf', '22',
  '-maxrate', '3800k',
  '-bufsize', '7500k',
  '-pix_fmt', 'yuv420p',
  '-an',
  '-movflags', '+faststart',
  outMobilePub
], { stdio: 'inherit' });

console.log('Mobile re-encoded in', ((Date.now() - t0) / 1000).toFixed(1), 's');
fs.copyFileSync(outMobilePub, outMobileSrc);

const stat = fs.statSync(outMobilePub);
console.log('Mobile size:', (stat.size / 1024 / 1024).toFixed(2), 'MB');

// Update mobile poster
const mPosterJpg = path.join(__dirname, '../website_download/images/video-banner/hero-poster-mobile.jpg');
const mPosterWebp = path.join(__dirname, '../website_download/images/video-banner/hero-poster-mobile.webp');
execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:01', '-i', outMobilePub, '-vframes', '1', '-q:v', '2', mPosterJpg]);
execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:01', '-i', outMobilePub, '-vframes', '1', '-c:v', 'libwebp', '-quality', '90', mPosterWebp]);
fs.copyFileSync(mPosterJpg, path.join(__dirname, '../src/images/video-banner/hero-poster-mobile.jpg'));
fs.copyFileSync(mPosterWebp, path.join(__dirname, '../src/images/video-banner/hero-poster-mobile.webp'));

console.log('Updated mobile posters successfully!');
