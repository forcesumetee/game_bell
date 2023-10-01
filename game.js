var timer;
var isAnimating = false; // เพิ่มตัวแปรเพื่อตรวจสอบสถานะการอนิเมชัน

function pageLoad() {
    // Your code here
}

function startGame() {
    if (!isAnimating) { // ตรวจสอบว่าไม่ได้อนิเมตันอยู่แล้ว
        alert("Ready");
        clearScreen();
        createBoxes();
        startTimer();
        
        // เพิ่มอนิเมชันเมื่อกด "Start"
        var startButton = document.getElementById('start');
        startButton.disabled = true; // ปิดการใช้งานปุ่ม "Start" ระหว่างอนิเมชัน
        animateStartButton(startButton);
    }
}

function startTimer() {
    var TIMER_TICK = 1000;
    var timerValue = 30; // 30 seconds
    var timerElement = document.getElementById('clock');
    timerElement.innerHTML = timerValue;

    timer = setInterval(function() {
        timerValue--;
        timerElement.innerHTML = timerValue;
        
        if (timerValue <= 10) {
            timerElement.classList.add('red');
        }

        if (timerValue === 0) {
            clearInterval(timer);
            timerElement.classList.remove('red');
            if (areBoxesRemaining()) {
                alert("Game Over");
                clearScreen();
            } else {
                alert("You Win!");
            }
        }
    }, TIMER_TICK);
}

function createBoxes() {
    var numBoxes = parseInt(document.getElementById('numbox').value);
    var gameLayer = document.getElementById('layer');
    var selectedColor = document.getElementById('color').value;

    for (var i = 0; i < numBoxes; i++) {
        var box = document.createElement("div");
        box.className = "square " + selectedColor;
        box.id = "box" + i;
        box.style.left = Math.random() * (500 - 25) + "px";
        box.style.top = Math.random() * (500 - 25) + "px";
        gameLayer.appendChild(box);
        bindBoxClick(box);
    }
}

function bindBoxClick(box) {
    box.onclick = function() {
        box.parentNode.removeChild(box);
    }
}

function clearScreen() {
    var allBoxes = document.querySelectorAll("#layer div");
    
    for (var i = 0; i < allBoxes.length; i++) {
        allBoxes[i].parentNode.removeChild(allBoxes[i]);
    }
}

function areBoxesRemaining() {
    var remainingBoxes = document.querySelectorAll("#layer div");
    return remainingBoxes.length > 0;
}

function animateStartButton(button) {
    isAnimating = true;
    var times = 3; // จำนวนครั้งที่จะทำการขยับปุ่ม "Start"
    var distance = 10; // ระยะที่ปุ่ม "Start" จะขยับ
    var duration = 100; // ระยะเวลาในการทำอนิเมชันแต่ละครั้ง (milliseconds)

    function move() {
        if (times === 0) {
            isAnimating = false;
            button.disabled = false; // เปิดการใช้งานปุ่ม "Start" อีกครั้ง
            return;
        }
        button.style.transform = 'translateX(' + (times % 2 ? distance : -distance) + 'px)';
        times--;
        setTimeout(move, duration);
    }

    move();
}
