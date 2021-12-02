function Visibility_Off(id){
    id.classList.add(HIDDEN_CLASSNAME);
}
function Visibility_On(id){
    id.classList.remove(HIDDEN_CLASSNAME);
}
function Remove_Field(index){
    let number = index.childElementCount;
    if(number !== 0){
        for(let i = 0, j = 0; i < number ; i++)
        index.children[j].remove();
    }
}
function Button_Span_Off(){
    for(let i = 0 ; i < button.childElementCount ; i++){
        Visibility_Off(button.children[i].children[1]);
        Visibility_Off(button.children[i].children[2]);
    }
}
function Paint_Color(index){
    if(index.innerText === '초월')
    index.style.color = '#007bff';
    else if(index.innerText === '불멸')
    index.style.color = 'salmon';
    else if(index.innerText === '영원')
    index.style.color = '#00c0a9';
    else if(index.innerText === '제한')
    index.style.color = '#7c0100';
    else if(index.innerText === '전설')
    index.style.color = '#fd2b2b';
    else if(index.innerText === '히든')
    index.style.color = '#009eef';
    else if(index.innerText === '1p' || index.innerText === '1팀')
    index.style.color = '#fd2b2b';
    else if(index.innerText === '2p' || index.innerText === '2팀')
    index.style.color = '#007bff';
    else if(index.innerText === '3p')
    index.style.color = '#651f99';
    else if(index.innerText === '4p')
    index.style.color = '#d59700';
}
function Fade_In(index,time){
    index.style.opacity = 0;
    let op_count = 0;
    setTimeout(function() {
        let fade = setInterval(function() {
            op_count = op_count + 0.01;
            index.style.opacity = op_count;
            if(op_count > 1){
                clearInterval(fade);
            }
        }, 5);
    }, time);
    op_count= 0; 
}
function Random_Effect(index){
    let element = index.innerText;
    let random_count = 0;
        const random = setInterval(function() {
            let array_1 = RULE_DUEL[Math.floor(Math.random() * RULE_DUEL.length)];
            index.children[0].innerText = array_1;
            random_count = random_count + 1;
        if(random_count > 10){
            clearInterval(random);
            index.children[0].innerText = element;
            random_count = 0;
            Fade_In(text,300);
            Fade_In(button,300);
        }
    }, 100);
}
