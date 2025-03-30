import React, { useContext } from "react";
import { Context } from '../store/appContext'
import { Link } from "react-router-dom";
import profilePic from "../../img/logo.png"

const ContactCard = (props) => {

    const { store, actions } = useContext(Context);

    const deleteContact = () => {
        actions.deleteContact(props.contact.id);
    }

    return (
        <div className="container border p-2 mb-3">
        <div className="row">
            <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex justify-content-center">
                <img src={profilePic} className="img-fluid rounded-circle" alt="profile" />
            </div>
            <div className="col-12 col-md-9 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="text mb-0">{props.contact.name}</h2>
                    <div className="d-flex">
                        <Link to={"/editContact/" + props.contact.id} className="btn m-1">
                            <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <button className="btn m-1" onClick={deleteContact}>
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>

                <div className="mt-2">
                    <div className="d-flex align-items-center mb-2">
                        <i className="fa-solid fa-location-dot me-2"></i>
                        <p className="mb-0">{props.contact.address}</p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <i className="fa-solid fa-phone me-2"></i>
                        <p className="mb-0">{props.contact.phone}</p>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <i className="fa-solid fa-envelope me-2"></i>
                        <p className="mb-0">{props.contact.email}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    );
}

export default ContactCard;