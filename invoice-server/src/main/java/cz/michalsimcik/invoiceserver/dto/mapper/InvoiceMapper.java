package cz.michalsimcik.invoiceserver.dto.mapper;

import cz.michalsimcik.invoiceserver.dto.InvoiceDTO;
import cz.michalsimcik.invoiceserver.entity.InvoiceEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {PersonMapper.class})
public interface InvoiceMapper {

    InvoiceEntity toEntity(InvoiceDTO source);

    InvoiceDTO toDTO(InvoiceEntity source);

}
