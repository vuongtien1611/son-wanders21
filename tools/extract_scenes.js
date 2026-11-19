const { execFileSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const inVideo = 'website_download/images/video-banner/video-banner.mp4';
const scenesDir = 'temp_analysis_frames/scenes';
if (!fs.existsSync(scenesDir)) fs.mkdirSync(scenesDir, { recursive: true });

for (let s = 5; s < 95; s += 15) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const timeStr = `00:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  const outPath = `${scenesDir}/sec_${String(s).padStart(2, '0')}.png`;
  execFileSync(ffmpeg.path, ['-y', '-ss', timeStr, '-i', inVideo, '-vframes', '1', '-q:v', '2', outPath]);
}
console.log('Scenes extracted:', fs.readdirSync(scenesDir));
