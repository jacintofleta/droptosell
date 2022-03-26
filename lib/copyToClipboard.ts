import { toast } from "react-toastify";

type Props = {
  text: string;
  message: string;
};

export const copyToClipboard = ({ text, message }: Props) => {
  navigator.clipboard.writeText(text);
  toast(message);
};
