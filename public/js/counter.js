var counter = document.getElementById('counter');
console.log('script running');
var i = Number(counter.textContent);
function myRedirectTimer() {
    i--;
    counter.textContent = i;
    if(i == 0){
        clearInterval();
        window.location = '/';
    }
}
setInterval(myRedirectTimer, 1000)