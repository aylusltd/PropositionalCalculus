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
            padding : 10,
            rows : 5,
            columns : 4
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
    
    existingVar : function (str)
    {
        //do stuff
        equation.push({
            type: "variable",
            letter : str
        });
        $("#formula").append("<span> " + str + " </span>");
    },
    addVariable : function ()
    {
        var l = num2Str(varCounter+1);
        varCounter++;
        equation.push({
            type:"variable",
            letter : l
        });
        
        var d = $("<div />")
            .html(l)
            .addClass("button")
            .attr({
                "data-type"     : "variable",
                "id"            : l,
                "data-valid"    : false
            })
            .mousedown(function(e){
                if($(this).attr("data-valid") != "false")
                    $(this).css("border-style", "inset");
                
            })
            .mouseup(function(e){
                $(this).css("border-style", "outset")
                var id = $(this).attr("id");
                if ($(this).attr("data-valid") != "false")
                    calc.existingVar(id);
                
                
                inactivate();
            });
        
        var v = $("<td />").append(d);
        var u = $("<option value=undefined/>").html("Undefined");
        var t = $("<option value=true/>").html("True");
        var f = $("<option value=false/>").html("False");
        var selector = $("<select />").append(u);
        selector.append(t);
        selector.append(f);
        var val = $("<td />").append(selector);
        var tr = $("<tr />").append(v);
        tr.append(val);
        $("#variableList").append(tr)
        $("#formula").append("<span> " + l + " </span>");
        
    },
    
    newfunc : function(str)
    {
        equation.push({
            type: "function",
            name: str,
            func : calc[str]
        });
        $("#formula").append("<span> " + buttons[str].symbol + " </span>")
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
    },
    run : function ()
    {
        
    },
    clear : function ()
    {
        equation =[];
        $("#formula").html("");
        $("#variableList").html("");
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
            name : "addVariable",
            type : "variable"
            
        },
        not : 
        {
            text: "Not",
            width: 1,
            height : 1,
            func: calc.newfunc,
            img: "NOT.jpg",
            name: "not",
            type  : "function",
            symbol : "&not"
        },
        implies : 
        {
            text: "Implies",
            width: 1,
            height : 1,
            func: calc.newfunc,
            img: "implies.jpg",
            name: "implies",
            type  : "function",
            symbol : " ⊃ "
        },
        NAND :
        {
            text: "NAND",
            width: 1,
            height : 1,
            func: calc.newfunc,
            img: "NAND.jpg",
            name: "NAND",
            type  : "function",
            symbol : " NAND "
        },
        openParen : 
        {
            text: "<div class='singleCharButton' style='left:-2px'>(</span>",
            width : 1,
            height : 1,
            func : "",
            type : "symbol",
            name : "openParen",
            symbol : "("
        },
        closeParen :
        {
            text: "<div class='singleCharButton' style='left:2px'>)</span>",
            width : 1,
            height : 1,
            func : "",
            type : "symbol",
            name : "closeParen",
            symbol : ")"
        },
        clear : 
        {
            text : "Clear",
            width : 2,
            height : 1,
            func : calc.clear,
            name : "clear"
            
        }
    }


//make function



//check for values

//solve

//generate web


function makeInvalid(button)
{
    $(button).attr("data-valid",false).css({
                "color"     : "red",
                "cursor"    : "default"
            });
}

function makeValid(button)
{
    $(button).attr("data-valid", true).css({
        "color"     : "darkgreen",
        "cursor"    : "pointer"
    });
}

//make buttons inactive
function inactivate()
{
    var length = equation.length;
    var type = equation[length -1 ].type;
    var name =equation[length -1 ].name;
    
    makeValid($(".button"));
    
    switch(type)
    {
        case "variable":
            makeInvalid($("#addVariable"));
            makeInvalid($("[data-type='variable']"));
            makeInvalid($("#not"));
            break;
        case "function":
            //General Function Logic
            makeInvalid($("[data-type='function']"));
            makeValid($("#not"));
            
            if(name == "not")
            {
                //unary functions
            }
            else
            {
                //Binary Functions
                
            }
            
            break;
        case "symbol":
            //General Symbol Logic
            
            if(name == "openParen")
            {
                
            }
            if(name == "closeParen")
            {
                
            }
            break;
    }
    
        
}

//generate calculator
function generateCalc()
{
    var buttonWidth, buttonHeight; //button;
    var img;
    for(var key in buttons)
    {
        button = buttons[key];
        if(button.img)
            img = $("<img src='" + settings.imgPath + button.img + "'/>")
                .css({
                    height      : ((settings.button.height + settings.button.padding) * (button.height - 1)) + settings.button.height - 2,
                    width       : ((settings.button.width + settings.button.padding) * (button.width - 1)) + settings.button.width - 2,
                    top         : "1px",
                    left        : "1px",
                    position    : "relative"
                });
        else
            img = $("<span />").html(button.text).css("font-size", "12px");
        $("<div id='"+ button.name + "'/>")
            .css({
                height  : ((settings.button.height + settings.button.padding) * (button.height - 1)) + settings.button.height,
                width   : ((settings.button.width + settings.button.padding) * (button.width - 1)) + settings.button.width 
            })
            .attr({
                "data-type" : button.type,
                "title"     : button.text
            })
            .append(img)
            .addClass("button")
            .appendTo("#calculator")
            .mousedown(function(e){
                if($(this).attr("data-valid") != "false")
                    $(this).css("border-style", "inset");
                
            })
            .mouseup(function(e){
                $(this).css("border-style", "outset")
                var id = $(this).attr("id");
                if($(this).attr("data-type") == "function" && $(this).attr("data-valid") != "false")
                    calc.newfunc(id);
                else if ($(this).attr("data-valid") != "false")
                    calc[id]();
                
                console.log(id);
                inactivate();
            });
    }
    
}



window.onload=generateCalc;