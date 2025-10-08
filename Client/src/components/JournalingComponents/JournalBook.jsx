import { useState } from "react";

export default function JournalBook({ onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const date = new Date().toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { title, description, date };
    console.log("Journal Entry:", entry);
    if (onSave) onSave(entry);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#faf3e0] to-[#f0e5cf] p-6">
      <div className="relative bg-[#fffaf0] shadow-lg w-full max-w-3xl rounded-2xl border border-[#e0d4b7]">
        {/* Spiral Binding */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-center items-center px-2">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full my-1"
            ></div>
          ))}
        </div>

        {/* Notebook Content */}
        <form
          onSubmit={handleSubmit}
          className="ml-8 px-8 py-6 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-[#4a3f35] mb-2 font-serif">
            Dear Journal ✍️
          </h2>

          {/* Title */}
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-semibold border-b border-[#d1bfa7] bg-transparent outline-none focus:border-[#a1866f] placeholder:text-[#b7a38a] font-serif"
          />

          {/* Date */}
          <p className="text-sm text-[#9e8e7a] font-mono">{date}</p>

          {/* Description */}
          <textarea
            placeholder="Start writing your thoughts here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-64 resize-none bg-transparent outline-none text-[#3f2e20] text-lg font-serif leading-relaxed p-2 border border-[#e0d4b7] rounded-md shadow-inner focus:border-[#a1866f]"
          />

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#a1866f] hover:bg-[#8b715b] text-white px-6 py-2 rounded-md font-semibold shadow-md transition-all"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
