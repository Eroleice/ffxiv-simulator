module.exports = {

    set: function () {

        var job = 'mnk';		        // 职业

        var status = {
            'wd': 102,			        // 武器性能
            'aa_delay': 2.56,           // 武器自动攻击间隔
            'ap': 2637,		        	// 攻击力or魔法攻击力
            'crt': 2321,	          	// 暴击率
            'det': 983, 		        // 信念
            'ss': 1159,		        	// 技能速度or咏唱速度
            'dh': 2026,		        	// 直击
            'ten': 364,		        	// 韧性
            'mp': 5160                  // 蓝量
        };

        var simulate = {
            duration: 18000,	        // 模拟木桩时间，单位10毫秒 (秒数x100)
            times: 1000,	    	    // 模拟次数
            expectMode: false,	        // 期望值模式
            battleLog: true,	        // 输出战斗记录，开启情况下只能进行单次模拟
            partyBuff: false,           // 团队辅助buff
            partyMember: ['brd','mch','nin','drg','smn'],     // 队伍内其他职业构成
            autoAttack: true,           // 自动攻击
            pet: false                  // 宠物 (如果职业没有宠物请填写false，否则会报错)
        };

        /* 占星 */
        // var opener = ['战姿', '爆发药', '灾星', '祸星'];
        /* 白魔 */
        // var opener = ['战姿', '神速咏唱', '爆发药', '暴风', '烈风'];
        /* 学者 */
        // var opener = ['爆发药','战姿','瘴气','猛毒菌','能量吸收','瘴疠','能量吸收','瘴疠','连环计','暗影核爆','瘴疠','能量吸收','以太超流','魔炎法','能量吸收','魔炎法','魔炎法','瘴疠','能量吸收'];
        /* 武僧 */
        var opener = ['破碎拳', '疾风体势','罗刹冲', '双龙脚', '罗刹冲', '红莲极意', '双掌打', '爆发药', '崩拳', '内劲', '阴阳斗气斩', '连击', '义结金兰', '正拳', '苍气炮', '空鸣拳', '破碎拳', '铁山靠', '双龙脚', '双掌打', '斗魂旋风脚', '崩拳', '震脚', '崩拳', '崩拳', '双龙脚', '双掌打', '斗魂旋风脚', '破碎拳', '疾风体势', '罗刹冲', '连击', '罗刹冲','红莲体势'];

        simulate.times = (simulate.battleLog) ? 1 : simulate.times;  // 输出战斗记录时仅进行单次模拟

        return {
            'job': job,
            'status': status,
            'simulate': simulate,
            'opener': opener
        };

    }

}