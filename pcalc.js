/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var equation = new Array();
var varCounter = 0;


var settings = 
{
    button : 
        {
            height : 30,
            width : 30,
            padding : 10
        },
    imgPath : "images/"

}

function num2Str(x)
{
    var y;
    var target;
    
    //determine how many letters needed (i.e. AA, AAA, etc..)
    var len = Math.floor(Math.log(x) / Math.log(26))+1;
    
    
    //generate array
    var a = [];
    for(i=len; i>0; i--)
    {
        target = Math.pow(26,(i-1));
        y = Math.floor(x/target);
        x=x-(y* target);
        a[i-1]=String.fromCharCode(y + 64);
    }
    
    
    //stringify array
    var str =a.reverse().join("")
    
    
    //return string
    return str;
}

var calc =
{
    
    addVariable : function ()
    {
        var l = num2Str(varCounter+1);
        varCounter++;
        equation.push({
            type:"variable",
            letter : l
        });
    },
    newfunc : function(str)
    {
        equation.push({
            type: "function",
            name: str,
            func : calc[str]
        })
    },
    not : function (x)
    {
        return !x;
    }
    ,
    implies : function (a,b)
    {
        if(a)
            return b;
        return true;
    },
    NAND : function (a,b)
    {
        if(a && b)
            return false;
        return true;
    },
    eq : function (a,b)
    {
        if(a==b)
            return true;
        return false;
    }
}

//Array Symbology
var buttons = 
    {
        addVariable : 
        {
            text: "New Variable",
            width: 2,
            height: 1,
            func: calc.addVariable,
            name : "addVariable"
            
        },
        not : 
        {
            text: "&not",
            width: 1,
            height : 1,
            func: calc.newfunc,
            img: "NOT.jpg",
            name: "not"
        }
    }


//make function



//check for values

//solve

//generate web

//generate calculator
function generateCalc()
{
    var buttonWidth, buttonHeight; //button;
    var img;
    for(var key in buttons)
    {
        button = buttons[key];
        
        img = $("<img src='" + settings.imgPath + button.img + "'/>")
            .css({
                height      : ((settings.button.height + settings.button.padding) * (button.height - 1)) + settings.button.height - 2,
                width       : ((settings.button.width + settings.button.padding) * (button.width - 1)) + settings.button.width - 2,
                top         : "1px",
                left        : "1px",
                position    : "relative"
            });
        $("<div id='"+ button.name + "'/>")
            .css({
                height  : ((settings.button.height + settings.button.padding) * (button.height - 1)) + settings.button.height,
                width   : ((settings.button.width + settings.button.padding) * (button.width - 1)) + settings.button.width 
            })
            .append(img)
            .addClass("button")
            .appendTo("#calculator")
            .mousedown(function(e){
                $(this).css("border-style", "inset");
                
            })
            .mouseup(function(e){
                $(this).css("border-style", "outset")
                var id = $(this).attr("id");
                calc[id]();
                //buttons[key].func();
                console.log(id);
            });
    }
    
}



window.onload=generateCalc;