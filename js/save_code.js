const input = document.querySelector('#directory_upload');
const preview = document.querySelector('.file_list');

input.addEventListener('change', showTextFile);

function showTextFile() {
        let selectedFiles = input.files;
        let array1 = [];
        let array2 = [];
        for(let file of selectedFiles) 
           array1.push(file.webkitRelativePath);

        for(let i = 0 ; i < array1.length ; i++){
            let number_front = input.files[i].name.lastIndexOf("_")+1;
            let number_end = input.files[i].name.indexOf('.txt');
            let number_last = parseInt(input.files[i].name.slice(number_front,number_end));
            array2.push(number_last);
        }
        let max = Math.max.apply(null, array2);
        if(copy.childElementCount === 0)
            Create_field_Code();

        processFile(input.files[array2.indexOf(max)]); 
}
function processFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
        const number = reader.result.indexOf("-load");
        const text = reader.result.slice(number,number+18);
        copy.children[0].innerText = text;
    };
    reader.readAsText(file, "euc-kr");
}
function Create_field_Code(){
    const span = document.createElement('span');
    const button = document.createElement('button');
    button.innerText = '복사';
    button.addEventListener('click',Copy_Button);
    copy.appendChild(span);
    copy.appendChild(button);
}
function Copy_Button(){
    const clipboard = navigator.clipboard;
    clipboard.writeText(copy.children[0].innerText);
}