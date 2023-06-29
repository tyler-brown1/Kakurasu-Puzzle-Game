easyLevels = [
    [[1,2,2],[1,5]],
    [[4,2,7,7],[8,9,1,7]],
    [[9,1,8,6],[5,5,4,8]],
    [[9,7,6,4],[5,6,4,7]],
    [[6,5,7,4],[3,6,2,8]],
    [[7,5,1,5],[6,5,4,3]],
    [[5,7,5,7],[7,9,3,7]],
    [[3,4,3,2],[1,5,3,2]]
]

medLevels =  [
    [[8,10,7,5,11],[6,8,10,3,12]],
    [[13,6,12,14,8],[9,14,5,10,13]],
    [[10,3,11,5,14],[4,8,10,6,13]],
    [[5,12,6,4,3],[9,2,9,2,6]],
    [[9,13,4,3,7],[2,5,6,6,8]],
    [[13,7,11,10,3],[10,8,3,10,8]],
    [[10,4,8,6,5],[13,4,1,8,7]]
]

hardLevels = [
    [[11,6,11,5,14,8],[4,10,5,8,9,13]],
    [[3,5,13,15,3,11],[6,9,12,4,15,7]],
    [[10,7,10,19,13,7],[6,16,7,7,18,10]],
    [[7,14,9,6,6,12],[8,7,17,9,11,4]],
    [[1,11,8,11,7,7],[17,2,5,3,6,15]],
    [[11,18,12,10,2,17],[13,18,14,9,12,8]],
    [[10,10,17,15,13,6],[17,13,8,12,11,12]]
]

var xed = false;
done = false;
diff = 0;
switched = false;
level = 0;
boo = true;

ctotals = [];
rtotals = [];
width = 0;
height = 0;
row = [];
col = [];

window.onload = () =>{
    board = document.getElementById("grid");

    document.getElementById("xbutton").addEventListener("click",btn);
    document.addEventListener("keyup",(e)=>{if(e.code == "Space"){btn();}});
    document.getElementById("diffball").addEventListener("click",()=>{
        if(diff == 0){
            diff = 1;
            document.getElementById("diffball").classList.add("medium");
            switched = true;
        }
        else if(diff == 1){
            diff = 2;
            document.getElementById("diffball").classList.add("hard");
            document.getElementById("diffball").classList.remove("medium");
            switched = true;
        }
        else{
            diff = 0;
            document.getElementById("diffball").classList.remove("hard");
            switched = true;
        }
    });
    document.getElementById("question").addEventListener("mouseover",()=>{});

    init();
}

function init(){
    
    board.innerHTML = "";

    if (diff==0){
        if(boo){
            level = 0;
            boo = false;
        }
        else if(!switched){
            temp = level;
            while(level==temp)
                temp = Math.floor(Math.random()*easyLevels.length);
            level = temp;
        }
        else{
            level = Math.floor(Math.random()*easyLevels.length);
        }

        row = easyLevels[level][0];
        col = easyLevels[level][1];
    }
    if (diff==1){
        if(!switched){
            temp = level;
            while(level==temp)
                temp = Math.floor(Math.random()*medLevels.length);
            level = temp;
        }
        else{
            level = Math.floor(Math.random()*medLevels.length);
        }
        row = medLevels[level][0];
        col = medLevels[level][1];
    }
    if (diff==2){
        if(!switched){
            temp = level;
            while(level==temp)
                temp = Math.floor(Math.random()*hardLevels.length);
            level = temp;
        }
        else{
            level = Math.floor(Math.random()*hardLevels.length);
        }
        row = hardLevels[level][0];
        col = hardLevels[level][1];
    }
    switched = false;
    
    width = col.length;
    height = row.length;
    
    ctotals = new Array(width).fill(0);
    rtotals = new Array(height).fill(0);
    
    board.style.width = 50*(width+2)+"px";
    board.style.height = 50*(height+2)+"px";

    let invtop = document.createElement("div");
    invtop.classList.add("invis");
    board.appendChild(invtop);

    for(let i = 0; i < width; i++){
        let inv = document.createElement("div");
        inv.classList.add("invis");
        inv.innerText = (i+1);
        board.appendChild(inv);
    }

    let invtopr = document.createElement("div");
    invtopr.classList.add("invis");
    board.appendChild(invtopr);

    for (let i = 0; i < height; i++) {

        let inv = document.createElement("div");
        inv.classList.add("invis");
        inv.innerText = (i+1);
        inv.style.fontSize = "em"; 
        board.appendChild(inv);

        for (let j = 0; j < width; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.id = i + "-" + j;
                
                inner = document.createElement("div");
                inner.classList.add("inner");
                cell.appendChild(inner);

                cell.addEventListener("click",swap);
                board.appendChild(cell);
            }

        let cell = document.createElement("div");
        cell.classList.add("total");
        cell.id = "-" + i;
        cell.style.fontSize = "em";
        cell.innerText = row[i];
        board.appendChild(cell);
    }

    let inv = document.createElement("div");
    inv.classList.add("invis");
    board.appendChild(inv);

    for(let i = 0; i < width; i++){
        let cell = document.createElement("div");
        cell.classList.add("total");
        cell.id = i+"-" ;
        cell.innerText = col[i];
        board.appendChild(cell);
    }
}


