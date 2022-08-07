function guardar() {
 
    let n = document.getElementById("txtNota").value
    let e = document.getElementById("boolCompleto").value
    let p = parseInt(document.getElementById("txtPrioridad").value)
    
    //Date
    let a = new Date().toLocaleDateString()
    let b = new Date().toLocaleTimeString()
    let c = a+" "+b;
    console.log(c)
    //End Date
    
    let nota = {
        texto: n,
        completo: e,
        prioridad: p,
        fecha: c
    }

    let url = "http://localhost:8080/notas"
    var options = {
        body: JSON.stringify(nota),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       // redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}
