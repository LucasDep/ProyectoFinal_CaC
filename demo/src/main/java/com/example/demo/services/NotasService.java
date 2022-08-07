package com.example.demo.services;
import java.util.ArrayList;
import com.example.demo.models.NotasModel;
import com.example.demo.repositories.NotasRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class NotasService {
    @Autowired
    NotasRepository notasRepository;
    public ArrayList<NotasModel> obtenerNotas(){
        return (ArrayList<NotasModel>) notasRepository.findAll();
    //findAll metodo de CrudRepository
   }
    public NotasModel guardarNota(NotasModel nota){
        return notasRepository.save(nota);  //save metodo de CrudRepository
    }//**************** 2da etapa
    public Optional<NotasModel> obtenerPorId(Long id){
        return notasRepository.findById(id);
    }
    public ArrayList<NotasModel>  obtenerPorPrioridad(Integer prioridad) {
        return notasRepository.findByPrioridad(prioridad);
    }
    public boolean eliminarNota(Long id) {
        try{
            notasRepository.deleteById(id);
            return true;
        }catch(Exception err){
            return false;
        }
    }
}