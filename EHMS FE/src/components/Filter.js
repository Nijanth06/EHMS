import React from "react";
import { useState } from "react";

/* Object.values(data).filter((user) */

const Filter = (data) => {
  console.log(data);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(null);
  const filter = (value) => {
    if (input !== " ") {
      const result = data.data.filter((user) => {
        return user && user.firstName.toLowerCase().includes(value);
      });
      console.log(result);
      setSearch([]);
      data.setFilteredData();

      if (result.length > 0) setSearch(result);
      data.setFilteredData(result);
      console.log("data : ", search);
    }
    console.log(search);
    return search;
  };
  const handleChange = (value) => {
    setInput(value);
    filter(value);
  };
  return (
    <form class="form-inline my-2 my-lg-0">
      <input
        type="text"
        class="form-control mr-sm-3"
        placeholder="Search by name"
        aria-label="Search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  );
};

export default Filter;
