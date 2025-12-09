const fs = require("fs")
const path = require("path")

const filesToUpdate = [
  "./src/components/ui/Form.tsx",
  "./src/components/ui/Label.tsx",
  "./src/components/ui/Button.tsx",
  "./src/components/ui/Input.tsx",
  "./src/components/ui/Select.tsx",
  "./src/components/ui/Textarea.tsx",
  "./src/components/forms/support/ComponentFormSupport.tsx",
]

filesToUpdate.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.log("Skipped (not found):", file)
    return
  }

  const code = fs.readFileSync(file, "utf8")
  if (code.startsWith('"use client"') || code.startsWith("'use client'")) {
    console.log("Already has:", file)
    return
  }

  const newCode = '"use client"\n\n' + code
  fs.writeFileSync(file, newCode, "utf8")
  console.log("Updated:", file)
})

console.log("Done!")
