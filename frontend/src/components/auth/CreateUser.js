import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';

const CreateUser = () => {
  const authContext = useContext(AuthContext);
  const { user, createUser } = authContext;
  console.log(user);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    street: '',
    phone: '',
    kennitala: user.kennitala,
    company: user.company
  });

  const handleKeyDown = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      kennitala: user.kennitala,
      company: user.company
    });
  };
  console.log(authContext);
  return (
    <div>
      <div className='form-container'>
        <form>
          <h3 className='heading-3'>Nýr notandi</h3>
          <div className='input-field'>
            <label htmlFor='email'>Netfang</label>
            <input type='email' name='email' onChange={handleKeyDown} />
          </div>

          <div className='input-field'>
            <label htmlFor='password'>Lykilorðs</label>
            <input type='password' name='password' onChange={handleKeyDown} />
          </div>

          <div className='input-field'>
            <label htmlFor='name'>Nafn</label>
            <input type='text' name='name' onChange={handleKeyDown} />
          </div>
          <div className='input-field'>
            <label htmlFor='phone'>Símanúmer</label>
            <input type='text' name='phone' onChange={handleKeyDown} />
          </div>
          <div className='input-field'>
            <label htmlFor='street'>Gata</label>
            <input type='text' name='street' onChange={handleKeyDown} />
          </div>
          <div className='input-field'>
            <label htmlFor='kennitala'>Kennitala</label>
            <input
              type='text'
              name='kennitala'
              value={user.kennitala}
              disabled
            />
          </div>
          <div className='input-field'>
            <label htmlFor='company'>Fyrirtæki</label>
            <input type='text' name='company' value={user.company} disabled />
          </div>
          <div className='input-field'>
            <button
              onClick={e => {
                e.preventDefault();
                createUser(user, form);
              }}
            >
              Staðfesta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
