import styles from "./styles.module.css";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <button type="button" className={styles.button} {...rest}>
      {title}
    </button>
  );
}
