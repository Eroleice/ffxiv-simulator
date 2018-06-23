const deepcopy = require('deepcopy');

class Fight {

    constructor(data) {
        // 模拟参数，不会修改
        this.setting = {
            'player': deepcopy(data.status),
            'simulate': deepcopy(data.simulate)
        };
        // 玩家参数，实时修改
        this.player = {
            'status': deepcopy(data.status),                     // 玩家属性
            'source': {
                'mp': deepcopy(data.status.mp),                  // 玩家MP
                'tp': 1000,                                      // 玩家TP
                'specialSource1': 0,                             // 职业资源1
                'specialSource2': 0                              // 职业资源2
            },
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
            'engage': false                                      // 进入战斗状态
        };
        // 战斗参数，实时修改
        this.battle = {
            'opener': deepcopy(data.opener),                     // 开场队列
            'time': deepcopy(data.simulate.duration),            // 战斗计时
            'log': []                                            // 战斗记录
        };
        // 统计参数，不会修改
        this.statistic = [];
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

            // 如果玩家不在读条&&不在动作僵直，进入判定
            if (this.player.tick.cast <= 0 && this.player.tick.animation <= 0) {

                this.update(this.rotation.logic(this));
     
            }

            // 如果有DOT就结算
            if (this.battle.time % 300 == 150) {
                this.dotHit();
            }

            this.tick(); // 所有时间结算，进入下一次循环验算
            
        }

    }

    // 更新class
    update(data) {

        this.player = data.player;
        this.battle = data.battle;
        this.statistic = data.statistic;

    }

    // 所有时间-1毫秒
    tick() {
        this.battle.tick -= 1;
        this.battle.time -= 1;
        this.allTick(this.player.tick);
        this.allTick(this.player.buff);
        this.allDotTick(this.player.dot);
        this.allTick(this.player.cd);
    }

    allTick(arr) {
        for (var k in arr) {
            arr[k] -= 1;
        }
    }

    allDotTick(arr) {
        for (var k in arr) {
            arr[k].duration -= 1;
        }
    }

    // 更新class
    updateFight(data) {
        this.player = data.player;
        this.battle = data.battle;
        this.statistic = data.statistic;
    }

    // 输出循环判定
    doRotation(data) {
        this.updateFight(this.rotation.logic(data));
    }

    // dot伤害
    dotHit() {
        for (var k in this.player.dot) {
            if (this.player.dot[k].duration > 0) {

                this.updateFight(this.jobSkill.dot(this, k, this.player.dot[k].damageBase));

            }
            
        }
    }
}

module.exports = {
    'run': function (data) {
        var fight = new Fight(data);    // 建立新的战斗类
        fight.start();                  // 模拟开始
        return fight.statistic;

    }
};