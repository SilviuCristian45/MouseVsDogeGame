
var position_init_x = 2;
var position_init_y = 2;

var position_final_x = 5;
var position_final_y = 4;
/* 
0 means wall 
1 means road   
*/
var MAP = [
    [1 , 1 ,0 ,0 ,0 ,0 ,1 ],
    [0 , 1 ,1 ,1 ,1 ,1 ,1 ],
    [0 , 1 ,5 ,0 ,0 ,0 ,1 ],
    [1 , 1 ,1 ,0 ,1 ,1 ,1 ],
    [0 , 0 ,0 ,0 ,1 ,0 ,0 ],
    [1 , 0 ,0 ,0 ,8 ,0 ,1 ],
    [1 , 0 ,1 ,1 ,1 ,1 ,1 ]
];
 directii = 4;
 di = [-1, 0, 1,  0];
 dj = [0,  1, 0, -1];

function isPosibleToGo(i,j) {
    
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


