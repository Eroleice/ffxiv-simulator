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
    bootshine() {
        this.player.resource.tp -= 50;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'bootshine'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Bootshine',
            'translate': '连击',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    true_strike() {
        this.player.resource.tp -= 50;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'true_strike'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'True Strike',
            'translate': '正拳',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    snap_punch() {
        this.player.resource.tp -= 40;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'snap_punch'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Snap Punch',
            'translate': '崩拳',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    dragon_kick() {
        this.player.resource.tp -= 50;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'dragon_kick'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Dragon Kick',
            'translate': '双龙脚',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    twin_snakes() {
        this.player.resource.tp -= 50;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'twin_snakes'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Twin Snakes',
            'translate': '双掌打',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    demolish() {
        this.player.resource.tp -= 40;
        this.player.tick.animation = animationBlock;
        this.player.tick.gcd = this.calculateGCD();
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'demolish'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Demolish',
            'translate': '破碎拳',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    shoulder_tackle() {
        this.player.tick.animation = animationBlock;
        this.player.cd.fire_tackle = 3000;
        var name = '';
        if (this.player.job.fists == 'fire') {
            name = 'fire_tackle';
        } else if (this.player.job.fists == 'wind') {
            name = 'wind_tackle';
        } else if (this.player.job.fists == 'earth') {
            name = 'earth._tackle';
        }
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': name
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Fire Tackle',
            'translate': '红莲罗刹冲',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    steel_peak() {
        this.player.tick.animation = animationBlock;
        this.player.cd.steel_peak = 4000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'steal_peak'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Steel Peak',
            'translate': '铁山靠',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    howling_fist() {
        this.player.tick.animation = animationBlock;
        this.player.cd.howling_fist = 6000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'howling_fist'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Howling Fist',
            'translate': '空鸣拳',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    elixir_field() {
        this.player.tick.animation = animationBlock;
        this.player.cd.elixir_field = 3000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'elixir_field'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Elixir Field',
            'translate': '苍气炮',
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
    bootshine() {
        var potency = 140;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        if (player.job.form == 'opo_opo') {
            while (!damage.crit) {
                damage = calculate.damageCalculate(this, potency, 'physic');
            }
        }
        if (damage.crit) {
            this.isChakra();
        }
        this.player.job.form = 'raptor';
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Bootshine',
            'translate': '连击',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    true_strike() {
        var potency = 180;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        if (damage.crit) {
            this.isChakra();
        }
        this.player.job.form = 'coeurl';
        this.battle.damageQue.push({
            'time': 0,
            'name': 'True Strike',
            'translate': '正拳',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    snap_punch() {
        var potency = 170;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        if (damage.crit) {
            this.isChakra();
        }
        this.isGreasedLightning();
        this.player.job.form = 'opo_opo';
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Snap Punch',
            'translate': '崩拳',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    dragon_kick() {
        var potency = 140;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        if (this.player.job.form == 'opo_opo') {
            this.player.job.form = 'raptor';
            this.player.buff.resistence = 1500;
        }
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Dragon Kick',
            'translate': '双龙脚',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    twin_snakes() {
        var potency = 130;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.player.job.form = 'coeurl';
        this.player.buff.twin_snakes = 1500;
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Twin Snakes',
            'translate': '双掌打',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    demolish() {
        var potency = 70;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.player.job.form = 'opo_opo';
        this.isGreasedLightning();
        this.battle.skillEffectQue.push({
            'time': 0,
            'name': 'demolish_dot'
        });
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Demolish',
            'translate': '破碎拳',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    demolish_dot() {
        this.player.engage = true;
        var potency = 50;
        for (var i = 0; i < 6; i++) {
            damage.push(calculate.dotDamageCalculate(this, potency, 'physic'));
        }
        this.player.dot.demolish.time = 1800;
        this.player.dot.demolish.damage = damage;
        this.player.dot.demolish.buff = this.whatBuff();
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'DOT Apply',
            'name': 'Demolish',
            'translate': '破碎拳',
            'damage': damage,
            'duration': 2400,
            'buff': this.whatBuff()
        });
    }
    fire_tackle() {
        var potency = 130;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Fire Tackle',
            'translate': '红莲罗刹冲',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    wind_tackle() {
        var potency = 65;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Wind Tackle',
            'translate': '疾风罗刹冲',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
        this.player.buff.riddle_of_wind = 1000;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Riddle of Wind',
            'translate': '疾风极意',
            'duration': 1000
        });
    }
    earth_tackle() {
        var potency = 100;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Earth Tackle',
            'translate': '金刚罗刹冲',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    steel_peak() {
        var potency = 150;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Steel Peak',
            'translate': '铁山靠',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    howling_fist() {
        var potency = 210;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Howling Fist',
            'translate': '空鸣拳',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    elixir_field() {
        var potency = 220;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Elixir Field',
            'translate': '苍气炮',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    aetherflow() {
        this.player.job.aetherflow = 3;
        this.player.resource.mp = Math.min(this.setting.player.mp, this.player.resource.mp + this.setting.player.mp * 0.1);
    }
    energy_drain() {
        this.player.resource.mp = Math.min(this.setting.player.mp, this.player.resource.mp + 1200);
        var potency = 150;
        var damage = calculate.damageCalculate(this, potency, 'magic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Energy Drain',
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
            'duration': 1500
        });
    }
    potion() {
        this.player.buff.potion = 3000;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Potion',
            'duration': 3000
        });
    }
    cleric_stance() {
        this.player.buff.cleric_stance = 1500;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Cleric Stance',
            'duration': 1500
        });
    }
    lucid_dreaming() {
        this.player.buff.lucid_dreaming = 2100;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Lucid Dreaming',
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
    // 积攒查克拉
    isChakra() {
        var t = Math.floor(Math.random() * 2);
        if (t == 0) {
            this.player.job.chakra = Math.min(5, this.player.job.chakra + 1);
        }
    }
    // 疾风迅雷
    isGreasedLightning() {
        if (this.player.buff.greased_lightning_i < 0 && this.player.buff.greased_lightning_ii < 0 && this.player.buff.greased_lightning_iii >= 0) {
            this.player.buff.greased_lightning_iii = 1600;
        } else if (this.player.buff.greased_lightning_i < 0 && this.player.buff.greased_lightning_ii >= 0 && this.player.buff.greased_lightning_iii < 0) {
            this.player.buff.greased_lightning_iii = 1600;
        } else if (this.player.buff.greased_lightning_i >= 0 && this.player.buff.greased_lightning_ii < 0 && this.player.buff.greased_lightning_iii < 0) {
            this.player.buff.greased_lightning_ii = 1600;
        } else {
            this.player.buff.greased_lightning_i = 1600;
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