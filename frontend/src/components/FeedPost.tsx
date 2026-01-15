import { Heart, MessageCircle, Send } from "lucide-react";

interface FeedPostProps {
  username: string;
  imageUrl: string;
  caption: string;
  timeLabel: string;
}

const FeedPost = ({ username, imageUrl, caption, timeLabel }: FeedPostProps) => {
  return (
    <article className="rounded border border-gray-200 bg-white">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
        <span className="text-sm font-semibold text-gray-900">{username}</span>
      </div>
      <img className="w-full" src={imageUrl} alt={caption} />
      <div className="flex items-center gap-4 px-4 py-3">
        <button className="text-gray-900" type="button">
          <Heart className="h-5 w-5" />
        </button>
        <button className="text-gray-900" type="button">
          <MessageCircle className="h-5 w-5" />
        </button>
        <button className="text-gray-900" type="button">
          <Send className="h-5 w-5" />
        </button>
      </div>
      <div className="px-4 pb-4 text-sm text-gray-900">
        <span className="font-semibold">{username}</span> {caption}
      </div>
      <div className="px-4 pb-4 text-xs text-gray-500">{timeLabel}</div>
    </article>
  );
};

export default FeedPost;
