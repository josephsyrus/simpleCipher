const errorMessage= document.querySelector('.error-container');
errorMessage.style.display="none";

const convertButton= document.querySelector('.convert-button');
convertButton.addEventListener('click',getValues)

const clearButton= document.querySelector('.clear-button');
clearButton.addEventListener('click',clearInput);

let input= document.querySelector('.input-textarea');
input.value='';
let output= document.querySelector('.output-textarea');
output.value='';

document.querySelector('.mode-select').value="";
document.querySelector('.cipher-select').value="";
document.querySelector('.shift-input').value="";
document.querySelector('.key-input').value="";


function clearInput(){
    input.value='';
    output.value='';
}

function getValues(){
    errorMessage.style.display="none";
    let mode = document.querySelector('.mode-select').value;
    let method = document.querySelector('.cipher-select').value;
    let shift = Number(document.querySelector('.shift-input').value);
    let key = document.querySelector('.key-input').value;
    let text = document.querySelector('.input-textarea').value;


    if(!/^[a-zA-Z]+$/.test(key)&&key!==''){
        errorMessage.style.display="block";
        return;
    }
    if(!/^\d+$/.test(shift)&&shift!==''){
        errorMessage.style.display="block";
        return;
    }
    output.value='';
    if(mode==='Encrypt'){
        encrypt(method, shift, key, text);
    }
    else if(mode==='Decrypt'){
        decrypt(method, shift, key, text);
    }
}

function encrypt(method, shift, key, text){
    if(method==='Ceasar'){
        ceasarCipher(shift,text);
    }
    else if(method==='ROT13'){
        ceasarCipher(13,text);
    }
    else if(method==='atbash'){
        atbashCipher(text);
    }
    else  if(method==='vigenere'){
        console.log('vig!!');
    }
}

function decrypt(method, shift, key, text){
    if(method==='Ceasar'){
        shift=-(shift%26);
        ceasarCipher(shift+26,text);
    }
    else if(method==='ROT13'){
        ceasarCipher(13,text);
    }
    else if(method==='atbash'){
        atbashCipher(text);
    }
}

function ceasarCipher(shift,text){
    let encrypted='';
    for(let i=0; i<text.length; i++){
        if(text[i].match(/[a-zA-Z]/)){
            let asciiCode=text[i].charCodeAt(0);
            let base;
            if(asciiCode>=65&&asciiCode<=90){
                base=65;
            }
            else if(asciiCode>=97&&asciiCode<=122){
                base=97;
            }
            let newAsciiCode=(((asciiCode-base+shift)%26)+base);
            let char=String.fromCharCode(newAsciiCode);
            encrypted+=char;
        }
        else{
            encrypted+=text[i];
        }
    }
    output.value=encrypted;
}

function atbashCipher(text) {
    let encrypted='';
    for(let i=0; i<text.length; i++){
        if(text[i].match(/[a-zA-Z]/)){
            let asciiCode=text[i].charCodeAt(0);
            if(asciiCode>=65&&asciiCode<=90){
                encrypted+=String.fromCharCode(155-asciiCode);
            }
            else if(asciiCode>=97&&asciiCode<=122){
                encrypted+=String.fromCharCode(219-asciiCode);
            }
        }
        else{
            encrypted+=text[i];
        }
    }
    output.value=encrypted;
}

