import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router";

const AddContact = () => {

    const { store, actions } = useContext(Context);
    const { id } = useParams();

    const navigate = useNavigate();

    const toHome = () => {
        navigate('/');
    }

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const saveContact = (e) => {

        e.preventDefault();

        /* Validacion para que esten todos los datos en el formulario*/
        if (name.trim() == "" || phone.trim() == "" || email.trim() == "" || address.trim() == "") {
            alert("Rellena todos los campos, por favor.");
            return null;
        }

        const contact = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };

        if (!id) {
            actions.createContact(contact);
        } else {
            actions.editContact(id, contact);
        }

        toHome();
        

    }

    /* Si existe el id (editando), busca el contacto a traves del id y llena los estados con los datos en el formulario  */
    useEffect(() => {

        if (id) {
            const show = store.contactList.find(contact => contact.id == id);
            setName(show.name);
            setAddress(show.address);
            setPhone(show.phone);
            setEmail(show.email);
        }

    }, [id]) 

    return (
        <div className="container">
            <h1 className="text text-center mx-auto">{!id ? "Add New Contact" : `Edit Contact: ${name}`}</h1>
            <form onSubmit={saveContact}>
                <div className="mb-2">
                    <label className="form-label">Full Name</label>
                    <input className="form-control" type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </div>

                <div className="mb-2">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className="mb-2">
                    <label className="form-label">Phone</label>
                    <input className="form-control" type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />
                </div>

                <div className="mb-2">
                    <label className="form-label">Address</label>
                    <input className="form-control" type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>

                <button type="submit" className="btn btn-primary col-12">Save</button>
                <button className="btn btn-danger mt-3" onClick={toHome}>Return to Contacts</button>


            </form>
        </div>
    )
}

export default AddContact;