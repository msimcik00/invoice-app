import { Link } from "react-router-dom"

export const InvoicesStatisticsTable = ({ invoicesStatistics }) => {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Celkový součet cen</th>
                        <th>Součet cen za letošní rok</th>
                        <th>Počet faktur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{invoicesStatistics.allTimeSum}</td>
                        <td>{invoicesStatistics.currentYearSum}</td>
                        <td>{invoicesStatistics.invoicesCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export const PersonsStatisticsTable = ({personsStatistics}) => {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Název společnosti</th>
                        <th>Příjmy</th>
                    </tr>
                </thead>
                <tbody>
                    {personsStatistics.map((person, index) => (
                        <tr key={index + 1}>
                            <td><Link to={"/persons/show/" + person.personId}>{person.personName}</Link></td>
                            <td>{person.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
