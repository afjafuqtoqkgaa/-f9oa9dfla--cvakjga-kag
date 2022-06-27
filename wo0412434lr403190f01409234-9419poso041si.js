class Utils
{
    getRootElement      = null; // args: void
    getRootObject       = null; // args: void
    getRenderElement    = null; // args: void
    getRandomArbitrary  = null; // args: void

    isNotOpenChat       = null; // args: void
    isParkourMode       = null; // args: void
    isNotKillZone       = null; // args: 1 - world, 2 - position {x, y, z}
    isGameReady         = null; // args: void

    errorLog            = null; // args: 1 - text
}

utilsObjects =
{
    rootElement: null,
    rootObject: null
}

// utils.c.js

Utils.getRootElement = function ()
{
    if (utilsObjects.rootElement)
    {
        return utilsObjects.rootElement;
    }

    return utilsObjects.rootElement = document.getElementById("root")._reactRootContainer;
}

Utils.getRootObject = function ()
{
    if (utilsObjects.rootObject)
    {
        return utilsObjects.rootObject;
    }

    if (!this.getRootElement().hasOwnProperty("_internalRoot"))
    {
        return null;
    }

    return utilsObjects.rootObject = this.getRootElement()._internalRoot.current.memoizedState.
        element.type.prototype;
}

Utils.getRenderElement = function ()
{
    return document.getElementsByClassName("sc-bwzfXH hjlOfi").item(0);
}

Utils.getRandomArbitrary = function (min, max)
{
    return Math.random() * (max - min) + min;
}

Utils.isNotOpenChat = function ()
{
    return (document.getElementsByClassName("sc-bwzfXH iokmvL").item(0) == null);
}

Utils.isParkourMode = function ()
{
    let rootObject = this.getRootObject();

    if (!rootObject)
        return false;

    return rootObject.store.state.battleStatistics.isParkourMode;
}

Utils.isNotKillZone = function (world, position)
{
    if (!this.isParkourMode())
    {
        return true;
    }

    if (!world)
        return false;

    let bounds = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(0).bounds;

    if (!bounds)
        return false;

    if (position.x != 0 && (position.x >= bounds.maxX || position.x <= bounds.minX))
        return false;

    if (position.y != 0 && (position.y >= bounds.maxY || position.y <= bounds.minY))
        return false;

    return true;

    if (position.z != 0 && (position.z >= bounds.maxZ || position.z <= bounds.minZ))
        return false;

    return true;
}

Utils.isGameReady = function ()
{
    let renderElement = this.getRenderElement();

    if (!renderElement)
        return false;

    let rootObject = this.getRootObject();

    if (!rootObject)
        return false;

    return rootObject.store.state.battleStatistics.battleLoaded;
}

Utils.errorLog = function (text)
{
    console.log("[Assistant] " + text);
}

// gameObjects.h.js

class GameObjects
{
    // World
    getWorld                = null; // args: void
    getGameActions          = null; // args: void
    getMines                = null; // args: void

    // Tank
    getLocalPlayer          = null; // args: void
    getPhysicsComponent     = null; // args: void
    getHealthComponent      = null; // args: void
    getCamera               = null; // args: void

    // Weapon
    getStrikerComponent     = null; // args: void
}

gameObjects =
{
    localPlayer: null,
    world: null,
    gameActions: null,
    mines: null,
    physicsComponent: null,
    healthComponent: null,
    camera: null,
    strikerComponent: null
}

// gameObjects.c.js

GameObjects.getWorld = function ()
{
    if (gameObjects.world)
    {
        return gameObjects.world;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    return gameObjects.world = localPlayer.at(0).world;
}

GameObjects.getGameActions = function ()
{
    if (gameObjects.gameActions)
    {
        return gameObjects.gameActions;
    }

    let world = this.getWorld();

    if (!world)
    {
        return null;
    }

    return gameObjects.gameActions = Array.from(world.inputManager.input.gameActions_0.map);
}

GameObjects.getMines = function ()
{
    if (gameObjects.mines)
    {
        return gameObjects.mines;
    }

    let world = this.getWorld();

    if (!world)
    {
        return null;
    }

    return gameObjects.mines = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(15);
}

GameObjects.getLocalPlayer = function ()
{
    if (gameObjects.localPlayer)
    {
        return gameObjects.localPlayer;
    }

    let rootObject = Utils.getRootObject();

    if (!rootObject)
    {
        console.log("!rootObject");
        return null;
    }

    let subs = rootObject.store.subscribers.array_hd7ov6$_0;

    if (!subs)
    {
        console.log("!subs");
        return null;
    }

    for (let i = 0; i < subs.length; i++)
    {
        if (subs.at(i).hasOwnProperty("tank"))
        {
            return gameObjects.localPlayer = subs.at(i).tank.components_0.array;
        }
    }

    return null;
}

GameObjects.getPhysicsComponent = function ()
{
    if (gameObjects.physicsComponent)
    {
        return gameObjects.physicsComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("tankPhysicsComponent_tczrao$_0"))
            return gameObjects.physicsComponent = localPlayer.at(i).tankPhysicsComponent_tczrao$_0;
    }

    return null;
}

