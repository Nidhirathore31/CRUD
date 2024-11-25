         
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Table = () => {
  const [delData, setDelData] = useState([]);
  const {name,email,num} = useParams();
 console.log(name);
 console.log(email);
 console.log(num);



  const navigate = useNavigate();
 
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setDelData(JSON.parse(storedData));
    }
  }, []);

  const updateLocalStorage = (updatedData) => {
    localStorage.setItem('formData', JSON.stringify(updatedData));
  };
  function setData(name, email, num) {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('num', num);
  }

  const handleDelete = (index) => {
    const updatedData = delData.filter((item, id) => id !== index);
    setDelData(updatedData);
    updateLocalStorage(updatedData);
  };

  const handleUpdate = (data, index) => {
    setData(data.name, data.email, data.num);
    localStorage.setItem("updatedIndex", index)
    navigate(`/update/${index}`);
  };
 


  return (
    <>
      <table className="table table-striped table-bordered border-primary">
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>NUMBER</th>
            <th>CHANGES</th>
          </tr>
        </thead>
        <tbody>
          {delData.length > 0 ? (
            delData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.num}</td>
                <td>
                  <button
                    className='btn btn-outline-info'
                    onClick={() => handleUpdate(data, index)}
                  >
                    Update
                  </button>
                  <button
                    className='btn btn-outline-danger'
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      
      </table>
      <Link to='/'>BACK</Link>
    </>
  );
};

export default Table;
