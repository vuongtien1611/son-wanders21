const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const inVideo = path.join(__dirname, '../website_download/images/video-banner/video-banner.mp4');
const outDesktopSrc = path.join(__dirname, '../src/images/video-banner/hero-desktop.mp4');
const outDesktopPub = path.join(__dirname, '../website_download/images/video-banner/hero-desktop.mp4');

const outMobileSrc = path.join(__dirname, '../src/images/video-banner/hero-mobile.mp4');
const outMobilePub = path.join(__dirname, '../website_download/images/video-banner/hero-mobile.mp4');

// Ensure directories exist
fs.mkdirSync(path.dirname(outDesktopSrc), { recursive: true });
fs.mkdirSync(path.dirname(outDesktopPub), { recursive: true });

console.log('=== STARTING PRODUCTION HERO VIDEO ENCODING ===');
console.log('Input:', inVideo);

// 1. ENCODE DESKTOP (1920x1080, Lanczos + HQDN3D + Unsharp, CRF 21, Faststart, No Audio)
console.log('\n[1/2] Encoding Desktop 1080p Video (hero-desktop.mp4)...');
const t0 = Date.now();
execFileSync(ffmpeg.path, [
  '-y',
  '-i', inVideo,
  '-vf', 'hqdn3d=1.0:1.0:2.0:2.0,scale=1920:1080:flags=lanczos,unsharp=5:5:0.75:3:3:0.0',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '21',
  '-maxrate', '4500k',
  '-bufsize', '9000k',
  '-pix_fmt', 'yuv420p',
  '-an',
  '-movflags', '+faststart',
  outDesktopPub
], { stdio: 'inherit' });

console.log('Desktop encoding completed in', ((Date.now() - t0) / 1000).toFixed(1), 's');
fs.copyFileSync(outDesktopPub, outDesktopSrc);
// Also update video-banner.mp4 with this high quality desktop version as ultimate fallback
fs.copyFileSync(outDesktopPub, path.join(__dirname, '../src/images/video-banner/video-banner.mp4'));
fs.copyFileSync(outDesktopPub, path.join(__dirname, '../website_download/images/video-banner/video-banner.mp4'));

const desktopStat = fs.statSync(outDesktopPub);
console.log('Desktop file size:', (desktopStat.size / 1024 / 1024).toFixed(2), 'MB');

// 2. ENCODE MOBILE (1080x1920 vertical, Crop to architectural focal center + Lanczos + Unsharp, CRF 22, Faststart, No Audio)
console.log('\n[2/2] Encoding Mobile 9:16 Vertical Video (hero-mobile.mp4)...');
const t1 = Date.now();
execFileSync(ffmpeg.path, [
  '-y',
  '-i', inVideo,
  '-vf', 'crop=405:720:437:0,hqdn3d=1.0:1.0:2.0:2.0,scale=1080:1920:flags=lanczos,unsharp=5:5:0.75:3:3:0.0',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '22',
  '-maxrate', '3800k',
  '-bufsize', '7500k',
  '-pix_fmt', 'yuv420p',
  '-an',
  '-movflags', '+faststart',
  outMobilePub
], { stdio: 'inherit' });

console.log('Mobile encoding completed in', ((Date.now() - t1) / 1000).toFixed(1), 's');
fs.copyFileSync(outMobilePub, outMobileSrc);

const mobileStat = fs.statSync(outMobilePub);
console.log('Mobile file size:', (mobileStat.size / 1024 / 1024).toFixed(2), 'MB');

// 3. EXTRACT SYNCHRONIZED HIGH-RES POSTERS (0.5s)
console.log('\n[3/3] Generating synchronized posters for Desktop & Mobile...');
// Desktop Poster
const dPosterJpg = path.join(__dirname, '../website_download/images/video-banner/hero-poster.jpg');
const dPosterWebp = path.join(__dirname, '../website_download/images/video-banner/hero-poster.webp');
execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:01', '-i', outDesktopPub, '-vframes', '1', '-q:v', '2', dPosterJpg]);
execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:01', '-i', outDesktopPub, '-vframes', '1', '-c:v', 'libwebp', '-quality', '90', dPosterWebp]);
fs.copyFileSync(dPosterJpg, path.join(__dirname, '../src/images/video-banner/hero-poster.jpg'));
fs.copyFileSync(dPosterWebp, path.join(__dirname, '../src/images/video-banner/hero-poster.webp'));

// Mobile Poster
const mPosterJpg = path.join(__dirname, '../website_download/images/video-banner/hero-poster-mobile.jpg');
const mPosterWebp = path.join(__dirname, '../website_download/images/video-banner/hero-poster-mobile.webp');
execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:01', '-i', outMobilePub, '-vframes', '1', '-q:v', '2', mPosterJpg]);
execFileSync(ffmpeg.path, ['-y', '-ss', '00:00:01', '-i', outMobilePub, '-vframes', '1', '-c:v', 'libwebp', '-quality', '90', mPosterWebp]);
fs.copyFileSync(mPosterJpg, path.join(__dirname, '../src/images/video-banner/hero-poster-mobile.jpg'));
fs.copyFileSync(mPosterWebp, path.join(__dirname, '../src/images/video-banner/hero-poster-mobile.webp'));

console.log('All video & poster assets encoded successfully!');
