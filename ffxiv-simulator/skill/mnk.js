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
            'greased_lightning_i': 0.95,
            'greased_lightning_ii': 0.9,
            'greased_lightning_iii': 0.85,
            'riddle_of_fire': 1.15
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
        this.player.cd.shoulder_tackle = 3000;
        var name = '';
        if (this.player.buff.fists_of_fire >= 0 ) {
            name = 'fire_tackle';
        } else if (this.player.buff.fists_of_earth >= 0) {
            name = 'earth_tackle';
        } else if (this.player.buff.fists_of_wind >= 0 && this.player.buff.riddle_of_wind > 0) {
            name = 'riddle_of_wind';
            this.player.buff.riddle_of_wind = -1;
        } else if (this.player.buff.fists_of_wind >= 0) {
            name = 'wind_tackle';
            this.player.cd.shoulder_tackle = -1;
        }
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': name
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Shoulder Tackle',
            'translate': '罗刹冲',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    steel_peak() {
        this.player.tick.animation = animationBlock;
        this.player.cd.steel_peak = 4000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'steel_peak'
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
    the_forbidden_chakra() {
        this.player.tick.animation = animationBlock;
        this.player.cd.the_forbidden_chakra = 500;
        this.player.job.chakra = 0;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'the_forbidden_chakra'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'The Forbidden Chakra',
            'translate': '阴阳斗气斩',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    tornado_kick() {
        this.player.tick.animation = animationBlock;
        this.player.cd.tornado_kick = 1000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'tornado_kick'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Tornado Kick',
            'translate': '斗魂旋风脚',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    internal_release() {
        this.player.tick.animation = animationBlock;
        this.player.cd.internal_release = 6000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'internal_release'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Internal Release',
            'translate': '内劲',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    perfect_balance() {
        this.player.tick.animation = animationBlock;
        this.player.cd.perfect_balance = 6000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'perfect_balance'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Perfect Balance',
            'translate': '震脚',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    fists_of_fire() {
        this.player.tick.animation = animationBlock;
        this.player.cd.fists = 300;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'fists_of_fire'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Fists of Fire',
            'translate': '红莲体势',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    fists_of_wind() {
        this.player.tick.animation = animationBlock;
        this.player.cd.fists = 300;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'fists_of_wind'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Fists of Wind',
            'translate': '疾风体势',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    riddle_of_fire() {
        this.player.tick.animation = animationBlock;
        this.player.cd.riddle_of_fire = 9000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'riddle_of_fire'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Riddle of Fire',
            'translate': '红莲极意',
            'duration': 0,
            'resource': deepcopy(this.player.resource)
        });
    }
    brotherhood() {
        this.player.tick.animation = animationBlock;
        this.player.cd.brotherhood = 9000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'brotherhood'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Brotherhood',
            'translate': '义结金兰',
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
    invigorate() {
        this.player.tick.animation = animationBlock;
        this.player.cd.invigorate = 12000;
        this.battle.skillEffectQue.push({
            'time': 67,
            'name': 'invigorate'
        });
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Cast',
            'name': 'Invigorate',
            'translate': '运气',
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
        if (this.player.job.form == 'opo_opo') {
            while (!damage.crit) {
                damage = calculate.damageCalculate(this, potency, 'physic');
            }
        }
        if (damage.crit) {
            this.isChakra();
        }
        if (this.player.buff.perfect_balance < 0) {
            this.player.job.form = 'raptor';
        }
        if (this.player.buff.brotherhood >= 0) {
            this.selfBrotherhood();
        }
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
        if (this.player.buff.perfect_balance < 0) {
            this.player.job.form = 'coeurl';
        }
        if (this.player.buff.brotherhood >= 0) {
            this.selfBrotherhood();
        }
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
        if (this.player.buff.perfect_balance < 0) {
            this.player.job.form = 'opo_opo';
        }
        if (this.player.buff.brotherhood >= 0) {
            this.selfBrotherhood();
        }
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Snap Punch',
            'translate': '崩拳',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
        this.isGreasedLightning();
    }
    dragon_kick() {
        var potency = 140;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        if (this.player.job.form == 'opo_opo' || this.player.buff.perfect_balance >= 0) {
            this.player.debuff.resistance = 1500;
        }
        if (damage.crit) {
            this.isChakra();
        }
        if (this.player.buff.perfect_balance < 0) {
            this.player.job.form = 'raptor';
        }
        if (this.player.buff.brotherhood >= 0) {
            this.selfBrotherhood();
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
        if (damage.crit) {
            this.isChakra();
        }
        if (this.player.buff.perfect_balance < 0) {
            this.player.job.form = 'coeurl';
        }
        if (this.player.buff.brotherhood >= 0) {
            this.selfBrotherhood();
        }
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
        if (damage.crit) {
            this.isChakra();
        }
        if (this.player.buff.perfect_balance < 0) {
            this.player.job.form = 'opo_opo';
        }
        if (this.player.buff.brotherhood >= 0) {
            this.selfBrotherhood();
        }
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
        this.isGreasedLightning();
    }
    demolish_dot() {
        this.player.engage = true;
        var potency = 50;
        var damage = [];
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
            'damage': deepcopy(damage),
            'duration': 1800,
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
    riddle_of_wind() {
        var potency = 65;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Riddle of Wind',
            'translate': '疾风极意',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
        this.isGreasedLightning();
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
    the_forbidden_chakra() {
        var potency = 250;
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'The Forbidden Chakra',
            'translate': '阴阳斗气斩',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
    }
    tornado_kick() {
        var potency = 430; // 垃圾SE暗改数据 http://bbs.nga.cn/read.php?pid=283271262
        var damage = calculate.damageCalculate(this, potency, 'physic');
        this.battle.damageQue.push({
            'time': 0,
            'name': 'Tornado Kick',
            'translate': '斗魂旋风脚',
            'damage': damage.damage,
            'crit': damage.crit,
            'dh': damage.dh,
            'buff': this.whatBuff()
        });
        this.player.buff.greased_lightning_iii = -1;
    }
    internal_release() {
        this.player.buff.internal_release = 1500;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Internal Release',
            'translate': '内劲',
            'duration': 1500
        });
    }
    perfect_balance() {
        this.player.buff.perfect_balance = 1000;
        this.player.job.form == 'perfect_balance';
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Perfect Balance',
            'translate': '震脚',
            'duration': 1500
        });
    }
    fists_of_fire() {
        this.player.buff.fists_of_fire = this.battle.time;
        this.player.buff.fists_of_wind = -1;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Fists of Fire',
            'translate': '红莲体势',
            'duration': this.battle.time
        });
    }
    fists_of_wind() {
        this.player.buff.fists_of_wind = this.battle.time;
        this.player.buff.fists_of_fire = -1;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Fists of Wind',
            'translate': '疾风体势',
            'duration': this.battle.time
        });
    }
    riddle_of_fire() {
        this.player.buff.riddle_of_fire = 2000;
        this.player.buff.fists_of_wind = -1;
        this.player.buff.fists_of_fire = this.battle.time;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Riddle of Fire',
            'translate': '红莲极意',
            'duration': 2000
        });
    }
    brotherhood() {
        this.player.buff.brotherhood = 1500;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Buff Apply',
            'name': 'Brotherhood',
            'translate': '义结金兰',
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
    invigorate() {
        this.player.resource.tp = Math.min(1000,this.player.resource.tp + 400);
    }

    // 检测有哪些buff存在
    whatBuff() {
        var arr = [];
        for (var k in this.player.buff) {
            if (this.player.buff[k] > 0) {
                arr.push(k);
            }
        }
        for (var k in this.player.debuff) {
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
    // 自己的义结金兰
    selfBrotherhood() {
        var t = Math.floor(Math.random() * 100 + 1);
        if (t < 30) {
            this.player.job.chakra = Math.min(5, this.player.job.chakra + 1);
        }
    }
    // 疾风迅雷
    isGreasedLightning() {
        if (this.player.buff.greased_lightning_iii >= 0) {
            this.player.buff.greased_lightning_iii = 1600;
        } else if (this.player.buff.greased_lightning_ii >= 0) {
            this.player.buff.greased_lightning_ii = -1;
            this.player.buff.greased_lightning_iii = 1600;
        } else if (this.player.buff.greased_lightning_i >= 0) {
            this.player.buff.greased_lightning_i = -1;
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
        for (var k in this.player.debuff) {
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
        if (this.setting.simulate.partyBuff && this.player.buff.riddle_of_fire > 0 && this.battle.time % 100 == 0) {
            var test = Math.floor(Math.random() * 100);
            if (test < 66) {
                this.player.job.chakra = Math.min(5,this.player.job.chakra + 1);
            }
        }
        if (this.player.buff.greased_lightning_i >= 0) {
            this.player.status.aa_delay = Math.floor(this.setting.player.aa_delay * 95) / 100;
        } else if (this.player.buff.greased_lightning_ii >= 0) {
            this.player.status.aa_delay = Math.floor(this.setting.player.aa_delay * 90) / 100;
        } else if (this.player.buff.greased_lightning_iii >= 0) {
            this.player.status.aa_delay = Math.floor(this.setting.player.aa_delay * 85) / 100;
        } else {
            this.player.status.aa_delay = this.setting.player.aa_delay;
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
        if (name == 'bootshine') {
            s.bootshine();
        } else if (name == 'true_strike') {
            s.true_strike();
        } else if (name == 'snap_punch') {
            s.snap_punch();
        } else if (name == 'internal_release') {
            s.internal_release();
        } else if (name == 'twin_snakes') {
            s.twin_snakes();
        } else if (name == 'demolish') {
            s.demolish();
        } else if (name == 'shoulder_tackle') {
            s.shoulder_tackle();
        } else if (name == 'steel_peak') {
            s.steel_peak();
        } else if (name == 'fists_of_fire') {
            s.fists_of_fire();
        } else if (name == 'fists_of_wind') {
            s.fists_of_wind();
        } else if (name == 'howling_fist') {
            s.howling_fist();
        } else if (name == 'perfect_balance') {
            s.perfect_balance();
        } else if (name == 'dragon_kick') {
            s.dragon_kick();
        } else if (name == 'the_forbidden_chakra') {
            s.the_forbidden_chakra();
        } else if (name == 'elixir_field') {
            s.elixir_field();
        } else if (name == 'tornado_kick') {
            s.tornado_kick();
        } else if (name == 'riddle_of_fire') {
            s.riddle_of_fire();
        } else if (name == 'brotherhood') {
            s.brotherhood();
        } else if (name == 'invigorate') {
            s.invigorate();
        } else if (name == 'potion') {
            s.potion();
        }
        return s;
    },
    'effect': function (data, name) {
        var e = new effect(data);
        if (name == 'bootshine') {
            e.bootshine();
        } else if (name == 'true_strike') {
            e.true_strike();
        } else if (name == 'snap_punch') {
            e.snap_punch();
        } else if (name == 'internal_release') {
            e.internal_release();
        } else if (name == 'twin_snakes') {
            e.twin_snakes();
        } else if (name == 'demolish') {
            e.demolish();
        } else if (name == 'demolish_dot') {
            e.demolish_dot();
        } else if (name == 'fire_tackle') {
            e.fire_tackle();
        } else if (name == 'wind_tackle') {
            e.wind_tackle();
        } else if (name == 'earth_tackle') {
            e.earth_tackle();
        } else if (name == 'riddle_of_wind') {
            e.riddle_of_wind();
        } else if (name == 'steel_peak') {
            e.steel_peak();
        } else if (name == 'fists_of_fire') {
            e.fists_of_fire();
        } else if (name == 'fists_of_wind') {
            e.fists_of_wind();
        } else if (name == 'howling_fist') {
            e.howling_fist();
        } else if (name == 'perfect_balance') {
            e.perfect_balance();
        } else if (name == 'dragon_kick') {
            e.dragon_kick();
        } else if (name == 'the_forbidden_chakra') {
            e.the_forbidden_chakra();
        } else if (name == 'elixir_field') {
            e.elixir_field();
        } else if (name == 'tornado_kick') {
            e.tornado_kick();
        } else if (name == 'riddle_of_fire') {
            e.riddle_of_fire();
        } else if (name == 'brotherhood') {
            e.brotherhood();
        } else if (name == 'invigorate') {
            e.invigorate();
        } else if (name == 'potion') {
            e.potion();
        }
        return e;
    },
    'aa': function (data) {
        var a = new autoAttack(data);
        a.aa();
        return a;
    }

};