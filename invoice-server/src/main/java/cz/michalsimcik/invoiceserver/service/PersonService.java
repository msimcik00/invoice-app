package cz.michalsimcik.invoiceserver.service;

import cz.michalsimcik.invoiceserver.dto.PersonDTO;
import cz.michalsimcik.invoiceserver.dto.PersonStatisticsDTO;

import java.util.List;

public interface PersonService {
    PersonDTO createPerson(PersonDTO personDTO);
    void deletePerson(Long id);
    List<PersonDTO> getAllPersons();
    PersonDTO getPerson(Long id);
    PersonDTO updatePerson(Long id, PersonDTO updatedPerson);
    List<PersonStatisticsDTO> calculatePersonsStatistics();
}
