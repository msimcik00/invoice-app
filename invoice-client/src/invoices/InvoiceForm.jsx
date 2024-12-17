import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/apiHelper";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        note: "",
        issuedAt: "",
        productName: "",
        dueDate: "",
        price: 0,
        vat: 0,
        seller: { _id: "" },
        buyer: { _id: "" },
    });
    const [errorState, setError] = useState(null);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        apiGet("/api/persons").then((data) => {
            const availablePersons = data.map(({ ...item }) => ({ ...item, name: item.name + " (" + item.identificationNumber + ")" }));
            setPersons(availablePersons);
        });
    }, []);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="personName"
                    min="6"
                    label="ID faktury"
                    prompt="Zadejte ID faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vytvoření"
                    prompt="Zadejte datum vytvoření faktury"
                    value={invoice.issuedAt}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issuedAt: e.target.value })
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum dokončení"
                    prompt="Zadejte datum vytvoření faktury"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, dueDate: e.target.value })
                    }}
                />


                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, price: e.target.value })
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Název produktu"
                    prompt="Zadejte název produktu"
                    value={invoice.productName}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, productName: e.target.value })
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="DPH"
                    min={0}
                    max={100}
                    prompt="Zadejte DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, vat: e.target.value })
                    }}
                />

                <InputSelect
                    label="Dodavatel"
                    name="Dodavatel"
                    required={true}
                    prompt="Vyberte dodavatele"
                    items={persons}
                    value={invoice.seller._id || ""}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, seller: { _id: e.target.value } })
                    }}
                />

                <InputSelect
                    label="Odběratel"
                    name="Odběratel"
                    required={true}
                    prompt="Vyberte odběratele"
                    items={persons}
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, buyer: { _id: e.target.value } })
                    }}
                />

                <InputField
                    required={false}
                    type="text"
                    name="note"
                    label="Poznámka"
                    prompt="Zadejte poznámku"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, note: e.target.value })
                    }}
                />


                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>
        </div>
    );
};

export default InvoiceForm;
