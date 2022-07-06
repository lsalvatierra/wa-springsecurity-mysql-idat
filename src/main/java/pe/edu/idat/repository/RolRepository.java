package pe.edu.idat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.idat.model.bd.*;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    Rol findByRolname(String rolname);

}