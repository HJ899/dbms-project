var inputItems = [];
for(var i = 0 ; i < 6 ; i++){
    inputItems.push(document.getElementById('inp_' + (i+1) ))
}
if(localStorage.getItem('clicked') === 'true' ){
    for(var i = 0 ; i < 6 ; i++){
        inputItems[i].value = localStorage.getItem(inputItems[i].id);
    }  
}
localStorage.clear();
var dropdownButton = document.getElementById('dropdownMenuButton');
dropdownButton.addEventListener('click', function(event){  
    for(var i = 0 ; i < 6 ; i++){
        var id = inputItems[i].id;
        var value = inputItems[i].value;
        localStorage.setItem(id, value);
    }  
});
var dropdownItems = document.getElementsByClassName('dropdown-item');
for(var i = 0 ; i < dropdownItems.length ; i++){
    dropdownItems[i].addEventListener('click', function(event){
        event.stopPropagation();
        localStorage.setItem('clicked', 'true');
    })
} 