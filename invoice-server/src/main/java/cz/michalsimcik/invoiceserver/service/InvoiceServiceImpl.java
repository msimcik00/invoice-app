package cz.michalsimcik.invoiceserver.service;

import cz.michalsimcik.invoiceserver.dto.InvoiceDTO;
import cz.michalsimcik.invoiceserver.dto.InvoiceStatisticsDTO;
import cz.michalsimcik.invoiceserver.dto.mapper.InvoiceMapper;
import cz.michalsimcik.invoiceserver.entity.InvoiceEntity;
import cz.michalsimcik.invoiceserver.exception.NotFoundException;
import cz.michalsimcik.invoiceserver.filter.InvoiceFilter;
import cz.michalsimcik.invoiceserver.repository.InvoiceRepository;
import cz.michalsimcik.invoiceserver.repository.PersonRepository;
import cz.michalsimcik.invoiceserver.specification.InvoiceSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService{

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private PersonRepository personRepository;


    @Override
    public InvoiceDTO createInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);
        entity.setBuyer(personRepository.getReferenceById(invoiceDTO.getBuyer().getId()));
        entity.setSeller(personRepository.getReferenceById(invoiceDTO.getSeller().getId()));
        entity = invoiceRepository.save(entity);
        return invoiceMapper.toDTO(entity);
    }

    @Override
    public InvoiceDTO getInvoice(Long id) {
        InvoiceEntity fetchedEntity = fetchInvoiceById(id);
        return invoiceMapper.toDTO(fetchedEntity);
    }

    @Override
    public List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);
        return convertToDTOList(invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0, invoiceFilter.getLimit())));
    }

    @Override
    public InvoiceDTO updateInvoice(Long id, InvoiceDTO updatedInvoiceDTO) {
        InvoiceEntity existingInvoice = fetchInvoiceById(id);

        InvoiceEntity updatedInvoice = invoiceMapper.toEntity(updatedInvoiceDTO);

        updatedInvoice.setId(id);
        updatedInvoice.setBuyer(personRepository.getReferenceById(updatedInvoiceDTO.getBuyer().getId()));
        updatedInvoice.setSeller(personRepository.getReferenceById(updatedInvoiceDTO.getSeller().getId()));

        InvoiceEntity savedInvoice = invoiceRepository.save(updatedInvoice);
        return invoiceMapper.toDTO(savedInvoice);
    }

    @Override
    public void deleteInvoice(Long invoiceId) {
        fetchInvoiceById(invoiceId);
        invoiceRepository.deleteById(invoiceId);
    }

    @Override
    public List<InvoiceDTO> getInvoicesBySellerIdentificationNumber(String identificationNumber) {
        return convertToDTOList(invoiceRepository.findInvoicesBySellerIdentificationNumber(identificationNumber));
    }

    @Override
    public List<InvoiceDTO> getInvoicesByBuyerIdentificationNumber(String identificationNumber) {
        return convertToDTOList(invoiceRepository.findInvoicesByBuyerIdentificationNumber(identificationNumber));
    }

    @Override
    public InvoiceStatisticsDTO calculateInvoicesStatistics() {
        List<InvoiceEntity> invoices = invoiceRepository.findAll();
        InvoiceStatisticsDTO stats = new InvoiceStatisticsDTO();
        double allTimeSum = invoices.stream()
                .mapToDouble(InvoiceEntity::getPrice)
                .sum();
        double currentYearSum = invoices.stream()
                .filter(invoice -> invoice.getIssuedAt().getYear() == LocalDateTime.now().getYear())
                .mapToDouble(InvoiceEntity::getPrice)
                .sum();
        stats.setInvoicesCount(invoices.size());
        stats.setAllTimeSum(allTimeSum);
        stats.setCurrentYearSum(currentYearSum);
        return stats;
    }

    private InvoiceEntity fetchInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ERROR: Invoice with id " + id + " couldn't be found in the database."));
    }

    private List<InvoiceDTO> convertToDTOList(List<InvoiceEntity> invoices) {
        return invoices.stream()
                .map(invoiceMapper::toDTO)
                .toList();
    }

    private List<InvoiceDTO> convertToDTOList(Page<InvoiceEntity> invoices) {
        return invoices.stream()
                .map(invoiceMapper::toDTO)
                .toList();
    }

}
