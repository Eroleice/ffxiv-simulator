﻿const deepcopy = require('deepcopy');
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
            'opener': deepcopy(data.opener),                     // 开场队列
            'buff': [],                                          // 玩家buff
            'debuff': [],                                        // 目标debuff
            'dot': [],                                           // 玩家dot
            'circle': [],                                        // 地板技能
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
            'time': deepcopy(data.simulate.duration),            // 战斗计时
            'skillPriority': '',                                 // 技能最高优先级
            'abilityPriority': '',                               // 能力最高优先级
            'damageQue': [],                                     // 伤害时间轴
            'skillEffectQue': [],                                // 技能效果时间轴
            'totalDamage': 0                                     // 战斗总伤害
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

            // 服务器3秒Tick结算
            if (this.battle.time % 300 == 150) {
                // DOT结算
                this.dotHit();
            } else if (this.battle.time % 300 == 100) {
                // 回蓝/TP结算
                this.manaRegen();
            } else if (this.battle.time % 300 == 200) {
                this.doCircle();
            }

            // 回蓝结算


            // 如果伤害判定触发，进行计算
            for (var i = 0; i < this.battle.damageQue.length; i++) {
                if (this.battle.damageQue[i].time <= 0) {

                    /* 伤害计入统计 */
                    this.damageApply(this.battle.damageQue[i]);
                    this.battle.damageQue.splice(i,1);

                }
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

            // 如果技能效果触发，进行计算
            for (var i = 0; i < this.battle.skillEffectQue.length; i++) {
                if (this.battle.skillEffectQue[i].time <= 0) {

                    /* 技能生效 */
                    this.update(this.jobSkill.effect(this, this.battle.skillEffectQue[i].name));
                    this.battle.skillEffectQue.splice(i,1);

                }
            }

            // 如果没有在读条，进行自动攻击判定
            if (this.setting.simulate.autoAttack && this.player.engage && this.player.casting == '' && this.player.tick.aa <= 0) {
                this.doAA();
            }

            // 最优技能判定
            this.battle.skillPriority = this.rotation.whichSkill(this);

            // 最优能力技判定
            this.battle.abilityPriority = this.rotation.whichAbility(this);
            
            // 如果能使用技能就使用技能
            if (this.canSkill()) {
                if (typeof this.player.opener[0] !== 'undefined' && this.isSkill(this.player.opener[0])) {
                    // 如果起手队列第一个是技能就使用它
                    this.update(this.jobSkill.cast(this,this.player.opener[0]));
                    this.player.opener.shift();
                } else if (typeof this.player.opener[0] == 'undefined') {
                    this.update(this.jobSkill.cast(this,this.battle.skillPriority));
                }
            }

            // 如果能使用能力就使用能力
            if (this.canAbility()) {
                if (typeof this.player.opener[0] !== 'undefined' && !this.isSkill(this.player.opener[0])) {
                    // 如果起手队列第一个是能力技就使用它
                    this.update(this.jobSkill.cast(this,this.player.opener[0]));
                    this.player.opener.shift();
                } else if (typeof this.player.opener[0] == 'undefined') {
                    this.update(this.jobSkill.cast(this,this.battle.abilityPriority));
                }

            }

            this.tick(); // 所有时间结算，进入下一次循环验算

            this.isEngage(); // 如果没有进入战斗，重置战斗时间
            
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
        this.battle.time -= 1;
        this.allTick(this.player.tick);
        this.allTick(this.player.buff);
        this.allTick(this.player.cd);
        this.allTimeTick(this.player.dot);
        this.allTimeTick(this.player.circle);
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

    // 自动攻击
    doAA() {
        this.update(this.jobSkill.aa(this));
        this.player.tick.aa = this.setting.player.aa_delay * 100;
    }

    // 伤害记录
    damageApply(data) {
        this.player.engage = true;
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Damage',
            'name': data.name,
            'translate': data.translate,
            'damage': data.damage,
            'crit': data.crit,
            'dh': data.dh,
            'buff': data.buff
        });
        this.battle.totalDamage += data.damage;
    }

    // dot伤害
    dotHit() {
        for (var k in this.player.dot) {
            if (this.player.dot[k].time > 0) {
                // 根据this.player.dot[k].damage储存的快照伤害输出数据
                this.log.push({
                    'time': this.setting.simulate.duration - this.battle.time,
                    'event': 'DOT Tick',
                    'name': this.player.dot[k].name,
                    'translate': this.player.dot[k].translate,
                    'damage': this.player.dot[k].damage[0].damage,
                    'crit': this.player.dot[k].damage[0].crit,
                    'dh': this.player.dot[k].damage[0].dh,
                    'buff': this.player.dot[k].buff
                });
                this.battle.totalDamage += this.player.dot[k].damage[0].damage;
                this.player.dot[k].damage.shift();
            }
        }
    }

    // circle伤害
    doCircle() {
        for (var k in this.player.circle) {
            if (this.player.circle[k].time > 0) {
                // 根据this.player.circle[k].damage储存的快照伤害乘以当前目标身上debuff的伤害系数
                this.log.push({
                    'time': this.setting.simulate.duration - this.battle.time,
                    'event': 'Circle Tick',
                    'name': this.player.circle[k].name,
                    'translate': this.player.circle[k].translate,
                    'damage': calculate.circleDamageCalculate(this,this.player.circle[k].damage[0].damage,this.player.circle[k].type),
                    'crit': this.player.circle[k].damage[0].crit,
                    'dh': this.player.circle[k].damage[0].dh,
                    'buff': this.player.circle[k].buff
                });
                this.battle.totalDamage += this.player.circle[k].damage[0].damage;
                this.player.circle[k].damage.shift();
            }
        }
    }

    // 团队buff判定
    isPartyBuff() {

        // 龙骑战斗祷告
        if (this.setting.simulate.partyMember.indexOf('drg') !== -1 && this.setting.job !== 'drg' && (this.setting.simulate.duration - this.battle.time) % 18000 == 300) {
            this.player.buff.battle_litany = 2000;
            this.partyBuffLog('Battle Litany', '战斗连祷', 2000);
        }
        // 龙骑肠子
        if (this.setting.simulate.partyMember.indexOf('drg') !== -1 && this.setting.job !== 'drg' && (this.setting.simulate.duration - this.battle.time) % 12000 == 400) {
            this.player.buff.dragon_sight = 2000;
            this.partyBuffLog('Dragon Sight', '龙视', 2000);
        }
        // 学者连环计
        if (this.setting.simulate.partyMember.indexOf('sch') !== -1 && this.setting.job !== 'sch' && (this.setting.simulate.duration - this.battle.time) % 12000 == 900) {
            this.player.buff.chain_strategem = 1500;
            this.partyBuffLog('Chain Strategem', '连环计', 2000);
        }
        // 学者异想的流光
        if (this.setting.simulate.partyMember.indexOf('sch') !== -1 && (this.setting.simulate.duration - this.battle.time) % 6000 == 100) {
            this.player.buff.fey_wind = 1500;
            this.partyBuffLog('Fey Wind', '异想的流光', 2000);
        }
        // 诗人战斗之声
        if (this.setting.simulate.partyMember.indexOf('brd') !== -1 && this.setting.job !== 'brd' && (this.setting.simulate.duration - this.battle.time) % 18000 == 400) {
            this.player.buff.battle_voice = 2000;
            this.partyBuffLog('Battle Voice', '战斗之声', 2000);
        }
        // 诗人魔人歌
        if (this.setting.simulate.partyMember.indexOf('brd') !== -1 && this.setting.job !== 'brd' && (this.setting.simulate.duration - this.battle.time) % 18000 == 300) {
            this.player.buff.foe_requiem = 3300;
            this.partyBuffLog('Foe Requiem', '魔人歌', 3300);
        }
        // 诗人歌曲
        if (this.setting.simulate.partyMember.indexOf('brd') !== -1) {
            this.player.buff.bard_aura = this.setting.simulate.duration;
        }
        // 忍者背刺
        if (this.setting.simulate.partyMember.indexOf('nin') !== -1 && this.setting.job !== 'nin' && (this.setting.simulate.duration - this.battle.time) % 6000 == 1100) {
            this.player.buff.trick_attack = 1500;
            this.partyBuffLog('Trick Attack', '背刺', 1500);
        }
        // 迦楼罗歪风
        if (this.setting.simulate.partyMember.indexOf('smn') !== -1 && this.setting.job !== 'smn' && (this.setting.simulate.duration - this.battle.time) % 6000 == 200) {
            this.player.buff.contagion = 1500;
            this.partyBuffLog('Contagion', '歪风', 1500);
        }
        // 召唤灵兽加护
        if (this.setting.simulate.partyMember.indexOf('smn') !== -1 && this.setting.job !== 'smn' && (this.setting.simulate.duration - this.battle.time) % 12000 == 1500) {
            this.player.buff.devotion = 1500;
            this.partyBuffLog('Devotion', '灵兽加护', 1500);
        }
        // 机工超荷
        if (this.setting.simulate.partyMember.indexOf('mch') !== -1 && this.setting.job !== 'mch' && (this.setting.simulate.duration - this.battle.time) % 12000 == 100) {
            this.player.buff.hypercharge = 2800;
            this.partyBuffLog('Hypercharge', '超荷', 2800);
        }
        // 武僧义结金兰
        if (this.setting.simulate.partyMember.indexOf('mnk') !== -1 && this.setting.job !== 'mnk' && (this.setting.simulate.duration - this.battle.time) % 9000 == 1300) {
            this.player.buff.botherhood = 1500;
            this.partyBuffLog('Botherhood', '义结金兰', 1500);
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

    // 回蓝机制
    manaRegen() {
        this.player.resource.mp = Math.min(Math.floor(this.player.resource.mp + this.setting.player.mp * 0.02),this.setting.player.mp);
        if (this.isBuff('lucid_dreaming')) {
            this.player.resource.mp = Math.min(this.player.resource.mp+960,this.setting.player.mp);
        }
        this.player.resource.tp = Math.min(1000,this.player.resource.tp + 60); // 回TP顺手也写这了
    }

    // buff检测
    isBuff(name) {
        if (typeof this.player.buff[name] !== 'undefined' && this.player.buff[name] > 0) {
            return true;
        } else {
            return false;
        }
    }

    partyBuffLog(name, translate, duration) {
        this.log.push({
            'time': this.setting.simulate.duration - this.battle.time,
            'event': 'Party Buff Apply',
            'name': name,
            'translate': translate,
            'duration': duration
        });
    }

    isEngage(){
        if (!this.player.engage) {
            this.battle.time = this.setting.simulate.duration;
        }
    }
}

module.exports = {
    'run': function (data) {

        var fight = new Fight(data);    // 建立新的战斗类
        fight.start();                  // 模拟开始
        return {
            'dps': Math.floor(fight.battle.totalDamage / (fight.setting.simulate.duration / 100)),
            'log': fight.log
        }; 

    }
};