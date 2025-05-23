import { ChangeEvent, ReactNode, useCallback } from "react";
import { CommonInputProps } from "@/components/Input";

type InputBaseProps<T> = CommonInputProps<T> & {
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const InputBase = <
  T extends { toString: () => string } | undefined = string
>({
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
}: InputBaseProps<T>) => {
  let modifier = "";
  if (error) {
    modifier = "border border-error";
  } else if (disabled) {
    modifier = "border border-disabled bg-base-300";
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as unknown as T);
    },
    [onChange]
  );

  return (
    <div className={`flex bg-gray-200 rounded-lg text-accent ${modifier}`}>
      {prefix}
      <input
        className="input input-ghost focus:outline-none focus:bg-transparent focus:text-foreground h-10 px-4 border w-full placeholder:text-gray-400 text-foreground disabled:bg-gray-200"
        placeholder={placeholder}
        name={name}
        value={value?.toString()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
      />
      {suffix}
    </div>
  );
};