// ПЕРЕДЕЛАТЬ
GameObjects.getHealthComponent = function ()
{
    if (gameObjects.healthComponent)
    {
        return gameObjects.healthComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    return gameObjects.healthComponent = localPlayer.at(1);
}

GameObjects.getCamera = function ()
{
    if (gameObjects.camera)
    {
        return gameObjects.camera;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("followCamera_w8ai3w$_0"))
            return gameObjects.camera = localPlayer.at(i).followCamera_0.currState_0;
    }

    return null;
}

GameObjects.getStrikerComponent = function ()
{
    if (gameObjects.strikerComponent)
    {
        return gameObjects.strikerComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("strikerWeapon_jjsiik$_0"))
            return gameObjects.strikerComponent = localPlayer.at(i).strikerWeapon_jjsiik$_0;
    }

    return null;
}

// airBreak.h.js

class AirBreak
{
    process = null; // args: 1 - localPlayer
}

const airBreak =
{
    isShiftPressed: false,
    antiAim: false,
    state: false,
    speed: 50,
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 }
}

// airBreak.c.js

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 16 && e.location == 2 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        airBreak.isShiftPressed = true;
    }
})

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 74 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        airBreak.antiAim = !airBreak.antiAim;
    }
})

AirBreak.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let physicsComponent = GameObjects.getPhysicsComponent();

    if (!physicsComponent)
    {
        return;
    }

    let camera = GameObjects.getCamera();

    if (!camera)
    {
        return;
    }

    let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

    if (!bodies)
    {
        return;
    }

    if (airBreak.isShiftPressed)
    {
        airBreak.isShiftPressed = false;

        airBreak.state = !airBreak.state;

        if (airBreak.state)
        {
            airBreak.position.x = physicsComponent.body.state.position.x;
            airBreak.position.y = physicsComponent.body.state.position.y;
            airBreak.position.z = physicsComponent.body.state.position.z;

            airBreak.velocity.x = 0;
            airBreak.velocity.y = 0;
            airBreak.velocity.z = 0;
        }
        else
        {
            physicsComponent.body.state.velocity.x = 0;
            physicsComponent.body.state.velocity.y = 0;
            physicsComponent.body.state.velocity.z = 0;

            physicsComponent.body.state.angularVelocity.x = 0;
            physicsComponent.body.state.angularVelocity.y = 0;
            physicsComponent.body.state.angularVelocity.z = 0;

            for (let i = 0; i < bodies.length; i++)
            {
                bodies.at(i).movable = true;
            }
        }
    }

    if (!airBreak.state)
        return;

    let direction = camera.direction;

    airBreak.velocity.x = 0;
    airBreak.velocity.y = 0;

    if (KeyPressing.isKeyPressed(87 /*key: W*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x + airBreak.speed * Math.sin(-direction),
            y: airBreak.position.y + airBreak.speed * Math.cos(-direction),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x += physicsComponent.body.maxSpeedXY * Math.sin(-direction);
            airBreak.velocity.y += physicsComponent.body.maxSpeedXY * Math.cos(-direction);
        }
    }

    if (KeyPressing.isKeyPressed(83 /*key: S*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x - airBreak.speed * Math.sin(-direction),
            y: airBreak.position.y - airBreak.speed * Math.cos(-direction),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x -= physicsComponent.body.maxSpeedXY * Math.sin(-direction);
            airBreak.velocity.y -= physicsComponent.body.maxSpeedXY * Math.cos(-direction);
        }
    }

    if (KeyPressing.isKeyPressed(65 /*key: A*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x - airBreak.speed * Math.sin(-(direction - Math.PI / 2)),
            y: airBreak.position.y - airBreak.speed * Math.cos(-(direction - Math.PI / 2)),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x -= physicsComponent.body.maxSpeedXY * Math.sin(-(direction - Math.PI / 2));
            airBreak.velocity.y -= physicsComponent.body.maxSpeedXY * Math.cos(-(direction - Math.PI / 2));
        }
    }

    if (KeyPressing.isKeyPressed(68 /*key: D*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x + airBreak.speed * Math.sin(-(direction - Math.PI / 2)),
            y: airBreak.position.y + airBreak.speed * Math.cos(-(direction - Math.PI / 2)),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x += physicsComponent.body.maxSpeedXY * Math.sin(-(direction - Math.PI / 2));
            airBreak.velocity.y += physicsComponent.body.maxSpeedXY * Math.cos(-(direction - Math.PI / 2));
        }
    }

    if (KeyPressing.isKeyPressed(81 /*key: Q*/) && Utils.isNotOpenChat())
    {
        airBreak.position.z += airBreak.speed;
    }

    if (KeyPressing.isKeyPressed(69 /*key: E*/) && Utils.isNotOpenChat())
    {
        airBreak.position.z -= airBreak.speed;
    }

    if (KeyPressing.isKeyPressed(37 /*key: LEFT*/) && Utils.isNotOpenChat())
    {
        if (airBreak.speed > 1)
            airBreak.speed -= 2;
    }

    if (KeyPressing.isKeyPressed(39 /*key: RIGHT*/) && Utils.isNotOpenChat())
    {
        airBreak.speed += 2;
    }
