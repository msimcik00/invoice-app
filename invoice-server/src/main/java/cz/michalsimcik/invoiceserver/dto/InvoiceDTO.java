package cz.michalsimcik.invoiceserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {

    @JsonProperty("_id")
    private Long id;

    private Integer invoiceNumber;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate issuedAt;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    private String productName;

    private int vat;

    private double price;

    private String note;

    private PersonDTO seller;

    private PersonDTO buyer;
}