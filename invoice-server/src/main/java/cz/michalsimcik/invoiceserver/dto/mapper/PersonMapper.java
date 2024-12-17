package cz.michalsimcik.invoiceserver.dto.mapper;

import cz.michalsimcik.invoiceserver.dto.PersonDTO;
import cz.michalsimcik.invoiceserver.entity.PersonEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonMapper {
    PersonEntity toEntity(PersonDTO source);
    PersonDTO toDTO(PersonEntity source);
}
