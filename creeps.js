/**
 * Creeps package.
 */

/** Defines the set of instructions that make up the 'harvest' action. */
function harvest(creep) {
    var sources = creep.room.find(FIND_SOURCES);
    if (sources.length < 1) {
        // Room contains no sources, cannot harvest.
        return;
    }
    
    var nearest = sources[0];
    var status = creep.harvest(nearest);
    if (status == ERR_NOT_IN_RANGE) {
        creep.moveTo(nearest, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
}

/** Defines the set of instructions that make up the 'transfer' action. */
function transfer(creep) {
    let isValidStructure = (structure) => {
        return structure instanceof StructureSpawn && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    };
    var structures = creep.room.find(FIND_STRUCTURES, { filter: isValidStructure });
    if (structures.length < 1) {
        // Room contains no structures, cannot transfer.
        return;
    }
    
    var nearest = structures[0];
    if(creep.transfer(nearest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(nearest, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}

/** Defines the set of instructions that make up the 'transfer' action. */
function upgrade(creep) {
    var status = creep.upgradeController(creep.room.controller);
    if (status == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}


var creeps = {
    /** Defines workflows associated with each valid harvester role. */
    roles: {
        /** Harvester role.*/
        harvester: function(creep) {
            if (creep.store.getFreeCapacity() > 0) {
                // Creep has free capacity, should harvest.
                harvest(creep);
            } else {
                transfer(creep);
            }
        },
        
        /** Upgrader role. */
        upgrader: function(creep) {
            let setState = function() {
                if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                    // Creep has run out of energy, should harvest.
                    creep.memory.upgrading = false;
                }
                if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
                    // Creep is full of energy, should upgrade.
                    creep.memory.upgrading = true;
                }
            }
            setState();
    
            if (creep.memory.upgrading) {
                upgrade(creep);
            } else {
                harvest(creep);
            }
        }
    },

    /** Defines creeps core lifecycle callbacks. */
    lifecycle: {
        /**
         * Called when a creep dies.
         * 
         * @param {string} name
         */
        onDeath: function(name) {
            console.log("Cleaning up dead creep: " + name);
            delete Memory.creeps[name];
        }
    }
};

module.exports = creeps;
