import { Heart } from "lucide-react";

const profilePosts = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  imageUrl:
    index % 2 === 0
      ? "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
      : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  likes: 120 + index * 3,
}));

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#dbdbdb] bg-gray-200 md:h-32 md:w-32" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-xl font-semibold text-[#262626]">alexr</h1>
            <button className="rounded border border-[#dbdbdb] px-4 py-1 text-sm font-medium text-[#262626] hover:bg-gray-50">
              Edit Profile
            </button>
          </div>
          <div className="flex gap-6 text-sm text-[#262626]">
            <span>
              <strong className="font-semibold">54</strong> posts
            </span>
            <span>
              <strong className="font-semibold">1,204</strong> followers
            </span>
            <span>
              <strong className="font-semibold">318</strong> following
            </span>
          </div>
          <div className="text-sm text-[#262626]">
            <div className="font-semibold">Alex Rivers</div>
            <p className="text-sm text-[#262626]">Capturing soft light and city mornings.</p>
          </div>
        </div>
      </header>

      <section>
        <div className="grid grid-cols-3 gap-[3px]">
          {profilePosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-gray-100"
            >
              <img className="h-full w-full object-cover" src={post.imageUrl} alt="Post" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Heart className="h-4 w-4 fill-white" />
                  {post.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
