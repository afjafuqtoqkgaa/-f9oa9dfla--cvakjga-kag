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
    console.log("[WolfHack] " + text);
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

class AirBreak {
    process = null
}
const airBreak = {
    isShiftPressed: !1,
    antiAim: !1,
    state: !1,
    speed: 50,
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    velocity: {
        x: 0,
        y: 0,
        z: 0
    }
};
document.addEventListener("keyup", (e => {
    16 == e.keyCode && 2 == e.location && Utils.isGameReady() && Utils.isNotOpenChat() && (airBreak.isShiftPressed = !0)
})), document.addEventListener("keyup", (e => {
    74 == e.keyCode && Utils.isGameReady() && Utils.isNotOpenChat() && (airBreak.antiAim = !airBreak.antiAim)
})), AirBreak.process = function(e) {
    if (!e) return;
    let t = GameObjects.getWorld();
    if (!t) return;
    let a = GameObjects.getPhysicsComponent();
    if (!a) return;
    let n = GameObjects.getCamera();
    if (!n) return;
    let i = t.physicsScene_0.bodies_0.array_hd7ov6$_0;
    if (!i) return;
    if (airBreak.isShiftPressed)
        if (airBreak.isShiftPressed = !1, airBreak.state = !airBreak.state, airBreak.state) airBreak.position.x = a.body.state.position.x, airBreak.position.y = a.body.state.position.y, airBreak.position.z = a.body.state.position.z, airBreak.velocity.x = 0, airBreak.velocity.y = 0, airBreak.velocity.z = 0;
        else {
            a.body.state.velocity.x = 0, a.body.state.velocity.y = 0, a.body.state.velocity.z = 0, a.body.state.angularVelocity.x = 0, a.body.state.angularVelocity.y = 0, a.body.state.angularVelocity.z = 0;
            for (let e = 0; e < i.length; e++) i.at(e).movable = !0
        } if (!airBreak.state) return;
    let o = n.direction;
    if (airBreak.velocity.x = 0, airBreak.velocity.y = 0, KeyPressing.isKeyPressed(87) && Utils.isNotOpenChat()) {
        let e = {
            x: airBreak.position.x + airBreak.speed * Math.sin(-o),
            y: airBreak.position.y + airBreak.speed * Math.cos(-o),
            z: 0
        };
        Utils.isNotKillZone(t, e) && (airBreak.position.x = e.x, airBreak.position.y = e.y, airBreak.velocity.x += a.body.maxSpeedXY * Math.sin(-o), airBreak.velocity.y += a.body.maxSpeedXY * Math.cos(-o))
    }
    if (KeyPressing.isKeyPressed(83) && Utils.isNotOpenChat()) {
        let e = {
            x: airBreak.position.x - airBreak.speed * Math.sin(-o),
            y: airBreak.position.y - airBreak.speed * Math.cos(-o),
            z: 0
        };
        Utils.isNotKillZone(t, e) && (airBreak.position.x = e.x, airBreak.position.y = e.y, airBreak.velocity.x -= a.body.maxSpeedXY * Math.sin(-o), airBreak.velocity.y -= a.body.maxSpeedXY * Math.cos(-o))
    }
    if (KeyPressing.isKeyPressed(65) && Utils.isNotOpenChat()) {
        let e = {
            x: airBreak.position.x - airBreak.speed * Math.sin(-(o - Math.PI / 2)),
            y: airBreak.position.y - airBreak.speed * Math.cos(-(o - Math.PI / 2)),
            z: 0
        };
        Utils.isNotKillZone(t, e) && (airBreak.position.x = e.x, airBreak.position.y = e.y, airBreak.velocity.x -= a.body.maxSpeedXY * Math.sin(-(o - Math.PI / 2)), airBreak.velocity.y -= a.body.maxSpeedXY * Math.cos(-(o - Math.PI / 2)))
    }
    if (KeyPressing.isKeyPressed(68) && Utils.isNotOpenChat()) {
        let e = {
            x: airBreak.position.x + airBreak.speed * Math.sin(-(o - Math.PI / 2)),
            y: airBreak.position.y + airBreak.speed * Math.cos(-(o - Math.PI / 2)),
            z: 0
        };
        Utils.isNotKillZone(t, e) && (airBreak.position.x = e.x, airBreak.position.y = e.y, airBreak.velocity.x += a.body.maxSpeedXY * Math.sin(-(o - Math.PI / 2)), airBreak.velocity.y += a.body.maxSpeedXY * Math.cos(-(o - Math.PI / 2)))
    }
    if (KeyPressing.isKeyPressed(81) && Utils.isNotOpenChat() && (airBreak.position.z += airBreak.speed), KeyPressing.isKeyPressed(69) && Utils.isNotOpenChat() && (airBreak.position.z -= airBreak.speed), KeyPressing.isKeyPressed(37) && Utils.isNotOpenChat() && airBreak.speed > 1 && (airBreak.speed -= 1), KeyPressing.isKeyPressed(39) && Utils.isNotOpenChat() && (airBreak.speed += 1), Utils.isParkourMode()) {
        for (let e = 0; e < i.length; e++) i.at(e).movable = !1;
        if (airBreak.antiAim) {
            let e = t.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(0).bounds;
            a.interpolatedPosition.x = Utils.getRandomArbitrary(e.minX, e.maxX), a.interpolatedPosition.y = Utils.getRandomArbitrary(e.minY, e.maxY), a.interpolatedPosition.z = Utils.getRandomArbitrary(e.maxZ + 500, e.maxZ + 500)
        }
        a.body.state.position.x = airBreak.position.x, a.body.state.position.y = airBreak.position.y
    } else a.body.state.velocity.x = airBreak.velocity.x, a.body.state.velocity.y = airBreak.velocity.y;
    a.body.state.position.z = airBreak.position.z, a.body.state.velocity.z = airBreak.velocity.z, a.body.state.orientation.w = Math.sin(-(n.direction - Math.PI) / 2), a.body.state.orientation.z = Math.cos(-(n.direction - Math.PI) / 2), a.body.state.orientation.x = 0, a.body.state.orientation.y = 0, a.body.state.angularVelocity.x = 0, a.body.state.angularVelocity.y = 0, a.body.state.angularVelocity.z = 0
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
    };

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
    if (e.keyCode == 120 && Utils.isGameReady() && Utils.isNotOpenChat())
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
    if (e.keyCode == 117 && Utils.isGameReady() && Utils.isNotOpenChat())
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
    if (e.keyCode == 118 && Utils.isGameReady() && Utils.isNotOpenChat())
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


