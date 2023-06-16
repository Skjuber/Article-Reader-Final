import React, { useState } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import { ReactComponent as SearchIcon } from "../UI/assets/images/Search.svg";

interface SearchProps {
  handleSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchClick = () => {
    handleSearch(searchTerm);
  };

  return (
    <TextField
      id="search"
      type="search"
      placeholder="Search News"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <Button onClick={onSearchClick} color="primary">
            Search
          </Button>
        ),
      }}
    />
  );
};

export default Search;
