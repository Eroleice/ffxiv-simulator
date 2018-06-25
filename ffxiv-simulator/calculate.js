class calculate {

    constructor(data) {
        // 同步数据
        this.player = data.player;
        this.setting = data.setting;
        this.damage = 0;
        this.crit = false;
        this.dh = false;
    }

    /**
     * 副属性公式参考：
     * https://docs.google.com/spreadsheets/d/1-w75RieKEHAvBiBO8AdHryAsg6TrvaPW5b5HBJzy170/edit?usp=sharing
     * */
    // 暴击判定
    critMod() {
        // 暴击buff判定
        var add = this.additive({
            'bard_aura': 0.02,
            'battle_litany': 0.15,
            'chain_strategem': 0.15
        });
        // 暴击判定
        if (this.setting.simulate.expectMode) {
            var p = floor((0.05 + (this.player.status.crt - 364) / 108.5 * 0.01 + add), 3);
            var k = floor((1.4 + (((this.player.status.crt - 364) / 108.5)) / 100), 3);
            this.damage *= (1 + p * (k - 1));   // 期望模式下返回暴击期望加成
        } else {
            var p = floor((0.05 + (this.player.status.crt - 364) / 108.5 * 0.01 + add), 3);
            var test = Math.floor(Math.random() * 1001);
            if (test <= Math.floor(p * 1000)) {
                this.crit = true;     // 记录暴击
                var k = floor((1.4 + (((this.player.status.crt - 364) / 108.5)) / 100), 3);
                this.damage *= k;     // 暴击伤害
            }
        }
    }
    // 直击判定
    dhMod() {
        // 直击buff判定
        var add = this.additive({
            'battle_voice': 0.15
        });
        // 直击判定
        if (this.setting.simulate.expectMode) {
            var p = floor(((this.player.status.dh - 364) / 39.09 * 0.01 + add), 3);
            var k = 1.25;
            this.damage *= (1 + p * (k - 1)); // 期望模式下返回直击期望加成
        } else {
            var p = floor(((this.player.status.dh - 364) / 39.09 * 0.01 + add), 3);
            var test = Math.floor(Math.random() * 1001);
            if (test <= Math.floor(p * 1000)) {
                this.dh = true;              // 记录直击
                this.damage *= 1.25;		 // 返回直击加成
            }
        }
    }

    // 伤害计算公式
    baseDamage(potency,type) {
        // buff检测 && buff强化系数叠乘
        if (type == 'magic') {
            var m = this.multiplier({
                'trick_attack': 1.1,            // 忍者背刺
                'dragon_sight': 1.05,           // 龙骑龙视
                'cleric_stance': 1.05,          // 治疗战姿
                'foe_requiem': 1.03,            // 诗人魔人歌
                'contagion': 1.1,               // 迦楼罗歪风
                'devotion': 1.02,               // 召唤灵兽加护
                'hypercharge': 1.05             // 机工超荷
            });
        } else if (type == 'physic') {
            var m = this.multiplier({
                'trick_attack': 1.1,            // 忍者背刺
                'dragon_sight': 1.05,           // 龙骑龙视
                'cleric_stance': 1.05,          // 治疗战姿
                'foe_requiem': 1.03,            // 诗人魔人歌
                'contagion': 1.1,               // 迦楼罗歪风
                'botherhood': 1.05,             // 武僧义结金兰
                'hypercharge': 1.05             // 机工超荷
            });
        }
        // 伤害公式mod计算
        var apMod = Math.floor(100 * (this.player.status.ap - 58.4) / 233.6) / 100;
        var wdMod = (this.player.status.wd + this.player.jobK) / 100;
        var detMod = 1 + Math.floor(1000 * (this.player.status.det - 292) * 0.13 / 2170) / 1000;
        var tenMod = 1 + Math.floor(1000 * (this.player.status.ten - 364) * 0.1 / 2170) / 1000;
        var resistanceMod = (this.isBuff('resistance')) ? 1.1 : 1;
        this.damage = Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(potency * wdMod) * apMod) * detMod) * tenMod) * m) * resistanceMod) * this.player.jobTrial);
        if (potency < 100) {
            this.damage += 1; // 技能威力<100时,最终伤害需要+1
        }
    }

    // 自动攻击伤害公式
    autoDamage(potency) {
        // buff检测 && buff强化系数叠乘
        var m = this.multiplier({
            'trick_attack': 1.1,            // 忍者背刺
            'dragon_sight': 1.05,           // 龙骑龙视
            'cleric_stance': 1.05,          // 治疗战姿
            'foe_requiem': 1.03,            // 诗人魔人歌
            'devotion': 1.02,               // 召唤灵兽加护
            'hypercharge': 1.05,            // 机工超荷
            'brotherhood': 1.05             // 武僧义结金兰
        });
        var ap = 0;
        if (this.setting.job == 'ast') {
            ap = 145;
        } else if (this.setting.job == 'sch') {
            ap = 261;
        } else if (this.setting.job == 'whm') {
            ap = 159;
        } else if (this.setting.job == 'blm') {
            ap = 130;
        } else if (this.setting.job == 'rdm') {
            ap = 159;
        } else if (this.setting.job == 'smn') {
            ap = 261;
        } else {
            ap = this.player.status.ap;
        }
        // 伤害公式mod计算
        var apMod = Math.floor(100 * (ap - 58.4) / 233.6) / 100;
        var wdMod = (this.player.status.wd + this.player.jobK) * (this.player.status.aa_delay / 3) / 100;
        var detMod = 1 + Math.floor(1000 * (this.player.status.det - 292) * 0.13 / 2170) / 1000;
        var tenMod = 1 + Math.floor(1000 * (this.player.status.ten - 364) * 0.1 / 2170) / 1000;
        var resistanceMod = (this.isBuff('resistance')) ? 1.1 : 1;
        this.damage = Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(potency * wdMod) * apMod) * detMod) * tenMod) * m) * resistanceMod) * this.player.jobTrial);
    }

    // dot伤害加成
    dotMod() {
        this.damage *= floor(1 + (((this.player.status.ss - 364) / 167)) / 100, 3);
    }

    // 伤害浮动
    damageFloat() {
        if (!this.setting.simulate.expectMode) {
            this.damage *= Math.floor(95 + Math.floor(Math.random() * 11)) / 100;
        }
    }

    // buff加成 (加法)
    additive(arr) {
        var a = 0;
        for (var k in arr) {
            if (this.isBuff(k)) {
                a += arr[k];
            }
        }
        return a;
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

}

// 保留三位小数
function floor(num, d) {
    var k = Math.pow(10, d);
    return Math.floor(num * k) / k;
}

module.exports = {

    'damageCalculate': function (data,potency,type) {

        var c = new calculate(data);
        c.baseDamage(potency,type);
        c.critMod();
        c.dhMod();
        c.damageFloat();
        return {
            'damage': Math.floor(c.damage),
            'crit': c.crit,
            'dh': c.dh
        };

    },

    'autoAttackCalculate': function (data, potency) {

        var c = new calculate(data);
        c.autoDamage(potency);
        c.critMod();
        c.dhMod();
        c.dotMod();
        c.damageFloat();
        return {
            'damage': Math.floor(c.damage),
            'crit': c.crit,
            'dh': c.dh
        };

    },

    'dotBaseDamageCalculate': function (data, potency, type) {

        var c = new calculate(data);
        c.baseDamage(potency,type);
        c.dotMod();
        return c.damage;

    },

    'dotDamageCalculate': function (data, baseDamage) {

        var c = new calculate(data);
        c.damage = baseDamage;
        c.critMod();
        c.dhMod();
        c.damageFloat();
        return {
            'damage': Math.floor(c.damage),
            'crit': c.crit,
            'dh': c.dh
        }
    }

};