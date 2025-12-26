import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faUser, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";

export const ContactCard = () => {
    const { store, dispatch } = useGlobalReducer();
    const { contactId } = useParams();

    useEffect(() => {
        // Buscamos el contacto directamente del store que llenó Agenda.jsx
        const contact = store.contactsInSelectedAgenda.find(c => c.id === parseInt(contactId));

        if (contact) {
            dispatch({ type: 'SET_FULL_NAME', payload: contact.name });
            dispatch({ type: 'SET_EMAIL', payload: contact.email });
            dispatch({ type: 'SET_PHONE', payload: contact.phone });
            dispatch({ type: 'SET_ADDRESS', payload: contact.address });
        }
    }, [contactId, store.contactsInSelectedAgenda]);

    return (
        //<div className="card mb-3">

        <div className="row mt-4">
            <div className="col-1 offset-4 d-flex align-items-center justify-content-center border">
                <Link to={`/contactCard/${contactId}`}>
                    <FontAwesomeIcon icon={faAddressCard} className="me-2" size="4x" />
                </Link>
            </div>
            <div className="col-3 align-items-center justify-content-center border">
                <h6>
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    {store.fullName}
                </h6>
                <h6>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                    {store.address}
                </h6>
                <h6>
                    <FontAwesomeIcon icon={faPhone} className="me-2" />
                    {store.phone}
                </h6>
                <h6 className="mb-4">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    {store.email}
                </h6>
            </div>
            <br />
            <div className="col-12 text-center">
                <Link to="/agenda">
                    <button className="btn btn-primary mt-2">Back Agenda</button>
                </Link>
            </div>
        </div>
        //</div>
    );
}