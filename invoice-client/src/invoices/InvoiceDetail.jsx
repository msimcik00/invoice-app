import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { apiGet } from "../utils/apiHelper";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
  
    useEffect(() => {
      apiGet(`/api/invoices/${id}`)
        .then((data) => {
          setInvoice(data);
        })
        .catch((err) => console.log(err));
    }, [id]);
  
    if (!invoice) {
      return <div>Načítání...</div>;
    }
  
    return (
      <>
        <div>
          <h1>Detail faktury</h1>
          <hr />
          <h3>FAKTURA ({invoice.invoiceNumber})</h3>
          <p>
            <strong>ID faktury:</strong>
            <br />
            {invoice.invoiceNumber}
          </p>
          <p>
            <strong>Datum vytvoření:</strong>
            <br />
            {invoice.issuedAt}
          </p>
          <p>
            <strong>Datum dokončení:</strong>
            <br />
            {invoice.dueDate}
          </p>
          <p>
            <strong>Název produktu:</strong>
            <br />
            {invoice.productName}
          </p>
          <p>
            <strong>Poznámka: </strong>
            <br />
            {invoice.note}
          </p>
          <p>
            <strong>Cena: </strong>
            <br />
            {invoice.price}
          </p>
          <p>
            <strong>DPH: </strong>
            <br />
            {invoice.vat}
          </p>
          <p>
            <strong>Dodavatel: </strong>
            <br />
            {<Link to={"/persons/show/" + invoice.seller?._id}>{invoice.seller?.name}</Link>}

          </p>
          <p>
            <strong>Odběratel: </strong>
            <br />
            {<Link to={"/persons/show/" + invoice.buyer?._id}>{invoice.buyer?.name}</Link>}
          </p>
        </div>
      </>
    );
  };

export default InvoiceDetail;
