package cz.michalsimcik.invoiceserver.filter;

import lombok.Data;

@Data
public class InvoiceFilter {
    private Long buyerId;
    private Long sellerId;
    private String productName;
    private Double minPrice;
    private Double maxPrice;
    private int limit = Integer.MAX_VALUE;
}

