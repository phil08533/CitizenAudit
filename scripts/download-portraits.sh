#!/usr/bin/env bash
# Run this once from the project root to download all founding father portraits.
# Requires: curl
# Usage: bash scripts/download-portraits.sh

set -e
DEST="public/portraits"
mkdir -p "$DEST"

download() {
  local name="$1" url="$2"
  echo "Downloading $name..."
  curl -sL \
    -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120" \
    --retry 3 \
    "$url" -o "$DEST/$name.jpg"
  local size; size=$(stat -c%s "$DEST/$name.jpg" 2>/dev/null || stat -f%z "$DEST/$name.jpg")
  if [ "$size" -lt 1000 ]; then
    echo "  WARNING: $name.jpg may be empty ($size bytes) — check the URL"
  else
    echo "  OK ($size bytes)"
  fi
}

download washington   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/400px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
download franklin     "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Joseph_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/400px-Joseph_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg"
download jefferson    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29%281%29.jpg/400px-Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29%281%29.jpg"
download hamilton     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Hamilton_portrait_by_John_Trumbull_1806.jpg/400px-Hamilton_portrait_by_John_Trumbull_1806.jpg"
download madison      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/James_Madison.jpg/400px-James_Madison.jpg"
download adams        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Gilbert_Stuart%2C_John_Adams%2C_c._1800-1815%2C_NGA_42933.jpg/400px-Gilbert_Stuart%2C_John_Adams%2C_c._1800-1815%2C_NGA_42933.jpg"
download paine        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Thomas_Paine_print.jpg/400px-Thomas_Paine_print.jpg"
download henry        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Patrick_Henry_Rothermel.jpg/400px-Patrick_Henry_Rothermel.jpg"
download samuel_adams "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Samuel_Adams_by_John_Singleton_Copley.jpg/400px-Samuel_Adams_by_John_Singleton_Copley.jpg"
download rush         "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Benjamin_Rush_Painting_by_Peale_1783.jpg/400px-Benjamin_Rush_Painting_by_Peale_1783.jpg"

echo ""
echo "Done. Files saved to $DEST/"
echo "Now update src/data/foundingFathers.ts image paths to /CitizenAudit/portraits/NAME.jpg"
