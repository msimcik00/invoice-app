package cz.michalsimcik.invoiceserver.repository;

import cz.michalsimcik.invoiceserver.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, PagingAndSortingRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {
    @Query("SELECT i FROM invoice i WHERE i.seller.identificationNumber = :identificationNumber")
    List<InvoiceEntity> findInvoicesBySellerIdentificationNumber(@Param("identificationNumber") String identificationNumber);
    @Query("SELECT i FROM invoice i WHERE i.buyer.identificationNumber = :identificationNumber")
    List<InvoiceEntity> findInvoicesByBuyerIdentificationNumber(@Param("identificationNumber") String identificationNumber);
}
