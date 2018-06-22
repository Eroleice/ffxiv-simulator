const skill = require('../skill/ast.js');
var skill_list = ['Malefic III','Combust II'];

/**
 * 以下内容为循环判定，请参考文档进行修改：
 * */

module.exports = {
    'logic': function (data) {

        // 将fight类同步至skill类
        var action = skill.action(data);

        /* opener处理 */

        if (typeof action.battle.opener[0] !== 'undefined') {

            if (skill_list.indexOf(action.battle.opener[0]) !== -1) {

                /* 准备使用技能 */
                if (action.player.tick.gcd <= 0 && action.player.tick.animation <= 0 && action.player.tick.cast <= 0) {

                    var name = action.battle.opener[0];
                    action.battle.opener.shift();
                    if (name == 'Malefic III') {
                        action.malefic_III();
                    } else if (name == 'Combust II') {
                        action.combust_II();
                    }

                }

            } else {

                /* 准备使用能力技 */
                if (action.player.tick.animation <= 0 && action.player.tick.cast <= 0) {

                    var name = action.battle.opener[0];
                    action.battle.opener.shift();
                    if (name == 'Potion') {
                        action.potion();
                    } else if (name == 'Cleric Stance') {
                        action.cleric_stance();
                    }

                }

            }

        } else {

            /* opener处理结束 */

            //在skill类内进行处理
            if (action.player.tick.gcd <= 0) {

                /* GCD技能循环逻辑 */
                if (action.player.dot.combust_II.duration < 100 && action.battle.time > 1500) {
                    action.combust_II();
                } else {
                    action.malefic_III();
                }

            } else if (action.player.tick.gcd > 0.67) {

                /* 能力技循环逻辑 */
                if (action.player.cd.potion <= 0) {
                    action.potion();
                } else if (action.player.cd.cleric_stance <= 0) {
                    action.cleric_stance();
                }

            }

        }

        return action;
    }
};