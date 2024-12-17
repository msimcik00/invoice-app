import React from "react";
import InputField from '../components/InputField';
import InputSelect from "../components/InputSelect";

const InvoiceFilterForm = ({ tempFilterParams, setTempFilterParams, handleFilterChange, handleFilterReset, persons }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()} id="filter-form">
            <div className="row">
                <div className="col">
                    <InputField
                        required={false}
                        type="number"
                        name="minPrice"
                        label="Minimální cena"
                        min={0}
                        prompt="Zadejte minimální cenu"
                        value={tempFilterParams.minPrice}
                        handleChange={(e) => {
                            setTempFilterParams({ ...tempFilterParams, minPrice: e.target.value })
                        }}
                    />
                </div>
                <div className="col">
                    <InputField
                        required={false}
                        type="number"
                        name="maxPrice"
                        label="Maximální cena"
                        min={0}
                        prompt="Zadejte maximální cenu"
                        value={tempFilterParams.maxPrice}
                        handleChange={(e) => {
                            setTempFilterParams({ ...tempFilterParams, maxPrice: e.target.value })
                        }}
                    />
                </div>
            </div>

            <div className="row mt-2 mb-2">
                <div className="col">
                    <InputSelect
                        label="Dodavatel"
                        name="Dodavatel"
                        required={false}
                        prompt="Nevybrán"
                        items={persons}
                        value={tempFilterParams.sellerId || ''}
                        handleChange={(e) => {
                            setTempFilterParams({ ...tempFilterParams, sellerId: e.target.value })
                        }}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        label="Odběratel"
                        name="Odběratel"
                        required={false}
                        prompt="Nevybrán"
                        items={persons}
                        value={tempFilterParams.buyerId || ''}
                        handleChange={(e) => {
                            setTempFilterParams({ ...tempFilterParams, buyerId: e.target.value })
                        }}
                    />
                </div>
            </div>
            
            <div className="row mb-5">
                <div className="col">
                    <button type="button" onClick={handleFilterChange} className="btn btn-outline-primary me-2">Aplikovat filtry</button>
                    <button type="button" onClick={handleFilterReset} className="btn btn-outline-secondary">Reset filtrů</button>
                </div>
            </div>
            <hr className="mt-3"/>
        </form>
    )
}

export default InvoiceFilterForm;