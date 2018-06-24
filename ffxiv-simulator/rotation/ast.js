/**
 * 以下内容为循环判定，请参考文档进行修改：
 * */

module.exports = {

    'whichSkill': function (data) {

        /* 技能循环优先级逻辑 */
        if (data.player.dot.combust_ii.time <= 170 && data.battle.time >= 1500) {
            return 'combust_ii';
        } else {
            return 'malefic_iii';
        }

    },

    'whichAbility': function (data) {

        /* 能力技循环优先级逻辑 */
        if (data.player.cd.potion <= 0) {
            return 'potion';
        } else if (data.player.cd.cleric_stance <= 0) {
            return 'cleric_stance';
        } else if (data.player.cd.lucid_dreaming <= 0 && data.player.resource.mp <= data.setting.player.mp * 0.9) {
            return 'lucid_dreaming';
        } else {
            return 'snooze';
        }

    }
};