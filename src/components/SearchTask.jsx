// eslint-disable-next-line react/prop-types
const SearchTask = ({ searchInput, setSearchInput }) => {
  return (
    <>
      <div className="flex gap-2 p-2 items-center justify-center max-sm:py-1 max-sm:gap-0.5">
        <label className="font-bold">Search Task:</label>
        <input
          type="text"
          className="outline-none focus:ring focus:ring-gray-950 rounded py-1 px-2"
          placeholder="Search Task"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
      </div>
    </>
  );
};

export default SearchTask;
