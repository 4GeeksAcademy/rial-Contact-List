import { Link, useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const EditContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const { contactId } = useParams();
  const navigate = useNavigate();

  const handlerEdit = async () => {
    alert(`Contact edited (functionality to be implemented) for contact ID: ${contactId}`);

    const updatedContact = {
        name: store.fullName,
        email: store.email,
        phone: store.phone,
        address: store.address
    };

    try {
      let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgendaSlug}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedContact)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      console.log("Contact edited:", data);
      navigate("/agenda");
      
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  useEffect(() => {
    // Buscamos el contacto en el array que ya tienes en el store
    const contact = store.contactsInSelectedAgenda.find(c => c.id === parseInt(contactId));

    if (contact) {
      // Seteamos cada campo del store individualmente usando tus acciones
      dispatch({ type: 'SET_FULL_NAME', payload: contact.name });
      dispatch({ type: 'SET_EMAIL', payload: contact.email });
      dispatch({ type: 'SET_PHONE', payload: contact.phone });
      dispatch({ type: 'SET_ADDRESS', payload: contact.address });
    }
  }, [contactId, store.contactsInSelectedAgenda, dispatch]);

  return (
    <div className="container text-center">
      <h3 className="mt-4">Edit Contact</h3>
      <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-start'>
          <label htmlFor="fullName">Full Name</label><br />
          <input className='w-100' type="text" id="fullName" autoComplete="name" value={store.fullName || ''} 
          onChange={(e) => dispatch({ type: 'SET_FULL_NAME', payload: e.target.value })} />
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-start'>
          <label htmlFor="email">Email</label><br />
          <input className='w-100' type="text" id="email" autoComplete="email" value={store.email || ''} 
          onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })} />
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-start'>
          <label htmlFor="phone">Phone</label><br />
          <input className='w-100' type="text" id="phone" autoComplete="phone" value={store.phone || ''} 
          onChange={(e) => dispatch({ type: 'SET_PHONE', payload: e.target.value })} />
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-start'>
          <label htmlFor="address">Address</label><br />
          <input className='w-100' type="text" id="address" autoComplete="address" value={store.address || ''} 
          onChange={(e) => dispatch({ type: 'SET_ADDRESS', payload: e.target.value })} />
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-center'>
          <button className='btn btn-secondary' onClick={handlerEdit}>Edit contact</button>
        </div>
      </div>

      <br />

      <Link to="/agenda">
        <button className="btn btn-primary">Back Agenda</button>
      </Link>
    </div>
  );
};