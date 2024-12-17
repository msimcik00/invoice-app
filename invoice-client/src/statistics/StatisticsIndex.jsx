import React, { useEffect, useState } from "react";
import { InvoicesStatisticsTable, PersonsStatisticsTable } from "./StatisticsTable";
import { apiGet } from "../utils/apiHelper";

const StatisticsIndex = () => {

    const [invoicesStatistics, setInvoicesStatistics] = useState({});
    const [personsStatistics, setPersonsStatistics] = useState([]);

    useEffect(() => {
        apiGet("/api/invoices/statistics")
            .then((statistics) => setInvoicesStatistics(statistics))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        apiGet("/api/persons/statistics")
            .then((statistics) => setPersonsStatistics(statistics))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <InvoicesStatisticsTable invoicesStatistics={invoicesStatistics} />
            <PersonsStatisticsTable personsStatistics={personsStatistics}/>
        </>
    )
}
export default StatisticsIndex;
