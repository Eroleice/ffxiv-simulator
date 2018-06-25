var potionEffect = 165;         // 4.3药水效果
var animationBlock = 67;        // 技能动作僵直默认0.67秒
const calculate = require('../calculate.js');
const deepcopy = require('deepcopy');

class skill {

    constructor(data) {
        // 同步战斗数据
        this.setting = data.setting;            // 初始化设定
        this.player = data.player;              // 玩家动态属性
        this.battle = data.battle;
        this.log = data.log;
    }

    // GCD计算
    calculateGCD() {
        var m = this.speedMod();
        return Math.floor(100 * (Math.floor(1000 * m * 2.5 * (1 - Math.floor(130 * (this.player.status.ss - 364) / 2170) / 1000)) / 1000));
    }

    // 速度buff计算
    speedMod() {
        var mod = this.multiplier({
            'presence_of_mind': 0.8,
            'greased_lightning_i': 0.95,
            'greased_lightning_ii': 0.9,
            'greased_lightning_iii': 0.85,
            'huton': 0.85,
            'ley_lines': 0.85
        });
        mod = (this.isBuff('fey_wind')) ? (mod - 0.03) : mod;
        return mod;
    }

    // buff加成 (乘法)
    multiplier(arr) {
        var m = 1;
        for (var k in arr) {
            if (this.isBuff(k)) {
                m *= arr[k];
            }
        }
        return m;
    }

    // buff检测
    isBuff(name) {
        if (typeof this.player.buff[name] !== 'undefined' && this.player.buff[name] > 0) {
            return true;
        } else {
            return false;
        }
    }

    /** 
     * 下面是技能释放代码
     * */
    malefic_iii() {
        this.player.casting = 'malefic_iii';
        this.player.resource.mp -= 600;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.player.tick.cast = this.calculateGCD();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Malefic III',
            'translate': '祸星',
            'duration': deepcopy(this.player.tick.cast),
            'resource': deepcopy(this.player.resource)
        });
    }
    combust_ii() {
        this.player.resource.mp -= 600;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'combust_ii'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Combust II',
            'translate': '灾星',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    potion() {
        this.player.tick.animation = animationBlock;
        this.player.cd.potion = 27000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'potion'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Potion',
            'translate': '爆发药',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    cleric_stance() {
        this.player.tick.animation = animationBlock;
        this.player.cd.cleric_stance = 9000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'cleric_stance'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Cleric Stance',
            'translate': '战姿',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    lucid_dreaming() {
        this.player.tick.animation = animationBlock;
        this.player.cd.lucid_dreaming = 12000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'lucid_dreaming'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Lucid Dreaming',
            'translate': '醒梦',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }

}

class effect {

    constructor(data) {
        // 同步战斗数据
        this.setting = data.setting;            // 初始化设定
        this.player = data.player;              // 玩家动态属性
        this.battle = data.battle;
        this.log = data.log;
    }

    /** 
     * 下面是技能生效代码
     * */
    malefic_iii() {
        var potency = 220;
        var damage = calculate.damageCalculate(this, potency,'magic');
        this.battle.damageQue.push({
            'time': 50,
            'name': 'Malefic III',
            'translate': '祸星',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    combust_ii() {
        this.player.engage = true;
        var potency = 50;
        var damage = [];
        for (var i = 0; i < 10; i++) {
            damage.push(calculate.dotDamageCalculate(this, potency, 'magic'));
        }
        this.player.dot.combust_ii.time = 3000;
        this.player.dot.combust_ii.damage = damage;
        this.player.dot.combust_ii.buff = this.whatBuff();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'DOT Apply',
            'name': 'Combust II',
            'translate': '灾星',
            'base_damage': damage,
            'duration': 3000,
            'buff': this.whatBuff()
        });
    }
    potion() {
        this.player.buff.potion = 3000;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Potion',
            'translate': '爆发药',
            'duration': 3000
        });
    }
    cleric_stance() {
        this.player.buff.cleric_stance = 1500;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Cleric Stance',
            'translate': '战姿',
            'duration': 1500
        });
    }
    lucid_dreaming() {
        this.player.buff.lucid_dreaming = 2100;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Lucid Dreaming',
            'translate': '醒梦',
            'duration': 2100
        });
    }

    // 检测有哪些buff存在
    whatBuff() {
        var arr = [];
        for (var k in this.player.buff) {
            if (this.player.buff[k] > 0) {
                arr.push(k);
            }
        }
        return arr;
    }
    // buff检测
    isBuff(name) {
        if (typeof this.player.buff[name] !== 'undefined' && this.player.buff[name] > 0) {
            return true;
        } else {
            return false;
        }
    }
}

class buff {

    constructor(data) {
        // 同步战斗数据
        this.setting = data.setting;            // 初始化设定
        this.player = data.player;              // 玩家动态属性
        this.battle = data.battle;
        this.log = data.log;
    }

    check() {
        if (this.isBuff('potion')) {
            this.player.status.ap = this.setting.player.ap + potionEffect;
        } else {
            this.player.status.ap = this.setting.player.ap;
        }
    }

    // buff检测
    isBuff(name) {
        if (typeof this.player.buff[name] !== 'undefined' && this.player.buff[name] > 0) {
            return true;
        } else {
            return false;
        }
    }
}

class autoAttack {

    constructor(data) {
        // 同步战斗数据
        this.setting = data.setting;            // 初始化设定
        this.player = data.player;              // 玩家动态属性
        this.battle = data.battle;
        this.log = data.log;
    }

    aa() {
        var potency = 110;
        var damage = calculate.autoAttackCalculate(this, potency);
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Auto Attack',
            'translate': '自动攻击',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }

    // 检测有哪些buff存在
    whatBuff() {
        var arr = [];
        for (var k in this.player.buff) {
            if (this.player.buff[k] > 0) {
                arr.push(k);
            }
        }
        return arr;
    }
}

module.exports = {

    'buffCheck': function (data) {
        var b = new buff(data);
        b.check();
        return b;
    },
    'cast': function (data, name) {
        var s = new skill(data);
        if (name == 'malefic_iii') {
            s.malefic_iii();
        } else if (name == 'combust_ii') {
            s.combust_ii();
        } else if (name == 'potion') {
            s.potion();
        } else if (name == 'cleric_stance') {
            s.cleric_stance();
        } else if (name == 'lucid_dreaming') {
            s.lucid_dreaming();
        }
        return s;
    },
    'effect': function (data, name) {
        var e = new effect(data);
        if (name == 'malefic_iii') {
            e.malefic_iii();
        } else if (name == 'combust_ii') {
            e.combust_ii();
        } else if (name == 'potion') {
            e.potion();
        } else if (name == 'cleric_stance') {
            e.cleric_stance();
        } else if (name == 'lucid_dreaming') {
            e.lucid_dreaming();
        }
        return e;
    },
    'aa': function (data) {
        var a = new autoAttack(data);
        a.aa();
        return a;
    }

};