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
            'buff': [],                       // 玩家BUFF
            'cd': [],                         // 玩家技能冷却
            'stance': [],                     // 玩家姿态
            'tick': {
                'animation': 0,               // 动作僵直
                'gcd': 0,                     // 公共冷却
                'cast': 0                     // 读条
            },
        };
        // 战斗参数，实时修改
        this.battle = {
            'opener': data.opener,            // 开场队列
            'time': data.simulate.duration,   // 战斗计时
            'engage': false,                  // 战斗开始
            'tick': 1500,                     // 服务器tick
            'log': []                         // 战斗记录
        };
        // 统计参数，不会修改
        this.statistic = {
            'skill': [],                      // 技能顺序
            'damage': [],                     // 技能伤害
            'dps': 0                          // dps
        };
        // 配置文件
        this.rotation = require(this.initRotation(data.job));
    }

    start() {
        /*
        while (this.battle.time > 0) {
            console.log(this.battle.time);
            this.battle.time -= 1;
        }
        */
        this.player = test(this.player);
        console.log(this.player.cast);
    }

    initRotation(job) {
        return './rotation/' + job + '.js';
    }

}

function test(player) {
    player.cast = 10000;
    return player;
}
module.exports = {
    'run': function (data) {
        var fight = new Fight(data);    // 建立新的战斗模型
        fight.start();                  // 模拟开始
    }
};