function swap() {
    
    s = this.id.split("-");
    r = 1+parseInt(s[0]);
    c = 1+parseInt(s[1]);

    first = this.firstChild;

    if(!xed){
        if(this.classList.contains("clicked")){
            this.classList.remove("clicked");
            rtotals[r-1] -= c
            ctotals[c-1] -= r;
        }
        else{
            this.classList.add("clicked");
            rtotals[r-1] += c
            ctotals[c-1] += r;
        }
        first.style.visibility = ""
    }
    else{
        if(first.style.visibility==""){
            first.style.visibility = "visible";
        }
        else{
            first.style.visibility = "";
        }
        if (this.classList.contains("clicked")){
            this.classList.remove("clicked");
            rtotals[r-1] -= c;
            ctotals[c-1] -= r;
        }
    }


    if(rtotals[r-1]==row[r-1]){
        document.getElementById("-"+(r-1)).classList.add("complete");
        document.getElementById("-"+(r-1)).classList.remove("wrong");
    }
    else if(rtotals[r-1]>row[r-1]){
        document.getElementById("-"+(r-1)).classList.add("wrong");
        document.getElementById("-"+(r-1)).classList.remove("complete");
    }
    else {
        document.getElementById("-"+(r-1)).classList.remove("complete");
        document.getElementById("-"+(r-1)).classList.remove("wrong");
    }

    if(ctotals[c-1]==col[c-1]){
        document.getElementById((c-1)+"-").classList.add("complete");
        document.getElementById((c-1)+"-").classList.remove("wrong");
    }
    else if(ctotals[c-1]>col[c-1]){
        document.getElementById((c-1)+"-").classList.remove("complete");
        document.getElementById((c-1)+"-").classList.add("wrong");
    }
    else{
        document.getElementById((c-1)+"-").classList.remove("complete");
        document.getElementById((c-1)+"-").classList.remove("wrong");
    }

    
    for (let i = 0; i < Math.max(height,width)+1; ++i) {
        if(i== Math.max(height,width)){
            document.getElementById("xbutton").classList.add("next");
            done = true;
            document.getElementById("insidebutton").style.visibility = "hidden";
            break
        }
        if (i<col.length && ctotals[i] !== col[i]){
            document.getElementById("xbutton").classList.remove("next");
            done = false;
            break;
        }
        if (i<row.length && rtotals[i] !== row[i]){
            document.getElementById("xbutton").classList.remove("next");
            done = false;
            break;
        }
    }


}

function btn(){
    if(done){
        document.getElementById("xbutton").classList.remove("next");
        init();
        done = false;
        return;}
    i = document.getElementById("insidebutton");

    if(xed){
        i.style.visibility = "hidden";
        xed = false;
    }
    else{
        i.style.visibility = "visible";
        xed = true;
    }
}