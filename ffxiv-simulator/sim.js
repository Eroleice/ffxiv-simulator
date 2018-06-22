class Fight {

    constructor(data) {
        // 模拟参数，不会修改
        this.setting = {
            'player': data.status,
            'simulate': data.simulate
        };
        // 玩家参数，实时修改
        this.player = {
            'status': data.status,            // 玩家属性
            'source': {
                'mp': data.status.mp,         // 玩家MP
                'tp': 1000,                   // 玩家TP
                'specialSource1': 0,          // 职业资源1
                'specialSource2': 0           // 职业资源2
            },
            'buff': [],                       // 玩家buff && 目标debuff
            'dot': [],                        // 玩家dot
            'cd': [],                         // 玩家技能冷却
            'stance': [],                     // 玩家姿态
            'tick': {
                'animation': 0,               // 动作僵直
                'gcd': 0,                     // 公共冷却
                'cast': 0,                    // 读条
                'aa': 0                       // 普攻间隔
            },
            'engage': false                   // 进入战斗状态
        };
        // 战斗参数，实时修改
        this.battle = {
            'opener': data.opener,            // 开场队列
            'time': data.simulate.duration,   // 战斗计时
            'tick': 150,                      // 服务器tick
            'log': []                         // 战斗记录
        };
        // 统计参数，不会修改
        this.statistic = [];
        // 配置文件
        this.rotation = require(this.initRotation(data.job));
    }

    start() {

        while (this.battle.time > 0) {

            // 如果玩家不在读条&&不在动作僵直，进入判定
            if (this.player.tick.cast <= 0 && this.player.tick.animation <= 0) {


     
            }

            tick(); // 所有时间结算，进入下一次循环验算
        }

    }

    // 读取输出循环配置文件
    initRotation(job) {
        return './rotation/' + job + '.js';
    }

    // 所有时间-1毫秒
    tick() {
        this.battle.tick -= 1;
        this.battle.time -= 1;
        this.allTick(this.player.tick);
        this.allTick(this.player.buff);
        this.allTick(this.player.debuff);
        this.allTick(this.player.cd);
    }

    allTick(arr) {
        for (var k in arr) {
            arr[k] -= 1;
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
}

module.exports = {
    'run': function (data) {
        var fight = new Fight(data);    // 建立新的战斗模型
        fight.start();                  // 模拟开始
    }
};