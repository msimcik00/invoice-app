package cz.michalsimcik.invoiceserver.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import cz.michalsimcik.invoiceserver.constant.Country;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonDTO {
    @JsonProperty("_id")
    private Long id;
    private String name;
    private String identificationNumber;
    private String taxNumber;
    private String city;
    private String street;
    private String zipCode;
    private Country country;
    private String phoneNumber;
    private String email;
    private String accountNumber;
    private String bankCode;
    private String iban;
    private String note;
}
