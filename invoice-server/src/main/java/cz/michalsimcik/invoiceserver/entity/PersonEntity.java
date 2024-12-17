package cz.michalsimcik.invoiceserver.entity;

import cz.michalsimcik.invoiceserver.constant.Country;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "person")
@Getter
@Setter
public class PersonEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 8, name = "identification_number")
    private String identificationNumber;

    @Column(length = 10, name = "tax_number")
    private String taxNumber;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false, name = "zip_code")
    private String zipCode;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Country country;

    @Column(nullable = false, name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, name = "account_number")
    private String accountNumber;

    @Column(nullable = false, name = "bank_code")
    private String bankCode;

    @Column(nullable = false)
    private String iban;

    private String note;

    private boolean hidden = false;
}
