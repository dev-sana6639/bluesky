export const getwether = async (city) =>{
  
    var Api_Key = '6c65db07940d1bb20d36178e4716ca59';
  const response =  await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${Api_Key}`)
                   .then(res => res.json())
                   .then(result => {
                     return result;
                   })

 return response
                }