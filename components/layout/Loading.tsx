import { EmojiHappyIcon } from "@heroicons/react/solid";

export default function Loading() {
  return (
    <div className="p-16">
      <EmojiHappyIcon className="h-32 w-32 animate-spin" />
    </div>
  );
}
