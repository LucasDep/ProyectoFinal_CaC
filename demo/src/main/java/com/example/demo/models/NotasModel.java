package com.example.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "nota")
public class NotasModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String texto;
    private Boolean completo;
    private Integer prioridad;
    private String fecha;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTexto() {
        return texto;
    }
    public void setTexto(String texto) {
        this.texto = texto;
    }
    public Boolean getCompleto() {
        return completo;
    }
    public void setCompleto(Boolean completo) {
        this.completo = completo;
    }
    public void setPrioridad(Integer prioridad){
        this.prioridad = prioridad;
    }
    public Integer getPrioridad(){
        return prioridad;
    }
    public void setFecha(String fecha){
        this.fecha = fecha;
    }
    public String getFecha(){
        return fecha;
    }
}
