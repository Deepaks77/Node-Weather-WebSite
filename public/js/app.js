
// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })



const weatherform=document.querySelector('form');
const search=document.querySelector("input");
const success=document.getElementById("success");
const loading=document.getElementById("loading");
const weatherimg=document.getElementById("weather");
weatherform.addEventListener("submit",(event)=>{
    success.textContent="";
    loading.style.display="block";
    weatherimg.style.display="none"
    
    fetch("http://localhost:3000/weather?address="+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            success.textContent=data.error
            else{
            weatherimg.style.display="inline"
            weatherimg.src=data.weatherIcon;
            success.innerHTML="<h3> Place Name:"+data.placename + "</h3><br />" + ` ${data.weatherdesc} It is currently ${data.temp} degree out, It feels like ${data.feelslike} degree out`
        }
            loading.style.display = "none";
        })
    })
    event.preventDefault();
})