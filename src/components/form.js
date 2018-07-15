import React from "react";

const Form = ({ props, handleChange }) => (
  <div>
    <div>
      <label htmlFor="title">Title: </label>
      <input
        id="title"
        name="title"
        type="text"
        value={props.title}
        onChange={e => handleChange(e, "title")}
      />
    </div>
    <div>
      <label htmlFor="category">Category: </label>
      <input
        id="category"
        name="category"
        type="text"
        value={props.category}
        onChange={e => handleChange(e, "category")}
      />
      <select
        value={props.category}
        onChange={e => handleChange(e, "category")}
      >
        <option value="culture">Culture</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="tech">Tech</option>
      </select>
    </div>
    <div>
      <label htmlFor="content">Write New Post: </label>
      <textarea
        id="content"
        name="content"
        value={props.content}
        onChange={e => handleChange(e, "content")}
        type="text"
      />
    </div>
  </div>
);

export default Form;
