import { ComponentPropsWithRef, useRef, useState } from "react"
import { LuCheck, LuClipboardCopy } from "react-icons/lu"

import useCopyToClipboard from "@/hooks/useCopyToClipboard"

export const Pre = (props: ComponentPropsWithRef<"pre">) => {
  const preRef = useRef<HTMLPreElement>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [copy] = useCopyToClipboard()
  return (
    <div className="relative p-0">
      <div className="absolute right-4 top-2">
        <button
          onClick={() => {
            copy(preRef?.current?.textContent ?? "").then(() => {
              setIsCopied(true)
              setTimeout(() => setIsCopied(false), 1500)
            })
          }}
          title="Copy code"
          aria-label="Copy code"
          aria-labelledby="Copy code"
          className="copy"
        >
          <span
            data-text-end="Copied!"
            data-text-initial="Copy to clipboard"
            className="tooltip"
          ></span>
          {isCopied ? <LuCheck size={20} /> : <LuClipboardCopy size={20} />}
        </button>
      </div>
      <pre {...props} ref={preRef}>
        {props.children}
      </pre>
    </div>
  )
}

export function CustomCode(props: ComponentPropsWithRef<"code">) {
  const language = props.className?.includes("language")
    ? props.className.replace("language-", "").replace(" code-highlight", "")
    : null

  return (
    <code {...props} data-code-type={language && "code-block"} className="bg-transparent">
      {language ? (
        <div className="overflow-x-auto pt-2">{props.children}</div>
      ) : (
        <span>{props.children}</span>
      )}
    </code>
  )
}
