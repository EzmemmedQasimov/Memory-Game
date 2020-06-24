let M = [];
let A = [];
let MemmoryImg = [];
let Memmory = [0,0,0];
let K = [];
let count = 0;
onload = function () {
  Arr();
  Table();
  Timer();
};
document.getElementById("name").value = prompt("Oyuncu adı:");
setTimeout(Close,1500);

function Arr() {
  let k = 1;
  for (let i = 0; i < 16; i++) {
    k = k > 8 ? 1 : k;
    M[i] = k++;
  }
  let x = 0;

  for (let i = 0; i < 4; i++) {
    A[i] = [];
    MemmoryImg[i] = [];
    K[i] = [];
    for (let j = 0; j < 4; j++) {
      x = Math.floor(Math.random() * M.length);
      A[i][j] = M[x];
      MemmoryImg[i][j] = M[x];
      M.splice(x, 1);
    }
  }
}

function Table() {
  let tbl = "";
  for (let i = 0; i < 4; i++) {
    tbl += "<tr>";
    for (let j = 0; j < 4; j++) {
      tbl += `<td><img id="A${i}_${j}" onclick="Click(${i},${j})" src="img/${A[i][j]}.png" /> </td>`;
    }
    tbl += "</tr>";
  }
  document.getElementsByTagName("table")[0].innerHTML = tbl;
}

function Close() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      A[i][j] = 0;
    }
  }
  Table();
}

function Click(i,j){

  A[i][j] = MemmoryImg[i][j];
  Table();
//birinci click
  if(Memmory[2]==0){
    Memmory[0] = i;
    Memmory[1] = j;
    Memmory[2] = MemmoryImg[i][j];
  }
  //ikinci click
  else{
    if(Memmory[2] != MemmoryImg[i][j] || (Memmory[0] ==i && Memmory[1]==j)){
      A[i][j] = 0;
      A[Memmory[0]][Memmory[1]] = 0;
      setTimeout(Table,500);
    }else{
      K[i][j] = 1;
      K[Memmory[0]][Memmory[1]] = 1;
    }
    Memmory[2]=0;
  }
  Check();
  
}

function Check(){

  for(let i = 0; i<4;i++){
    for(let j = 0; j<4;j++){
      if(K[i][j]==1){
        document.getElementById(`A${i}_${j}`).removeAttribute("onclick");
      }
    }
  }
 setTimeout(Congrat,1000);
}

function Congrat(){
  let count  = 0;
  for(let i = 0; i<4;i++){
    for(let j = 0; j<4;j++){
      if(K[i][j]==1){
        count++;
      }
    }
  }
  if(count==16){
    alert("Təbriklər " + document.getElementById("name").value);
  }
}
let say = 31;
let time = setInterval(Timer, 1000);

function Timer(){

  --say;
  document.getElementById("timer").innerHTML = say;
  if (say == 0) {
    alert("Uduzdun "+ document.getElementById("name").value);
    location.reload();
    clearInterval(time);
}
}