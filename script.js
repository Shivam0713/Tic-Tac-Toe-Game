let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#New-btn")
let msgContainer = document.querySelector(".msg-container")
let msg =document.getElementById("#msg")


let turn0 = true;
let count=0;

let winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

const resetGame =()=>{
    count = 0;
    turn0=true
    enabledboxes();
    msgContainer.classList.add("hide")
}



const disabledboxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enabledboxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText = "O";
            box.style.color = "Blue"
            turn0 = false;
        }else{
            box.innerText = "X"
            box.style.color = "Red"
            turn0 = true
        }
        box.disabled = true;

        count ++;

        let isWinner = checkwinner();

        if(count === 9 && !isWinner ){
            gameDraw();
        }
    })
})

let gameDraw = ()=>{
    msg.innerText= `It's a Draw`;
    msgContainer.classList.remove("hide");
    disabledboxes();
}

const showWinner= (Winner)=>{
    msg.innerText= `Congratulations, Winner is "${Winner}"`;
    msgContainer.classList.remove("hide")
    disabledboxes();
}

const checkwinner = ()=>{
    for(let pattern of winPatterns){
    let pos1Val =  boxes[pattern[0]].innerText
    let pos2Val =  boxes[pattern[1]].innerText
    let pos3Val =  boxes[pattern[2]].innerText

    if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
        }
    }
    }
}

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
