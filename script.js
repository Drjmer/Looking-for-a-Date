
let login1
let student_login_data
let student_data
let p=fetch('./login.json')
p.then((value1)=>{
    login1=value1.json()
    return login1
}).then((value2)=>{
    student_login_data=value2})

let p2=fetch('./students.json')
p2.then((value1)=>{
    return value1.json()
}).then((value2)=>{
    student_data=value2})
   
    
let match_i
function forget(y){
let i=0
//iterate through each and every student 
for(i=0;i<student_login_data.length;i++)
{
//checks if the enter username matches with the username of any student in students.json file
if(y==student_login_data[i].username){
    
   
     match_i=i
    //if the username matches then it will display the secret question
    document.getElementById("ques_ans").style.display="block"
    document.getElementById("ans_submit").style.display="block"
    document.getElementById("secret_q").innerHTML=`${student_login_data[i].secret_question}`
    break}
}

if(i==student_login_data.length){
    
  //if the entered username doesn't matches with any student then i will become equal no of students in students.json and the below message will be reflected
    document.getElementById("Incorrect_username").innerHTML="Incorrect Username"
    
}
else{
    document.getElementById("Incorrect_username").innerHTML=""
}

}
//this function checks whether the ans to the secret ques is right or wrong and accordingly give response
function password(){
    x=document.getElementById('ques_ans').value 

    const node=document.createElement("p");
    node.id="final_ans"
    document.getElementById("secret_ques").appendChild(node)
    if(x==student_login_data[match_i].secret_answer)
    {
     //if the ans is correct then the password will be shown in green
        document.getElementById("final_ans").style.color="green"
        document.getElementById("final_ans").innerHTML=`Your Password is: ${student_login_data[match_i].password}`
       
    }
    else{
     //if the answer is incorrect then the Incorrect...again!! will be shown in red
        document.getElementById("final_ans").style.color="red"
        document.getElementById("final_ans").innerHTML="Incorrect answer!! Try again!!"
       
        

    }
}

function forget1(){
    let y=document.getElementById('username').value 
    forget(y)

}
//this function checks whether the entered username and password is correct or not
function login(){
    //the below two lines stores the value of username and password in two different variables
    let username=document.getElementById('username').value
    let password1=document.getElementById('password').value
    inputCaptchaValue=document.getElementById("captcha-form").value;
    for(j=0;j<student_login_data.length;j++)
    {
        //checks whether username and password is correct or not
        if(username==student_login_data[j].username && password1==student_login_data[j].password)
        {
            //checks if the entered captcha value is correct or not
            if(inputCaptchaValue===captchaValue){
                console.log("run")
                document.getElementById("student_login").setAttribute('href',"dating.html")
            }
            else if(inputCaptchaValue!=captchaValue){
                
                
                alert("Invalid Captcha")
                console.log(inputCaptchaValue)
                console.log(captchaValue)
            }
            
            break
          
        }
        
    }
   
    
    if(j==student_login_data.length){
      
        document.getElementById("Incorrect_login").style.display="block"
        document.getElementById("Incorrect_login").innerHTML="Incorrect Username or Password"
    }
    else{
        document.getElementById("Incorrect_login").innerHTML=""
    }
    
}

var value
var captchaValue
var inputCaptchaValue
// code for cAPTCHA
(function(){
const fonts=["sans-serif","serif"];  //defines two different font style for captcha text  
captchaValue=""
function generateCaptcha(){//this function generates the captcha value
    value=btoa(Math.random()*1000000000) //btoa() is a built-in function that stands for "binary to ASCII." It's used to encode a string in base-64 format.
    value=value.substring(0,0.5+Math.random()*5+2); //return a substring of arbitary length>=2
    captchaValue=value;
}
function setCaptcha(){
    let html=captchaValue.split("").map((char) =>{//splits each charater of captchaValue variable
        const rotate = -20 + Math.trunc(Math.random()*30); //give an arbitary value to rotate
        const font=Math.trunc(Math.random()*fonts.length);
        return `<span
        style=" 
        transform: rotate(${rotate}deg); 
        font-family:${fonts[font]}" >  
        ${char}</span>
        `;
    
    }).join("");
    document.querySelector(".captcha .preview").innerHTML=html; //writes html in element with id preview
}
function initCaptcha(){
    document.querySelector(".captcha .captcha-refresh").addEventListener("click",function(){//this function ensures that on clicking the refresh button the alphanumeric text shown in captcha-preview gets updated
        generateCaptcha();
        setCaptcha();
    });
    generateCaptcha();
    setCaptcha();
}
    initCaptcha(); //this function initalises the captcha value
})();




