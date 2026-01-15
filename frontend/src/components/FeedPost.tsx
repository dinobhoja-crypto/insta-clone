import { Heart, MessageCircle, Send } from "lucide-react";

interface FeedPostProps {
  username: string;
  imageUrl: string;
  caption: string;
  timeLabel: string;
  likedBy: string[];
  likesCount: number;
}

const FeedPost = ({
  username,
  imageUrl,
  caption,
  timeLabel,
  likedBy,
  likesCount,
}: FeedPostProps) => {
  return (
    <article className="rounded border border-[#dbdbdb] bg-white">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="h-8 w-8 rounded-full border border-[#dbdbdb] bg-gray-200" />
        <span className="text-sm font-semibold text-[#262626]">{username}</span>
      </div>
      <img className="w-full" src={imageUrl} alt={caption} />
      <div className="flex items-center gap-4 px-4 py-3">
        <button className="text-[#262626] transition-transform hover:scale-110" type="button">
          <Heart className="h-5 w-5" />
        </button>
        <button className="text-[#262626] transition-transform hover:scale-110" type="button">
          <MessageCircle className="h-5 w-5" />
        </button>
        <button className="text-[#262626] transition-transform hover:scale-110" type="button">
          <Send className="h-5 w-5" />
        </button>
      </div>
      <div className="px-4 text-sm text-[#262626]">
        <span className="font-semibold">Liked by</span>{" "}
        <span className="font-semibold">{likedBy[0]}</span>
        {likedBy.length > 1 && (
          <>
            {" "}
            and{" "}
            <span className="font-semibold">{likedBy[1]}</span>
          </>
        )}{" "}
        <span className="text-sm text-[#262626]">and {likesCount} others</span>
      </div>
      <div className="px-4 pt-2 text-sm text-[#262626]">
        <span className="font-semibold">{username}</span> {caption}
      </div>
      <div className="px-4 pt-2 text-xs text-[#8e8e8e]">View all comments</div>
      <div className="px-4 pb-4 pt-1 text-[11px] uppercase text-[#8e8e8e]">{timeLabel}</div>
    </article>
  );
};

export default FeedPost;
