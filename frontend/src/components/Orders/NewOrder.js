import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import uuid from 'uuid';

const NewOrder = ({ order }) => {
  const authContext = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: 1,
    // orderNr: uuid().slice(0, 7),
    type: '',
    size: 'small',
    description: ''
  });
  const [styles, setStyles] = useState({
    notActive: '1',
    active: '0.5'
  });
  const [selectedBox, setSelectedBox] = useState('lítill');
  const [boxVisibility, setBoxVisibility] = useState('hide');
  const handleOnChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    console.log('handle submit running');
    e.preventDefault();
    fetch('http://localhost:3001/new-order', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        form: form,
        user: authContext.user,
        currentOrder: order
      })
    }).then(() => authContext.getOrders());
  };
  const getSize = e => {
    setSelectedBox(e.target.name);
  };

  const showBoxes = e => {
    setBoxVisibility('show');
    setSelectedBox('lítill');
    console.log(boxVisibility);
  };
  const hideBoxes = () => {
    setBoxVisibility('hide');
  };
  return (
    <div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h3 className='heading-3'>{order ? order.order : 'Ný pöntun'}</h3>
          <div className='input-field'>
            <label htmlFor='name'>Nafn viðtakanda</label>
            <input type='text' name='name' required onChange={handleOnChange} />
          </div>
          <div className='input-field'>
            <label htmlFor='email'>Netfang viðtakanda</label>
            <input
              type='email'
              name='email'
              required
              onChange={handleOnChange}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='phone'>Símanúmer viðtakanda</label>
            <input
              type='phone'
              name='phone'
              required
              onChange={handleOnChange}
            />
          </div>

          <div className='input-field'>
            <label htmlFor='amount'>Fjöldi pakka</label>
            <select
              value={form.amount}
              name='amount'
              required
              onChange={handleOnChange}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          {/* <div className='input-field'>
            <label htmlFor='orderNr'>Pöntunarnúner</label>
            <input
              type='text'
              name='orderNr'
              onChange={handleOnChange}
              disabled
              value={form.orderNr}
            />
          </div> */}
          <div
            className='input-field'
            style={
              boxVisibility === 'show'
                ? { display: 'none' }
                : { display: 'block' }
            }
          >
            <label>Sending</label>
            <div className='delivery-holder'>
              <div className='radio-field smartbox'>
                <label>Í snjallbox</label>
                <label htmlFor='smartbox'>
                  <img
                    name='lítill'
                    className='box'
                    src='/assets/img/box.png'
                    name='smartbox'
                    alt=''
                    style={
                      selectedBox === 'smartbox'
                        ? {
                            opacity: '0.5'
                          }
                        : { opacity: '1' }
                    }
                    onClick={showBoxes}
                  />
                </label>

                <input
                  className='radio'
                  type='radio'
                  value='smartbox'
                  name='type'
                  id='smartbox'
                  onChange={handleOnChange}
                />
              </div>
              <div className='radio-field'>
                <label>Í hillu</label>
                <label htmlFor='shelf'>
                  <img
                    name='shelf'
                    className='shelf'
                    src='/assets/img/shelf.svg'
                    alt='Í hillu'
                    onClick={getSize}
                    style={
                      selectedBox === 'shelf'
                        ? {
                            opacity: '0.5'
                          }
                        : { opacity: '1' }
                    }
                  />
                </label>

                <input
                  className='radio'
                  type='radio'
                  value='shelf'
                  name='type'
                  id='shelf'
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          <div
            className='input-field'
            style={
              boxVisibility === 'hide'
                ? { display: 'none' }
                : { display: 'block' }
            }
          >
            <label>Stærð</label>
            <div className='radio-holder'>
              <div className='radio-field'>
                <label>Lítill</label>
                <label htmlFor='small'>
                  <img
                    name='lítill'
                    className='box-1'
                    src='/assets/img/box.png'
                    alt=''
                    onClick={getSize}
                    style={
                      selectedBox === 'lítill'
                        ? {
                            opacity: '0.5'
                          }
                        : { opacity: '1' }
                    }
                  />
                </label>

                <input
                  className='radio'
                  type='radio'
                  value='small'
                  name='size'
                  id='small'
                  onChange={handleOnChange}
                />
              </div>
              <div className='radio-field'>
                <label>Miðlungs</label>
                <label htmlFor='medium'>
                  <img
                    name='miðlungs'
                    className='box-2'
                    src='/assets/img/box.png'
                    alt=''
                    onClick={getSize}
                    style={
                      selectedBox === 'miðlungs'
                        ? {
                            opacity: '0.5'
                          }
                        : { opacity: '1' }
                    }
                  />
                  <input
                    className='radio'
                    type='radio'
                    value='medium'
                    name='size'
                    id='medium'
                    onChange={handleOnChange}
                  />
                </label>
              </div>
              <div className='radio-field'>
                <label>Stór</label>
                <label htmlFor='large'>
                  <img
                    name='stór'
                    className='box-3'
                    src='/assets/img/box.png'
                    alt=''
                    onClick={getSize}
                    style={
                      selectedBox === 'stór'
                        ? {
                            opacity: '0.5'
                          }
                        : { opacity: '1' }
                    }
                  />
                  <input
                    className='radio'
                    type='radio'
                    value='large'
                    name='size'
                    id='large'
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className='input-field'>
            <label htmlFor='description'>Lýsing á sendingu</label>
            <textarea name='description' onChange={handleOnChange} />
          </div>
          <div className='input-field'>
            <button>Staðfesta</button>
          </div>
        </form>
      </div>
      <div
        class='icon-svg icon-arrow-left'
        style={
          boxVisibility === 'hide'
            ? { display: 'none' }
            : { display: 'inline-block' }
        }
        onClick={hideBoxes}
      ></div>
    </div>
  );
};

export default NewOrder;