if(airBreak.speed >= 200){
airBreak.speed = 200
}
    if (Utils.isParkourMode())
    {
        for (let i = 0; i < bodies.length; i++)
        {
            bodies.at(i).movable = false;
        }

        if (airBreak.antiAim)
        {
            let bounds = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(0).bounds;

            physicsComponent.interpolatedPosition.x = Utils.getRandomArbitrary(bounds.minX, bounds.maxX);
            physicsComponent.interpolatedPosition.y = Utils.getRandomArbitrary(bounds.minY, bounds.maxY);
            physicsComponent.interpolatedPosition.z = Utils.getRandomArbitrary(bounds.maxZ + 500, bounds.maxZ + 500);
        }

        physicsComponent.body.state.position.x = airBreak.position.x;
        physicsComponent.body.state.position.y = airBreak.position.y;
    }
    else
    {
        physicsComponent.body.state.velocity.x = airBreak.velocity.x;
        physicsComponent.body.state.velocity.y = airBreak.velocity.y;
    }

    physicsComponent.body.state.position.z = airBreak.position.z;
    physicsComponent.body.state.velocity.z = airBreak.velocity.z;

    physicsComponent.body.state.orientation.w = Math.sin(-(camera.direction - Math.PI) / 2);
    physicsComponent.body.state.orientation.z = Math.cos(-(camera.direction - Math.PI) / 2);
    physicsComponent.body.state.orientation.x = 0;
    physicsComponent.body.state.orientation.y = 0;

    physicsComponent.body.state.angularVelocity.x = 0;
    physicsComponent.body.state.angularVelocity.y = 0;
    physicsComponent.body.state.angularVelocity.z = 0;
}


// striket.h.js

class Striker
{
    init = null; // args: 1 - localPlayer
    process = null; // args: 1 - localPlayer
}

// striker.c.js

let shellCache = null;
let state = false;
let salvoRocketsCount = 8;
let targetId;
let strikerHack = false
let aimBot = false

Striker.init = function (localPlayer)
{
    if(aimBot)
    {
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }


    let targetingSystem = striker.targetingSystem_0.targetingSystem_vutpoz$_0;

    if (!targetingSystem)
    {
        targetingSystem = striker.targetingSystem_0.targetingSystem_0;
    }

    let targetingSectorsCalculator = targetingSystem.directionCalculator_0.targetingSectorsCalculator_0;

    targetingSectorsCalculator.maxElevationAngle_0 = 100000;
    targetingSectorsCalculator.minElevationAngle_0 = -100000;

    salvoRocketsCount = striker.salvoRocketsCount;

    striker.__proto__.lockTarget_gcez93$ = function (t, e, n)
    {

        this.lockTarget_gcez93$$default(t, e);
        targetId = t.targetId;
        return true;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("shellCache_0"))
        {
            shellCache = localPlayer.at(i).shellCache_0.itemsInUse_123ot1$_0.array_hd7ov6$_0;
            break;
                }
}
                    }
    }

