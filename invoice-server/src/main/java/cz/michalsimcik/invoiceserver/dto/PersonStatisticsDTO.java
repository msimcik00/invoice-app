package cz.michalsimcik.invoiceserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonStatisticsDTO {
    private Long personId;
    private String personName;
    private double revenue;
}
