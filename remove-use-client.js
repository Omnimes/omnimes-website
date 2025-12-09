const fs = require("fs")
const path = require("path")

function processFile(file) {
  const code = fs.readFileSync(file, "utf8")

  // Usuń "use client" z początku pliku
  const newCode = code
    .replace(/^"use client";\n\n/, "")
    .replace(/^'use client';\n\n/, "")
    .replace(/^"use client";\n/, "")
    .replace(/^'use client';\n/, "")

  if (code !== newCode) {
    fs.writeFileSync(file, newCode, "utf8")
    console.log("Removed from:", file)
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (entry.isFile() && entry.name === "page.tsx") {
      processFile(full)
    }
  }
}

walk("./src/app")
console.log("Done!")
