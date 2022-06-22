let touchDelay = 10;
let stage = 0;
let trashC = 8;
let trashX = 50;
let trashY = 50;
let trashSize = 50;
let redlineStart = 0;
let trashImgList = [];
let grassX = [];
let grassY = [];
let currentTrashImg;

let grass1;
let grass2;

let cnv;

function preload() {
  trashImgList[0] = loadImage("trash1.png");

  trashImgList[1] = loadImage("trash2.png");

  trashImgList[2] = loadImage("trash3.png");

  trashImgList[3] = loadImage("trash4.png");

  grass1 = loadImage("grass1.png");
  grass2 = loadImage("grass2.png");
}
function setup() {
  console.log(window.innerWidth, window.innerHeight)
  cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.elt.addEventListener('click', myTouchStarted)

  currentTrashImg = trashImgList[int(random(trashImgList.length))];
}

function draw() {
  if (touchDelay > 0) touchDelay--;
  switch (stage) {
    case 0:
      introDisplay();
      break;
    case 1:
      backgroundDisplay();
      introTextbox("아 맞다.. 봉사활동도 해야되는데...");
      break;
    case 2:
      backgroundDisplay();
      introTextbox("길거리 환경미화 봉사활동? 이런거나 해볼까?");
      break;
    case 3:
      //opening
      background(0);
      textAlign(CENTER);
      textSize(30);
      fill(255);
      text(
        "Minigame 2\n길거리 환경미화 봉사활동 게임",
        width / 2,
        height / 2 - 50
      );
      //시작하기 버튼
      fill(73, 153, 60);
      rectMode(CENTER);
      rect(width / 2, height / 2 + 50, 130, 50);
      fill(255);
      textSize(20);
      text("청소하러가기", width / 2, height / 2 + 45);
      break;

    case 4:
      //main
      gameDisplay();
      trashCount();
      trashDisplay();
      break;

    case 5:
      //ending
      background(0);
      fill(73, 153, 60);
      textSize(30);
      text("길이 깨끗해졌다!", width / 2, height / 2);

      fill(255);
      textSize(20);
      text("터치하여 다음으로", width / 2, height / 2 + 50);
      break;

    case 6:
      //체크리스트 3번 지워지기
      checklistDisplay();
      break;
    default:
  }
}

function myTouchStarted() {
  if (touchDelay == 0) {
    touchDelay = 10;
    switch (stage) {
      case 0:
        stage = 1;
        break;
      case 1:
        stage = 2;
        break;
      case 2:
        stage = 3;
        break;
      case 3:
        //opening
        if (
          width / 2 - 65 < mouseX &&
          mouseX < width / 2 + 65 &&
          height / 2 + 25 < mouseY &&
          mouseY < height / 2 + 75
        ) {
          stage = 4;
        }
        break;
      case 4:
        //main
        if (
          trashX < mouseX &&
          mouseX < trashX + trashSize &&
          trashY < mouseY &&
          mouseY < trashY + trashSize
        ) {
          trashX = int(random(50, windowWidth - 50));
          trashY = int(random(50, height - 100));
          trashSize = int(random(30, 100));
          let i = int(random(trashImgList.length));
          print(i);
          currentTrashImg = trashImgList[i];
          trashDisplay();

          if (trashC == 1) {
            stage = 5;
          } else {
            trashC -= 1;
          }
        }
        break;
      case 5:
        stage = 6;
        break;
      case 6:
        break;

      default:
    }
  }
}



// function touchStarted() {
//   if (touchDelay == 0) {
//     touchDelay = 10;
//     switch (stage) {
//       case 0:
//         stage = 1;
//         break;
//       case 1:
//         stage = 2;
//         break;
//       case 2:
//         stage = 3;
//         break;
//       case 3:
//         //opening
//         if (
//           width / 2 - 65 < mouseX &&
//           mouseX < width / 2 + 65 &&
//           height / 2 + 25 < mouseY &&
//           mouseY < height / 2 + 75
//         ) {
//           stage = 4;
//         }
//         break;
//       case 4:
//         //main
//         if (
//           trashX < mouseX &&
//           mouseX < trashX + trashSize &&
//           trashY < mouseY &&
//           mouseY < trashY + trashSize
//         ) {
//           trashX = int(random(50, windowWidth - 50));
//           trashY = int(random(50, height - 100));
//           trashSize = int(random(30, 100));
//           let i = int(random(trashImgList.length));
//           print(i);
//           currentTrashImg = trashImgList[i];
//           trashDisplay();

