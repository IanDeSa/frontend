import { LabelHTMLAttributes } from "react";

const style = "text-sm text-zinc-600 flex items-center justify-between";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label 
      className={props.className || style}
      {...props}
    />
  )
}