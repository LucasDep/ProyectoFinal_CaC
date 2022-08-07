package com.example.demo.repositories;
import com.example.demo.models.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;

@Repository
public interface NotasRepository extends CrudRepository<NotasModel,Long>{
   //CrudRepository hace toda la magia de Spring
//**************2da etapa ***********************
public abstract ArrayList<NotasModel> findByPrioridad(Integer prioridad);
}