import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLInputElement> {
  name: string
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string
  options: { value: string, label: string }[]
}

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  options: { value: string, label: string }[]
}

const style = "flex-1 rounded border border-zinc-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500";

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <input 
      id={props.name}
      className={props.className || style}
      {...register(props.name)} 
      {...props}
    />
  )
}

export function Textarea(props: TextareaProps) {
  const { register } = useFormContext()

  return (
    <input 
      id={props.name}
      className={props.className}
      {...register(props.name)} 
      {...props}
    />
  )
}

export function Select(props: SelectProps) {
  const { register } = useFormContext()

  return (
    <select 
      id={props.name}
      className={props.className || style}
      {...register(props.name)} 
      {...props}
    >
      {props.options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}

export function Radio(props: RadioProps) {
  const { register } = useFormContext()
  const defaultValue = props.options.length > 0 ? props.options[0].value : '';
  return (
    <div>
      {props.options.map((option, idx) => (
        <label className="mr-4" key={option.value}>
          <input
            className="mr-0.5"
            type="radio" 
            id={`${props.name}-${option.value}`}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            {...register(props.name)} 
            {...props}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}