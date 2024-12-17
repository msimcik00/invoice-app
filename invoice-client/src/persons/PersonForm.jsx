import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/apiHelper";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";

import Country from "./Country";

const PersonForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [person, setPerson] = useState({
        name: "",
        identificationNumber: "",
        taxNumber: "",
        accountNumber: "",
        bankCode: "",
        iban: "",
        phoneNumber: "",
        email: "",
        street: "",
        zipCode: "",
        city: "",
        country: Country.CZECHIA,
        note: ""
    });
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/persons/" + id).then((data) => setPerson(data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/persons/" + id, person) : apiPost("/api/persons", person))
            .then((data) => {
                navigate("/persons");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} osobnost</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="personName"
                    min="3"
                    label="Jméno"
                    prompt="Zadejte celé jméno"
                    value={person.name}
                    handleChange={(e) => {
                        setPerson({...person, name: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="identificationNumber"
                    min="3"
                    label="IČO"
                    prompt="Zadejte IČO"
                    value={person.identificationNumber}
                    handleChange={(e) => {
                        setPerson({...person, identificationNumber: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="taxNumber"
                    min="3"
                    label="DIČ"
                    prompt="Zadejte DIČ"
                    value={person.taxNumber}
                    handleChange={(e) => {
                        setPerson({...person, taxNumber: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="accountNumber"
                    min="3"
                    label="Číslo bankovního účtu"
                    prompt="Zadejte číslo bankovního účtu"
                    value={person.accountNumber}
                    handleChange={(e) => {
                        setPerson({...person, accountNumber: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="bankCode"
                    min="3"
                    label="Kód banky"
                    prompt="Zadejte kód banky"
                    value={person.bankCode}
                    handleChange={(e) => {
                        setPerson({...person, bankCode: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="IBAN"
                    min="3"
                    label="IBAN"
                    prompt="Zadejte IBAN"
                    value={person.iban}
                    handleChange={(e) => {
                        setPerson({...person, iban: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="telephone"
                    min="3"
                    label="Telefon"
                    prompt="Zadejte Telefon"
                    value={person.phoneNumber}
                    handleChange={(e) => {
                        setPerson({...person, phoneNumber: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="mail"
                    min="3"
                    label="E-mail"
                    prompt="Zadejte e-mail"
                    value={person.email}
                    handleChange={(e) => {
                        setPerson({...person, email: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="street"
                    min="3"
                    label="Ulice"
                    prompt="Zadejte ulici"
                    value={person.street}
                    handleChange={(e) => {
                        setPerson({...person, street: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="ZIP"
                    min="3"
                    label="PSČ"
                    prompt="Zadejte PSČ"
                    value={person.zipCode}
                    handleChange={(e) => {
                        setPerson({...person, zipCode: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="city"
                    min="3"
                    label="Město"
                    prompt="Zadejte město"
                    value={person.city}
                    handleChange={(e) => {
                        setPerson({...person, city: e.target.value});
                    }}
                />

                <InputField
                    required={false}
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={person.note}
                    handleChange={(e) => {
                        setPerson({...person, note: e.target.value});
                    }}
                />

                <h6>Země:</h6>

                <InputCheck
                    type="radio"
                    name="country"
                    label="Česká republika"
                    value={Country.CZECHIA}
                    handleChange={(e) => {
                        setPerson({...person, country: e.target.value});
                    }}
                    checked={Country.CZECHIA === person.country}
                />

                <InputCheck
                    type="radio"
                    name="country"
                    label="Slovensko"
                    value={Country.SLOVAKIA}
                    handleChange={(e) => {
                        setPerson({...person, country: e.target.value});
                    }}
                    checked={Country.SLOVAKIA === person.country}
                />

                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>
    );
};

export default PersonForm;