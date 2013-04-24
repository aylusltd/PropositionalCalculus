/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var equation = new Array();
var varCounter = 0;

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
    newVariable : function()
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
            func : calc[str].func
        })
    },
    not : 
    {
        func: function (x)
        {
            return !x;
        }
    },
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
var functions = 
    {
        addVariable : 
        {
            text: "New Variable",
            width: 2,
            height: 1,
            func: calc.newVariable
        },
        not : 
        {
            text: "&not",
            width: 1,
            height : 1,
            func: calc.newfunc("not")
        }
    }


//make function



//check for values

//solve

//generate web

//generate calculator


//bind controls