let cheatMenuCode = `
<div class="shizoval" id="shizoval_window">
	<style>
        .shizoval {
            left: 1%;
            top: 25%;
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
		<center>Wolf Hack</center><hr style="height:2px;border-width:0;color:white;background-color:white">
		<div id="gameStates" style="display: none;">	
	    <p>Парение: <font id="airBreakStateColor" color="red"><label id="airBreakState">Выкл</label></font></p>
	    <p>Скорость: <font color="#purple"><label id="airBreakSpeed">50</label></font></p>
	    <p>Анти-Аим: <font id="antiAimStateColor" color="red"><label id="antiAimState">Выкл</label></font></p>
            <p>Аим на страйк: <font id="aimBotStateColor" color="red"><label id="aimBotState">Выкл</label></font></p>
            <p>Шот на страйк: <font id="strikerHackStateColor" color="red"><label id="strikerHackState">Выкл</label></font></p>
            <p>Фпс хак: <font id="removeMinesStateColor" color="red"><label id="removeMinesState">Выкл</label></font></p>
		</div>
		<div id="infoWindow">
            <p><center><font id="nig" color="black">Made by tdsrse</center></font></p>
		</div>
	</div>
	<script>
		document.addEventListener('keyup', function (evt)
		{
			if (evt.keyCode === 103)
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

CheatMenu.init = function ()
{
    $("body").append(cheatMenuCode);

    airBreakObj =
    {

        antiAimState:
        {
            color: document.getElementById("antiAimStateColor"),
            label: document.getElementById("antiAimState")
        }
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
}

CheatMenu.setStates = function ()
{
	if (clickerObj.autoMining.label.textContent == "Выкл" && autoMining == true)
    {
        clickerObj.autoMining.label.textContent = "Вкл";
        clickerObj.autoMining.color.color = "#29CD24";
    }

    if (clickerObj.autoMining.label.textContent == "Вкл" && autoMining == false)
    {
        clickerObj.autoMining.label.textContent = "Выкл";
        clickerObj.autoMining.color.color = "red";
    }
	
if (airBreakObj.airBreakState.label.textContent == "Выкл" && airBreak.state == true)
    {
        airBreakObj.airBreakState.label.textContent = "Вкл";
        airBreakObj.airBreakState.color.color = "#29CD24";
    }

    if (airBreakObj.airBreakState.label.textContent == "Вкл" && airBreak.state == false)
    {
        airBreakObj.airBreakState.label.textContent = "Выкл";
        airBreakObj.airBreakState.color.color = "red";
    }

    if (airBreakObj.airBreakSpeed.label.textContent != airBreak.speed)
    {
        airBreakObj.airBreakSpeed.label.textContent = airBreak.speed;
    }
	
    if (airBreakObj.antiAimState.label.textContent == "Выкл" && airBreak.antiAim == true)
    {
        airBreakObj.antiAimState.label.textContent = "Вкл";
        airBreakObj.antiAimState.color.color = "#29CD24";
    }

    if (airBreakObj.antiAimState.label.textContent == "Вкл" && airBreak.antiAim == false)
    {
        airBreakObj.antiAimState.label.textContent = "Выкл";
        airBreakObj.antiAimState.color.color = "red";
    }
    if (strikerObj.strikerHackState.label.textContent == "Выкл" && strikerHack == true)
    {
        strikerObj.strikerHackState.label.textContent = "Вкл";
        strikerObj.strikerHackState.color.color = "#29CD24";
    }

    if (strikerObj.strikerHackState.label.textContent == "Вкл" && strikerHack == false)
    {
        strikerObj.strikerHackState.label.textContent = "Выкл";
        strikerObj.strikerHackState.color.color = "red";
    }

    if (strikerObj.aimBotState.label.textContent == "Выкл" && aimBot == true)
    {
        strikerObj.aimBotState.label.textContent = "Вкл";
        strikerObj.aimBotState.color.color = "#29CD24";
    }

    if (strikerObj.aimBotState.label.textContent == "Вкл" && aimBot == false)
    {
        strikerObj.aimBotState.label.textContent = "Выкл";
        strikerObj.aimBotState.color.color = "red";
    }

    if (rmObj.removeMinesState.label.textContent == "Выкл" && removeMines == true)
    {
        rmObj.removeMinesState.label.textContent = "Вкл";
        rmObj.removeMinesState.color.color = "#29CD24";
    }

    if (rmObj.removeMinesState.label.textContent == "Вкл" && removeMines == false)
    {
        rmObj.removeMinesState.label.textContent = "Выкл";
        rmObj.removeMinesState.color.color = "red";
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

            localPlayer.at(0).entity.unpossess = function ()
            {
                this.isPossessed = !1;
                reset();
            }
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
            Striker.process(localPlayer);
            RemoveMines.process(localPlayer);
            Striker.init(localPlayer);
            Striker.hack(localPlayer);
            WallHack.process(localPlayer);

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

console.log('[WolfHack] The Cheat Has Been Loaded');
