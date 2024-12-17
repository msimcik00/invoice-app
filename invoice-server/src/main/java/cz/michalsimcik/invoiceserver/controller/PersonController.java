package cz.michalsimcik.invoiceserver.controller;

import cz.michalsimcik.invoiceserver.dto.PersonDTO;
import cz.michalsimcik.invoiceserver.dto.PersonStatisticsDTO;
import cz.michalsimcik.invoiceserver.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping
    public PersonDTO createPerson(@RequestBody PersonDTO personDTO) {
        System.out.println(personDTO);
        return personService.createPerson(personDTO);
    }

    @GetMapping("/{personId}")
    public PersonDTO getPerson(@PathVariable Long personId) {
        return personService.getPerson(personId);
    }

    @GetMapping
    public List<PersonDTO> getPersons() {
        return personService.getAllPersons();
    }

    @PutMapping("/{personId}")
    public PersonDTO updatePerson(@PathVariable Long personId, @RequestBody PersonDTO personDTO) {
        return personService.updatePerson(personId, personDTO);
    }

    @DeleteMapping("/{personId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable Long personId) {
        personService.deletePerson(personId);
    }

    @GetMapping("/statistics")
    public List<PersonStatisticsDTO> getPersonStatistics() {
        return personService.calculatePersonsStatistics();
    }
}
