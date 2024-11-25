
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Form = ({ setFormData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [num, setNum] = useState("");
    const [errors,setErrors] = useState({})
    

    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
      let error = {}
        if (!name || !email || !num) {
         alert("Oops, something is missing");
        } else if (name.length < 4) {
           error.name="Username must contain at least 4 characters" 
        } else if (!/^[A-Za-z]+$/.test(name)) {
            error.name="Name must contain alphabets only";
        } else if (num.length < 10) {
            error.num="Number must contain 10 digits";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email="Invalid email";
        }
        if(Object.keys(error).length >0){
            setErrors(error)
            return ;
        }

           
        else {
            const newEntry = { name, email, num };
            const storedData = JSON.parse(localStorage.getItem("formData")) || [];
            const updatedData = [...storedData, newEntry];
            localStorage.setItem("formData", JSON.stringify(updatedData));
            setFormData(updatedData);
            navigate(`/table/${name}/${email}/${num}`);
        }
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} >                    
                <input
                    type='text'
                    className="form-control m-1"
                    placeholder='Enter Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
                <input
                    type='text'
                    className="form-control  m-1"
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                 {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
                <input
                    type="number"
                    className="form-control  m-1"
                    placeholder='Enter your Number'
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    required
                />
                 {errors.num && <p style={{color:"red"}}>{errors.num}</p>}
                <button type='submit' className="btn btn-success  m-1">ADD</button>
                <Link to='/table/:name/:email/:num'><button type='submit' className="btn btn-success  m-1">LIST</button></Link>
                
            </form>
            
        </>
    );
}

export default Form;
