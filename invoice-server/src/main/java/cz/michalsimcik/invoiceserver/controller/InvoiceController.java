package cz.michalsimcik.invoiceserver.controller;

import cz.michalsimcik.invoiceserver.dto.InvoiceDTO;
import cz.michalsimcik.invoiceserver.dto.InvoiceStatisticsDTO;
import cz.michalsimcik.invoiceserver.filter.InvoiceFilter;
import cz.michalsimcik.invoiceserver.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping()
    public InvoiceDTO createInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.createInvoice(invoiceDTO);
    }

    @GetMapping("/{invoiceId}")
    public InvoiceDTO getInvoice(@PathVariable Long invoiceId) {
        return invoiceService.getInvoice(invoiceId);
    }

    @GetMapping()
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter) {
        return invoiceService.getAll(invoiceFilter);
    }

    @PutMapping("/{invoiceId}")
    public InvoiceDTO updateInvoice(@PathVariable Long invoiceId, @RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.updateInvoice(invoiceId, invoiceDTO);
    }

    @DeleteMapping("/{invoiceId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.deleteInvoice(invoiceId);
    }

    @GetMapping("/statistics")
    public InvoiceStatisticsDTO getInvoicesStatistics() {
        return invoiceService.calculateInvoicesStatistics();
    }

    @GetMapping("/identification/{identificationNumber}/purchases")
    public List<InvoiceDTO> getInvoicesByPurchases(@PathVariable String identificationNumber) {
        return invoiceService.getInvoicesByBuyerIdentificationNumber(identificationNumber);
    }

    @GetMapping("/identification/{identificationNumber}/sales")
    public List<InvoiceDTO> getInvoicesBySales(@PathVariable String identificationNumber) {
        return invoiceService.getInvoicesBySellerIdentificationNumber(identificationNumber);
    }
}
