
var position_init_x = 0;
var position_init_y = 0;

var position_final_x = 3;
var position_final_y = 4;



var key_line = 0;
var key_coll = 4;

var playerHasKey = false;
/* 
0 means wall 
1 means road   
*/
var MAP = [
    [5 , 1, 0, 0, 3, 0, 0 ],
    [0 , 1 ,1 ,1 ,1 ,1 ,0 ],
    [0 , 1 ,1 ,0 ,0 ,0 ,1 ],
    [4 , 1 ,1 ,0 ,8 ,0 ,0 ],
    [0 , 0 ,0 ,0 ,1 ,0 ,0 ],
    [1 , 0 ,0 ,0 ,1 ,0 ,1 ],
    [1 , 1 ,1 ,1 ,1 ,1 ,1 ]
];
 directii = 4;
 di = [-1, 0, 1,  0];
 dj = [0,  1, 0, -1];

function isPosibleToGo(i,j) {
    
    if(i == 3 && j == 0)
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
        var i_vecin = 0;
        var j_vecin = 0;
        //input
        var commanda = "";
        
        
//Executes a function, after waiting a specified number of milliseconds.
        commanda = prompt("Enter your command : ","");
    
        if(i == 3 && j == 0 && playerHasKey == true)
        MAP[4][0] = 1;
        if(commanda == "w")
        {
            i_vecin = i + di[0];
            j_vecin = j + dj[0];
        }
        if(commanda=="d")
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
        
        if(isPosibleToGo(i_vecin,j_vecin))
        {
            MAP[i_vecin][j_vecin] = 5;
            MAP[i][j] = 1;
            
            Afisare();
            setTimeout(function(){
                Game_logic(i_vecin,j_vecin);
            },500);
                  
        }
        else window.open("lose.html");
    }
}
   
     





function Afisare() {
     var cell = document.getElementById('GAME');//make a reference to GAME div in js
     var map = " ";//empty string
     
     for(var line = 0; line < 7; ++line)
     {
         map+='<div class="same-line">';
         for(var collum = 0; collum < 7; ++collum)
         {
            if(MAP[line][collum] == 0)
            map += '<div class="CelulaMica" >' + '<img src="Graphics/wall.jpg">'    + '</div>';

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
         }
         map += '</div>';
     }
     cell.innerHTML =  map;
}

 



window.onload = function()//this function runs when the page is loaded
{
    Afisare();
    setTimeout(function(){
        Game_logic(position_init_x,position_init_y);
    },500);
} 


