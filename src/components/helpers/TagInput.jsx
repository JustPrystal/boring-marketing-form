import React, { useState } from "react";

const TagInput = ({ onTagsChange, className }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    createTags(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createTags(inputValue);
    }
  };

  const createTags = (value) => {
    const rawTags = value.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => {
        const cleanedTag = isValidUrl(tag);
        return cleanedTag !== null;
      })
      .map((tag) => isValidUrl(tag)); // Clean the URL before adding it to the list
    setTags((prevTags) => [...prevTags, ...rawTags]);
    setInputValue("");
    onTagsChange(tags);
  };

  const isValidUrl = (string) => {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?/;
    const match = string.match(pattern);
    if (match) {
      const cleanUrl = match[0].split('?')[0]; // Remove everything after the first ?
      return cleanUrl;
    }
    return null;
  };

  const handleTagRemove = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <div className="form-group" style={{ marginBottom: '20px' }}>
      <div>
        <input
          type="text"
          className={className}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          placeholder="Enter URLs separated by commas"
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}>
        {tags.map((tag, index) => (
          <div key={index}>
            <span>{tag}</span>
            <button onClick={() => handleTagRemove(tag)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
