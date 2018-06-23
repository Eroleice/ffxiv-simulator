module.exports = {

    'init': function (data) {

        // DOT池初始化
        data.dot.combust_II = {
            'duration': 0,
            'damageBase': 0
        };

        // buff初始化
        data.buff.potion = 0;
        data.buff.cleric_stance = 0;

        // cd初始化
        data.cd.potion = 0;
        data.cd.cleric_stance = 0;

        return data;

    }

};