Striker.hack = function(localPlayer)
{
    if(!aimBot)
    {

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }


    let targetingSystem = striker.targetingSystem_0.targetingSystem_vutpoz$_0;

    if (!targetingSystem)
    {
        targetingSystem = striker.targetingSystem_0.targetingSystem_0;
    }

    let targetingSectorsCalculator = targetingSystem.directionCalculator_0.targetingSectorsCalculator_0;

    targetingSectorsCalculator.maxElevationAngle_0 = 0.9;
    targetingSectorsCalculator.minElevationAngle_0 = -0.5;

    salvoRocketsCount = striker.salvoRocketsCount;

    striker.__proto__.lockTarget_gcez93$ = function(t,e,n){return void 0===e&&(e=null),n?n(t,e):this.lockTarget_gcez93$$default(t,e)}


    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("shellCache_0"))
        {
            shellCache = localPlayer.at(i).shellCache_0.itemsInUse_123ot1$_0.array_hd7ov6$_0;
            break;

}
    }
    }
}


document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 100 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        aimBot = !aimBot;
    }
})



Striker.process = function (localPlayer)
{
    if(strikerHack)
    {
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    if (KeyPressing.isKeyPressed(82 /*key: R*/) && Utils.isNotOpenChat())
    {
        striker.explodeRockets();
    }

    if (shellCache)
    {
        if (shellCache.length == salvoRocketsCount)
        {
            setTimeout(() => { state = true; }, 500);
        }

        let targetPos = { x: 0, y: 0, z: 0 };

        if (targetId)
        {
            let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

            for (let i = 0; i < bodies.length; i++)
            {
                if (bodies.at(i).data.components_0.array.at(4).userId == targetId)
                {
                    if (bodies.at(i).state.position)
                    {
                        targetPos = bodies.at(i).state.position;
                        break;
                    }
                }
            }
        }

        if (state)
        {
            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).direction.x = 0;
                shellCache.at(i).components_0.array.at(1).direction.y = 0;
                shellCache.at(i).components_0.array.at(1).direction.z = 0;

                if (targetPos)
                {
                    shellCache.at(i).components_0.array.at(1).position.x = targetPos.x;
                    shellCache.at(i).components_0.array.at(1).position.y = targetPos.y;
                    shellCache.at(i).components_0.array.at(1).position.z = targetPos.z;
                }
            }

            if (shellCache.length == 0)
            {
                state = false;
            }
        }
        else
        {
            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).direction.x = 0;
                shellCache.at(i).components_0.array.at(1).direction.y = 0;
                shellCache.at(i).components_0.array.at(1).direction.z = 0;
            }
        }
    }
}
}
        if(!strikerHack)
        {
clearTimeout()
        }

    document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 101 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
         strikerHack = !strikerHack;
    }
})

// removeMines.h.js

class RemoveMines
{
    process = null; // args: 1 - localPlayer
}

// removeMines.c.js

let removeMines = false

RemoveMines.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let mines = GameObjects.getMines();

    if (!mines)
    {
        return;
    }
    if(removeMines) {

    var n;
    for (n = mines.minesByUser_0.keys.iterator(); n.hasNext();)
    {
        var o = n.next();
        mines.removeAllMines_0(o)
    }
    }
    else return
}


document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 102 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        removeMines = !removeMines;
    }
})


// wallHack.h.js

class WallHack
{
    process = null; // args: 1 - localPlayer
}

// wallHack.c.js

colorEnemy = 14155776;


function drawEsp(player, color)
{
    let weaponSkin = player.at(7).weaponSkin_3qscef$_0.root_s4vp75$_0;
    let weaponChildren = weaponSkin.children_ich852$_0.array;

    let hullSkin = player.at(7).weaponSkin_3qscef$_0.hullSkinComponent_p2c7jk$_0.hull_tmiccz$_0;
    let hullChildren = hullSkin.children_ich852$_0.array;

    weaponSkin.outlined = true;
    weaponSkin.outlineBold = false;
    weaponSkin.outlineColor = color;

    hullSkin.outlined = true;
    hullSkin.outlineBold = false;
    hullSkin.outlineColor = color;

    for (let i = 0; i < weaponChildren.length; i++)
    {
        weaponChildren.at(i).outlined = true;
        weaponChildren.at(i).outlineBold = false;
        weaponChildren.at(i).outlineColor = color;
    }

    for (let i = 0; i < hullChildren.length; i++)
    {
        hullChildren.at(i).outlined = true;
        hullChildren.at(i).outlineBold = false;
        hullChildren.at(i).outlineColor = color;
    }
}

