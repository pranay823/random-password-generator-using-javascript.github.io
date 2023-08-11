const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]") ;
const indicator =document.querySelector("[data-indicator]");
const symbols = '!@#$%^&*()_+-=[]{}:";,./<>?'
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const copyMsg = document.querySelector("[data-copyMsg]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const generateBtn = document.querySelector(".generateButton");

let password="";
passwordLength = 10;
checkCount = 0;
handleSlider();
// int strength color to grey 

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength;
   const min = inputSlider.min;
   const max = inputSlider.max;
    inputSlider.style.backgroundSize =( (passwordLength - min)*100/(max - min)) + "%  100%";
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px  ${color}`;
}
handleSlider();
setIndicator("#ccc");

function getRndInteger(min,max){
  return Math.floor(Math.random()* (max-min))+ min;
}

function  generateRandomNumber(){
    return getRndInteger(0,9);
}

function  generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function  generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){

    return symbols[getRndInteger(0,symbols.length)]; 
}

function calcStrength(){
    hasUpper = false;
    hasLower=false;
    hasNum = false;
    hasSys = false;
    if(uppercaseCheck.checked) hasUpper =true;
    if(lowercaseCheck.checked) hasLower =true;
    if(numbersCheck.checked) hasNum =true;
    if(symbolsCheck.checked) hasSys =true;

    if(hasUpper && hasLower  && (hasNum || hasSys) && passwordLength >=8 ){
        setIndicator("#0f0");
    } 
    else if((hasLower || hasUpper) && (hasNum || hasSys) && passwordLength>=6){
     setIndicator('#ff0');
    }
    else{
        setIndicator("#f00");
    }
}

async function  copycontent(){
    try{ 
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.textContent = "Copied" 
    }
    catch(e){
       copyMsg.innerText = "Failed"; 
    }
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove('active');
    },2000);
}

function shufflePassword(array){
    for(let i= array.length -1 ; i>0 ;i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j]
        array[j]=temp;
    }

    let str ="";
    array.forEach((el)=>{str += el});
    return str;
}

function handleCheckboxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
       if(checkbox.checked){
        checkCount++;
       }
    });

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckboxChange);
})

inputSlider.addEventListener("input",(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copycontent();
})


generateBtn.addEventListener("click",()=>{
    // when none of the checkbox is selcted
   if(checkCount <= 0) return ;
     
   if(passwordLength < checkCount){
  passwordLength = checkCount;
  handleSlider();
   }
 
//remove old password 
password="";
console.log("removes password");
// new journey to create password

let funcArr = [];
if(uppercaseCheck.checked)
funcArr.push( generateUpperCase);

if(lowercaseCheck.checked)
funcArr.push( generateLowerCase);

if(numbersCheck.checked)
funcArr.push( generateRandomNumber);

if(symbolsCheck.checked)
funcArr.push(generateSymbol);


for(let i=0;i<funcArr.length;i++){
    password += funcArr[i]();
}
console.log("compulsary  password done");
// remaining password

for(let i=0;i< passwordLength - funcArr.length;i++){
  let randIndex = getRndInteger(0,funcArr.length);
  password+= funcArr[randIndex]();
}
console.log("remaining password done");
// shuffle the password
password = shufflePassword(Array.from(password));

//show in the UI
console.log("updated the ui")
passwordDisplay.value = password;
calcStrength();
})

