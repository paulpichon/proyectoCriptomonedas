//VARIABLES
//select para elegir la criptomoneda
const criptoMonedasSelect = document.querySelector('#criptomonedas');
//input moneda
const monedaSelect = document.querySelector('#moneda');
//variable para el formulario
const formulario = document.querySelector('#formulario');

//creamos un objeto vacio
const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}


//creamos un Promise
const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    //ponemos otro resolve
    resolve( criptomonedas );
});

//listener
document.addEventListener('DOMContentLoaded', () => {
    //llamar funcion para consultar criptomonedas
    consultarCriptomonedas();

    //listener a formulario
    formulario.addEventListener('submit', submitFormulario);

    //listener a input criptomoneda
    criptoMonedasSelect.addEventListener('change', leerValor);
});
//funcion para consultar las criptomonedas
function consultarCriptomonedas() {
    //url del endpoint
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    //fetch
    fetch( url )
        .then( respuesta => respuesta.json())
            //creamos un promise
            .then( resultado => obtenerCriptomonedas( resultado.Data) )
                //una vez que se resuleven las criptomonedas
                .then( criptomonedas => selectCriptomonedas( criptomonedas ) );
}
//funcion para poner las criptomonedas en el select
function selectCriptomonedas( criptomonedas ) {
    //recorremoe el arreglo
    criptomonedas.forEach( cripto => {
        //console.log( cripto );
        //destructuring
        const { FullName, Name } = cripto.CoinInfo;
        //crear el html
        const option = document.createElement('option');
        //texcontent
        option.textContent = FullName;
        //value del option
        option.value = Name;
        //renderizar
        criptoMonedasSelect.appendChild( option );
    });
}
//funcion para leer el valor del objeto de busqueda
function leerValor( e ) {
    //recuperamos el valor del input y lo asignamos al objeto 
    objBusqueda[ e.target.name ] = e.target.value;
    //console.log( objBusqueda );
}

//funcion para validar formulario
function submitFormulario( e ) {
    //prevenir la accion por defecto
    e.preventDefault();
    //destructuring
    const { moneda, criptomoneda } = objBusqueda;
    //validar si no estan vacios los campos
    if ( moneda === '' || criptomoneda === '') {
        //llamamos funcion para mostrar alerta
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

}
//funcion para mostrar alerta
function mostrarAlerta( mensaje ) {
    console.log( mensaje );
}