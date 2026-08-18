function applyEffect(
    state,
    effect
) {

    if (!effect) {
        return state;
    }


    const newCombatLog =
        [
            ...(state.combatLog || [])
        ];


    if (effect.type) {

        newCombatLog.push(
            "Применён эффект: " +
            effect.type
        );

    }


    return {

        ...state,

        combatLog:
            newCombatLog

    };

}


function calculateStrengthPower(
    baseStrength,
    modifier
) {

    const strength =
        Number(baseStrength) || 0;


    const multiplier =
        Number(modifier) || 1;


    return Math.round(
        strength *
        multiplier
    );

}


window.applyEffect =
applyEffect;


window.calculateStrengthPower =
calculateStrengthPower;
