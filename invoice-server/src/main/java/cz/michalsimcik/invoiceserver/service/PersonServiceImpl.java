package cz.michalsimcik.invoiceserver.service;

import cz.michalsimcik.invoiceserver.dto.PersonDTO;
import cz.michalsimcik.invoiceserver.dto.PersonStatisticsDTO;
import cz.michalsimcik.invoiceserver.dto.mapper.PersonMapper;
import cz.michalsimcik.invoiceserver.entity.InvoiceEntity;
import cz.michalsimcik.invoiceserver.entity.PersonEntity;
import cz.michalsimcik.invoiceserver.exception.NotFoundException;
import cz.michalsimcik.invoiceserver.repository.InvoiceRepository;
import cz.michalsimcik.invoiceserver.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PersonServiceImpl implements PersonService{

    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;


    @Override
    public PersonDTO createPerson(PersonDTO personDTO) {
        PersonEntity entity = personMapper.toEntity(personDTO);
        personRepository.save(entity);
        return personMapper.toDTO(entity);
    }

    @Override
    public PersonDTO getPerson(Long id) {
        PersonEntity fetchedPerson = fetchPersonById(id);
        return personMapper.toDTO(fetchedPerson);
    }

    @Override
    public List<PersonDTO> getAllPersons() {
        return personRepository.findByHidden(false)
                .stream()
                .map(i -> personMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public PersonDTO updatePerson(Long id, PersonDTO updatedPerson) {
        hidePerson(id);
        return createPerson(updatedPerson);
    }

    @Override
    public void deletePerson(Long id) {
            PersonEntity person = fetchPersonById(id);
            person.setHidden(true);
            personRepository.save(person);
    }

    @Override
    public List<PersonStatisticsDTO> calculatePersonsStatistics() {
        List<InvoiceEntity> invoices = invoiceRepository.findAll();
        List<PersonEntity> persons = personRepository.findAll();

        Map<Long, Double> revenueByPersonId = invoices.stream()
                .collect(Collectors.groupingBy(
                        invoice -> invoice.getSeller().getId(),
                        Collectors.summingDouble(InvoiceEntity::getPrice)
                ));

        return persons.stream()
                .map(person -> new PersonStatisticsDTO(
                        person.getId(),
                        person.getName(),
                        revenueByPersonId.getOrDefault(person.getId(), 0.0)
                ))
                .sorted(Comparator.comparing(PersonStatisticsDTO::getRevenue).reversed())
                .toList();
    }

    private PersonEntity fetchPersonById(Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ERROR: Person with id " + id + " couldn't be found in the database."));
    }

    private void hidePerson(long id) {
        PersonEntity fetchedPerson = fetchPersonById(id);
        fetchedPerson.setHidden(true);
    }
}
