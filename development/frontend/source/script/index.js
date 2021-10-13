var pages = {
    cliente: new Object(),
    endereco: new Object(),
    cep: new Object()
}

var api = `${location.protocol}//${location.hostname}:3000`;

function FillMain(content)
{
    let mainDiv = document.getElementById('main');
    mainDiv.innerHTML = content;
}

function LoadPage(page) 
{      
    Exists(page);
    if(pages[page].content == undefined)
        GetPage(page, (content) => {FillMain(content)});
    else 
        FillMain(pages[page].content);
}

function GetPage(page, callback)
{
    Exists(page);
    let content = pages[page].content;
    if( content != undefined && content != null) {
        if(callback != undefined && typeof callback == 'function')
            callback(content);
        return;
    }

    let url = `../page/${page}.html`;
    fetch(new Request(url, {method: 'GET'})
    ).then((response) => {
        if (response.status === 200) 
        {
            console.debug(response);
            return response.text();
        } else {
            throw new Error('Ops! Houve um erro em nosso servidor.');
        }
    }).then((text) => {
        pages[page].content = text;
        if(typeof callback == 'function'){
            callback(text);
        }
        console.debug(text);
    }).catch(error => {
        console.error(error);
    });
}

function Exists(page) {
    if(pages[page] == undefined)
        throw new Error(`Página ${page} não existe`)
}


function GetCep(cepElement) {
    let cep = document.getElementById(cepElement).value;
    
    if(cep == null) {
        throw new Error("CEP inválido");
    }

    let url = `${api}/cep/${cep}`;

    fetch(new Request(url, {method: 'GET'})
    ).then((response) => {
        if (response.status === 200) 
        {
            console.debug(response);
            return response.text();
        } else {
            console.log(response.status);
            throw new Error('Ops! Houve um erro em nosso servidor.');
        }
    }).then((cepText) => {
        FillCepContent(cepText);
        console.debug(cepText);
    }).catch(error => {
        console.error(error);
    });
}

function FillCepContent(text) {
    let cepObj = JSON.parse(text);
    let div = document.getElementById("ceptext");

    div.innerHTML = Object.keys(cepObj).reduce((str, key) => {
        if(str == 'id')
            str = '';
        return `${str} <label>${key}:&#9;</label> <input type=text value='${cepObj[key]}' disabled><br>`;
    });
}