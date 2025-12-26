import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faUser, faAddressCard, faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons';


export const Agenda = () => {
    const { store, dispatch } = useGlobalReducer();
    const [agenda, setagenda] = useState("");
    const [updateAgenda, setUpdateAgenda] = useState(false);
    const [updateContacts, setUpdateContacts] = useState(false);
    //const { agendaSlug } = useParams();

    const handlerChange = (e) => {
        const selectedValue = e.target.value;
        console.log("Selected value:", selectedValue);
        dispatch({ type: 'SET_SELECTED_AGENDA', payload: selectedValue });
    }

    const handlerDeleteContact = async (contactId) => {
        
        alert(`¿Estás seguro de que quieres eliminar este contacto?`);
        try {
        let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgendaSlug}/contacts/${contactId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //let data = await response.json();
        console.log("El contacto fue eliminado");
        setUpdateContacts(!updateContacts);
    } catch (error) {
        console.error("Error deleting contact:", error);
    }
    }

    const handlerCreate = async () => {
        
        try {
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}`, {
                method: 'POST',});
                
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            console.log("La agenda fue creada:", data);
            setUpdateAgenda(!updateAgenda);
            setagenda("");
        } catch (error) {
            console.error("Error creating agenda:", error);
        }
    }

    const handlerDelete = async () => {
        try {
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${agenda}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //let data = await response.json();
            console.log("La agenda fue eliminada");
            setUpdateAgenda(!updateAgenda);
            setagenda("");
        } catch (error) {
            console.error("Error deleting agenda:", error);
        }
    }

    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                let response = await fetch(`https://playground.4geeks.com/contact/agendas`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                dispatch({ type: 'SET_AGENDAS', payload: data.agendas });
                console.log("La lista de agendas es...:", data.agendas);
            } catch (error) {
                console.error("Error fetching Agenda:", error)
            }
        };
        fetchAgenda();
    }, [updateAgenda]);

    useEffect(() => {
        const fetchContacts = async () => {
            if (!store.selectedAgendaSlug) {
                dispatch({ type: 'SET_CONTACTS', payload: [] });
                return;
            }
            try {
                let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgendaSlug}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                dispatch({ type: 'SET_CONTACTS', payload: data.contacts });
                console.log("La lista de contactos es...:", data.contacts);
            } catch (error) {
                console.error("Error fetching Contacts:", error)
            }
        };
        fetchContacts();
    }, [store.selectedAgendaSlug, dispatch, updateContacts]);

    return (
        <div className="container">

            <div className="row">
                <div className="col-5 text-start">
                    <h3>Create/Delete agenda:</h3>
                    <input type="text" className="w-100" onChange={(e) => setagenda(e.target.value)} value={agenda} placeholder="Enter name for create or delete agenda"/>
                    <button className="btn btn-primary mt-2" onClick={handlerCreate}>Agregar agenda</button>
                    <button className="btn btn-primary mt-2 ms-2" onClick={handlerDelete}>Delete agenda</button>
                </div>
            </div>
            <br />

            <div className="row">
                
                <div className="col-5 text-center border">
                    <h3>Agendas</h3>
                    <br />
                    <select className="form-select" onChange={handlerChange} size="5" aria-label="size 3 select example">
                        {store.listAgenda && store.listAgenda.map((item) => (
                            <option key={item.id} value={item.slug}>{item.slug}</option>
                        ))}
                    </select>

                </div>
                <div className="col-7 text-end border">
                    <Link to="/addContact">
                        <button className="btn btn-success mb-2 mt-2">Add new contact</button>
                    </Link>
                    <br />
                    <ul>
                        {store.contactsInSelectedAgenda && store.contactsInSelectedAgenda.map((contact) => (
                            <li key={contact.id} className="border text-start">
                                <div className="row">
                                    <div className="col-3 d-flex align-items-center justify-content-center">
                                        <Link to={`/contactCard/${contact.id}`}>
                                            <FontAwesomeIcon icon={faAddressCard} className="me-2" size="4x" /> 
                                        </Link>                                        
                                    </div>
                                    <div className="col-7">
                                        <h6>
                                            <FontAwesomeIcon icon={faUser} className="me-2" />
                                            {contact.name}
                                        </h6>
                                        <h6>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                            {contact.address}
                                        </h6>
                                        <h6>
                                            <FontAwesomeIcon icon={faPhone} className="me-2" />
                                            {contact.phone}
                                        </h6>
                                        <h6 className="mb-4">
                                            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                                            {contact.email}
                                        </h6>
                                    </div>
                                    <div className="col-1">
                                        <Link to={`/editContact/${contact.id}`}>
                                            <FontAwesomeIcon icon={faPencil} className="me-2" />  
                                        </Link>                                                                                
                                    </div>
                                    <div className="col-1">
                                        <FontAwesomeIcon icon={faTrashCan} className="me-2" onClick={() => handlerDeleteContact(contact.id)} />
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};