
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
    if(event.submitter.name=="Search"){
        fetch("/weather?address="+search.value).then((response)=>{
            response.json().then((data)=>{
                if(data.error)
                success.textContent=data.error
                else{
                weatherimg.style.display="inline"
                weatherimg.src=data.weatherIcon;
                success.innerHTML="<h3> Place Name:"+data.placename + "</h3><br />" + ` ${data.weatherdesc} It is currently ${data.temp} degree out, It feels like ${data.feelslike} degree out <br />
                Humidity is ${data.humidity}%`
            }
                loading.style.display = "none";
            })
        })
    }
    else if(event.submitter.name=="Location"){
        console.log("Recieved");
            if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(Position=>{
                fetch("/weather/Current?address="+Position.coords.latitude+","+Position.coords.longitude).then((response)=>{
                    response.json().then((data)=>{
                        if(data.error)
                        success.textContent=data.error
                        else{
                        weatherimg.style.display="inline"
                        weatherimg.src=data.weatherIcon;
                        success.innerHTML="<h3> Place Name:"+data.pName +", "+data.State+", "+data.country+ "</h3><br />" + ` ${data.weatherdesc} It is currently ${data.temp} degree out, It feels like ${data.feelslike} degree out <br />
                        Humidity is ${data.humidity}%`
                    }
                        loading.style.display = "none";
                    })
                })      

               })
            } else { 
              success.innerHTML= "Geolocation is not supported by this browser.";
            }
    }
    event.preventDefault();
})