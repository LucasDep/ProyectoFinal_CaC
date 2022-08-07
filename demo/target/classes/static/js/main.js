const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
let darkMode = localStorage.getItem("dark-mode");

//alert("La veracidad y fidelidad de los datos en esta página están sujetos a sus correspondientes API's.")

//Show Sidebar================================================================
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

//============================================================================
//Close Sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

//============================================================================
//Change Theme
const enableDarkMode = () => {
    //theme.classList.add("dark-mode-theme");
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
    //--------------------------------------------
    localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
    //theme.classList.remove("dark-mode-theme");
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
    //--------------------------------------------
    localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
    enableDarkMode(); // set state of darkMode on page load
}

themeToggler.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
    if (darkMode === "disabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
});

//============================================================================
//Dolar App
const appDolar = new Vue({
    el: "#appDolar",
    data:{
        dolarOficial:{},
        dolarBlue:{},
        dolarSoja:{},
        dolarCCL:{},
        dolarBolsa:{},
        bitcoin:{},
        dolarTurista:{}
    },
    created(){
        this.fetchData('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    },
    methods:{
        fetchData(url){
            fetch(url)
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                
                this.dolarOficial = res[0].casa,
                this.dolarBlue = res[1].casa,
                this.dolarSoja = res[2].casa,
                this.dolarCLL = res[3].casa,
                this.dolarBolsa = res[4].casa,
                this.bitcoin = res[5].casa,
                this.dolarTurista = res[6].casa

                //console.log(res[0].casa)

            })
        }
    }
})

//============================================================================
//Noticias App
const appNoticias = new Vue({
    el: "#appNoticias",
    data:{
        noticias:[]
    },
    created(){
        this.fetchData('https://newsapi.org/v2/top-headlines?country=ar&category=technology&apiKey=a2431f4ba5a146f381e9965ba2b21e37')
    },
    methods:{
        fetchData(url){
            fetch(url)
            .then(res => res.json())
            .then(res => {
                //console.log(res.articles)
                
                this.noticias = res.articles
            })
        }
    }
})

//============================================================================
//Fill notes in table
if (document.getElementById("appNotas")){
    const appNotas=new Vue({
        el:"#appNotas",
        data(){
            return{
            notas:[],
            errored:false,
            loading:true,
            }
        },
        created(){
            var url="http://localhost:8080/notas"
            this.fetchData(url);
        },
        methods:{
            fetchData(url) {
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.notas = data;

                    this.loading = false;
                })
                .catch(err => {
                    this.errored = true
                })
        },
        eliminar(nota) {
            const url = 'http://localhost:8080/notas/' + nota;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        }
    }
})
}
//============================================================================
//Order by rbtn
var ordenProp = "";
console.log("Selección de 'ordenProp': " + ordenProp)

var orderActivado = false;
console.log("Estado de 'orderActivado': " + orderActivado)

function ordenar(){
    var rbtnOrdenar = document.getElementsByName('rbtnOrdenar');
    
    for(i = 0; i < rbtnOrdenar.length; i++) {
        if(rbtnOrdenar[i].checked){
            document.getElementById("result").innerHTML = "Orden seleccionado: "+rbtnOrdenar[i].value;
            if(rbtnOrdenar[i].value == "prioridad"){
                console.log("Seleccionado Prioridad")
                document.getElementById("appNotas").id = 'appNotasPRIORIDAD';
                document.getElementById("appNotasPRIORIDAD").innerHTML.reload;
            }
            if(rbtnOrdenar[i].value == "fecha"){
                console.log("Seleccionado Fecha")
                document.getElementById("appNotas").id = 'appNotasFECHA';
            }
            if(rbtnOrdenar[i].value == "completo"){
                console.log("Seleccionado Completo")
                document.getElementById("appNotas").id = 'appNotasCOMPLETO';
            }
            ordenProp = rbtnOrdenar[i].value;
        }
    }
    console.log("Selección de 'ordenProp': " + ordenProp);

    orderActivado = true;
    console.log("Estado de 'orderActivado': " + orderActivado)
}

//============================================================================
//Sección de prueba para organización de notas siguiente versión
if (document.getElementById("appNotasPRIORIDAD")){
    const appNotasPRIORIDAD=new Vue({
        el:"#appNotasPRIORIDAD",
        data(){
            return{
            notas:[],
            errored:false,
            loading:true,
            }
        },
        created(){
            var url="http://localhost:8080/notas"
            this.fetchData(url);
        },
        methods:{
            fetchData(url) {
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.notas = data;
                    
                    //Funcion comparadora    
                    function GetSortOrder(prop) {    
                        return function(a, b) {    
                            if (a[prop] > b[prop]) {    
                                return 1;    
                            } else if (a[prop] < b[prop]) {    
                                return -1;    
                            }    
                            return 0;    
                        }    
                    }    
                        
                    this.notas.sort(GetSortOrder("prioridad")); //Paso el atributo para ser ordenado
                    
                })
                .catch(err => {
                    this.errored = true
                })
            },
            eliminar(nota) {
                const url = 'http://localhost:8080/notas/' + nota;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            }
        }
    })
}

if (document.getElementById("appNotasFECHA")){
    const appNotasFECHA=new Vue({
        el:"#appNotasFECHA",
        data(){
            return{
            notas:[],
            errored:false,
            loading:true,
            }
        },
        created(){
            var url="http://localhost:8080/notas"
            this.fetchData(url);
        },
        methods:{
            fetchData(url) {
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.notas = data;
                    
                    //Funcion comparadora    
                    function GetSortOrder(prop) {    
                        return function(a, b) {    
                            if (a[prop] > b[prop]) {    
                                return 1;    
                            } else if (a[prop] < b[prop]) {    
                                return -1;    
                            }    
                            return 0;    
                        }    
                    }    
                        
                    this.notas.sort(GetSortOrder("fecha")); //Paso el atributo para ser ordenado
                    
                })
                .catch(err => {
                    this.errored = true
                })
            },
            eliminar(nota) {
                const url = 'http://localhost:8080/notas/' + nota;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            }
        }
    })
}

if (document.getElementById("appNotasCOMPLETO")){
    const appNotasCOMPLETO=new Vue({
        el:"#appNotasCOMPLETO",
        data(){
            return{
            notas:[],
            errored:false,
            loading:true,
            }
        },
        created(){
            var url="http://localhost:8080/notas"
            this.fetchData(url);
        },
        methods:{
            fetchData(url) {
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.notas = data;
                    
                    //Funcion comparadora    
                    function GetSortOrder(prop) {    
                        return function(a, b) {    
                            if (a[prop] > b[prop]) {    
                                return 1;    
                            } else if (a[prop] < b[prop]) {    
                                return -1;    
                            }    
                            return 0;    
                        }    
                    }    
                        
                    this.notas.sort(GetSortOrder("completo")); //Paso el atributo para ser ordenado
                    
                })
                .catch(err => {
                    this.errored = true
                })
            },
            eliminar(nota) {
                const url = 'http://localhost:8080/notas/' + nota;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            }
        }
    })
}
