package cz.michalsimcik.invoiceserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceStatisticsDTO {
    private Double currentYearSum;
    private Double allTimeSum;
    private int invoicesCount;
}

