import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/apiHelper";
import Country from "./Country";
import PersonDetailInvoiceTable from "./PersonDetailInvoiceTable.jsx";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [invoicesAsSeller, setInvoicesAsSeller] = useState([]);
    const [invoicesAsBuyer, setInvoicesAsBuyer] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/" + id)
            .then((data) => setPerson(data))
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        if (person?.identificationNumber) {
            apiGet("/api/invoices/identification/" + person.identificationNumber + "/sales")
                .then((invoices) => setInvoicesAsSeller(invoices))
                .catch((err) => console.log(err));
        }
    }, [person]);

    useEffect(() => {
        if (person?.identificationNumber) {
            apiGet("/api/invoices/identification/" + person.identificationNumber + "/purchases")
                .then((invoices) => setInvoicesAsBuyer(invoices))
                .catch((err) => console.log(err));
        }
    }, [person]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h1>Detail osoby</h1>
                <hr />
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br />
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br />
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br />
                    {person.phoneNumber}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br />
                    {person.email}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br />
                    {person.street}, {person.city},
                    {person.zipCode}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br />
                    {person.note}
                </p>
            </div>

            <hr/>

            <PersonDetailInvoiceTable
                label="Počet přijatých faktur: "
                invoices={invoicesAsBuyer}
            />

            <PersonDetailInvoiceTable
                label="Počet vystavených faktur: "
                invoices={invoicesAsSeller}
            />

        </>
    );
};

export default PersonDetail;
