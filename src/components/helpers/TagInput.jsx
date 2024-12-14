import React from 'react';
import { useState } from "react";

export default function TagInput({ onTagsChange, className, name, label, error, methods }) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [inputError, setInputError] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputError("");
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      createTags(inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        createTags(inputValue);
      }
    }
  };

  const createTags = (value) => {
    const rawTags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const validTags = rawTags.map((tag) => isValidUrl(tag)).filter((tag) => tag !== null);

    if (validTags.length < rawTags.length) {
      setInputError("Please enter a valid URL.");
    } else {
      setInputError(""); // Clear error if all URLs are valid
    }

    if (validTags.length > 0) {
      setTags((prevTags) => [...prevTags, ...validTags]);
      setInputValue("");
      onTagsChange([...tags, ...validTags]);

      methods.clearErrors("url");
    }
  };

  const isValidUrl = (string) => {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?/;
    const match = string.match(pattern);
    if (match) {
      const cleanUrl = match[0].split('?')[0]; // Remove everything after the first ?
      return cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`;
    }
    return null;
  };

  const handleTagRemove = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange(newTags);
  };


  return (
    <div className="form-group">
      <div className="tag-input-wrap">
        {label ? <label className="input-label" for={name}> {label}</label> : ''}
        <input
          type="text"
          className={className}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          placeholder="Enter URLs, separated by commas or spaces."
          name={name}
        />
      </div>
      {/* Display error message from react-hook-form if it exists */}
      {error && !inputError && <p className="error-message">{error.message}</p>}

      {/* Display input-specific error (e.g., URL error) only if there is no react-hook-form error */}
      {inputError && <p className="error-message">{inputError}</p>}
      {tags.length > 0 && (
        <div className="url-input-wrap">
          {tags.map((tag, index) => (
            <div key={index} className="url-input">
              <span className="url-input-text">{tag}</span>
              <button type="button" className="url-input-cross" onClick={() => handleTagRemove(tag)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none" >
                  <line x1="1.14648" y1="10.6464" x2="11.1464" y2="0.646442" stroke="black" />
                  <line x1="0.853584" y1="0.646447" x2="10.8535" y2="10.6464" stroke="black" />
                </svg>
              </button>
            </div>
          ))}

        </div>
      )}
    </div>

  );
};