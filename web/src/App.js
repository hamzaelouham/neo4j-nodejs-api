import React from "react";
import Nav from "./components/Nav";
import Search from "./components/Search";

function App() {
  const [search, setSearch] = React.useState("");
  const url = `http://localhost:5000/query/${search}`;
  const SearchHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await (await fetch(url)).json();
      console.log(result);
    } catch (error) {}
  };

  return (
    <div className="h-screen bg-gray-100">
      <Nav />
      <Search
        search={search}
        setSearch={setSearch}
        SearchHandler={SearchHandler}
      />
    </div>
  );
}

export default App;
