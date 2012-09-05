var obj1 = {name:'obj1', 
    doSomething : function(){ 
        console.log('do');
    }, 
    prop: 'my prop'
};
var obj2 = {name:'obj2', 
    doSomethingElse : function(){
        console.log('else');
    }, 
    otherProp : 'my otherProp'
};

var obj3 = base.mix(obj1, obj2);

console.log(obj3.name);
obj3.doSomething();
obj3.doSomethingElse();