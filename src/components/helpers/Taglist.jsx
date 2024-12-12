import React from 'react';

const TagList = ({ tags, setTags }) => {

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div  style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
      {tags.map((tag, index) => (
        <div 
          key={index}
          style={{
            margin: '5px',
            padding: '5px 10px',
            borderRadius: '20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span >{tag}</span>
          <button 
            onClick={() => handleTagRemove(tag)}
            style={{
              marginLeft: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default TagList;