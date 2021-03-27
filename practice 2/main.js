function generateNumbers(){
    getEvenRandomNumberAfterDelayAsync(1000)
        .then(evenNumber => {
            document.body.innerHTML += evenNumber +"<br>";
            
        }
        .catch(err => alert(err));

}
function getEvenRandomNumberAfterDelayAsync(limit){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const num =Math.floor(Math.random() * limit) + 1;
            if(num % 2 == 0 ){
                resolve(num);

            }
            else {
                reject("Failed to generate even number :-( ");
            }
        },3000);
    });
}