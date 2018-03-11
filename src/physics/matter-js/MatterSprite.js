/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var AnimationComponent = require('../../gameobjects/components/Animation');
var Bodies = require('./lib/factory/Bodies');
var Class = require('../../utils/Class');
var Components = require('./components');
var GameObject = require('../../gameobjects/GameObject');
var GetFastValue = require('../../utils/object/GetFastValue');
var Pipeline = require('../../gameobjects/components/Pipeline');
var Sprite = require('../../gameobjects/sprite/Sprite');
var Vector2 = require('../../math/Vector2');

/**
 * @classdesc
 * A Matter Physics Sprite Game Object.
 *
 * A Sprite Game Object is used for the display of both static and animated images in your game.
 * Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled
 * and animated.
 *
 * The main difference between a Sprite and an Image Game Object is that you cannot animate Images.
 * As such, Sprites take a fraction longer to process and have a larger API footprint due to the Animation
 * Component. If you do not require animation then you can safely use Images to replace Sprites in all cases.
 *
 * @class MatterSprite
 * @extends Phaser.GameObjects.Sprite
 * @memberOf Phaser.Physics.Matter
 * @constructor
 * @since 3.0.0
 *
 * @extends Phaser.Physics.Matter.Components.Bounce
 * @extends Phaser.Physics.Matter.Components.Collision
 * @extends Phaser.Physics.Matter.Components.Force
 * @extends Phaser.Physics.Matter.Components.Friction
 * @extends Phaser.Physics.Matter.Components.Gravity
 * @extends Phaser.Physics.Matter.Components.Mass
 * @extends Phaser.Physics.Matter.Components.Sensor
 * @extends Phaser.Physics.Matter.Components.SetBody
 * @extends Phaser.Physics.Matter.Components.Sleep
 * @extends Phaser.Physics.Matter.Components.Static
 * @extends Phaser.Physics.Matter.Components.Transform
 * @extends Phaser.Physics.Matter.Components.Velocity
 * @extends Phaser.GameObjects.Components.Alpha
 * @extends Phaser.GameObjects.Components.Animation
 * @extends Phaser.GameObjects.Components.BlendMode
 * @extends Phaser.GameObjects.Components.Depth
 * @extends Phaser.GameObjects.Components.Flip
 * @extends Phaser.GameObjects.Components.GetBounds
 * @extends Phaser.GameObjects.Components.Origin
 * @extends Phaser.GameObjects.Components.Pipeline
 * @extends Phaser.GameObjects.Components.ScaleMode
 * @extends Phaser.GameObjects.Components.ScrollFactor
 * @extends Phaser.GameObjects.Components.Size
 * @extends Phaser.GameObjects.Components.Texture
 * @extends Phaser.GameObjects.Components.Tint
 * @extends Phaser.GameObjects.Components.Transform
 * @extends Phaser.GameObjects.Components.Visible
 *
 * @param {Phaser.Physics.Matter.World} world - [description]
 * @param {number} x - The horizontal position of this Game Object in the world.
 * @param {number} y - The vertical position of this Game Object in the world.
 * @param {string} texture - The key of the Texture this Game Object will use to render with, as stored in the Texture Manager.
 * @param {string|integer} [frame] - An optional frame from the Texture this Game Object is rendering with.
 * @param {object} options - [description]
 */
var MatterSprite = new Class({

    Extends: Sprite,

    Mixins: [
        Components.Bounce,
        Components.Collision,
        Components.Force,
        Components.Friction,
        Components.Gravity,
        Components.Mass,
        Components.Sensor,
        Components.SetBody,
        Components.Sleep,
        Components.Static,
        Components.Transform,
        Components.Velocity,
        Pipeline
    ],

    initialize:

    function MatterSprite (world, x, y, texture, frame, options)
    {
        GameObject.call(this, world.scene, 'Image');

        this.anims = new AnimationComponent(this);

        this.setTexture(texture, frame);
        this.setSizeToFrame();
        this.setOrigin();

        this.world = world;

        this._tempVec2 = new Vector2(x, y);

        var shape = GetFastValue(options, 'shape', null);

        if (!shape)
        {
            this.body = Bodies.rectangle(x, y, this.width, this.height, options);

            this.body.gameObject = this;

            if (GetFastValue(options, 'addToWorld', true))
            {
                world.add(this.body);
            }
        }
        else
        {
            this.setBody(shape, options);
        }

        this.setPosition(x, y);

        this.initPipeline('TextureTintPipeline');
    }

});

module.exports = MatterSprite;