//           if (trashC == 1) {
//             stage = 5;
//           } else {
//             trashC -= 1;
//           }
//         }
//         break;
//       case 5:
//         stage = 6;
//         break;
//       case 6:
//         break;

//       default:
//     }
//   }
// }

function keyPressed() {
  switch (stage) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      //opening
      break;
    case 4:
      //main
      break;
    case 5:
      //ending
      stage = 0;
      trashC = 8;

      break;

    default:
  }
}

function gameDisplay() {
  background(193, 237, 159);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(NORMAL);

  noStroke();
  fill(0);
  text("*쓰레기를 클릭하여 쓰레기를 청소해주세요.", width / 2, 30);

  image(grass1, 150, 300, 80, 50);
  image(grass2, 80, 400, 90, 70);
  image(grass1, 50, 100, 90, 70);
  image(grass2, 300, 150, 70, 50);
  image(grass1, 250, 500, 90, 60);
  image(grass2, 100, 100, 70, 50);
  image(grass1, 150, 350, 80, 70);
}

function trashDisplay() {
  noStroke();
  fill(200);
  imageMode(CORNER);
  image(currentTrashImg, trashX, trashY, trashSize, trashSize);
}

function trashCount() {
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(NORMAL);
  fill(0);
  text("남은 쓰레기", windowWidth - 50, height - 50);
  textSize(30);
  text(trashC, windowWidth - 45, height - 20);
}

function introDisplay() {
  background(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textSize(25);
  fill(255);
  text("얼마 전...", windowWidth / 2, height / 2);

  textSize(15);
  fill(150);
  text("클릭하여 다음 단계로...", windowWidth / 2, (height / 4) * 3);

  textSize(15);
  fill(150);
  // text("현재 미니게임이 iPhone에서 작동하지 않습니다.\n다른 기기로 테스트 부탁드립니다.", windowWidth / 2, (height / 4) * 3 + 50);
}

function backgroundDisplay() {
  background(0);
  fill(255);
  textAlign(LEFT, TOP);
  text("터치하여 다음 단계로...", 10, 10);
}

function introTextbox(message) {
  let boxX = 20;
  let boxY = (height * 4) / 5;

  //바깥 박스
  stroke(0, 150);
  fill(255, 150);
  rect(boxX, boxY, width - boxX * 2, 80);
  //안쪽 박스
  noFill();
  rect(boxX + 5, boxY + 5, width - boxX * 2 - 10, 70);
  fill(0);
  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(12);
  text(message, boxX + 20, boxY + 25);
}

function checklistDisplay() {
  background(255, 255, 179);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(50);
  noStroke();
  fill(102, 51, 0);
  text("체크리스트", windowWidth / 2, 50);

  textAlign(LEFT, CENTER);
  textSize(30);
  fill(102, 51, 0);
  text("1.영어공부하기", 30, 150);
  text("2.봉사활동", 30, 200);
  text("3.한국사시험 신청", 30, 250);

  strokeWeight(5);
  stroke(255, 0, 0, 200);
  line(20, 150, 230, 150);
  //line(20, 200, 170, 200);

  strokeWeight(5);
  stroke(255, 0, 0, 200);
  line(20, 200, 20 + redlineStart, 200);

  if (frameCount % 5 == 0) {
    if (redlineStart <= 160) {
      redlineStart += 5;
    } else {
      redlineStart = 170;
    }
  }

  if (redlineStart == 170) {
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    noStroke();
    text("비밀번호", windowWidth / 2, (height * 2) / 3);

    for (let i = 0; i < 4; i++) {
      fill(255, 200);
      noStroke();
      rect(
        (windowWidth * 1) / 13 + windowWidth * ((3 * i) / 13),
        (height * 2) / 3 + 60,
        (windowWidth * 2) / 15,
        80
      );
    }
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("3", (windowWidth * 2) / 13, (height * 2) / 3 + 100);
    textSize(40);
    text("6", (windowWidth * 5) / 13, (height * 2) / 3 + 100);
    text("1", (windowWidth * 8) / 13, (height * 2) / 3 + 100);
    text("8", (windowWidth * 11) / 13, (height * 2) / 3 + 100);

    noFill();
    strokeWeight(1);
    stroke(30, 150);
    rectMode(CENTER);
    //rect(windowWidth/2,height-10,100,15);
    textSize(20);
    textStyle(NORMAL);
    fill(30, 150);
    rectMode(CORNER);
  }
}