WallHack.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

    for (let i = 0; i < bodies.length; i++)
    {
        if (bodies.at(i).data.components_0.array.at(0).hasOwnProperty("team_1h5i78$_0") &&
        bodies.at(i).data.components_0.array.at(0).team_1h5i78$_0.hasOwnProperty("name$"))
        {
            if ((localPlayer.at(0).team_1h5i78$_0.name$ !=
            bodies.at(i).data.components_0.array.at(0).team_1h5i78$_0.name$) ||
            localPlayer.at(0).team_1h5i78$_0.name$ == "NONE")
            {
                let color = colorEnemy;

                drawEsp(bodies.at(i).data.components_0.array, color);
            }
        }
    }
}

// clicker.h.js

class Clicker
{
    process = null; // args: 1 - localPlayer
}

// clicker.c.js

let autoMining = false

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 35 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        autoMining = !autoMining;
    }
})


class commons{
getRoot = null
getReactRoot = null
getChatState = null
searchObject = null
}


class game{
getTankPhysics = null
getTank = null
getWorld = null
getLaser = null
getMines = null
getFlags = null
getPlayers = null
getMapBoundary = null
getBattleState = null
getSupplies = null
getHealth = null
getStriker = null
getCamera = null
}

game.getSupplies = function(supply){
try {
for(key in game.getTank().components_0.array[27].supplyTypeConfigs_0.entries.$outer.map_97q5dv$_0.internalMap_uxhen5$_0.backingMap_0){
if(game.getTank().components_0.array[27].supplyTypeConfigs_0.entries.$outer.map_97q5dv$_0.internalMap_uxhen5$_0.backingMap_0[key].key_5xhq3d$_0.name$ == supply){
return key
}


}
} catch (error) {

}


}

function getSupplyArrays(){
try {
window.mines = game.getSupplies("MINE")
window.repairs = game.getSupplies("FIRST_AID")
window.DA = game.getSupplies("DOUBLE_ARMOR")
window.DD = game.getSupplies("DOUBLE_DAMAGE")
window.NITRO = game.getSupplies("NITRO")

} catch (error) {

}
}

supps = setInterval(getSupplyArrays,500)


Clicker.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let gameActions = GameObjects.getGameActions();

    if (!gameActions)
    {
        return;
    }

    let healthComponent = GameObjects.getHealthComponent();

    if (!healthComponent)
    {
        return;
    }

    if (Utils.isParkourMode() && !healthComponent.isFullHealth() && healthComponent.alive)
    {
game.getTank().components_0.array[27].supplyTypeConfigs_0.entries.$outer.map_97q5dv$_0.internalMap_uxhen5$_0.backingMap_0[mines]._value_0._value_0.onUserActivatedSupply()
game.getTank().components_0.array[27].supplyTypeConfigs_0.entries.$outer.map_97q5dv$_0.internalMap_uxhen5$_0.backingMap_0[repairs]._value_0._value_0.onUserActivatedSupply()

        world.frameStartTime_0 += 5000000;

        world.inputManager.input.processActions_0();

        world.frameStartTime_0 -= 5000000;
    }

    gameActions.at(6).at(1).wasPressed = true;
    gameActions.at(6).at(1).wasReleased = true;

    gameActions.at(7).at(1).wasPressed = true;
    gameActions.at(7).at(1).wasReleased = true;

    gameActions.at(8).at(1).wasPressed = true;
    gameActions.at(8).at(1).wasReleased = true;

    if (autoMining)
    {
game.getTank().components_0.array[27].supplyTypeConfigs_0.entries.$outer.map_97q5dv$_0.internalMap_uxhen5$_0.backingMap_0[mines]._value_0._value_0.onUserActivatedSupply()
game.getTank().components_0.array[27].supplyTypeConfigs_0.entries.$outer.map_97q5dv$_0.internalMap_uxhen5$_0.backingMap_0[repairs]._value_0._value_0.onUserActivatedSupply()
    }
}




class hacks{

noLaser = null

}






