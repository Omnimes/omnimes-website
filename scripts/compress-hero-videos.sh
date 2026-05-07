#!/usr/bin/env bash
# Compress hero videos to ~5 MB H.264 720p + WebM/VP9 fallback.
# Run from repo root after `brew install ffmpeg`.
set -euo pipefail

DIR="public/videos"
cd "$(dirname "$0")/.."

for lang in pl en; do
  src="$DIR/video.$lang.mp4"
  if [ ! -f "$src" ]; then
    echo "SKIP: $src not found"
    continue
  fi
  echo "==> Compressing $src"
  cp "$src" "$src.original"

  # H.264 720p, target ~5 MB
  ffmpeg -y -i "$src.original" -c:v libx264 -preset slow -crf 28 \
    -vf "scale='min(1280,iw)':-2" \
    -c:a aac -b:a 96k -movflags +faststart \
    "$DIR/video.$lang.tmp.mp4"
  mv "$DIR/video.$lang.tmp.mp4" "$src"

  # WebM VP9 fallback (smaller on modern browsers)
  ffmpeg -y -i "$src.original" -c:v libvpx-vp9 -crf 35 -b:v 0 \
    -vf "scale='min(1280,iw)':-2" \
    -c:a libopus -b:a 96k \
    "$DIR/video.$lang.webm"

  echo "    Original: $(du -h "$src.original" | cut -f1)"
  echo "    H.264:    $(du -h "$src" | cut -f1)"
  echo "    WebM:     $(du -h "$DIR/video.$lang.webm" | cut -f1)"
done

echo
echo "If sizes look good, remove originals:"
echo "  rm $DIR/video.*.mp4.original"
