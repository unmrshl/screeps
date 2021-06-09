/** Main script. */
var core = require('core');
var creeps = require('creeps');
var spawns = require('spawns');

module.exports.loop = function() {
    var home = Game.spawns['Spawn1'];
    if (core.props.cpuRemaining() > 0
            && home.store[RESOURCE_ENERGY] > 0
            // TODO: Make creep limit smart.
            && Game.creeps.length < 30) {
        spawns.spawn(home, 'NONE');
    }
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (!creep) {
            // Creep is dead, should cleanup.
            creeps.lifecycle.onDeath(name);
            continue;
        }
        
        creeps.roles.harvester(creep);
        
        // // TODO: Assign creep roles.
        // if (creep.memory.role == 'upgrader') {
        //     creeps.roles.upgrader(creep);
        //     continue;
        // } else {
        //     creeps.roles.harvester(creep);
        // }
    }
};