commons.searchObject = function(object,item){
try {
for(let i=0; i<object.length;i++){
if(object[i].hasOwnProperty(item))
return object[i]

}
} catch (error) {

}
}
commons.getRoot = function(){
root = document.querySelector("#root")
return root
}

commons.getReactRoot = function(){
return root._reactRootContainer._internalRoot.current.memoizedState.element.type.prototype.store.subscribers.array_hd7ov6$_0

}


game.getTank = function(){
return commons.searchObject(commons.getReactRoot(),"tank").tank

}

game.getLaser = function(){

return commons.searchObject(game.getTank().components_0.array,"laserDirectionMessage_0")

}



hacks.noLaser = function(){
try {
game.getLaser().turnOffLaser_0()

} catch (error) {

}

}

let pressCount = 0
document.addEventListener('keydown', (e) => { if (e.keyCode === 103){
pressCount ++
if(pressCount%2==1){
window.p = setInterval(hacks.noLaser,20)


}

if(pressCount%2==0){

clearInterval(window.p)

}







}})


class RapidUpdate
{
process = null
}

let rapid = false

RapidUpdate.process = function(localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }
    if(rapid)
    {
    try {
   game.getTank().components_0.array[37].needImmediateUpdate_0 = true
} catch (error) {

 }}

if(!rapid)
{
        try {
   game.getTank().components_0.array[37].needImmediateUpdate_0 = false
} catch (error) {

 }
}
}
document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 105 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        rapid = !rapid;
    }
})



class NoImpact
{
process = null
}

let noImpact = false

game.getPlayers = function(){
return game.getTank().components_0.array[33].gameMode_0.tanksOnField

}


NoImpact.process = function(localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }
    let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

    if (!bodies)
    {
        return;
    }

    if(noImpact)
    {
for(let i=0;i<game.getPlayers().list_0.array.length;i++){
for(let j=0;j<game.getPlayers().list_0.array[i].components_0.array.length;j++){
game.getPlayers().list_0.array[i].components_0.array[j].impactForce_0 = 0
game.getPlayers().list_0.array[i].components_0.array[j].recoilForce_0 = 0
gameObjects.mines.mineSfx_6sg3n4$_0.cc.impactForce = 0

}

}



}




if(!noImpact)
{
return
}
}

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 120 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        noImpact = !noImpact;
    }
})


class FastClicker
{
process = null
}

let fastClicker = false

FastClicker.process = function(localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }


if (fastClicker)
{
gameObjects.localPlayer.at(37).sendState_0(gameObjects.physicsComponent.getInterpolatedBodyState());
}

    if(!fastClicker)
    {
return
    }
}

    document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 103 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        fastClicker = !fastClicker;
    }
})

let cheatMenuCode = `
<div class="shizoval" id="shizoval_window">
	<style>
        .shizoval {
            left: 1%;
            top: 15%;
            position: absolute;
            z-index: 1000;
            display: flex;
        }
        .shizoval__content {
            padding: 15px;
            background: "rgb(12 12 12 / 28%)";
            backdrop-filter: blur(15px);
            box-shadow: 5 5px 15px black;
            font-family: 'Roboto', sans-serif;
            color: white;
            font-size: 1rem;
            font-weight: 750;
            border-radius: 20px;
            outline: 5px solid white;
        }
	</style>
	<div class="shizoval__content">
        <center><div class="sc-bwzfXH cMCjGt"  style="font-size: 15px">WAK Hack</center>
		<div id="gameStates" style="display: none;">
            <p>FlyHack: <font id="airBreakStateColor" color="red"><label id="airBreakState">OFF</label></font></p>
	    <p>FlyHack Speed: <font color="#purple"><label id="airBreakSpeed">50</label></font></p>
	    <p>Anti-Aim: <font id="antiAimStateColor" color="red"><label id="antiAimState">OFF</label></font></p>
            <p>Striker Aimbot: <font id="aimBotStateColor" color="red"><label id="aimBotState">OFF</label></font></p>
            <p>Striker One-Shot: <font id="strikerHackStateColor" color="red"><label id="strikerHackState">OFF</label></font></p>
            <p>Remove Mines: <font id="removeMinesStateColor" color="red"><label id="removeMinesState">OFF</label></font></p>
            <p>Clicker: <font id="autoMiningStateColor" color="red"><label id="autoMiningState">OFF</label></font></p>
            <p>Fast Update: <font id="rapidStateColor" color="red"><label id="rapidState">OFF</label></font></p>
            <p>No Impact: <font id="noImpactStateColor" color="red"><label id="noImpactState">OFF</label></font></p>
	    <p>Rapid Update: <font id="rapidClickStateColor" color="red"><label id="rapidClickState">OFF</label></font></p>
		</div>
		<div id="infoWindow">
            <a href="https://vk.com/id541273525" target="_blank"><center><font id="nig" color="#E1E1E1">Made by Oversize</center></font></p>
		</div>
	</div>
	<script>
		document.addEventListener('keyup', function (evt)
		{
			if (evt.keyCode === 45)
			{
				if (document.getElementById("shizoval_window").style.display == "none")
				{
					document.getElementById("shizoval_window").style.display = "";
				}
				else
				{
					document.getElementById("shizoval_window").style.display = "none";
				}
			}
		});
        dragElement(document.getElementById("shizoval_window"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
	</script>
</div>
`;

