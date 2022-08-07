package com.example.demo.controllers;
import java.util.ArrayList;
import java.util.Optional;
import com.example.demo.models.NotasModel;
import com.example.demo.services.NotasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/notas")         // mapea     /notas
public class NotasControllers {
    @Autowired
    NotasService notasService;
    @CrossOrigin   // para solucionar error “cors”
    @GetMapping()      //trae todas las notas y las mapea  /notas
    public ArrayList<NotasModel> obtenerNotas(){
        return notasService.obtenerNotas();
    }
    @CrossOrigin
    @PostMapping()    //   graba una nota
    public NotasModel guardarNotas(@RequestBody NotasModel nota){
        return this.notasService.guardarNota(nota);
    }
 
    @CrossOrigin
    @GetMapping( path = "/{id}")    // trae una nota segun id
    public Optional<NotasModel> obtenerNotaPorId(@PathVariable("id") Long id) {
        return this.notasService.obtenerPorId(id);
    }

    @CrossOrigin
    @GetMapping("/query")        // trae las notas con determinada prioridad
    public ArrayList<NotasModel> obtenerNotaPorPrioridad(@RequestParam("prioridad") Integer prioridad){
        return this.notasService.obtenerPorPrioridad(prioridad);
    }

    @CrossOrigin
    @DeleteMapping( path = "/{id}")   // borra una nota con determinado id  
    public String eliminarPorId(@PathVariable("id") Long id){
        boolean ok = this.notasService.eliminarNota(id);
        if (ok){
            return "Se eliminó la nota con id " + id;
        }else{
            return "No pudo eliminar la nota con id" + id;
        }
    }
}