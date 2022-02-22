
const showsTodos = [];

const simulador = document.getElementById("simulador");
const HTMLresultado = document.getElementById("resultado");

//Inputs del form
const duracion = document.getElementById("duracion");
const factura = document.getElementById("factura");
const fecha = document.getElementById("fecha");
const tipo = document.getElementById("tipo");

const NPresupuesto = document.getElementById("NPresupuesto");
const email = document.getElementById("email");

//Botones
const btnCrear = document.getElementById("crear");
const btnComparar = document.getElementById("comparar");
const btnBorrar = document.getElementById("borrar");

const btnCotizar = document.getElementById("cotizar");

class Show {
    constructor(id, fecha, duracion, factura, acompaniamiento, precio) {
        this.id = id;
        this.fecha =fecha;
        this.duracion = duracion;
        this.factura = factura;
        this.acompaniamiento = acompaniamiento;
        this.precio = precio;
    }

    precioDuracion(){
        if(this.duracion=="30"){
            this.precio=20000;
        }else if (this.duracion=="60"){
            this.precio=30000;
        }else if (this.duracion=="90"){
            this.precio=45000;
        }else if (this.duracion=="120"){
            this.precio=60000;
        }
    }

    precioDias(dias){
        if (dias<16){
            this.precio=this.precio*1.2;
        }else{
            this.precio=this.precio;
        }
    }

    precioFactura(){
        if(this.factura=="C"){
            this.precio=this.precio*1.21;
        }else if(this.factura=="A"){
            this.precio=this.precio*1.55;
        }
    }

    precioAcompaniamiento(){
        if(this.acompaniamiento=="musicos"){
            this.precio=this.precio+18000;
        }else if(this.acompaniamiento=="pista"){
            this.precio=this.precio;
        }
    }


}


