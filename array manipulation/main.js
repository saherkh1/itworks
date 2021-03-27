function findValue(){
    const arr =[];

for(let i=1;i<=20;i++){
    arr.push(Math.floor(Math.random()*100));
}
document.write(arr);

result = arr.find(item => item > 50);
document.write("First number larger than 50:"+ );

result = arr.find(item => item < 40 && item % 2 === 0);
document.write("HI");
}
