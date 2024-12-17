package cz.michalsimcik.invoiceserver.service;

import cz.michalsimcik.invoiceserver.dto.InvoiceDTO;
import cz.michalsimcik.invoiceserver.dto.InvoiceStatisticsDTO;
import cz.michalsimcik.invoiceserver.filter.InvoiceFilter;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO getInvoice(Long id);

    InvoiceDTO createInvoice(InvoiceDTO invoiceDTO);

    List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter);

    InvoiceDTO updateInvoice(Long id, InvoiceDTO invoiceDTO);

    void deleteInvoice(Long id);

    List<InvoiceDTO> getInvoicesBySellerIdentificationNumber(String identificationNumber);

    List<InvoiceDTO> getInvoicesByBuyerIdentificationNumber(String identificationNumber);

    InvoiceStatisticsDTO calculateInvoicesStatistics();
}
