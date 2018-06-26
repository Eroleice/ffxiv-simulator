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
    broil_ii() {
        this.player.casting = 'broil_ii';
        this.player.resource.mp -= 720;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.player.tick.cast = this.calculateGCD();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Broil II',
            'translate': '魔炎法',
            'duration': deepcopy(this.player.tick.cast),
            'resource': deepcopy(this.player.resource)
        });
    }
    bio_ii() {
        this.player.resource.mp -= 720;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'bio_ii'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Bio II',
            'translate': '猛毒菌',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    ruin_ii() {
        this.player.resource.mp -= 480;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'ruin_ii'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Ruin II',
            'translate': '毁坏',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    miasma() {
        this.player.casting = 'Miasma';
        this.player.resource.mp -= 600;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.player.tick.cast = this.calculateGCD();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Miasma',
            'translate': '瘴气',
            'duration': deepcopy(this.player.tick.cast),
            'resource': deepcopy(this.player.resource)
        });
    }
    miasma_ii() {
        this.player.resource.mp -= 1680;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'miasma_ii'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Miasma II',
            'translate': '瘴疠',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    shadow_flare() {
        this.player.tick.animation = animationBlock;
        this.player.cd.shadow_flare = 6000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'shadow_flare'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Shadow Flare',
            'translate': '暗影核爆',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    aetherflow() {
        this.player.tick.animation = animationBlock;
        this.player.cd.aetherflow = 6000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'aetherflow'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Aether Flow',
            'translate': '以太超流',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    energy_drain() {
        this.player.tick.animation = animationBlock;
        this.player.job.aetherflow -= 1;
        this.player.cd.energy_drain = 300;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'energy_drain'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Energy Drain',
            'translate': '能量吸收',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    chain_strategem() {
        this.player.tick.animation = animationBlock;
        this.player.cd.chain_strategem = 12000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'chain_strategem'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Chain Strategem',
            'translate': '连环计',
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
    broil_ii() {
        var potency = 230;
        var damage = calculate.damageCalculate(this, potency, 'magic');
        this.battle.damageQue.push({
            'time': 50,
            'name': 'Broil II',
            'translate': '魔炎法',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    bio_ii() {
        this.player.engage = true;
        var potency = 35;
        var damage = [];
        for (var i = 0; i < 10; i++) {
            damage.push(calculate.dotDamageCalculate(this, potency, 'magic'));
        }
        this.player.dot.bio_ii.time = 3000;
        this.player.dot.bio_ii.damage = damage;
        this.player.dot.bio_ii.buff = this.whatBuff();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'DOT Apply',
            'name': 'Bio II',
            'translate': '猛毒菌',
            'damage': damage,
            'duration': 1800,
            'buff': this.whatBuff()
        });
    }
    ruin_ii() {
        var potency = 100;
        var damage = calculate.damageCalculate(this, potency, 'magic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Ruin II',
            'translate': '毁坏',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    miasma() {
        var potency = 20;
        var damage = calculate.damageCalculate(this, potency, 'magic');
        this.battle.skillEffectQue.push({
            'time': 0,
            'name': 'miasma_dot'
        });
        this.battle.damageQue.push({
            'time': 50,
            'name': 'Miasma',
            'translate': '瘴气',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    miasma_dot() {
        this.player.engage = true;
        var potency = 35;
        var damage = [];
        for (var i = 0; i < 8; i++) {
            damage.push(calculate.dotDamageCalculate(this, potency, 'magic'));
        }
        this.player.dot.miasma.time = 2400;
        this.player.dot.miasma.damage = damage;
        this.player.dot.miasma.buff = this.whatBuff();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'DOT Apply',
            'name': 'Miasma',
            'translate': '瘴气',
            'damage': damage,
            'duration': 2400,
            'buff': this.whatBuff()
        });
    }
    miasma_ii() {
        var potency = 100;
        var damage = calculate.damageCalculate(this, potency, 'magic');
        this.battle.skillEffectQue.push({
            'time': 0,
            'name': 'miasma_ii_dot'
        });
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Miasma II',
            'translate': '瘴疠',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    miasma_ii_dot() {
        this.player.engage = true;
        var potency = 25;
        var damage = [];
        for (var i = 0; i < 4; i++) {
            damage.push(calculate.dotDamageCalculate(this, potency, 'magic'));
        }
        this.player.dot.miasma_ii.time = 1200;
        this.player.dot.miasma_ii.damage = damage;
        this.player.dot.miasma.buff = this.whatBuff();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'DOT Apply',
            'name': 'Miasma II',
            'translate': '瘴疠',
            'damage': damage,
            'duration': 1200,
            'buff': this.whatBuff()
        });
    }
    shadow_flare() {
        this.player.engage = true;
        var potency = 50;
        var damage = [];
        for (var i = 0; i < 5; i++) {
            damage.push(calculate.circleBaseDamageCalculate(this, potency, 'magic'));
        }
        this.player.circle.shadow_flare.time = 1500;
        this.player.circle.shadow_flare.damage = damage;
        this.player.circle.shadow_flare.buff = this.whatBuff();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Circle Apply',
            'name': 'Shadow Flare',
            'translate': '暗影核爆',
            'damage': damage,
            'duration': 1500,
            'buff': this.whatBuff()
        });
    }
    aetherflow() {
        this.player.job.aetherflow = 3;
        this.player.resource.mp = Math.min(this.setting.player.mp , this.player.resource.mp + this.setting.player.mp * 0.1);
    }
    energy_drain() {
        this.player.resource.mp = Math.min(this.setting.player.mp, this.player.resource.mp + 1200);
        var potency = 150;
        var damage = calculate.damageCalculate(this, potency, 'magic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Energy Drain',
            'translate': '能量吸收',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    chain_strategem() {
        this.player.buff.chain_strategem = 1500;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Chain Strategem',
            'translate': '连环计',
            'duration': 1500
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

module.exports = {

    'buffCheck': function (data) {
        var b = new buff(data);
        b.check();
        return b;
    },
    'cast': function (data, name) {
        var s = new skill(data);
        if (name == 'broil_ii') {
            s.broil_ii();
        } else if (name == 'bio_ii') {
            s.bio_ii();
        } else if (name == 'miasma') {
            s.miasma();
        } else if (name == 'miasma_ii') {
            s.miasma_ii();
        } else if (name == 'shadow_flare') {
            s.shadow_flare();
        } else if (name == 'energy_drain') {
            s.energy_drain();
        } else if (name == 'aetherflow') {
            s.aetherflow();
        } else if (name == 'chain_strategem') {
            s.chain_strategem();
        } else if (name == 'ruin_ii') {
            s.ruin_ii();
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
        if (name == 'broil_ii') {
            e.broil_ii();
        } else if (name == 'bio_ii') {
            e.bio_ii();
        } else if (name == 'miasma') {
            e.miasma();
        } else if (name == 'miasma_dot') {
            e.miasma_dot();
        } else if (name == 'miasma_ii_dot') {
            e.miasma_ii_dot();
        } else if (name == 'miasma_ii') {
            e.miasma_ii();
        } else if (name == 'shadow_flare') {
            e.shadow_flare();
        } else if (name == 'energy_drain') {
            e.energy_drain();
        } else if (name == 'aetherflow') {
            e.aetherflow();
        } else if (name == 'chain_strategem') {
            e.chain_strategem();
        } else if (name == 'ruin_ii') {
            e.ruin_ii();
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