const sim = require('./sim.js');
const set = require('./setting.js');

var log = [], dps = [], sum = 0;
var input = set.set();

sim.run(input);




/*
for (var i = 0; i < input['sim_set']['times']; i++) {
    var fight = sim.run();               // ??????
    log.push(fight);                     // ????
    dps.push(fight.dps);                 // DPS??
    sum += fight.dps;                    // ???DPS??
}

var max = 'Max dps: ' + Math.max.apply(Math, dps);
var min = 'Min dps: ' + Math.min.apply(Math, dps);
var avg = 'Avg dps: ' + Number(sum / fight.length).toFixed(2);

console.log(max);
console.log(min);
console.log(avg);
console.log('???????' + fight.length);

*/

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};