const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffprobe = require('@ffprobe-installer/ffprobe');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const videoPath = path.join(__dirname, '../website_download/images/video-banner/video-banner.mp4');

console.log('=== ANALYZING VIDEO FILE: ===', videoPath);
const stats = fs.statSync(videoPath);
console.log('File size:', (stats.size / 1024 / 1024).toFixed(2), 'MB (', stats.size, 'bytes )');

try {
  const probeOutput = execFileSync(ffprobe.path, [
    '-v', 'quiet',
    '-print_format', 'json',
    '-show_format',
    '-show_streams',
    videoPath
  ], { encoding: 'utf-8' });

  const info = JSON.parse(probeOutput);
  console.log('\n--- FORMAT INFO ---');
  console.log({
    filename: path.basename(info.format.filename),
    nb_streams: info.format.nb_streams,
    format_name: info.format.format_name,
    duration: parseFloat(info.format.duration).toFixed(2) + 's',
    size_mb: (info.format.size / 1024 / 1024).toFixed(2) + ' MB',
    bit_rate_kbps: Math.round(info.format.bit_rate / 1000) + ' kbps',
  });

  console.log('\n--- STREAMS INFO ---');
  info.streams.forEach((s, idx) => {
    console.log(`Stream #${idx} (${s.codec_type}):`);
    if (s.codec_type === 'video') {
      console.log({
        codec: s.codec_name,
        profile: s.profile,
        width: s.width,
        height: s.height,
        coded_width: s.coded_width,
        coded_height: s.coded_height,
        sample_aspect_ratio: s.sample_aspect_ratio,
        display_aspect_ratio: s.display_aspect_ratio,
        pixel_format: s.pix_fmt,
        color_range: s.color_range,
        color_space: s.color_space,
        r_frame_rate: s.r_frame_rate,
        avg_frame_rate: s.avg_frame_rate,
        bit_rate_kbps: s.bit_rate ? Math.round(s.bit_rate / 1000) + ' kbps' : 'N/A',
        nb_frames: s.nb_frames
      });
    } else if (s.codec_type === 'audio') {
      console.log({
        codec: s.codec_name,
        sample_rate: s.sample_rate,
        channels: s.channels,
        bit_rate_kbps: s.bit_rate ? Math.round(s.bit_rate / 1000) + ' kbps' : 'N/A'
      });
    }
  });

  // Extract frames at 1s, 5s, 15s, 30s, 60s
  const framesDir = path.join(__dirname, '../temp_analysis_frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

  const times = ['00:00:01', '00:00:05', '00:00:15', '00:00:30', '00:00:60'];
  times.forEach((t, i) => {
    const outFrame = path.join(framesDir, `frame_${i}_${t.replace(/:/g, '-')}.png`);
    execFileSync(ffmpeg.path, [
      '-y',
      '-ss', t,
      '-i', videoPath,
      '-vframes', '1',
      '-q:v', '2',
      outFrame
    ]);
    console.log(`Extracted frame at ${t} -> ${path.basename(outFrame)}`);
  });

} catch (err) {
  console.error('Error analyzing video:', err);
}