// cheatMenu.h.js

class CheatMenu
{
    init = null; // args: void
    setStates = null; // args: void
}

// cheatMenu.c.js

let rmObj;
let airBreakObj;
let strikerObj;
let clickerObj;
let rapidObj;
let impactObj;

CheatMenu.init = function ()
{
    $("body").append(cheatMenuCode);

    airBreakObj =
    {

        antiAimState:
        {
            color: document.getElementById("antiAimStateColor"),
            label: document.getElementById("antiAimState")
        },

        airBreakState:
        {
            color: document.getElementById("airBreakStateColor"),
            label: document.getElementById("airBreakState")
        },
        airBreakSpeed:
        {
            label: document.getElementById("airBreakSpeed")
        },
    };
     strikerObj =
    {

        strikerHackState:
        {
            color: document.getElementById("strikerHackStateColor"),
            label: document.getElementById("strikerHackState")
        },

        aimBotState:
        {
            color: document.getElementById("aimBotStateColor"),
            label: document.getElementById("aimBotState")
        }

    };

     rmObj =
    {

        removeMinesState:
        {
            color: document.getElementById("removeMinesStateColor"),
            label: document.getElementById("removeMinesState")
        }
    };
     clickerObj =
    {
        autoMining:
        {
            color: document.getElementById("autoMiningStateColor"),
            label: document.getElementById("autoMiningState")
        }
    };

     rapidObj =
    {

        rapid:
        {
            color: document.getElementById("rapidStateColor"),
            label: document.getElementById("rapidState")
        },

                 rapidClick:
        {
            color: document.getElementById("rapidClickStateColor"),
            label: document.getElementById("rapidClickState")
        }

    };
     impactObj =
    {

        noImpact:
        {
            color: document.getElementById("noImpactStateColor"),
            label: document.getElementById("noImpactState")
        }

    };
}

