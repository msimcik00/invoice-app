
import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/apiHelper";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilterForm from "./InvoiceFilterForm";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [persons, setPersons] = useState([]);

    const defaultFilterParams = {
        minPrice: 0,
        maxPrice: 1000000,
        buyerId: null,
        sellerId: null,
        limit: null
    };

    const [activeFilterParams, setActiveFilterParams] = useState({...defaultFilterParams});
    const [tempFilterParams, setTempFilterParams] = useState({...defaultFilterParams});

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    const handleFilterChange = (e) => {
        e.preventDefault();
        setActiveFilterParams(tempFilterParams);
    }

    const handleFilterReset = (e) => {
        e.preventDefault();
        setActiveFilterParams({...defaultFilterParams});
        setTempFilterParams({...defaultFilterParams})
        document.getElementById("filter-form").reset();
    }

    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons").then((data) => {
            const availablePersons = data.map(({ ...item }) => ({ ...item, name: item.name + " (" + item.identificationNumber + ")" }));
            setPersons(availablePersons);
        })
    }, []);

    useEffect(() => {
        apiGet("/api/invoices", activeFilterParams).then((data) => setInvoices(data));
    }, [activeFilterParams]);


    return (
        <div>
            <h1>Seznam faktur</h1>
            <InvoiceFilterForm
                tempFilterParams={tempFilterParams}
                setTempFilterParams={setTempFilterParams}
                handleFilterChange={handleFilterChange}
                handleFilterReset={handleFilterReset}
                persons={persons}
            />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};
export default InvoiceIndex;