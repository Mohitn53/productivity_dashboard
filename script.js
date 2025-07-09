function opencards() {
  var allElems = document.querySelectorAll(".card");
  var allFullElem = document.querySelectorAll(".fullelem");
  var back = document.querySelectorAll(".fullelem .back");
  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      allFullElem[elem.id].style.display = "block";
    });
  });
  back.forEach((elem) => {
    elem.addEventListener("click", () => {
      allFullElem[elem.id].style.display = "none";
    });
  });
}
opencards();

function todolist() {
  var currentTask = [];
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list empty");
  } //storing the task in local storage local storage

  function renderTask() {
    var allTask = document.querySelector(".right");
    var sum = "";
    currentTask.forEach((value, idx) => {
      sum += `
        <div class="task">
            <h5>${value.task} <span class=${value.imp}>imp</span></h5>
            <button id=${idx}> Mark as completed</button>
        </div>
        `;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    var compBtn = document.querySelectorAll(".task button");
    compBtn.forEach((value) => {
      value.addEventListener("click", () => {
        currentTask.splice(value.id, 1);
        renderTask();
      });
    });
  }
  renderTask();
  var form = document.querySelector(".To-do .container .left form");
  var taskInput = document.querySelector(
    ".To-do .container .left form input#task"
  );
  var taskDetailinput = document.querySelector(
    ".To-do .container .left form textarea "
  );
  var taskCheckbox = document.querySelector(
    ".To-do .container .left form #imp"
  );
  var btn = document.querySelector(".To-do .container .left form button");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailinput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();
    (taskCheckbox.checked = false),
      (taskInput.value = ""),
      (taskDetailinput.value = "");
  });
}
todolist();
function dailyTask(){
    var dailyPlanner = document.querySelector('.container-dp')

var dayPlandata = JSON.parse(localStorage.getItem('dayPlanData'))||{}



var hours = Array.from({ length: 18 },(elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`);

var wholeDaySum = "";

hours.forEach((value,idx) => {
    var saveData = dayPlandata[idx] || ''
    wholeDaySum =
    wholeDaySum +
    ` 
    <div class="plannertime">
    <p>${value}</p>
    <input id=${idx} type="text" placeholder="..." value=${saveData}>
    </div>`;
});

dailyPlanner.innerHTML=wholeDaySum

var dailyPlannerInput=document.querySelectorAll('.container-dp input')
console.log(dailyPlannerInput)
dailyPlannerInput.forEach((elem,idx)=>{
    elem.addEventListener('input',()=>{
        console.log(elem.value)
        dayPlandata[elem.id]=elem.value
        localStorage.setItem('dayPlanData',JSON.stringify(dayPlandata))

    })
})

}
dailyTask()
function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let response = await fetch('https://api.quotable.io/random')
        let data = await response.json()

        motivationQuoteContent.innerHTML = data.content
        motivationAuthor.innerHTML = data.author
    }

    fetchQuote()
}
motivationalQuote()

function pomodoro(){

    var timer = document.querySelector('.pomodoro .mainpomo .pomo1 h1')
    var Start = document.querySelector('.pomodoro .mainpomo .pomo1 .Start')
    var Pause = document.querySelector('.pomodoro .mainpomo .pomo1 .Pause')
    var Reset = document.querySelector('.pomodoro .mainpomo .pomo1 .Reset')
    var session = document.querySelector('.pomodoro .mainpomo .pomo')
    
    var totalSeconds = 25*60
    var timerinterval = null
    var isworkSession = true
    
    function updateTime(){
        var totalMinutes = Math.floor(totalSeconds/60)
        var seconds= totalSeconds%60
        timer.innerHTML=`<h1>${String(totalMinutes).padStart(2,'0')}:<span style="color: saddlebrown;">${String(seconds).padStart(2,'0')}</span></h1>`
    }
    
    function startTimer(){
        clearInterval(timerinterval)
        if(isworkSession){
            timerinterval=setInterval(()=>{
                if(totalSeconds>0){
                    totalSeconds--
                    updateTime()
                    
                }
                else{
                timer.innerHTML=`<h1>5:<span style="color: saddlebrown;">00</span></h1>`
                session.innerHTML='Break'
                session.style.backGroundColor='var(--tri2)'
                isworkSession=false
                totalSeconds=5*60
                
                clearInterval(timerinterval)
            }
        },1000)
    }
    else{
        timerinterval=setInterval(()=>{
            if(totalSeconds>0){
                totalSeconds--
                updateTime()
                
            }
            else{
                totalSeconds=25*60
                session.innerHTML='Work session'
                session.style.color='var(--tri2)'
                timer.innerHTML='<h1>25:<span style="color: saddlebrown;">00</span></h1>'
                isworkSession= true
                
                clearInterval(timerinterval)
            }
        },10)
        
    }
}
function pausetime(){
    clearInterval(timerinterval)
}

function resetTime(){
    clearInterval(timerinterval)
    
        session.innerHTML='Work Session'
        totalSeconds=25*60
        updateTime()
    }
    
    Start.addEventListener('click',startTimer)
    Pause.addEventListener('click',pausetime)
    Reset.addEventListener('click',resetTime)
}

pomodoro()

var apiKey='4480b4eee9a83906adaa747d1465feb7'
var q = "Mumbai"

async function apiCall(){
    var response = await fetch('https://www.weatherapi.com/docs/current.json?key=bb742289b9374b24a6d43437250907&q=Mumbai')
    console.log(response)
}
apiCall()

function timebox(){

    var timeBox = document.querySelector('#main .view1 .ipage .head1 .time')
    var dateBox = document.querySelector('#main .view1 .ipage .head1 .date')
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days =[
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
    ]
    console.log(timeBox)
    var date = null
    function updateTime(){
        date = new Date()
        console.log(date.getDate())
        dateBox.innerHTML=`<h1 class="date"> ${date.getDate()} ${monthNames[date.getMonth()]} ,${date.getFullYear()}</h1>`
        timeBox.innerHTML=`<h1 class="time">${days[date.getDay()]},${String(date.getHours()).padStart(2,'0')}:${date.getMinutes()}:${String(date.getSeconds()).padStart(2,'0')}</h1>`
    }
    updateTime()
    setInterval(()=>{
        updateTime()
    },1000)

}
timebox()