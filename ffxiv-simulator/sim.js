const deepcopy = require('deepcopy');
const calculate = require('./calculate.js');

class Fight {

    constructor(data) {
        // 模拟参数，不会修改
        this.setting = {
            'job': deepcopy(data.job),
            'player': deepcopy(data.status),
            'simulate': deepcopy(data.simulate)
        };
        // 玩家参数，实时修改
        this.player = {
            'status': deepcopy(data.status),                     // 玩家属性
            'jobTrial': 0,
            'jobK': 0,
            'skillList': [],
            'resource': {
                'mp': deepcopy(data.status.mp),                  // 玩家MP
                'tp': 1000                                       // 玩家TP
            },
            'job': [],                                           // 职业特殊内容
            'buff': [],                                          // 玩家buff && 目标debuff
            'dot': [],                                           // 玩家dot
            'cd': [],                                            // 玩家技能冷却
            'stance': [],                                        // 玩家姿态
            'tick': {
                'animation': 0,                                  // 动作僵直
                'gcd': 0,                                        // 公共冷却
                'cast': 0,                                       // 读条
                'aa': 0                                          // 普攻间隔
            },
            'casting': '',                                       // 当前读条
            'engage': false                                      // 进入战斗状态
        };
        // 战斗参数，实时修改
        this.battle = {
            'opener': deepcopy(data.opener),                     // 开场队列
            'time': deepcopy(data.simulate.duration),            // 战斗计时
            'skillPriority': '',
            'abilityPriority': '',
            'damageQue': [],
            'skillEffectQue': [],
        };

        // 统计参数，不会修改
        this.log = [];

        // 配置文件
        this.rotation = require('./rotation/' + data.job + '.js');
        this.initialJob = require('./initial/' + data.job + '.js');
        this.jobSkill = require('./skill/' + data.job + '.js');
        this.initialParty = require('./initial/party.js');
    }

    start() {

        // 职业信息初始化
        this.player = this.initialJob.init(this.player);

        // 团辅信息初始化
        if (this.setting.simulate.partyBuff) {
            this.player = this.initialParty.init(this.player);
        }
        
        while (this.battle.time > 0) {

            // 如果有DOT就结算 && 回蓝结算
            if (this.battle.time % 300 == 150) {
                this.dotHit();
                this.manaRegen();
            }

            // 如果有团辅就判定
            if (this.setting.simulate.partyBuff) {
                this.isPartyBuff();
            }

            // 玩家buff生效检测
            this.update(this.jobSkill.buffCheck(this));

            // 如果玩家读条结束，进入判定
            if (this.player.casting !== '' && this.player.tick.cast <= 50) {
                this.update(this.jobSkill.effect(this, this.player.casting));
                this.player.casting = '';
            }

            // 如果伤害判定触发，进行计算
            for (var i = 0; i < this.battle.damageQue.length; i++) {
                if (this.battle.damageQue[i].time <= 0) {

                    /* 伤害计入统计 */
                    this.damageApply(this.battle.damageQue[i]);
                    this.battle.damageQue.shift();

                }
            }

            // 如果技能效果触发，进行计算
            for (var i = 0; i < this.battle.skillEffectQue.length; i++) {
                if (this.battle.skillEffectQue[i].time <= 0) {

                    /* 技能生效 */
                    this.update(this.jobSkill.effect(this, this.battle.skillEffectQue[i].name));
                    this.battle.skillEffectQue.shift();

                }
            }

            // 最优技能判定
            this.battle.skillPriority = this.rotation.whichSkill(this);

            // 最优能力技判定
            this.battle.abilityPriority = this.rotation.whichAbility(this);
            
            // 如果能使用技能就使用技能

            if (this.canSkill()) {
                if (typeof this.battle.opener[0] !== 'undefined' && this.isSkill(this.battle.opener[0])) {
                    // 如果起手队列第一个是技能就使用它
                    this.update(this.jobSkill.cast(this,this.battle.opener[0]));
                    this.battle.opener.shift();
                } else if (typeof this.battle.opener[0] == 'undefined') {
                    this.update(this.jobSkill.cast(this,this.battle.skillPriority));
                }
            }

            // 如果能使用能力就使用能力
            if (this.canAbility()) {
                if (typeof this.battle.opener[0] !== 'undefined' && !this.isSkill(this.battle.opener[0])) {
                    // 如果起手队列第一个是能力技就使用它
                    this.update(this.jobSkill.cast(this,this.battle.opener[0]));
                    this.battle.opener.shift();
                } else if (typeof this.battle.opener[0] == 'undefined') {
                    this.update(this.jobSkill.cast(this,this.battle.abilityPriority));
                }

            }

            this.tick(); // 所有时间结算，进入下一次循环验算
            
        }

    }

    // 更新class
    update(data) {

        this.player = data.player;
        this.battle = data.battle;
        this.log = data.log;

    }

    // 所有时间-1毫秒
    tick() {
        this.battle.tick -= 1;
        this.battle.time -= 1;
        this.allTick(this.player.tick);
        this.allTick(this.player.buff);
        this.allTick(this.player.cd);
        this.allTimeTick(this.player.dot);
        this.allTimeTick(this.battle.skillEffectQue);
        this.allTimeTick(this.battle.damageQue);
    }

    allTick(arr) {
        for (var k in arr) {
            arr[k] -= 1;
        }
    }

    allTimeTick(arr) {
        for (var k in arr) {
            arr[k].time -= 1;
        }
    }

