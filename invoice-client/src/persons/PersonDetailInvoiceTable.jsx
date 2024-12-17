import React from "react";
import { Link } from "react-router-dom";

const PersonDetailInvoiceTable = ({ label, invoices }) => {
    return (
        <div>
            <p className="fw-bold">{label + invoices.length}</p>
            {invoices.length > 0 &&
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>ID faktury</th>
                            <th style={{ width: '40%' }}>Produkt</th>
                            <th style={{ width: '30%' }}>Cena</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, i) => (
                            <tr key={i}>
                                <td><Link to={"/invoices/show/" + invoice._id}>{invoice.invoiceNumber}</Link></td>
                                <td>{invoice.productName}</td>
                                <td>{invoice.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default PersonDetailInvoiceTable;