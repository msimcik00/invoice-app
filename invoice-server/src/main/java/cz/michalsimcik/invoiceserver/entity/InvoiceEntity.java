package cz.michalsimcik.invoiceserver.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "invoice")
@Getter
@Setter
public class InvoiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private Integer invoiceNumber;

    @Column(nullable = false)
    private LocalDate issuedAt;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Integer vat;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String note;

    @ManyToOne
    private PersonEntity buyer;

    @ManyToOne
    private PersonEntity seller;
}
