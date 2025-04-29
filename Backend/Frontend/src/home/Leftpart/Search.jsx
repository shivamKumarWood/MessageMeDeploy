import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
      <form onSubmit={handleSubmit}>
      <div className="flex space-x-3">
        <label className="input input-bordered rounded-lg p-3 bg-slate-800 border border-gray-400 flex items-center gap-2 w-[80%]">
          <input type="search" className="grow" placeholder="Search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button className="text-3xl p-2 hover:bg-gray-600 rounded-full duration-300 cursor-pointer">
          <FaSearch />
        </button>
      </div>
      </form>
    </div>
    </div>
  );
}

export default Search;
