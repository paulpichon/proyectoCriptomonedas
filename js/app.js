//VARIABLES
//select para elegir la criptomoneda
const criptoMonedasSelect = document.querySelector('#criptomonedas');

//creamos un Promise
const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    //ponemos otro resolve
    resolve( criptomonedas );
});

//listener
document.addEventListener('DOMContentLoaded', () => {
    //llamar funcion para consultar criptomonedas
    consultarCriptomonedas();
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