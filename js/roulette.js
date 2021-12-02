const rules = document.getElementById("select_rule");
const people = document.querySelector("#select_people");
const start = document.querySelector("#button_start");
const rule = document.querySelector("#rule_field");
const text = document.querySelector("#text_field");
const button = document.querySelector("#button_field");
const PHYSICS = JSON.parse(localStorage.getItem("물뎀"));
const MAGICAL = JSON.parse(localStorage.getItem("마뎀"));
const ALL = JSON.parse(localStorage.getItem("모든상위"));
const LEGEND = JSON.parse(localStorage.getItem("전설"));
const HIDDEN = JSON.parse(localStorage.getItem("히든"));
const RULE_RANDOM = JSON.parse(localStorage.getItem("랜덤룰"));
const RULE_DUEL = JSON.parse(localStorage.getItem("듀컨룰"));
const GAMBLE_COUNT = JSON.parse(localStorage.getItem("고도카운트"));
const HERO_COUNT = JSON.parse(localStorage.getItem("상위카운트"));
const TEAM_COUNT = JSON.parse(localStorage.getItem("팀상위카운트"));
const RULE_TEXT = JSON.parse(localStorage.getItem("룰설명"));
const HIDDEN_CLASSNAME = "hidden";
let PICK_RULE = "";

