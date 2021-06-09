/**
 * Spawns package.
 */
var spawns = {
    /** Returns the player's assigned CPU limit for the current shard. */
    spawn: function(spawn, type) {
        // TODO: Introduce creep types.
        const name = 'Creep' + Game.time;
        var status = spawn.spawnCreep([WORK, CARRY, MOVE], name);
        switch(status) {
            case OK:
                console.log('Spawning creep ' + name + '.');
                break;
            
            case ERR_BUSY:
                // Spawning in progress.
                break;
                
            case ERR_NOT_ENOUGH_ENERGY:
                console.log('Spawn creep failed -- not enough energy.');
                // Fall through.
            default:
        }
    },
};

module.exports = spawns;