$(document).ready(function(){


    //JQuery jugando con los inputs
    $(':input').hover(function () {
        $(this).removeClass('borderOriginal');
        $(this).addClass('borderInput');
    }, function () {
        $(this).removeClass('borderInput');
        $(this).addClass('borderOriginal');
    })
    


    //FECHA
        //SETEO FORMATO DATE HTML
        /* Este código me permite setear adecuadamente la fecha del input date para que no se puedan elegir fechas anteriores al día de hoy*/
        const hoy = new Date();

        let anio = hoy.getFullYear();
        let dia = hoy.getDate();
        let mes = hoy.getMonth(); //devuelve de 0 a 11
        mes = mes + 1; //ahora está de 1 a 12
        if (mes < 10) //se agrega un 0 al principio para conincidir con formato date del input
        {
            mes = "0" + mes;
        } else {
            mes = mes.toString;
        }

        let fechaActual = anio + '-' + mes + '-' + dia;
        fecha.setAttribute('min', fechaActual); // Seteo el atributo min del input date
        //SETEO ORMATO DATE HTML


        //CALCULO FECHA ==> DIAS DE ENSAYO ==> se ejecuta en el evento
        /*Este código recupera la fecha del evento en un formato que permita calcular diferencias*/
        function retornarFecha(input) {
            let fechaFormatoDate = new Date(input.value);
            return fechaFormatoDate;
        }

        /*Calcular la diferencia de días entre la fecha actual y la fecha del evento elegida*/
        function calcularDiferencia(actual, futuro) {
            let diferencia = futuro.getTime() - actual.getTime();
            diferencia = Math.round(diferencia / (1000 * 60 * 60 * 24));
            return diferencia;
        }
        //CALCULO FECHA
    //FECHA

    //GUARDAR EN STORAGE
    const guardar=(clave,valor)=>{
        sessionStorage.setItem(clave,valor);
    }
    function guardarSession(){
        for(const show of showsTodos){
            guardar(show.id, JSON.stringify(show));
        }
    }
    //GUARDAR EN STORAGE

    //TRAER DE STORAGE
    function recuperarSession() {
        let nroCotizacion = NPresupuesto.value;
        let showString = sessionStorage.getItem(nroCotizacion);
        let productoParseado=JSON.parse(showString);
        return productoParseado;
    }
    //TRAER DE STORAGE


    //MOSTRAR EN HTML
    //JQuery
    function mostrarEnPantalla(show){
        $("#resultado").append(`<div class="creados oculto">
            <p>Los datos ingresados del presupuesto ${show.id} son: </p>
            <ul>
                <li>Fecha del evento: ${show.fecha}</li>
                <li>Duración del evento: ${show.duracion}</li>
                <li>Tipo de factura: ${show.factura}</li>
                <li>Tipo de acompañamiento: ${show.acompaniamiento}</li>
                <li>Precio: ${show.precio}
            </ul>
        </div>`);
    }
    //MOSTRAR EN HTML
        
    //BORRAR NODOS
    // jQuery
    function borrarNodos(){ 
        $('#resultado').empty();   
    } 
    //BORRAR NODOS

    //ORDENAR DE MAS BARATO A MAS CARO Y COMPARAR
    function mostrarComparado(){
        borrarNodos();
        /*ordenar precios de mas barato a mas caro en el array showTodos creando un nuevo array preciosOrdenados*/
        const preciosOrdenados= showsTodos.sort((s1, s2)=>{
        return s1.precio - s2.precio;
        })

        /*DOM*/
        $("#resultado").append(`<div class="creado oculto">
            <h3 class="text-start fs-5">Detalle de los presupuestos, ordenados de más económico a más costoso</h3>            
        </div>`)

        for(const newShow of preciosOrdenados){
            
            $("#resultado").append(`<div class="creado oculto">
                <p>Presupuesto nro ${newShow.id}: </p>
                    <ul>
                    <li>Fecha del evento: ${newShow.fecha}</li>
                    <li>Duración del evento: ${newShow.duracion}</li>
                    <li>Tipo de factura: ${newShow.factura}</li>
                    <li>Tipo de acompañamiento: ${newShow.acompaniamiento}</li>
                    <li>Precio: ${newShow.precio}</li></ul><br>            
            </div>`)
            
            
            
        }
    }
    //ORDENAR DE MAS BARATO A MAS CARO Y COMPARAR

    //COTIZACIÓN FORMAL
    //JQuery
    function mostrarCotizacionElegida(cotizacion){
        $("#resultado").append(`<div class="creado">
            <p>Solicitó la cotización formal del presupuesto nro ${cotizacion.id}: </p>
            <ul>
                <li>Fecha del evento: ${cotizacion.fecha}</li>
                <li>Duración del evento: ${cotizacion.duracion} minutos</li>
                <li>Tipo de factura: ${cotizacion.factura}</li>
                <li>Tipo de acompañamiento: ${cotizacion.acompaniamiento}</li>
                <li>Precio: $${cotizacion.precio}</li>
            </ul><br>            
        </div>`
        )           
    }
    //COTIZACIÓN FORMAL

  
    //evento CHANGE PARA MUSICOS
    $("#tipo").change(()=>{
        if(($("#tipo").val())=="musicos"){
            $("#cantMusicos").append(`<div><input class="rad" type="radio" name="acom" id="pianista" value="pianista/organista"</input>
            <label for="pianista" >Pianista/Organista</label>
            <input class="rad" type="radio"  name="acom" id="resto" value="guitarriasta y bajista"</input>
            <label for="resto" >Guitarrista y Bajista</label></div><br><br>`);
            $("#cantMusicos").slideDown();
        }else if(($("#tipo").val())=="pista"){
            $("#cantMusicos").slideUp().empty();  
        }
    })

    //evento CHANGE PARA MUSICOS


    //BOTONES

    //BOTON CREAR   
    //JQuery
    $("#crear").click(()=>{

        borrarNodos()

        $("#resultado").addClass("border border-dark border-4 rounded align-self-start resultado");

        const newShow = new Show(showsTodos.length, fecha.value, duracion.value, factura.value, tipo.value,0);
        
        //DIAS DE ENSAYO 
        let diasEnsayo = calcularDiferencia(hoy, retornarFecha(fecha));

        //EJECUTO METODOS DEL OBJETO
        newShow.precioDuracion();
        newShow.precioDias(diasEnsayo);
        newShow.precioFactura();
        newShow.precioAcompaniamiento();

        mostrarEnPantalla(newShow);
        $("div.creados").fadeIn(2000);
        showsTodos.push(newShow);
        $("#cotiz").slideDown(1000);
        guardarSession();

    })
    //BOTON CREAR

    //BOTON BORRAR
    //JQuery
    $("#borrar").click(()=>{
        borrarNodos();
        sessionStorage.clear();
        showsTodos.length=0; //vaciar array
        $("#resultado").removeClass("border border-dark border-4 rounded align-self-start resultado");
        $("form div.oculto").slideUp(1000);
    })
    //BOTON BORRAR

    //BOTON COMPARAR
    //JQuery
    $("#comparar").click(()=>{
        if (showsTodos.length<=1){
            $("#resultado").append(`<div class="creado oculto"><p>No hay suficientes presupuestos creados para comparar</p></div>`);
            $("div.oculto").fadeIn(2000);
        }else{
            mostrarComparado();
            $("div.oculto").fadeIn(2000);
        }   
    })
    //BOTON COMPARAR

    //BOTON COTIZAR
    //JQuery
    $("#cotizar").click(()=>{
        borrarNodos();

        if(($("#NPresupuesto").val())>=showsTodos.length){
            $("#resultado").append(`<div class="creado oculto"><p>Ese número de presupuesto no existe</p></div>`);
            $("div.oculto").fadeIn(2000);
        }else{
            let datos=recuperarSession();
            mostrarCotizacionElegida(datos);

            //AJAX
            let URLPOST = "https://jsonplaceholder.typicode.com/posts"
            $.post(URLPOST, datos, (respuesta,estado)=>{
                if(estado==="success"){
                    
                    $("#resultado").append(`<div><p>EL MENSAJE HA SIDO ENVIADO CORRECTAMENTE A ${email.value}<br>`)
        
                }
            })
            //AJAX

            $("#resultado").append(`<div id="gracias" class="creado oculto"><img src="imagenes/gracias.png" alt="Gracias"></div><br>`)
            $("div#gracias").slideDown(1000).delay(5000).slideUp(1000);
        
        };  
    })
    //BOTON COTIZAR 

    //ANIMACION CON SCROLL
    window.addEventListener('scroll',()=>{
        let animacion = document.getElementById("animScroll");
        let posicionObj= animacion.getBoundingClientRect().top;
        let tamanioPantalla = window.innerHeight;
    
        if (posicionObj < tamanioPantalla){
            $("#animScroll").slideDown(1000);
        }else{
            $("#animScroll").hide();
        }
    })
    //ANIMACION CON SCROLL


    //TEMA: AJAX Y API
    //BOTON REPER LIRICO
    $("#mostrarreperlirico").click(()=>{
        $('#replir').empty();
        const URLJSON="../json/repertorio.json"
        $.getJSON(URLJSON, function(respuesta,estado){
            if(estado==="success"){
                let datos = respuesta;
                for(const dato of datos){
                    if(dato.genero.tipo === "Opera"){
                        $("#replir").append(`<div><p>Nombre: ${dato.nombre}<br>
                                                Compositor: ${dato.compositor}<br>
                                                Genero: ${dato.genero.tipo}<br>
                                                Opera: ${dato.genero.opera} <br>
                                                Año: ${dato.anio}<br>`
                                            )
                    }              
                }
            }
        })
    })
    //BOTON REPER LIRICO

    //BOTON REPER POPULAR
    $("#mostrarreperpopular").click(()=>{
        $('#reppop').empty();
        const URLJSON="../json/repertorio.json"
        $.getJSON(URLJSON, function(respuesta,estado){
            if(estado==="success"){
                let datos = respuesta;
                for(const dato of datos){
                    if(dato.genero.tipo === "Popular"){
                        $("#reppop").append(`<div><p>Nombre: ${dato.nombre}<br>
                                                Compositor: ${dato.compositor}<br>
                                                Genero: ${dato.genero.tipo}<br>
                                                Año: ${dato.anio}<br></div>`
                                            )  
                    }              
                }
            }
        })
    })

})