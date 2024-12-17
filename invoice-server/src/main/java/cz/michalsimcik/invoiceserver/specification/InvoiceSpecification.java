package cz.michalsimcik.invoiceserver.specification;

import cz.michalsimcik.invoiceserver.entity.InvoiceEntity;
import cz.michalsimcik.invoiceserver.entity.InvoiceEntity_;
import cz.michalsimcik.invoiceserver.entity.PersonEntity;
import cz.michalsimcik.invoiceserver.entity.PersonEntity_;
import cz.michalsimcik.invoiceserver.filter.InvoiceFilter;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class InvoiceSpecification implements Specification<InvoiceEntity> {

    private final InvoiceFilter invoiceFilter;

    @Override
    public Predicate toPredicate(Root<InvoiceEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if(invoiceFilter.getBuyerId() != null) {
            Join<InvoiceEntity, PersonEntity> buyerJoin = root.join(InvoiceEntity_.buyer);
            predicates.add(criteriaBuilder.equal(buyerJoin.get(PersonEntity_.id), invoiceFilter.getBuyerId()));
        }

        if(invoiceFilter.getSellerId() != null) {
            Join<InvoiceEntity, PersonEntity> sellerJoin = root.join(InvoiceEntity_.seller);
            predicates.add(criteriaBuilder.equal(sellerJoin.get(PersonEntity_.id), invoiceFilter.getSellerId()));
        }

        if(invoiceFilter.getProductName() != null) {
            predicates.add(criteriaBuilder.equal(root.get(InvoiceEntity_.productName), invoiceFilter.getProductName()));
        }

        if (invoiceFilter.getMinPrice() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get(InvoiceEntity_.price), invoiceFilter.getMinPrice()));
        }

        if(invoiceFilter.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get(InvoiceEntity_.price), invoiceFilter.getMaxPrice()));
        }

        return  criteriaBuilder.and(predicates.toArray(new Predicate[0]));

    }
}
