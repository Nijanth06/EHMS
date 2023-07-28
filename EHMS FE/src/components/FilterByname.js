import React from 'react'
import { useState } from 'react';

const FilterByName = (data) => {
  console.log();
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(null);
  const filter = (value) => {
    if (input !== " ") {
      const result = data.data.filter((user) => {
        console.log(user && user.name.toLowerCase().includes(value));
        return user && user.name.toLowerCase().includes(value);
      })
      console.log(result);
      setSearch([]);
      data.setFilteredData()

      if (result.length > 0)
        setSearch(result);
        data.setFilteredData(result)
      console.log("data : ", search);
    }
    return search
  }
  const handleChange = (value) => {
    setInput(value);
    filter(value);
  }
  return (
    <form class="form-inline my-2 my-lg-0">
      <input type="text" class="form-control mr-sm-3" placeholder="Search by name" aria-label="Search"
        value={input} onChange={(e) => handleChange(e.target.value)}
      />
    </form>
  )
}

export default FilterByName