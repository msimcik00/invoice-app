package cz.michalsimcik.invoiceserver.repository;

import cz.michalsimcik.invoiceserver.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<PersonEntity, Long> {

    List<PersonEntity> findByHidden(boolean hidden);
}
