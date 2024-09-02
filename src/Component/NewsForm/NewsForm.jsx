import React, { useState } from 'react';
import './NewsForm.scss';
import Nav from "../nav/Nav";
import { useUserAuth } from "../../context/UserAuthContext";


const NewsForm = () => {
  const [formData, setFormData] = useState({
    content: "",
    description: "",
    link: "",
    img_url: "",
    title: ""
  });
  const {addNews} =useUserAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to a server
    console.log('Form Data Submitted:', formData);
    addNews(formData)
    setFormData({
      content: "",
      description: "",
      link: "",
      img_url: "",
      title: ""
    });
  };

  return (<>
    <Nav />
    <div className="form-container">
      <h2 className='heading-news'>Upload News Details</h2>
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="link">Image Url</label>
          <input
            type="content"
            id="img_url"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Content Link</label>
          <input
            type="content"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>

      

        <button type="submit" className="submit-btn-news">Submit</button>
      </form>
    </div>
    </>
  );
};

export default NewsForm;
