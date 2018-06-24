const sim = require('./sim.js');
const set = require('./setting.js');
const fs = require('fs');

var log = [], dps = [], sum = 0, totalDamage = 0;
var input = set.set();

if (input.simulate.battleLog) {
    // ?????? Battle Log.json
    var data = sim.run(input);
    console.log('DPS: ' + data.dps);
    var json = JSON.stringify(data.log, null, 4);
    fs.writeFile('Battle Log.json', json, 'utf8', function () {
        console.log('Battle Log.json complete!');
    });
} else {
    // ????????
    var statistic = [];
    var totalDps = 0;
    var startTime = Date.parse(new Date()) / 1000;
    console.log('Simulating ...');
    for (var i = 0; i < input.simulate.times; i++) {
        var data = sim.run(input);
        statistic.push(data.dps);
        totalDps += data.dps;
    }
    var endTime = Date.parse(new Date()) / 1000;
    console.log('Simulate of ' + input.job + ' finished, ' + input.simulate.times + ' times in total! Total time used: ' + Math.floor(endTime - startTime) + ' seconds!');
    console.log('Max dps: ' + Math.max.apply(Math, statistic));
    console.log('Min dps: ' + Math.min.apply(Math, statistic));
    console.log('Average dps: ' + Math.floor(100 * totalDps / input.simulate.times) / 100);

}



Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};