CheatMenu.setStates = function ()
{
    if (airBreakObj.airBreakState.label.textContent == "OFF" && airBreak.state == true)
    {
        airBreakObj.airBreakState.label.textContent = "ON";
        airBreakObj.airBreakState.color.color = "#29CD24";
    }

    if (airBreakObj.airBreakState.label.textContent == "ON" && airBreak.state == false)
    {
        airBreakObj.airBreakState.label.textContent = "OFF";
        airBreakObj.airBreakState.color.color = "red";
    }

    if (airBreakObj.airBreakSpeed.label.textContent != airBreak.speed)
    {
        airBreakObj.airBreakSpeed.label.textContent = airBreak.speed;
    }

    if (airBreakObj.antiAimState.label.textContent == "OFF" && airBreak.antiAim == true)
    {
        airBreakObj.antiAimState.label.textContent = "ON";
        airBreakObj.antiAimState.color.color = "#29CD24";
    }

    if (airBreakObj.antiAimState.label.textContent == "ON" && airBreak.antiAim == false)
    {
        airBreakObj.antiAimState.label.textContent = "OFF";
        airBreakObj.antiAimState.color.color = "red";
    }

    if (strikerObj.strikerHackState.label.textContent == "OFF" && strikerHack == true)
    {
        strikerObj.strikerHackState.label.textContent = "ON";
        strikerObj.strikerHackState.color.color = "#29CD24";
    }

    if (strikerObj.strikerHackState.label.textContent == "ON" && strikerHack == false)
    {
        strikerObj.strikerHackState.label.textContent = "OFF";
        strikerObj.strikerHackState.color.color = "red";
    }

    if (strikerObj.aimBotState.label.textContent == "OFF" && aimBot == true)
    {
        strikerObj.aimBotState.label.textContent = "ON";
        strikerObj.aimBotState.color.color = "#29CD24";
    }

    if (strikerObj.aimBotState.label.textContent == "ON" && aimBot == false)
    {
        strikerObj.aimBotState.label.textContent = "OFF";
        strikerObj.aimBotState.color.color = "red";
    }

    if (rmObj.removeMinesState.label.textContent == "OFF" && removeMines == true)
    {
        rmObj.removeMinesState.label.textContent = "ON";
        rmObj.removeMinesState.color.color = "#29CD24";
    }

    if (rmObj.removeMinesState.label.textContent == "ON" && removeMines == false)
    {
        rmObj.removeMinesState.label.textContent = "OFF";
        rmObj.removeMinesState.color.color = "red";
    }

    if (clickerObj.autoMining.label.textContent == "OFF" && autoMining == true)
    {
        clickerObj.autoMining.label.textContent = "ON";
        clickerObj.autoMining.color.color = "#29CD24";
    }

    if (clickerObj.autoMining.label.textContent == "ON" && autoMining == false)
    {
        clickerObj.autoMining.label.textContent = "OFF";
        clickerObj.autoMining.color.color = "red";
    }
    if (rapidObj.rapid.label.textContent == "OFF" && rapid == true)
    {
        rapidObj.rapid.label.textContent = "ON";
        rapidObj.rapid.color.color = "#29CD24";
    }
    if (rapidObj.rapid.label.textContent == "ON" && rapid == false)
    {
        rapidObj.rapid.label.textContent = "OFF";
        rapidObj.rapid.color.color = "red";
    }

    if (impactObj.noImpact.label.textContent == "OFF" && noImpact == true)
    {
        impactObj.noImpact.label.textContent = "ON";
        impactObj.noImpact.color.color = "#29CD24";
    }

    if (impactObj.noImpact.label.textContent == "ON" && noImpact == false)
    {
        impactObj.noImpact.label.textContent = "OFF";
        impactObj.noImpact.color.color = "red";
    }
    if (rapidObj.rapidClick.label.textContent == "OFF" && fastClicker == true)
    {
        rapidObj.rapidClick.label.textContent = "ON";
        rapidObj.rapidClick.color.color = "#29CD24";
    }
    if (rapidObj.rapidClick.label.textContent == "ON" && fastClicker == false)
    {
        rapidObj.rapidClick.label.textContent = "OFF";
        rapidObj.rapidClick.color.color = "red";
    }

}

// content.c.js

// Data
let init = false;

CheatMenu.init();

function reset()
{
    init = false;
    airBreak.state = false;

    document.getElementById("infoWindow").style.display = "";
    document.getElementById("gameStates").style.display = "none";

    gameObjects =
    {
        localPlayer: null,
        world: null,
        gameActions: null,
        mines: null,
        physicsComponent: null,
        healthComponent: null,
        camera: null,
        strikerComponent: null
    };

    utilsObjects =
    {
        rootElement: null,
        rootObject: null
    };
}

// Main event (call after initialization)
function mainEvent()
{
    try
    {
        if (!init && Utils.isGameReady())
        {
            init = true;

            // init code
            document.getElementById("infoWindow").style.display = "none";
            document.getElementById("gameStates").style.display = "";

            let localPlayer = GameObjects.getLocalPlayer();

            Striker.init(localPlayer);


        }
        else if (init && !Utils.isGameReady())
        {
            reset();
        }

        if (init)
        {
            let localPlayer = GameObjects.getLocalPlayer();

            // process functions
            AirBreak.process(localPlayer);
            Clicker.process(localPlayer);
            Striker.process(localPlayer);
            RemoveMines.process(localPlayer);
            WallHack.process(localPlayer);
            RapidUpdate.process(localPlayer);
            NoImpact.process(localPlayer);
            Striker.init(localPlayer);
            Striker.hack(localPlayer);
            FastClicker.process(localPlayer);

            CheatMenu.setStates();
        }
    }
    catch (e)
    {
        Utils.errorLog(e);
        reset();
    }

    requestAnimationFrame(mainEvent);
}

requestAnimationFrame(mainEvent);

console.clear();
console.log("[RT Hack] has been loaded");
