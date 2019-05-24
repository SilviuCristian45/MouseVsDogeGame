var position_init_x = 1;
var position_init_y = 0;

var position_final_x = 0;
var position_final_y = 4;

var key_line = 0;
var key_coll = 2;

var cat_line = 2;
var cat_coll = 5;

var ball1_line = 3;
var ball1_coll = 5;

var ball2_line = 4;
var ball2_coll = 5;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

/* 
0 means wall 
1 means road   
*/
var MAP = [
    [1 , 0 ,3 ,0 ,8 ,1 ,1 ],
    [5 , 0 ,1 ,0 ,1 ,1 ,1 ],
    [1 , 0 ,1 ,0 ,1 ,7 ,1 ],
    [1 , 0 ,1 ,0 ,1 ,9 ,1 ],
    [1 , 0 ,1 ,0 ,1 ,9 ,1 ],
    [1 , 1 ,1 ,1 ,0 ,0 ,0 ],
    [0 , 0 ,0 ,1 ,1 ,4 ,0 ]
];
 directii = 4;
 di = [-1, 0, 1,  0];
 dj = [0,  1, 0, -1];

var playerHasKey = false;

function keyDownHandler(e) {
    
    if(e.keyCode == 39) {//right
        rightPressed = true;
    }
    else if(e.keyCode == 37) {//left
        leftPressed = true;
    }
    else if(e.keyCode == 40){
        downPressed = true;
    }
    else if(e.keyCode == 38){
        upPressed = true;
    }
}

function keyUpHandler(e) {
    
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    } 
    else if(e.keyCode == 40){
        downPressed = false;
    }
    else if(e.keyCode == 38){
        upPressed = false;
    }
   
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function isPosibleToGo(i,j) {
    if( i == 0 && j == 0)
    return false;
    if(i == cat_line && j == cat_coll)
    {
        alert("You killed the ally of Doge , the Mallefic Cat");
        return true;
    }
    if(i == 6 && j == 5)
    {
        return true;
    }
    if(i == key_line && j == key_coll)
    {
        playerHasKey = true;
        return true;
    }
    
    if(i > 6 || i < 0)
        return false;
    if(j > 6 || j < 0)
        return false;

    if(MAP[i][j] == 1 || (i == position_final_x && j == position_final_y))
        return true;

    if(MAP[i][j] == 0 || MAP[i][j])
        return false;

    return true;
    
}


function Game_logic(i , j) {
    if(i == position_final_x && j == position_final_y)
    {
        window.open("win.html");
    }
    else
    {
        MAP[position_final_x][position_final_y] = 1;
        position_final_y = getRndInteger(4,6);
        MAP[position_final_x][position_final_y] = 8;

       //update fireballs positions
       if(ball1_coll < 6)
       {
        MAP[ball1_line][ball1_coll] = 1;
        ball1_coll++;
        MAP[ball1_line][ball1_coll] = 9;
       }
       else 
       {
           MAP[ball1_line][ball1_coll] =  1;
           ball1_coll = 4;
           MAP[ball1_line][ball1_coll] =  9;
       }

       if(ball2_coll < 6)
       {
        MAP[ball2_line][ball2_coll] = 1;
        ball2_coll++;
        MAP[ball2_line][ball2_coll] = 9;
       }
       else 
       {
           MAP[ball2_line][ball2_coll] =  1;
           ball2_coll = 4;
           MAP[ball2_line][ball2_coll] =  9;
       }

         i_vecin = 0;
         j_vecin = 0;
        //input
        var commanda = prompt("enter your command : ");
        
        
//Executes a function, after waiting a specified number of milliseconds.
        
    
        if(i == 6 && j == 5 && playerHasKey == true)
        MAP[5][5] = 1;
       
        if(commanda == "w")
        {
            i_vecin = i + di[0];
            j_vecin = j + dj[0];
           
        }

        if(commanda == "d")
        {
            i_vecin = i + di[1];
            j_vecin = j + dj[1];
           
        }

        if(commanda == "s")
        {
            i_vecin = i + di[2];
            j_vecin = j + dj[2];
           
        }
        
        if(commanda == "a")
        {
            i_vecin = i + di[3];
            j_vecin = j + dj[3];
        }
     
        if(isPosibleToGo(i_vecin,j_vecin) == true)
        {
            MAP[i_vecin][j_vecin] = 5;
            MAP[i][j] = 1;
            Afisare();
            setTimeout(function(){
                Game_logic(i_vecin,j_vecin);
            },500);       
        }
        else window.open(lose.html);
    }
  }
    


   
     





function Afisare() {
     var cell = document.getElementById('GAME');//make a reference to GAME div in js
     var map = "";//empty string
     
     for(var line = 0; line < 7; ++line)
     {
         map+='<div class="same-line">';
         for(var collum = 0; collum < 7; ++collum)
         {
            if(MAP[line][collum] == 0)
            {
            var img = new Image();
            img.src = "Graphics/wall.jpg";
            map += '<div class="CelulaMica" >' + "<img src="+img.src+"> </img>"    + '</div>';
            }
            if(MAP[line][collum] == 1)  
            map += '<div class="CelulaMica" >' + '<img src="Graphics/road.jpg">' + '</div>';
            
            if(MAP[line][collum] == 5)
            {
            map += '<div class="CelulaMica" >' + '<img src="Graphics/mouse.jpg">'  + '</div>';
             
            }
            if(line == position_final_x && collum == position_final_y && MAP[line][collum] == 8)
            {
            map += '<div class="CelulaMica" >' + '<img src="Graphics/cheese.jpg">' + '</div>';  
            }

            if(line == key_line && collum == key_coll && MAP[line][collum] == 3)
            {
            map += '<div class="CelulaMica" >' + '<img src="Graphics/key.png">' + '</div>';    
            }

            if(MAP[line][collum] == 4)//secret wall  
            map += '<div class="CelulaMica" >' + '<img src="Graphics/road.jpg">' + '</div>';

            if(MAP[line][collum] == 7 && line == cat_line && collum == cat_coll)
            {
                map += '<div class="CelulaMica" >' + '<img src="Graphics/cat.png">' + '</div>';
            }
            
            if(MAP[line][collum] == 9 && line == ball1_line && collum == ball1_coll)
            {
                map += '<div class="CelulaMica" >' + '<img src="Graphics/road_ball.png">' + '</div>';
            }

            if(MAP[line][collum] == 9 && line == ball2_line && collum == ball2_coll)
            {
                map += '<div class="CelulaMica" >' + '<img src="Graphics/road_ball.png">' + '</div>';
            }

         }
         map += '</div>';
     }
     cell.innerHTML =  map;
}

 



window.onload = function()//this function runs when the page is loaded
{
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    Afisare();
    setTimeout(function(){
        Game_logic(position_init_x,position_init_y);
    },500);
} 