    // 检测是否是GCD技能(起手功能使用)
    isSkill(name) {
        if (this.player.skillList.indexOf(name) == -1) {
            return false;
        } else {
            return true;
        }
    }

    // 伤害记录
    damageApply(data) {
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Damage',
            'name': data.name,
            'damage': data.damage,
            'crit': data.crit,
            'dh': data.dh
        });
    }

    // dot伤害
    dotHit() {
        for (var k in this.player.dot) {
            if (this.player.dot[k].time > 0) {

                // 根据this.player.dot[k].damage储存的快照伤害进行伤害浮动模拟并处理DOT机制
                var dotData = calculate.dotDamageCalculate(this, this.player.dot[k].damage);
                this.log.push({
                    'time': this.setting.simulate.duration - this.battle.time,
                    'event': 'DOT Tick',
                    'name': k,
                    'damage': dotData.damage,
                    'crit': dotData.crit,
                    'dh': dotData.dh
                });

            }
            
        }
    }

    // 团队buff判定
    isPartyBuff() {

        // 龙骑战斗祷告
        if (this.setting.simulate.partyMember.indexOf('drg') !== -1 && this.setting.job !== 'drg' && (this.setting.simulate.duration - this.battle.time) % 18000 == 300) {
            this.player.buff.battle_litany = 2000;
            this.partyBuffLog('Battle Litany', 2000);
        }
        // 龙骑肠子
        if (this.setting.simulate.partyMember.indexOf('drg') !== -1 && this.setting.job !== 'drg' && (this.setting.simulate.duration - this.battle.time) % 12000 == 400) {
            this.player.buff.dragon_sight = 2000;
            this.partyBuffLog('Dragon Sight', 2000);
        }
        // 学者连环计
        if (this.setting.simulate.partyMember.indexOf('sch') !== -1 && this.setting.job !== 'sch' && (this.setting.simulate.duration - this.battle.time) % 12000 == 900) {
            this.player.buff.chain_strategem = 1500;
            this.partyBuffLog('Chain Strategem', 2000);
        }
        // 诗人战斗之声
        if (this.setting.simulate.partyMember.indexOf('brd') !== -1 && this.setting.job !== 'brd' && (this.setting.simulate.duration - this.battle.time) % 18000 == 400) {
            this.player.buff.battle_voice = 2000;
            this.partyBuffLog('Battle Voice', 2000);
        }
        // 诗人魔人歌
        if (this.setting.simulate.partyMember.indexOf('brd') !== -1 && this.setting.job !== 'brd' && (this.setting.simulate.duration - this.battle.time) % 18000 == 300) {
            this.player.buff.foe_requiem = 3300;
            this.partyBuffLog('Foe Requiem', 3300);
        }
        // 诗人歌曲
        if (this.setting.simulate.partyMember.indexOf('brd') !== -1) {
            this.player.buff.bard_aura = this.setting.simulate.duration;
        }
        // 忍者背刺
        if (this.setting.simulate.partyMember.indexOf('nin') !== -1 && this.setting.job !== 'nin' && (this.setting.simulate.duration - this.battle.time) % 6000 == 1100) {
            this.player.buff.trick_attack = 1500;
            this.partyBuffLog('Trick Attack', 1500);
        }
        // 召唤歪风
        if (this.setting.simulate.partyMember.indexOf('smn') !== -1 && this.setting.job !== 'smn' && (this.setting.simulate.duration - this.battle.time) % 6000 == 200) {
            this.player.buff.contagion = 1500;
            this.partyBuffLog('Contagion', 1500);
        }
        // 召唤灵兽加护
        if (this.setting.simulate.partyMember.indexOf('smn') !== -1 && this.setting.job !== 'smn' && (this.setting.simulate.duration - this.battle.time) % 12000 == 1500) {
            this.player.buff.devotion = 1500;
            this.partyBuffLog('Devotion', 1500);
        }
        // 机工超荷
        if (this.setting.simulate.partyMember.indexOf('mch') !== -1 && this.setting.job !== 'mch' && (this.setting.simulate.duration - this.battle.time) % 12000 == 100) {
            this.player.buff.hypercharge = 2800;
            this.partyBuffLog('Hypercharge', 2800);
        }
        // 武僧义结金兰
        if (this.setting.simulate.partyMember.indexOf('mnk') !== -1 && this.setting.job !== 'mnk' && (this.setting.simulate.duration - this.battle.time) % 9000 == 1300) {
            this.player.buff.botherhood = 1500;
            this.partyBuffLog('Botherhood', 1500);
        }
    }

    canSkill() {
        if (this.player.tick.cast<=0 && this.player.tick.gcd<=0 && this.player.tick.animation<=0) {
            return true;
        } else {
            return false;
        }
    }

    canAbility() {
        if (this.player.tick.cast <= 0 && this.player.tick.animation <= 0) {
            return true;
        } else {
            return false;
        }
    }

    manaRegen() {
        this.player.resource.mp = Math.floor(this.player.resource.mp + this.setting.player.mp * 0.02);
        if (this.isBuff('lucid_dreaming')) {
            this.player.resource.mp += 960;
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

    partyBuffLog(name, duration) {
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Party Buff Apply',
            'name': name,
            'duration': duration
        });
    }
}

module.exports = {
    'run': function (data) {

        var fight = new Fight(data);    // 建立新的战斗类
        fight.start();                  // 模拟开始
        return fight.log;               // 返回statisic object

    }
};