function Restart(){
    let rules_data = rules.options[rules.selectedIndex].value;
    let people_data = people.options[people.selectedIndex].value;
    const End = 0;
    if(rules_data !== End || people_data !== End){
        Remove_Field(rule);
        Remove_Field(text);
        Remove_Field(button);
    }
}
function Show_Random(index){
    const number = index.target.id;
    for(let i = 1 ; i <index.target.parentElement.childElementCount ; i++){
        Visibility_On(button.children[number].children[(i)]);
        Fade_In(button.children[number].children[(i)],5);
    }
}
function Create_Field_Text(index){
    const text_index = document.createElement("p");
    Remove_Field(text);
    if(index !== 0){
        text_index.innerText = RULE_TEXT[RULE_DUEL.indexOf(index)+2];
    }
    else
        text_index.innerText = RULE_TEXT[0];
    text.appendChild(text_index);
}
function Create_Field_Button(count){
    for(let i = 0 ; i < count ; i++){
        const div_index = document.createElement("div");
        const p_index = document.createElement("span");
        const span_index = document.createElement("span");
        const button_index = document.createElement("button");
        button_index.innerText = "확인";
        button_index.id = i;
        button_index.addEventListener("click",Show_Random);
        Visibility_Off(p_index);
        Visibility_Off(span_index);
        div_index.appendChild(button_index);
        div_index.appendChild(p_index);
        div_index.appendChild(span_index);
        button.appendChild(div_index);
    }
}
function Create_Field_Random(index,number){
    number = parseInt(number);
    if(button.childElementCount !== 0){
        Remove_Field(button);
    }
    if(index === '강제전'){
        Create_Field_Button(1);
        Random_Pick(ALL,1);
    }
    else if(index === '이 캐릭들 금지에요 (7히든+7전설)'){
        Random_Pick_Many(LEGEND,HIDDEN,7,2);
    }
    else if(index === '이 캐릭들 필수에요 (4히든+4전설)'){
        Random_Pick_Many(LEGEND,HIDDEN,4,2);
    }
    else if(index === '팀 강제전'){
        Create_Field_Button(2);
        Random_Pick(ALL,2);
    }
    else if(index === '팀의 상위는..?'){
        Create_Field_Button(2);
        Random_Pick(TEAM_COUNT,2);
    }
    else if(index === '지츠 다이스 룰'){
        if(index === '지츠 다이스 룰' && number === 1){
            Random_Rule(RULE_RANDOM);
            return Create_Field_Random(PICK_RULE,number);
        }
        Create_Field_Button(number);
        Random_Pick(ALL,number);
    }
    else if(index === '인생의 고도전'){
        Create_Field_Button(number);
        Random_Pick(GAMBLE_COUNT,number);
    }
    else if(index === '너의 상위는..?'){
        Create_Field_Button(number);
        Random_Pick(HERO_COUNT,number);
    }
}
function Random_Pick(index,count){
    const random_array = [];
    if(index[0] === '1' && index.length === 10){          //인생의 고도전
        for(let i = 0 ; i < count ; i++){
            let random = index[Math.floor(Math.random() * index.length)];
            const random_front = button.children[i].children[1];
            const random_back = button.children[i].children[2];
            random_front.innerText = '\n'+'\n'+(i+1)+'p'
            random_back.innerText = ' = 5 + ' +random;
            Paint_Color(random_front);
        }
    }
    else if(index[0] === '1' && index.length === 5){     //너의 상위는..?
        for(let i = 0 ; i < count ; i++){
            let random = index[Math.floor(Math.random() * index.length)];
            const random_front = button.children[i].children[1];
            const random_back = button.children[i].children[2];
            random_front.innerText = '\n'+'\n'+(i+1)+'p'
            random_back.innerText = ' = ' +random;
            Paint_Color(random_front);
        }
    }
    else if(index[0] === '0' && index.length === 7){        //팀의 상위는..?
        for(let i = 0 ; i < count ; i++){
            let random = index[Math.floor(Math.random() * index.length)];
            const random_front = button.children[i].children[1];
            const random_back = button.children[i].children[2];
            random_front.innerText = '\n'+'\n'+(i+1)+'팀'
            random_back.innerText = ' = ' +random;
            Paint_Color(random_front);
        }
    }
    else{
        for(let i = 0 ; i < count ; i++){
            let random = index[Math.floor(Math.random() * index.length)];
            const random_front = button.children[i].children[1];
            const random_back = button.children[i].children[2];
            random_front.innerText = '\n'+'\n'+random.substring(0,random.length-2);
            random_back.innerText = random.substring(random.length-2,random.length);
            random_array.push(random_front.innerText);
            Paint_Color(random_back);
        }
        const set = new Set(random_array);
        if(random_array.length !== set.size){
            return Random_Pick(index,count);
        }
    }

}
function Random_Pick_Many(index_0,index_1,count,number){
    const random_array = [];
    Remove_Field(button);
    for(let j = 0 ; j < number ; j++){
        const div_index = document.createElement("div");
        const button_index = document.createElement("button");
        button_index.innerText = "확인";
        button_index.id = j;
        button_index.addEventListener("click",Show_Random);
        div_index.appendChild(button_index);
        button.appendChild(div_index);
        for(let i = 0 ; i < count ; i++){
            const p_index = document.createElement("span");
            const span_index = document.createElement("span");
            Visibility_Off(p_index);
            Visibility_Off(span_index);
            div_index.appendChild(p_index);
            div_index.appendChild(span_index);
            let index = 'index_'+j;
            index = eval(index);
            let random = index[Math.floor(Math.random() * index.length)];
            const random_front = button.children[j].children[(2*i)+1];
            const random_back = button.children[j].children[(2*i)+2];
            if(i === 0) random_front.innerText +='\n'+'\n'+random.substring(0,random.length-2);
            else random_front.innerText += random.substring(0,random.length-2);
            random_back.innerText += random.substring(random.length-2,random.length)+'\n';
            random_array.push(random_front.innerText);
            Paint_Color(random_back);
        }
    }
    const set = new Set(random_array);
    if(random_array.length !== set.size){
        return Random_Pick_Many(index_0,index_1,count,number);
    }   
}
function Random_Rule(index){
    if(rule.children.length === 0){
    const rule_index = document.createElement("span");
    rule.appendChild(rule_index);
    }
    let random = index[Math.floor(Math.random() * index.length)];
    rule.children[0].innerText = random;
    PICK_RULE = random;
}
function Button_Start(){
    let rules_data = rules.options[rules.selectedIndex].value;
    let people_data = people.options[people.selectedIndex].value;
    text.style.opacity = 0;
    button.style.opacity = 0;
    if(rules_data === 'null' && people_data === 'null'){
        alert('룰과 인원수를 선택해주세요.');
        return 0;
    }
    if(rules_data === 'Rules_3' && people_data === 'null'){
        alert('랜덤룰은 인원수 설정이 필요합니다.');
        return 0;
    }
    if(rules_data === 'Rules_1'){                   //물3마1 대회룰
        if(button.childElementCount === 0){
            Create_Field_Button(4);
            Create_Field_Text(0);
        }
        else {
            Button_Span_Off()
        }
        Random_Pick(MAGICAL,4);
        Random_Pick(PHYSICS,3);
        Fade_In(text,5);
        Fade_In(button,5);
    }
    else if(rules_data === 'Rules_2'){                   //물1마3 대회룰
        if(button.childElementCount === 0){
            Create_Field_Button(4);
            Create_Field_Text(0);
            }
        else {
            Button_Span_Off()
        }
        Random_Pick(PHYSICS,4);
        Random_Pick(MAGICAL,3);
        Fade_In(text,5);
        Fade_In(button,5);
    }
    else if(rules_data === 'Rules_3'){                   //랜덤룰
        Random_Rule(RULE_RANDOM);
        Create_Field_Random(PICK_RULE,people_data);
        Create_Field_Text(PICK_RULE);
        Random_Effect(rule);
    }
    else{                                               //듀컨룰
        Random_Rule(RULE_DUEL);
        Create_Field_Random(PICK_RULE,4);
        Create_Field_Text(PICK_RULE);
        Random_Effect(rule);
    }
}

start.addEventListener("click",Button_Start);