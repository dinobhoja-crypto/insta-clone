import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const previewUrl = useMemo(() => {
    if (!file) {
      return "";
    }
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    if (!previewUrl) {
      return;
    }
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Create new post</h2>
          <button className="text-gray-500 hover:text-gray-900" type="button" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-4 px-6 py-6 md:grid-cols-[2fr_1fr]">
          <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center text-sm text-gray-500">
            {previewUrl ? (
              <img className="h-full w-full object-cover" src={previewUrl} alt="Preview" />
            ) : (
              <>
                <span className="text-gray-700">Select an image</span>
                <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
              </>
            )}
            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600">
              <div className="font-semibold text-gray-900">Preview</div>
              <div className="mt-1 text-xs text-gray-500">
                Add a caption before sharing.
              </div>
            </div>
            <textarea
              className="h-32 resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none"
              placeholder="Write a caption..."
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
            <button
              className="rounded-lg bg-[#0095f6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1877f2]"
              type="button"
              onClick={onClose}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
