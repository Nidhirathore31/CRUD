
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const {index}= useParams();
  
  const navigate = useNavigate();


  useEffect(() => {
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setNum(localStorage.getItem("num"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("formData"));

    const updatedEntry = {
      name: name,
      email: email,
      num: num
    };

    storedData[index] = updatedEntry;
    localStorage.setItem("formData", JSON.stringify(storedData));
    navigate(`/table/${name}/${email}/${num}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className="form-control m-1"
          placeholder='Enter Your Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='text'
          className="form-control m-1"
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control m-1"
          placeholder='Enter your Number'
          value={num}
          onChange={(e) => setNum(e.target.value)}
          required
        />
        <button type='submit' className="btn btn-success m-1">Save</button>
      </form>
    </>
  );
};

export default Update;
