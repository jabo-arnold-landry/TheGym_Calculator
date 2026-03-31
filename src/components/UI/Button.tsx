import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface BtnProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, className, ...props }: BtnProp) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export default Button;
