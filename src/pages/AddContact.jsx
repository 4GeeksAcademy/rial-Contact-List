import {Link, useParams} from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();

  const handlerCreate = async () => {
    try {
      let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgendaSlug}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: document.getElementById("fullName").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          address: document.getElementById("address").value
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      console.log("Contact created:", data);
      document.getElementById("fullName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("address").value = "";
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <div className="container text-center">
        <h3 className='mt-4'>Add a new contact</h3>

    <br />

    <div className='row'>
      <div className='col-md-6 offset-md-3 text-start'>
        <label htmlFor="fullName">Full Name</label><br />
        <input className='w-100' type="text" id="fullName" placeholder="Enter full name" />
      </div>      
    </div>
    <br />
    <div className='row'>
      <div className='col-md-6 offset-md-3 text-start'>
        <label htmlFor="email">Email</label><br />
        <input className='w-100' type="text" id="email" placeholder="Enter E-mail" />
      </div>      
    </div>
    <br />
    <div className='row'>
      <div className='col-md-6 offset-md-3 text-start'>
        <label htmlFor="phone">Phone</label><br />
        <input className='w-100' type="text" id="phone" placeholder="Enter phone number" />
      </div>      
    </div>
    <br />
    <div className='row'>
      <div className='col-md-6 offset-md-3 text-start'>
        <label htmlFor="address">Address</label><br />
        <input className='w-100' type="text" id="address" placeholder="Enter address" />
      </div>      
    </div>
    <br />
    <div className='row'>
      <div className='col-md-6 offset-md-3 text-center'>
        <button className='btn btn-secondary' onClick={handlerCreate}>Add new contact</button>
      </div>      
    </div>

    <br />

    <Link to="/agenda">
            <button className="btn btn-primary">Back Agenda</button>
    </Link>
    </div>
    );
};