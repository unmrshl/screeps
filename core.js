/**
 * Core package.
 */
var core = {
    /** Defines core properties and capabilities associated with the player. */
    props: {
        /** Returns the player's assigned CPU limit for the current shard. */
        cpuLimit: function() {
             return Game.cpu.limit;
        },
        
        /** Returns the player's accumulated unused CPU.  */
        cpuRemaining: function() {
            return Game.cpu.bucket;
        }
    },
};

module.exports = core;
