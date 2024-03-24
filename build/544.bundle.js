"use strict";(self.webpackChunkstellar_odyssey=self.webpackChunkstellar_odyssey||[]).push([[544],{8544:function(Lr,St,O){O.d(St,{Vw:function(){return st}});var v=O(9774);/*!
 * @pixi/filter-adjustment - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-adjustment is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var wt=null,Tt=null;class jr extends null{constructor(i){super(wt,Tt),this.gamma=1,this.saturation=1,this.contrast=1,this.brightness=1,this.red=1,this.green=1,this.blue=1,this.alpha=1,Object.assign(this,i)}apply(i,u,c,f){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,i.applyFilter(this,u,c,f)}}/*!
 * @pixi/filter-kawase-blur - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-kawase-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var At=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,zt=`
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 uOffset;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample top right pixel
    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample bottom right pixel
    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));

    // Sample bottom left pixel
    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));

    // Average
    color *= 0.25;

    gl_FragColor = color;
}`,Ft=`
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 uOffset;
uniform vec4 filterClamp;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));

    // Sample top right pixel
    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));

    // Sample bottom right pixel
    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));

    // Sample bottom left pixel
    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));

    // Average
    color *= 0.25;

    gl_FragColor = color;
}
`;class D extends v.wn{constructor(i=4,u=3,c=!1){super(At,c?Ft:zt),this._kernels=[],this._blur=4,this._quality=3,this.uniforms.uOffset=new Float32Array(2),this._pixelSize=new v.E9,this.pixelSize=1,this._clamp=c,Array.isArray(i)?this.kernels=i:(this._blur=i,this.quality=u)}apply(i,u,c,f){const d=this._pixelSize.x/u._frame.width,m=this._pixelSize.y/u._frame.height;let g;if(this._quality===1||this._blur===0)g=this._kernels[0]+.5,this.uniforms.uOffset[0]=g*d,this.uniforms.uOffset[1]=g*m,i.applyFilter(this,u,c,f);else{const p=i.getFilterTexture();let y=u,w=p,M;const C=this._quality-1;for(let T=0;T<C;T++)g=this._kernels[T]+.5,this.uniforms.uOffset[0]=g*d,this.uniforms.uOffset[1]=g*m,i.applyFilter(this,y,w,1),M=y,y=w,w=M;g=this._kernels[C]+.5,this.uniforms.uOffset[0]=g*d,this.uniforms.uOffset[1]=g*m,i.applyFilter(this,y,c,f),i.returnFilterTexture(p)}}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((i,u)=>i+u+.5,0))}_generateKernels(){const i=this._blur,u=this._quality,c=[i];if(i>0){let f=i;const d=i/u;for(let m=1;m<u;m++)f-=d,c.push(f)}this._kernels=c,this._updatePadding()}get kernels(){return this._kernels}set kernels(i){Array.isArray(i)&&i.length>0?(this._kernels=i,this._quality=i.length,this._blur=Math.max(...i)):(this._kernels=[0],this._quality=1)}get clamp(){return this._clamp}set pixelSize(i){typeof i=="number"?(this._pixelSize.x=i,this._pixelSize.y=i):Array.isArray(i)?(this._pixelSize.x=i[0],this._pixelSize.y=i[1]):i instanceof v.E9?(this._pixelSize.x=i.x,this._pixelSize.y=i.y):(this._pixelSize.x=1,this._pixelSize.y=1)}get pixelSize(){return this._pixelSize}get quality(){return this._quality}set quality(i){this._quality=Math.max(1,Math.round(i)),this._generateKernels()}get blur(){return this._blur}set blur(i){this._blur=i,this._generateKernels()}}/*!
 * @pixi/filter-advanced-bloom - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-advanced-bloom is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Y=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Pt=`
uniform sampler2D uSampler;
varying vec2 vTextureCoord;

uniform float threshold;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);

    // A simple & fast algorithm for getting brightness.
    // It's inaccuracy , but good enought for this feature.
    float _max = max(max(color.r, color.g), color.b);
    float _min = min(min(color.r, color.g), color.b);
    float brightness = (_max + _min) * 0.5;

    if(brightness > threshold) {
        gl_FragColor = color;
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}
`;class Mt extends v.wn{constructor(i=.5){super(Y,Pt),this.threshold=i}get threshold(){return this.uniforms.threshold}set threshold(i){this.uniforms.threshold=i}}var kt=`uniform sampler2D uSampler;
varying vec2 vTextureCoord;

uniform sampler2D bloomTexture;
uniform float bloomScale;
uniform float brightness;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    color.rgb *= brightness;
    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);
    bloomColor.rgb *= bloomScale;
    gl_FragColor = color + bloomColor;
}
`;const W=class extends v.wn{constructor(l){super(Y,kt),this.bloomScale=1,this.brightness=1,this._resolution=v.Xd.FILTER_RESOLUTION,typeof l=="number"&&(l={threshold:l});const i=Object.assign(W.defaults,l);this.bloomScale=i.bloomScale,this.brightness=i.brightness;const{kernels:u,blur:c,quality:f,pixelSize:d,resolution:m}=i;this._extractFilter=new Mt(i.threshold),this._extractFilter.resolution=m,this._blurFilter=u?new D(u):new D(c,f),this.pixelSize=d,this.resolution=m}apply(l,i,u,c,f){const d=l.getFilterTexture();this._extractFilter.apply(l,i,d,1,f);const m=l.getFilterTexture();this._blurFilter.apply(l,d,m,1),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=m,l.applyFilter(this,i,u,c),l.returnFilterTexture(m),l.returnFilterTexture(d)}get resolution(){return this._resolution}set resolution(l){this._resolution=l,this._extractFilter&&(this._extractFilter.resolution=l),this._blurFilter&&(this._blurFilter.resolution=l)}get threshold(){return this._extractFilter.threshold}set threshold(l){this._extractFilter.threshold=l}get kernels(){return this._blurFilter.kernels}set kernels(l){this._blurFilter.kernels=l}get blur(){return this._blurFilter.blur}set blur(l){this._blurFilter.blur=l}get quality(){return this._blurFilter.quality}set quality(l){this._blurFilter.quality=l}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(l){this._blurFilter.pixelSize=l}};let Ot=W;Ot.defaults={threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:v.Xd.FILTER_RESOLUTION};/*!
 * @pixi/filter-ascii - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-ascii is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Dt=null,Rt=null;class Nr extends null{constructor(i=8){super(Dt,Rt),this.size=i}get size(){return this.uniforms.pixelSize}set size(i){this.uniforms.pixelSize=i}}/*!
 * @pixi/filter-bevel - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-bevel is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Et=null,It=null;class Vr extends null{constructor(i){super(Et,It),this._thickness=2,this._angle=0,this.uniforms.lightColor=new Float32Array(3),this.uniforms.shadowColor=new Float32Array(3),Object.assign(this,{rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},i),this.padding=1}_updateTransform(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)}get rotation(){return this._angle/t}set rotation(i){this._angle=i*t,this._updateTransform()}get thickness(){return this._thickness}set thickness(i){this._thickness=i,this._updateTransform()}get lightColor(){return r.rgb2hex(this.uniforms.lightColor)}set lightColor(i){r.hex2rgb(i,this.uniforms.lightColor)}get lightAlpha(){return this.uniforms.lightAlpha}set lightAlpha(i){this.uniforms.lightAlpha=i}get shadowColor(){return r.rgb2hex(this.uniforms.shadowColor)}set shadowColor(i){r.hex2rgb(i,this.uniforms.shadowColor)}get shadowAlpha(){return this.uniforms.shadowAlpha}set shadowAlpha(i){this.uniforms.shadowAlpha=i}}var Xr=O(8121),qr=O(6844);/*!
 * @pixi/filter-bloom - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-bloom is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */class Gr extends null{constructor(i=2,u=4,c=n.FILTER_RESOLUTION,f=5){super();let d,m;typeof i=="number"?(d=i,m=i):i instanceof F?(d=i.x,m=i.y):Array.isArray(i)&&(d=i[0],m=i[1]),this.blurXFilter=new s(!0,d,u,c,f),this.blurYFilter=new s(!1,m,u,c,f),this.blurYFilter.blendMode=o.SCREEN,this.defaultFilter=new h}apply(i,u,c,f){const d=i.getFilterTexture();this.defaultFilter.apply(i,u,c,f),this.blurXFilter.apply(i,u,d,1),this.blurYFilter.apply(i,d,c,0),i.returnFilterTexture(d)}get blur(){return this.blurXFilter.blur}set blur(i){this.blurXFilter.blur=this.blurYFilter.blur=i}get blurX(){return this.blurXFilter.blur}set blurX(i){this.blurXFilter.blur=i}get blurY(){return this.blurYFilter.blur}set blurY(i){this.blurYFilter.blur=i}}/*!
 * @pixi/filter-bulge-pinch - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-bulge-pinch is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Lt=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,jt=`uniform float radius;
uniform float strength;
uniform vec2 center;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;

uniform vec4 filterArea;
uniform vec4 filterClamp;
uniform vec2 dimensions;

void main()
{
    vec2 coord = vTextureCoord * filterArea.xy;
    coord -= center * dimensions.xy;
    float distance = length(coord);
    if (distance < radius) {
        float percent = distance / radius;
        if (strength > 0.0) {
            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);
        } else {
            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);
        }
    }
    coord += center * dimensions.xy;
    coord /= filterArea.xy;
    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);
    vec4 color = texture2D(uSampler, clampedCoord);
    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    gl_FragColor = color;
}
`;const K=class extends v.wn{constructor(l){super(Lt,jt),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,K.defaults,l)}apply(l,i,u,c){const{width:f,height:d}=i.filterFrame;this.uniforms.dimensions[0]=f,this.uniforms.dimensions[1]=d,l.applyFilter(this,i,u,c)}get radius(){return this.uniforms.radius}set radius(l){this.uniforms.radius=l}get strength(){return this.uniforms.strength}set strength(l){this.uniforms.strength=l}get center(){return this.uniforms.center}set center(l){this.uniforms.center=l}};let Nt=K;Nt.defaults={center:[.5,.5],radius:100,strength:1};/*!
 * @pixi/filter-color-gradient - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-color-gradient is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Vt=`const float PI = 3.1415926538;
const float PI_2 = PI*2.;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;
uniform sampler2D uSampler;

const int TYPE_LINEAR = 0;
const int TYPE_RADIAL = 1;
const int TYPE_CONIC = 2;
const int MAX_STOPS = 32;

uniform int uNumStops;
uniform float uAlphas[3*MAX_STOPS];
uniform vec3 uColors[MAX_STOPS];
uniform float uOffsets[MAX_STOPS];
uniform int uType;
uniform float uAngle;
uniform float uAlpha;
uniform int uMaxColors;

struct ColorStop {
    float offset;
    vec3 color;
    float alpha;
};

mat2 rotate2d(float angle){
    return mat2(cos(angle), -sin(angle),
    sin(angle), cos(angle));
}

float projectLinearPosition(vec2 pos, float angle){
    vec2 center = vec2(0.5);
    vec2 result = pos - center;
    result = rotate2d(angle) * result;
    result = result + center;
    return clamp(result.x, 0., 1.);
}

float projectRadialPosition(vec2 pos) {
    float r = distance(vFilterCoord, vec2(0.5));
    return clamp(2.*r, 0., 1.);
}

float projectAnglePosition(vec2 pos, float angle) {
    vec2 center = pos - vec2(0.5);
    float polarAngle=atan(-center.y, center.x);
    return mod(polarAngle + angle, PI_2) / PI_2;
}

float projectPosition(vec2 pos, int type, float angle) {
    if (type == TYPE_LINEAR) {
        return projectLinearPosition(pos, angle);
    } else if (type == TYPE_RADIAL) {
        return projectRadialPosition(pos);
    } else if (type == TYPE_CONIC) {
        return projectAnglePosition(pos, angle);
    }

    return pos.y;
}

void main(void) {
    // current/original color
    vec4 currentColor = texture2D(uSampler, vTextureCoord);

    // skip calculations if gradient alpha is 0
    if (0.0 == uAlpha) {
        gl_FragColor = currentColor;
        return;
    }

    // project position
    float y = projectPosition(vFilterCoord, uType, radians(uAngle));

    // check gradient bounds
    float offsetMin = uOffsets[0];
    float offsetMax = 0.0;

    for (int i = 0; i < MAX_STOPS; i++) {
        if (i == uNumStops-1){ // last index
            offsetMax = uOffsets[i];
        }
    }

    if (y  < offsetMin || y > offsetMax) {
        gl_FragColor = currentColor;
        return;
    }

    // limit colors
    if (uMaxColors > 0) {
        float stepSize = 1./float(uMaxColors);
        float stepNumber = float(floor(y/stepSize));
        y = stepSize * (stepNumber + 0.5);// offset by 0.5 to use color from middle of segment
    }

    // find color stops
    ColorStop from;
    ColorStop to;

    for (int i = 0; i < MAX_STOPS; i++) {
        if (y >= uOffsets[i]) {
            from = ColorStop(uOffsets[i], uColors[i], uAlphas[i]);
            to = ColorStop(uOffsets[i+1], uColors[i+1], uAlphas[i+1]);
        }

        if (i == uNumStops-1){ // last index
            break;
        }
    }

    // mix colors from stops
    vec4 colorFrom = vec4(from.color * from.alpha, from.alpha);
    vec4 colorTo = vec4(to.color * to.alpha, to.alpha);

    float segmentHeight = to.offset - from.offset;
    float relativePos = y - from.offset;// position from 0 to [segmentHeight]
    float relativePercent = relativePos / segmentHeight;// position in percent between [from.offset] and [to.offset].

    float gradientAlpha = uAlpha * currentColor.a;
    vec4 gradientColor = mix(colorFrom, colorTo, relativePercent) * gradientAlpha;

    // mix resulting color with current color
    gl_FragColor = gradientColor + currentColor*(1.-gradientColor.a);
}
`,Xt=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform vec4 inputSize;
uniform vec4 outputFrame;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
    vFilterCoord = vTextureCoord * inputSize.xy / outputFrame.zw;
}
`,P=P||{};P.stringify=function(){var l={"visit_linear-gradient":function(i){return l.visit_gradient(i)},"visit_repeating-linear-gradient":function(i){return l.visit_gradient(i)},"visit_radial-gradient":function(i){return l.visit_gradient(i)},"visit_repeating-radial-gradient":function(i){return l.visit_gradient(i)},visit_gradient:function(i){var u=l.visit(i.orientation);return u&&(u+=", "),i.type+"("+u+l.visit(i.colorStops)+")"},visit_shape:function(i){var u=i.value,c=l.visit(i.at),f=l.visit(i.style);return f&&(u+=" "+f),c&&(u+=" at "+c),u},"visit_default-radial":function(i){var u="",c=l.visit(i.at);return c&&(u+=c),u},"visit_extent-keyword":function(i){var u=i.value,c=l.visit(i.at);return c&&(u+=" at "+c),u},"visit_position-keyword":function(i){return i.value},visit_position:function(i){return l.visit(i.value.x)+" "+l.visit(i.value.y)},"visit_%":function(i){return i.value+"%"},visit_em:function(i){return i.value+"em"},visit_px:function(i){return i.value+"px"},visit_literal:function(i){return l.visit_color(i.value,i)},visit_hex:function(i){return l.visit_color("#"+i.value,i)},visit_rgb:function(i){return l.visit_color("rgb("+i.value.join(", ")+")",i)},visit_rgba:function(i){return l.visit_color("rgba("+i.value.join(", ")+")",i)},visit_color:function(i,u){var c=i,f=l.visit(u.length);return f&&(c+=" "+f),c},visit_angular:function(i){return i.value+"deg"},visit_directional:function(i){return"to "+i.value},visit_array:function(i){var u="",c=i.length;return i.forEach(function(f,d){u+=l.visit(f),d<c-1&&(u+=", ")}),u},visit:function(i){if(!i)return"";var u="";if(i instanceof Array)return l.visit_array(i,u);if(i.type){var c=l["visit_"+i.type];if(c)return c(i);throw Error("Missing visitor visit_"+i.type)}else throw Error("Invalid node.")}};return function(i){return l.visit(i)}}();var P=P||{};P.parse=function(){var l={linearGradient:/^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,repeatingLinearGradient:/^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,radialGradient:/^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,repeatingRadialGradient:/^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,sideOrCorner:/^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,extentKeywords:/^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,positionKeywords:/^(left|center|right|top|bottom)/i,pixelValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,percentageValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,emValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,angleValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,startCall:/^\(/,endCall:/^\)/,comma:/^,/,hexColor:/^\#([0-9a-fA-F]+)/,literalColor:/^([a-zA-Z]+)/,rgbColor:/^rgb/i,rgbaColor:/^rgba/i,number:/^(([0-9]*\.[0-9]+)|([0-9]+\.?))/},i="";function u(_){var x=new Error(i+": "+_);throw x.source=i,x}function c(){var _=f();return i.length>0&&u("Invalid input not EOF"),_}function f(){return I(d)}function d(){return m("linear-gradient",l.linearGradient,p)||m("repeating-linear-gradient",l.repeatingLinearGradient,p)||m("radial-gradient",l.radialGradient,M)||m("repeating-radial-gradient",l.repeatingRadialGradient,M)}function m(_,x,b){return g(x,function(z){var Ct=b();return Ct&&(A(l.comma)||u("Missing comma before color stops")),{type:_,orientation:Ct,colorStops:I(Mr)}})}function g(_,x){var b=A(_);if(b){A(l.startCall)||u("Missing (");var z=x(b);return A(l.endCall)||u("Missing )"),z}}function p(){return y()||w()}function y(){return S("directional",l.sideOrCorner,1)}function w(){return S("angular",l.angleValue,1)}function M(){var _,x=C(),b;return x&&(_=[],_.push(x),b=i,A(l.comma)&&(x=C(),x?_.push(x):i=b)),_}function C(){var _=T()||Fr();if(_)_.at=vt();else{var x=B();if(x){_=x;var b=vt();b&&(_.at=b)}else{var z=_t();z&&(_={type:"default-radial",at:z})}}return _}function T(){var _=S("shape",/^(circle)/i,0);return _&&(_.style=yt()||B()),_}function Fr(){var _=S("shape",/^(ellipse)/i,0);return _&&(_.style=L()||B()),_}function B(){return S("extent-keyword",l.extentKeywords,1)}function vt(){if(S("position",/^at/,0)){var _=_t();return _||u("Missing positioning value"),_}}function _t(){var _=Pr();if(_.x||_.y)return{type:"position",value:_}}function Pr(){return{x:L(),y:L()}}function I(_){var x=_(),b=[];if(x)for(b.push(x);A(l.comma);)x=_(),x?b.push(x):u("One extra comma");return b}function Mr(){var _=kr();return _||u("Expected color definition"),_.length=L(),_}function kr(){return Dr()||Er()||Rr()||Or()}function Or(){return S("literal",l.literalColor,0)}function Dr(){return S("hex",l.hexColor,1)}function Rr(){return g(l.rgbColor,function(){return{type:"rgb",value:I(xt)}})}function Er(){return g(l.rgbaColor,function(){return{type:"rgba",value:I(xt)}})}function xt(){return A(l.number)[1]}function L(){return S("%",l.percentageValue,1)||Ir()||yt()}function Ir(){return S("position-keyword",l.positionKeywords,1)}function yt(){return S("px",l.pixelValue,1)||S("em",l.emValue,1)}function S(_,x,b){var z=A(x);if(z)return{type:_,value:z[b]}}function A(_){var x,b;return b=/^[\n\r\t\s]+/.exec(i),b&&bt(b[0].length),x=_.exec(i),x&&bt(x[0].length),x}function bt(_){i=i.substr(_)}return function(_){return i=_.toString(),c()}}();var qt=P.parse;P.stringify;var $={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},U={red:0,orange:60,yellow:120,green:180,blue:240,purple:300};function Gt(l){var i,u=[],c=1,f;if(typeof l=="string")if($[l])u=$[l].slice(),f="rgb";else if(l==="transparent")c=0,f="rgb",u=[0,0,0];else if(/^#[A-Fa-f0-9]+$/.test(l)){var d=l.slice(1),m=d.length,g=m<=4;c=1,g?(u=[parseInt(d[0]+d[0],16),parseInt(d[1]+d[1],16),parseInt(d[2]+d[2],16)],m===4&&(c=parseInt(d[3]+d[3],16)/255)):(u=[parseInt(d[0]+d[1],16),parseInt(d[2]+d[3],16),parseInt(d[4]+d[5],16)],m===8&&(c=parseInt(d[6]+d[7],16)/255)),u[0]||(u[0]=0),u[1]||(u[1]=0),u[2]||(u[2]=0),f="rgb"}else if(i=/^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(l)){var p=i[1],y=p==="rgb",d=p.replace(/a$/,"");f=d;var m=d==="cmyk"?4:d==="gray"?1:3;u=i[2].trim().split(/\s*[,\/]\s*|\s+/).map(function(C,T){if(/%$/.test(C))return T===m?parseFloat(C)/100:d==="rgb"?parseFloat(C)*255/100:parseFloat(C);if(d[T]==="h"){if(/deg$/.test(C))return parseFloat(C);if(U[C]!==void 0)return U[C]}return parseFloat(C)}),p===d&&u.push(1),c=y||u[m]===void 0?1:u[m],u=u.slice(0,m)}else l.length>10&&/[0-9](?:\s|\/)/.test(l)&&(u=l.match(/([0-9]+)/g).map(function(w){return parseFloat(w)}),f=l.match(/([a-z])/ig).join("").toLowerCase());else isNaN(l)?Array.isArray(l)||l.length?(u=[l[0],l[1],l[2]],f="rgb",c=l.length===4?l[3]:1):l instanceof Object&&(l.r!=null||l.red!=null||l.R!=null?(f="rgb",u=[l.r||l.red||l.R||0,l.g||l.green||l.G||0,l.b||l.blue||l.B||0]):(f="hsl",u=[l.h||l.hue||l.H||0,l.s||l.saturation||l.S||0,l.l||l.lightness||l.L||l.b||l.brightness]),c=l.a||l.alpha||l.opacity||1,l.opacity!=null&&(c/=100)):(f="rgb",u=[l>>>16,(l&65280)>>>8,l&255]);return{space:f,values:u,alpha:c}}var j={name:"rgb",min:[0,0,0],max:[255,255,255],channel:["red","green","blue"],alias:["RGB"]},N={name:"hsl",min:[0,0,0],max:[360,100,100],channel:["hue","saturation","lightness"],alias:["HSL"],rgb:function(l){var i=l[0]/360,u=l[1]/100,c=l[2]/100,f,d,m,g,p;if(u===0)return p=c*255,[p,p,p];c<.5?d=c*(1+u):d=c+u-c*u,f=2*c-d,g=[0,0,0];for(var y=0;y<3;y++)m=i+1/3*-(y-1),m<0?m++:m>1&&m--,6*m<1?p=f+(d-f)*6*m:2*m<1?p=d:3*m<2?p=f+(d-f)*(2/3-m)*6:p=f,g[y]=p*255;return g}};j.hsl=function(l){var i=l[0]/255,u=l[1]/255,c=l[2]/255,f=Math.min(i,u,c),d=Math.max(i,u,c),m=d-f,g,p,y;return d===f?g=0:i===d?g=(u-c)/m:u===d?g=2+(c-i)/m:c===d&&(g=4+(i-u)/m),g=Math.min(g*60,360),g<0&&(g+=360),y=(f+d)/2,d===f?p=0:y<=.5?p=m/(d+f):p=m/(2-d-f),[g,p*100,y*100]};function Bt(l){Array.isArray(l)&&l.raw&&(l=String.raw(...arguments));var i,u=Gt(l);if(!u.space)return[];const c=u.space[0]==="h"?N.min:j.min,f=u.space[0]==="h"?N.max:j.max;return i=Array(3),i[0]=Math.min(Math.max(u.values[0],c[0]),f[0]),i[1]=Math.min(Math.max(u.values[1],c[1]),f[1]),i[2]=Math.min(Math.max(u.values[2],c[2]),f[2]),u.space[0]==="h"&&(i=N.rgb(i)),i.push(Math.min(Math.max(u.alpha,0),1)),i}function H(l){switch(typeof l){case"string":return Yt(l);case"number":return v.P6.hex2rgb(l);default:return l}}function Yt(l){const i=Bt(l);if(!i)throw new Error(`Unable to parse color "${l}" as RGBA.`);return[i[0]/255,i[1]/255,i[2]/255,i[3]]}function Wt(l){const i=qt(ee(l));if(i.length===0)throw new Error("Invalid CSS gradient.");if(i.length!==1)throw new Error("Unsupported CSS gradient (multiple gradients is not supported).");const u=i[0],c=Kt(u.type),f=$t(u.colorStops),d=Jt(u.orientation);return{type:c,stops:f,angle:d}}function Kt(l){const i={"linear-gradient":0,"radial-gradient":1};if(!(l in i))throw new Error(`Unsupported gradient type "${l}"`);return i[l]}function $t(l){const i=Zt(l),u=[];for(let c=0;c<l.length;c++){const f=Ut(l[c]);u.push({offset:i[c],color:f.slice(0,3),alpha:f[3]})}return u}function Ut(l){return H(Ht(l))}function Ht(l){switch(l.type){case"hex":return`#${l.value}`;case"literal":return l.value;default:return`${l.type}(${l.value.join(",")})`}}function Zt(l){const i=[];for(let f=0;f<l.length;f++){const d=l[f];let m=-1;d.type==="literal"&&d.length&&"type"in d.length&&d.length.type==="%"&&"value"in d.length&&(m=parseFloat(d.length.value)/100),i.push(m)}const u=f=>{for(let d=f;d<i.length;d++)if(i[d]!==-1)return{indexDelta:d-f,offset:i[d]};return{indexDelta:i.length-1-f,offset:1}};let c=0;for(let f=0;f<i.length;f++){const d=i[f];if(d!==-1)c=d;else if(f===0)i[f]=0;else if(f+1===i.length)i[f]=1;else{const m=u(f),g=(m.offset-c)/(1+m.indexDelta);for(let p=0;p<=m.indexDelta;p++)i[f+p]=c+(p+1)*g;f+=m.indexDelta,c=i[f]}}return i.map(Qt)}function Qt(l){return l.toString().length>6?parseFloat(l.toString().substring(0,6)):l}function Jt(l){if(typeof l=="undefined")return 0;if("type"in l&&"value"in l)switch(l.type){case"angular":return parseFloat(l.value);case"directional":return te(l.value)}return 0}function te(l){const i={left:270,top:0,bottom:180,right:90,"left top":315,"top left":315,"left bottom":225,"bottom left":225,"right top":45,"top right":45,"right bottom":135,"bottom right":135};if(!(l in i))throw new Error(`Unsupported directional value "${l}"`);return i[l]}function ee(l){let i=l.replace(/\s{2,}/gu," ");return i=i.replace(/;/g,""),i=i.replace(/ ,/g,","),i=i.replace(/\( /g,"("),i=i.replace(/ \)/g,")"),i.trim()}var re=Object.defineProperty,ie=Object.defineProperties,oe=Object.getOwnPropertyDescriptors,Z=Object.getOwnPropertySymbols,se=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable,Q=(l,i,u)=>i in l?re(l,i,{enumerable:!0,configurable:!0,writable:!0,value:u}):l[i]=u,V=(l,i)=>{for(var u in i||(i={}))se.call(i,u)&&Q(l,u,i[u]);if(Z)for(var u of Z(i))ne.call(i,u)&&Q(l,u,i[u]);return l},le=(l,i)=>ie(l,oe(i));const J=90;function ae(l){return[...l].sort((i,u)=>i.offset-u.offset)}const X=class extends v.wn{constructor(l){l&&"css"in l&&(l=le(V({},Wt(l.css||"")),{alpha:l.alpha,maxColors:l.maxColors}));const i=V(V({},X.defaults),l);if(!i.stops||i.stops.length<2)throw new Error("ColorGradientFilter requires at least 2 color stops.");super(Xt,Vt),this._stops=[],this.autoFit=!1,Object.assign(this,i)}get stops(){return this._stops}set stops(l){const i=ae(l),u=new Float32Array(i.length*3),c=0,f=1,d=2;for(let m=0;m<i.length;m++){const g=H(i[m].color),p=m*3;u[p+c]=g[c],u[p+f]=g[f],u[p+d]=g[d]}this.uniforms.uColors=u,this.uniforms.uOffsets=i.map(m=>m.offset),this.uniforms.uAlphas=i.map(m=>m.alpha),this.uniforms.uNumStops=i.length,this._stops=i}set type(l){this.uniforms.uType=l}get type(){return this.uniforms.uType}set angle(l){this.uniforms.uAngle=l-J}get angle(){return this.uniforms.uAngle+J}set alpha(l){this.uniforms.uAlpha=l}get alpha(){return this.uniforms.uAlpha}set maxColors(l){this.uniforms.uMaxColors=l}get maxColors(){return this.uniforms.uMaxColors}};let R=X;R.LINEAR=0,R.RADIAL=1,R.CONIC=2,R.defaults={type:X.LINEAR,stops:[{offset:0,color:16711680,alpha:1},{offset:1,color:255,alpha:1}],alpha:1,angle:90,maxColors:0};/*!
 * @pixi/filter-color-map - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-color-map is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var ue=null,ce=null;class Br extends null{constructor(i,u=!1,c=1){super(ue,ce),this.mix=1,this._size=0,this._sliceSize=0,this._slicePixelSize=0,this._sliceInnerSize=0,this._nearest=!1,this._scaleMode=null,this._colorMap=null,this._scaleMode=null,this.nearest=u,this.mix=c,this.colorMap=i}apply(i,u,c,f){this.uniforms._mix=this.mix,i.applyFilter(this,u,c,f)}get colorSize(){return this._size}get colorMap(){return this._colorMap}set colorMap(i){!i||(i instanceof s||(i=s.from(i)),i!=null&&i.baseTexture&&(i.baseTexture.scaleMode=this._scaleMode,i.baseTexture.mipmap=o.OFF,this._size=i.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=i),this._colorMap=i)}get nearest(){return this._nearest}set nearest(i){this._nearest=i,this._scaleMode=i?r.NEAREST:r.LINEAR;const u=this._colorMap;u&&u.baseTexture&&(u.baseTexture._glTextures={},u.baseTexture.scaleMode=this._scaleMode,u.baseTexture.mipmap=o.OFF,u._updateID++,u.baseTexture.emit("update",u.baseTexture))}updateColorMap(){const i=this._colorMap;i&&i.baseTexture&&(i._updateID++,i.baseTexture.emit("update",i.baseTexture),this.colorMap=i)}destroy(i=!1){this._colorMap&&this._colorMap.destroy(i),super.destroy()}}/*!
 * @pixi/filter-color-overlay - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-color-overlay is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var fe=null,he=null;class Yr extends null{constructor(i=0,u=1){super(fe,he),this._color=0,this._alpha=1,this.uniforms.color=new Float32Array(3),this.color=i,this.alpha=u}set color(i){const u=this.uniforms.color;typeof i=="number"?(t.hex2rgb(i,u),this._color=i):(u[0]=i[0],u[1]=i[1],u[2]=i[2],this._color=t.rgb2hex(u))}get color(){return this._color}set alpha(i){this.uniforms.alpha=i,this._alpha=i}get alpha(){return this._alpha}}/*!
 * @pixi/filter-color-replace - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-color-replace is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var de=null,me=null;class Wr extends null{constructor(i=16711680,u=0,c=.4){super(de,me),this._originalColor=16711680,this._newColor=0,this.uniforms.originalColor=new Float32Array(3),this.uniforms.newColor=new Float32Array(3),this.originalColor=i,this.newColor=u,this.epsilon=c}set originalColor(i){const u=this.uniforms.originalColor;typeof i=="number"?(e.hex2rgb(i,u),this._originalColor=i):(u[0]=i[0],u[1]=i[1],u[2]=i[2],this._originalColor=e.rgb2hex(u))}get originalColor(){return this._originalColor}set newColor(i){const u=this.uniforms.newColor;typeof i=="number"?(e.hex2rgb(i,u),this._newColor=i):(u[0]=i[0],u[1]=i[1],u[2]=i[2],this._newColor=e.rgb2hex(u))}get newColor(){return this._newColor}set epsilon(i){this.uniforms.epsilon=i}get epsilon(){return this.uniforms.epsilon}}/*!
 * @pixi/filter-convolution - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-convolution is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var ge=null,pe=null;class Kr extends null{constructor(i,u=200,c=200){super(ge,pe),this.uniforms.texelSize=new Float32Array(2),this.uniforms.matrix=new Float32Array(9),i!==void 0&&(this.matrix=i),this.width=u,this.height=c}get matrix(){return this.uniforms.matrix}set matrix(i){i.forEach((u,c)=>{this.uniforms.matrix[c]=u})}get width(){return 1/this.uniforms.texelSize[0]}set width(i){this.uniforms.texelSize[0]=1/i}get height(){return 1/this.uniforms.texelSize[1]}set height(i){this.uniforms.texelSize[1]=1/i}}/*!
 * @pixi/filter-cross-hatch - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-cross-hatch is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var ve=null,_e=null;class $r extends null{constructor(){super(ve,_e)}}/*!
 * @pixi/filter-crt - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-crt is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var xe=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,ye=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 filterArea;
uniform vec2 dimensions;

const float SQRT_2 = 1.414213;

const float light = 1.0;

uniform float curvature;
uniform float lineWidth;
uniform float lineContrast;
uniform bool verticalLine;
uniform float noise;
uniform float noiseSize;

uniform float vignetting;
uniform float vignettingAlpha;
uniform float vignettingBlur;

uniform float seed;
uniform float time;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(void)
{
    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;
    vec2 dir = vec2(vTextureCoord.xy * filterArea.xy / dimensions - vec2(0.5, 0.5));
    
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    vec3 rgb = gl_FragColor.rgb;

    if (noise > 0.0 && noiseSize > 0.0)
    {
        pixelCoord.x = floor(pixelCoord.x / noiseSize);
        pixelCoord.y = floor(pixelCoord.y / noiseSize);
        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;
        rgb += _noise * noise;
    }

    if (lineWidth > 0.0)
    {
        float _c = curvature > 0. ? curvature : 1.;
        float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;
        vec2 uv = dir * k;

        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;
        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;
        rgb *= j;
        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);
        rgb *= 0.99 + ceil(segment) * 0.015;
    }

    if (vignetting > 0.0)
    {
        float outter = SQRT_2 - vignetting * SQRT_2;
        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);
        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);
    }

    gl_FragColor.rgb = rgb;
}
`;const tt=class extends v.wn{constructor(l){super(xe,ye),this.time=0,this.seed=0,this.uniforms.dimensions=new Float32Array(2),Object.assign(this,tt.defaults,l)}apply(l,i,u,c){const{width:f,height:d}=i.filterFrame;this.uniforms.dimensions[0]=f,this.uniforms.dimensions[1]=d,this.uniforms.seed=this.seed,this.uniforms.time=this.time,l.applyFilter(this,i,u,c)}set curvature(l){this.uniforms.curvature=l}get curvature(){return this.uniforms.curvature}set lineWidth(l){this.uniforms.lineWidth=l}get lineWidth(){return this.uniforms.lineWidth}set lineContrast(l){this.uniforms.lineContrast=l}get lineContrast(){return this.uniforms.lineContrast}set verticalLine(l){this.uniforms.verticalLine=l}get verticalLine(){return this.uniforms.verticalLine}set noise(l){this.uniforms.noise=l}get noise(){return this.uniforms.noise}set noiseSize(l){this.uniforms.noiseSize=l}get noiseSize(){return this.uniforms.noiseSize}set vignetting(l){this.uniforms.vignetting=l}get vignetting(){return this.uniforms.vignetting}set vignettingAlpha(l){this.uniforms.vignettingAlpha=l}get vignettingAlpha(){return this.uniforms.vignettingAlpha}set vignettingBlur(l){this.uniforms.vignettingBlur=l}get vignettingBlur(){return this.uniforms.vignettingBlur}};let be=tt;be.defaults={curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0};/*!
 * @pixi/filter-dot - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-dot is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ce=null,Se=null;class Ur extends null{constructor(i=1,u=5,c=!0){super(Ce,Se),this.scale=i,this.angle=u,this.grayscale=c}get scale(){return this.uniforms.scale}set scale(i){this.uniforms.scale=i}get angle(){return this.uniforms.angle}set angle(i){this.uniforms.angle=i}get grayscale(){return this.uniforms.grayscale}set grayscale(i){this.uniforms.grayscale=i}}/*!
 * @pixi/filter-drop-shadow - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-drop-shadow is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var we=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Te=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float alpha;
uniform vec3 color;

uniform vec2 shift;
uniform vec4 inputSize;

void main(void){
    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);

    // Premultiply alpha
    sample.rgb = color.rgb * sample.a;

    // alpha user alpha
    sample *= alpha;

    gl_FragColor = sample;
}`,Ae=Object.defineProperty,et=Object.getOwnPropertySymbols,ze=Object.prototype.hasOwnProperty,Fe=Object.prototype.propertyIsEnumerable,rt=(l,i,u)=>i in l?Ae(l,i,{enumerable:!0,configurable:!0,writable:!0,value:u}):l[i]=u,it=(l,i)=>{for(var u in i||(i={}))ze.call(i,u)&&rt(l,u,i[u]);if(et)for(var u of et(i))Fe.call(i,u)&&rt(l,u,i[u]);return l};const q=class extends v.wn{constructor(l){super(),this.angle=45,this._distance=5,this._resolution=v.Xd.FILTER_RESOLUTION;const i=l?it(it({},q.defaults),l):q.defaults,{kernels:u,blur:c,quality:f,pixelSize:d,resolution:m}=i;this._offset=new v.AB(this._updatePadding,this),this._tintFilter=new v.wn(we,Te),this._tintFilter.uniforms.color=new Float32Array(4),this._tintFilter.uniforms.shift=this._offset,this._tintFilter.resolution=m,this._blurFilter=u?new D(u):new D(c,f),this.pixelSize=d,this.resolution=m;const{shadowOnly:g,rotation:p,distance:y,offset:w,alpha:M,color:C}=i;this.shadowOnly=g,p!==void 0&&y!==void 0?(this.rotation=p,this.distance=y):this.offset=w,this.alpha=M,this.color=C}apply(l,i,u,c){const f=l.getFilterTexture();this._tintFilter.apply(l,i,f,1),this._blurFilter.apply(l,f,u,c),this.shadowOnly!==!0&&l.applyFilter(this,i,u,0),l.returnFilterTexture(f)}_updatePadding(){const l=Math.max(Math.abs(this._offset.x),Math.abs(this._offset.y));this.padding=l+this.blur*2}_updateShift(){this._tintFilter.uniforms.shift.set(this.distance*Math.cos(this.angle),this.distance*Math.sin(this.angle))}set offset(l){this._offset.copyFrom(l),this._updatePadding()}get offset(){return this._offset}get resolution(){return this._resolution}set resolution(l){this._resolution=l,this._tintFilter&&(this._tintFilter.resolution=l),this._blurFilter&&(this._blurFilter.resolution=l)}get distance(){return this._distance}set distance(l){v.P6.deprecation("5.3.0","DropShadowFilter distance is deprecated, use offset"),this._distance=l,this._updatePadding(),this._updateShift()}get rotation(){return this.angle/v.ZX}set rotation(l){v.P6.deprecation("5.3.0","DropShadowFilter rotation is deprecated, use offset"),this.angle=l*v.ZX,this._updateShift()}get alpha(){return this._tintFilter.uniforms.alpha}set alpha(l){this._tintFilter.uniforms.alpha=l}get color(){return v.P6.rgb2hex(this._tintFilter.uniforms.color)}set color(l){v.P6.hex2rgb(l,this._tintFilter.uniforms.color)}get kernels(){return this._blurFilter.kernels}set kernels(l){this._blurFilter.kernels=l}get blur(){return this._blurFilter.blur}set blur(l){this._blurFilter.blur=l,this._updatePadding()}get quality(){return this._blurFilter.quality}set quality(l){this._blurFilter.quality=l}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(l){this._blurFilter.pixelSize=l}};let Pe=q;Pe.defaults={offset:{x:4,y:4},color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:v.Xd.FILTER_RESOLUTION};/*!
 * @pixi/filter-emboss - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-emboss is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Me=null,ke=null;class Hr extends null{constructor(i=5){super(Me,ke),this.strength=i}get strength(){return this.uniforms.strength}set strength(i){this.uniforms.strength=i}}/*!
 * @pixi/filter-glitch - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-glitch is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Oe=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,De=`// precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 filterArea;
uniform vec4 filterClamp;
uniform vec2 dimensions;
uniform float aspect;

uniform sampler2D displacementMap;
uniform float offset;
uniform float sinDir;
uniform float cosDir;
uniform int fillMode;

uniform float seed;
uniform vec2 red;
uniform vec2 green;
uniform vec2 blue;

const int TRANSPARENT = 0;
const int ORIGINAL = 1;
const int LOOP = 2;
const int CLAMP = 3;
const int MIRROR = 4;

void main(void)
{
    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;

    if (coord.x > 1.0 || coord.y > 1.0) {
        return;
    }

    float cx = coord.x - 0.5;
    float cy = (coord.y - 0.5) * aspect;
    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;

    // displacementMap: repeat
    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);

    // displacementMap: mirror
    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);

    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));

    float displacement = (dc.r - dc.g) * (offset / filterArea.x);

    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);

    if (fillMode == CLAMP) {
        coord = clamp(coord, filterClamp.xy, filterClamp.zw);
    } else {
        if( coord.x > filterClamp.z ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.x -= filterClamp.z;
            } else if (fillMode == MIRROR) {
                coord.x = filterClamp.z * 2.0 - coord.x;
            }
        } else if( coord.x < filterClamp.x ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.x += filterClamp.z;
            } else if (fillMode == MIRROR) {
                coord.x *= -filterClamp.z;
            }
        }

        if( coord.y > filterClamp.w ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.y -= filterClamp.w;
            } else if (fillMode == MIRROR) {
                coord.y = filterClamp.w * 2.0 - coord.y;
            }
        } else if( coord.y < filterClamp.y ) {
            if (fillMode == TRANSPARENT) {
                discard;
            } else if (fillMode == LOOP) {
                coord.y += filterClamp.w;
            } else if (fillMode == MIRROR) {
                coord.y *= -filterClamp.w;
            }
        }
    }

    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;
    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;
    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;
    gl_FragColor.a = texture2D(uSampler, coord).a;
}
`;const G=class extends v.wn{constructor(l){super(Oe,De),this.offset=100,this.fillMode=G.TRANSPARENT,this.average=!1,this.seed=0,this.minSize=8,this.sampleSize=512,this._slices=0,this._offsets=new Float32Array(1),this._sizes=new Float32Array(1),this._direction=-1,this.uniforms.dimensions=new Float32Array(2),this._canvas=document.createElement("canvas"),this._canvas.width=4,this._canvas.height=this.sampleSize,this.texture=v.xE.from(this._canvas,{scaleMode:v.aH.NEAREST}),Object.assign(this,G.defaults,l)}apply(l,i,u,c){const{width:f,height:d}=i.filterFrame;this.uniforms.dimensions[0]=f,this.uniforms.dimensions[1]=d,this.uniforms.aspect=d/f,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,l.applyFilter(this,i,u,c)}_randomizeSizes(){const l=this._sizes,i=this._slices-1,u=this.sampleSize,c=Math.min(this.minSize/u,.9/this._slices);if(this.average){const f=this._slices;let d=1;for(let m=0;m<i;m++){const g=d/(f-m),p=Math.max(g*(1-Math.random()*.6),c);l[m]=p,d-=p}l[i]=d}else{let f=1;const d=Math.sqrt(1/this._slices);for(let m=0;m<i;m++){const g=Math.max(d*f*Math.random(),c);l[m]=g,f-=g}l[i]=f}this.shuffle()}shuffle(){const l=this._sizes,i=this._slices-1;for(let u=i;u>0;u--){const c=Math.random()*u>>0,f=l[u];l[u]=l[c],l[c]=f}}_randomizeOffsets(){for(let l=0;l<this._slices;l++)this._offsets[l]=Math.random()*(Math.random()<.5?-1:1)}refresh(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()}redraw(){const l=this.sampleSize,i=this.texture,u=this._canvas.getContext("2d");u.clearRect(0,0,8,l);let c,f=0;for(let d=0;d<this._slices;d++){c=Math.floor(this._offsets[d]*256);const m=this._sizes[d]*l,g=c>0?c:0,p=c<0?-c:0;u.fillStyle=`rgba(${g}, ${p}, 0, 1)`,u.fillRect(0,f>>0,l,m+1>>0),f+=m}i.baseTexture.update(),this.uniforms.displacementMap=i}set sizes(l){const i=Math.min(this._slices,l.length);for(let u=0;u<i;u++)this._sizes[u]=l[u]}get sizes(){return this._sizes}set offsets(l){const i=Math.min(this._slices,l.length);for(let u=0;u<i;u++)this._offsets[u]=l[u]}get offsets(){return this._offsets}get slices(){return this._slices}set slices(l){this._slices!==l&&(this._slices=l,this.uniforms.slices=l,this._sizes=this.uniforms.slicesWidth=new Float32Array(l),this._offsets=this.uniforms.slicesOffset=new Float32Array(l),this.refresh())}get direction(){return this._direction}set direction(l){if(this._direction===l)return;this._direction=l;const i=l*v.ZX;this.uniforms.sinDir=Math.sin(i),this.uniforms.cosDir=Math.cos(i)}get red(){return this.uniforms.red}set red(l){this.uniforms.red=l}get green(){return this.uniforms.green}set green(l){this.uniforms.green=l}get blue(){return this.uniforms.blue}set blue(l){this.uniforms.blue=l}destroy(){var l;(l=this.texture)==null||l.destroy(!0),this.texture=this._canvas=this.red=this.green=this.blue=this._sizes=this._offsets=null}};let k=G;k.defaults={slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},k.TRANSPARENT=0,k.ORIGINAL=1,k.LOOP=2,k.CLAMP=3,k.MIRROR=4;/*!
 * @pixi/filter-glow - v5.2.1
 * Compiled Fri, 24 Mar 2023 22:12:11 UTC
 *
 * @pixi/filter-glow is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Re=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Ee=`varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

uniform float outerStrength;
uniform float innerStrength;

uniform vec4 glowColor;

uniform vec4 filterArea;
uniform vec4 filterClamp;
uniform bool knockout;
uniform float alpha;

const float PI = 3.14159265358979323846264;

const float DIST = __DIST__;
const float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);
const float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);

const float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;

void main(void) {
    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);

    float totalAlpha = 0.0;

    vec2 direction;
    vec2 displaced;
    vec4 curColor;

    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {
       direction = vec2(cos(angle), sin(angle)) * px;

       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {
           displaced = clamp(vTextureCoord + direction * 
                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);

           curColor = texture2D(uSampler, displaced);

           totalAlpha += (DIST - curDistance) * curColor.a;
       }
    }
    
    curColor = texture2D(uSampler, vTextureCoord);

    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);

    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;
    float innerGlowStrength = min(1.0, innerGlowAlpha);
    
    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);

    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);
    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);

    if (knockout) {
      float resultAlpha = (outerGlowAlpha + innerGlowAlpha) * alpha;
      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);
    }
    else {
      vec4 outerGlowColor = outerGlowStrength * glowColor.rgba * alpha;
      gl_FragColor = innerColor + outerGlowColor;
    }
}
`;const ot=class extends v.wn{constructor(l){const i=Object.assign({},ot.defaults,l),{outerStrength:u,innerStrength:c,color:f,knockout:d,quality:m,alpha:g}=i,p=Math.round(i.distance);super(Re,Ee.replace(/__ANGLE_STEP_SIZE__/gi,`${(1/m/p).toFixed(7)}`).replace(/__DIST__/gi,`${p.toFixed(0)}.0`)),this.uniforms.glowColor=new Float32Array([0,0,0,1]),this.uniforms.alpha=1,Object.assign(this,{color:f,outerStrength:u,innerStrength:c,padding:p,knockout:d,alpha:g})}get color(){return v.P6.rgb2hex(this.uniforms.glowColor)}set color(l){v.P6.hex2rgb(l,this.uniforms.glowColor)}get outerStrength(){return this.uniforms.outerStrength}set outerStrength(l){this.uniforms.outerStrength=l}get innerStrength(){return this.uniforms.innerStrength}set innerStrength(l){this.uniforms.innerStrength=l}get knockout(){return this.uniforms.knockout}set knockout(l){this.uniforms.knockout=l}get alpha(){return this.uniforms.alpha}set alpha(l){this.uniforms.alpha=l}};let st=ot;st.defaults={distance:10,outerStrength:4,innerStrength:0,color:16777215,quality:.1,knockout:!1,alpha:1};/*!
 * @pixi/filter-godray - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-godray is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ie=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Le=`vec3 mod289(vec3 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x)
{
    return mod289(((x * 34.0) + 1.0) * x);
}
vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t)
{
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}
float turb(vec3 P, vec3 rep, float lacunarity, float gain)
{
    float sum = 0.0;
    float sc = 1.0;
    float totalgain = 1.0;
    for (float i = 0.0; i < 6.0; i++)
    {
        sum += totalgain * pnoise(P * sc, rep);
        sc *= lacunarity;
        totalgain *= gain;
    }
    return abs(sum);
}
`,je=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;

uniform vec2 light;
uniform bool parallel;
uniform float aspect;

uniform float gain;
uniform float lacunarity;
uniform float time;
uniform float alpha;

\${perlin}

void main(void) {
    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;

    float d;

    if (parallel) {
        float _cos = light.x;
        float _sin = light.y;
        d = (_cos * coord.x) + (_sin * coord.y * aspect);
    } else {
        float dx = coord.x - light.x / dimensions.x;
        float dy = (coord.y - light.y / dimensions.y) * aspect;
        float dis = sqrt(dx * dx + dy * dy) + 0.00001;
        d = dy / dis;
    }

    vec3 dir = vec3(d, d, 0.0);

    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);
    noise = mix(noise, 0.0, 0.3);
    //fade vertically.
    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);
    mist.a = 1.0;
    // apply user alpha
    mist *= alpha;

    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;

}
`;const nt=class extends v.wn{constructor(l){super(Ie,je.replace("${perlin}",Le)),this.parallel=!0,this.time=0,this._angle=0,this.uniforms.dimensions=new Float32Array(2);const i=Object.assign(nt.defaults,l);this._angleLight=new v.E9,this.angle=i.angle,this.gain=i.gain,this.lacunarity=i.lacunarity,this.alpha=i.alpha,this.parallel=i.parallel,this.center=i.center,this.time=i.time}apply(l,i,u,c){const{width:f,height:d}=i.filterFrame;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=f,this.uniforms.dimensions[1]=d,this.uniforms.aspect=d/f,this.uniforms.time=this.time,this.uniforms.alpha=this.alpha,l.applyFilter(this,i,u,c)}get angle(){return this._angle}set angle(l){this._angle=l;const i=l*v.ZX;this._angleLight.x=Math.cos(i),this._angleLight.y=Math.sin(i)}get gain(){return this.uniforms.gain}set gain(l){this.uniforms.gain=l}get lacunarity(){return this.uniforms.lacunarity}set lacunarity(l){this.uniforms.lacunarity=l}get alpha(){return this.uniforms.alpha}set alpha(l){this.uniforms.alpha=l}};let Ne=nt;Ne.defaults={angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0],alpha:1};/*!
 * @pixi/filter-grayscale - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-grayscale is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ve=null,Xe=null;class Zr extends null{constructor(){super(Ve,Xe)}}/*!
 * @pixi/filter-hsl-adjustment - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-hsl-adjustment is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var qe=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Ge=`precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uHue;
uniform float uAlpha;
uniform bool uColorize;
uniform float uSaturation;
uniform float uLightness;

// https://en.wikipedia.org/wiki/Luma_(video)
const vec3 weight = vec3(0.299, 0.587, 0.114);

float getWeightedAverage(vec3 rgb) {
    return rgb.r * weight.r + rgb.g * weight.g + rgb.b * weight.b;
}

// https://gist.github.com/mairod/a75e7b44f68110e1576d77419d608786?permalink_comment_id=3195243#gistcomment-3195243
const vec3 k = vec3(0.57735, 0.57735, 0.57735);

vec3 hueShift(vec3 color, float angle) {
    float cosAngle = cos(angle);
    return vec3(
    color * cosAngle +
    cross(k, color) * sin(angle) +
    k * dot(k, color) * (1.0 - cosAngle)
    );
}

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 result = color;

    // colorize
    if (uColorize) {
        result.rgb = vec3(getWeightedAverage(result.rgb), 0., 0.);
    }

    // hue
    result.rgb = hueShift(result.rgb, uHue);

    // saturation
    // https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/huesaturation.js
    float average = (result.r + result.g + result.b) / 3.0;

    if (uSaturation > 0.) {
        result.rgb += (average - result.rgb) * (1. - 1. / (1.001 - uSaturation));
    } else {
        result.rgb -= (average - result.rgb) * uSaturation;
    }

    // lightness
    result.rgb = mix(result.rgb, vec3(ceil(uLightness)) * color.a, abs(uLightness));

    // alpha
    gl_FragColor = mix(color, result, uAlpha);
}
`;const lt=class extends v.wn{constructor(l){super(qe,Ge),this._hue=0;const i=Object.assign({},lt.defaults,l);Object.assign(this,i)}get hue(){return this._hue}set hue(l){this._hue=l,this.uniforms.uHue=this._hue*(Math.PI/180)}get alpha(){return this.uniforms.uAlpha}set alpha(l){this.uniforms.uAlpha=l}get colorize(){return this.uniforms.uColorize}set colorize(l){this.uniforms.uColorize=l}get lightness(){return this.uniforms.uLightness}set lightness(l){this.uniforms.uLightness=l}get saturation(){return this.uniforms.uSaturation}set saturation(l){this.uniforms.uSaturation=l}};let Be=lt;Be.defaults={hue:0,saturation:0,lightness:0,colorize:!1,alpha:1};/*!
 * @pixi/filter-motion-blur - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-motion-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ye=null,We=null;class Qr extends null{constructor(i=[0,0],u=5,c=0){super(Ye,We),this.kernelSize=5,this.uniforms.uVelocity=new Float32Array(2),this._velocity=new s(this.velocityChanged,this),this.setVelocity(i),this.kernelSize=u,this.offset=c}apply(i,u,c,f){const{x:d,y:m}=this.velocity;this.uniforms.uKernelSize=d!==0||m!==0?this.kernelSize:0,i.applyFilter(this,u,c,f)}set velocity(i){this.setVelocity(i)}get velocity(){return this._velocity}setVelocity(i){if(Array.isArray(i)){const[u,c]=i;this._velocity.set(u,c)}else this._velocity.copyFrom(i)}velocityChanged(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y,this.padding=(Math.max(Math.abs(this._velocity.x),Math.abs(this._velocity.y))>>0)+1}set offset(i){this.uniforms.uOffset=i}get offset(){return this.uniforms.uOffset}}/*!
 * @pixi/filter-multi-color-replace - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-multi-color-replace is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ke=null,$e=null;class Jr extends null{constructor(i,u=.05,c=i.length){super(Ke,$e.replace(/%maxColors%/g,c.toFixed(0))),this._replacements=[],this._maxColors=0,this.epsilon=u,this._maxColors=c,this.uniforms.originalColors=new Float32Array(c*3),this.uniforms.targetColors=new Float32Array(c*3),this.replacements=i}set replacements(i){const u=this.uniforms.originalColors,c=this.uniforms.targetColors,f=i.length;if(f>this._maxColors)throw new Error(`Length of replacements (${f}) exceeds the maximum colors length (${this._maxColors})`);u[f*3]=-1;for(let d=0;d<f;d++){const m=i[d];let g=m[0];typeof g=="number"?g=a.hex2rgb(g):m[0]=a.rgb2hex(g),u[d*3]=g[0],u[d*3+1]=g[1],u[d*3+2]=g[2];let p=m[1];typeof p=="number"?p=a.hex2rgb(p):m[1]=a.rgb2hex(p),c[d*3]=p[0],c[d*3+1]=p[1],c[d*3+2]=p[2]}this._replacements=i}get replacements(){return this._replacements}refresh(){this.replacements=this._replacements}get maxColors(){return this._maxColors}set epsilon(i){this.uniforms.epsilon=i}get epsilon(){return this.uniforms.epsilon}}/*!
 * @pixi/filter-old-film - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-old-film is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ue=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,He=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;

uniform float sepia;
uniform float noise;
uniform float noiseSize;
uniform float scratch;
uniform float scratchDensity;
uniform float scratchWidth;
uniform float vignetting;
uniform float vignettingAlpha;
uniform float vignettingBlur;
uniform float seed;

const float SQRT_2 = 1.414213;
const vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 Overlay(vec3 src, vec3 dst)
{
    // if (dst <= 0.5) then: 2 * src * dst
    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)
    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),
                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),
                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));
}


void main()
{
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    vec3 color = gl_FragColor.rgb;

    if (sepia > 0.0)
    {
        float gray = (color.x + color.y + color.z) / 3.0;
        vec3 grayscale = vec3(gray);

        color = Overlay(SEPIA_RGB, grayscale);

        color = grayscale + sepia * (color - grayscale);
    }

    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;

    if (vignetting > 0.0)
    {
        float outter = SQRT_2 - vignetting * SQRT_2;
        vec2 dir = vec2(vec2(0.5, 0.5) - coord);
        dir.y *= dimensions.y / dimensions.x;
        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);
        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);
    }

    if (scratchDensity > seed && scratch != 0.0)
    {
        float phase = seed * 256.0;
        float s = mod(floor(phase), 2.0);
        float dist = 1.0 / scratchDensity;
        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));
        if (d < seed * 0.6 + 0.4)
        {
            highp float period = scratchDensity * 10.0;

            float xx = coord.x * period + phase;
            float aa = abs(mod(xx, 0.5) * 4.0);
            float bb = mod(floor(xx / 0.5), 2.0);
            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);

            float kk = 2.0 * period;
            float dw = scratchWidth / dimensions.x * (0.75 + seed);
            float dh = dw * kk;

            float tine = (yy - (2.0 - dh));

            if (tine > 0.0) {
                float _sign = sign(scratch);

                tine = s * tine / period + scratch + 0.1;
                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);

                color.rgb *= tine;
            }
        }
    }

    if (noise > 0.0 && noiseSize > 0.0)
    {
        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;
        pixelCoord.x = floor(pixelCoord.x / noiseSize);
        pixelCoord.y = floor(pixelCoord.y / noiseSize);
        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);
        // float _noise = snoise(d) * 0.5;
        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;
        color += _noise * noise;
    }

    gl_FragColor.rgb = color;
}
`;const at=class extends v.wn{constructor(l,i=0){super(Ue,He),this.seed=0,this.uniforms.dimensions=new Float32Array(2),typeof l=="number"?(this.seed=l,l=void 0):this.seed=i,Object.assign(this,at.defaults,l)}apply(l,i,u,c){var f,d;this.uniforms.dimensions[0]=(f=i.filterFrame)==null?void 0:f.width,this.uniforms.dimensions[1]=(d=i.filterFrame)==null?void 0:d.height,this.uniforms.seed=this.seed,l.applyFilter(this,i,u,c)}set sepia(l){this.uniforms.sepia=l}get sepia(){return this.uniforms.sepia}set noise(l){this.uniforms.noise=l}get noise(){return this.uniforms.noise}set noiseSize(l){this.uniforms.noiseSize=l}get noiseSize(){return this.uniforms.noiseSize}set scratch(l){this.uniforms.scratch=l}get scratch(){return this.uniforms.scratch}set scratchDensity(l){this.uniforms.scratchDensity=l}get scratchDensity(){return this.uniforms.scratchDensity}set scratchWidth(l){this.uniforms.scratchWidth=l}get scratchWidth(){return this.uniforms.scratchWidth}set vignetting(l){this.uniforms.vignetting=l}get vignetting(){return this.uniforms.vignetting}set vignettingAlpha(l){this.uniforms.vignettingAlpha=l}get vignettingAlpha(){return this.uniforms.vignettingAlpha}set vignettingBlur(l){this.uniforms.vignettingBlur=l}get vignettingBlur(){return this.uniforms.vignettingBlur}};let Ze=at;Ze.defaults={sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3};/*!
 * @pixi/filter-outline - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-outline is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Qe=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Je=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterClamp;

uniform float uAlpha;
uniform vec2 uThickness;
uniform vec4 uColor;
uniform bool uKnockout;

const float DOUBLE_PI = 2. * 3.14159265358979323846264;
const float ANGLE_STEP = \${angleStep};

float outlineMaxAlphaAtPos(vec2 pos) {
    if (uThickness.x == 0. || uThickness.y == 0.) {
        return 0.;
    }

    vec4 displacedColor;
    vec2 displacedPos;
    float maxAlpha = 0.;

    for (float angle = 0.; angle <= DOUBLE_PI; angle += ANGLE_STEP) {
        displacedPos.x = vTextureCoord.x + uThickness.x * cos(angle);
        displacedPos.y = vTextureCoord.y + uThickness.y * sin(angle);
        displacedColor = texture2D(uSampler, clamp(displacedPos, filterClamp.xy, filterClamp.zw));
        maxAlpha = max(maxAlpha, displacedColor.a);
    }

    return maxAlpha;
}

void main(void) {
    vec4 sourceColor = texture2D(uSampler, vTextureCoord);
    vec4 contentColor = sourceColor * float(!uKnockout);
    float outlineAlpha = uAlpha * outlineMaxAlphaAtPos(vTextureCoord.xy) * (1.-sourceColor.a);
    vec4 outlineColor = vec4(vec3(uColor) * outlineAlpha, outlineAlpha);
    gl_FragColor = contentColor + outlineColor;
}
`;const E=class extends v.wn{constructor(l=1,i=0,u=.1,c=1,f=!1){super(Qe,Je.replace(/\$\{angleStep\}/,E.getAngleStep(u))),this._thickness=1,this._alpha=1,this._knockout=!1,this.uniforms.uThickness=new Float32Array([0,0]),this.uniforms.uColor=new Float32Array([0,0,0,1]),this.uniforms.uAlpha=c,this.uniforms.uKnockout=f,Object.assign(this,{thickness:l,color:i,quality:u,alpha:c,knockout:f})}static getAngleStep(l){const i=Math.max(l*E.MAX_SAMPLES,E.MIN_SAMPLES);return(Math.PI*2/i).toFixed(7)}apply(l,i,u,c){this.uniforms.uThickness[0]=this._thickness/i._frame.width,this.uniforms.uThickness[1]=this._thickness/i._frame.height,this.uniforms.uAlpha=this._alpha,this.uniforms.uKnockout=this._knockout,l.applyFilter(this,i,u,c)}get alpha(){return this._alpha}set alpha(l){this._alpha=l}get color(){return v.P6.rgb2hex(this.uniforms.uColor)}set color(l){v.P6.hex2rgb(l,this.uniforms.uColor)}get knockout(){return this._knockout}set knockout(l){this._knockout=l}get thickness(){return this._thickness}set thickness(l){this._thickness=l,this.padding=l}};let ut=E;ut.MIN_SAMPLES=1,ut.MAX_SAMPLES=100;/*!
 * @pixi/filter-pixelate - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-pixelate is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var tr=null,er=null;class ti extends null{constructor(i=10){super(tr,er),this.size=i}get size(){return this.uniforms.size}set size(i){typeof i=="number"&&(i=[i,i]),this.uniforms.size=i}}/*!
 * @pixi/filter-radial-blur - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-radial-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var rr=null,ir=null;class ei extends null{constructor(i=0,u=[0,0],c=5,f=-1){super(rr,ir),this._angle=0,this.angle=i,this.center=u,this.kernelSize=c,this.radius=f}apply(i,u,c,f){this.uniforms.uKernelSize=this._angle!==0?this.kernelSize:0,i.applyFilter(this,u,c,f)}set angle(i){this._angle=i,this.uniforms.uRadian=i*Math.PI/180}get angle(){return this._angle}get center(){return this.uniforms.uCenter}set center(i){this.uniforms.uCenter=i}get radius(){return this.uniforms.uRadius}set radius(i){(i<0||i===1/0)&&(i=-1),this.uniforms.uRadius=i}}/*!
 * @pixi/filter-reflection - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-reflection is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var or=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,sr=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 filterArea;
uniform vec4 filterClamp;
uniform vec2 dimensions;

uniform bool mirror;
uniform float boundary;
uniform vec2 amplitude;
uniform vec2 waveLength;
uniform vec2 alpha;
uniform float time;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(void)
{
    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;
    vec2 coord = pixelCoord / dimensions;

    if (coord.y < boundary) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
        return;
    }

    float k = (coord.y - boundary) / (1. - boundary + 0.0001);
    float areaY = boundary * dimensions.y / filterArea.y;
    float v = areaY + areaY - vTextureCoord.y;
    float y = mirror ? v : vTextureCoord.y;

    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;
    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;
    float _alpha = (alpha.y - alpha.x) * k + alpha.x;

    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;
    x = clamp(x, filterClamp.x, filterClamp.z);

    vec4 color = texture2D(uSampler, vec2(x, y));

    gl_FragColor = color * _alpha;
}
`;const ct=class extends v.wn{constructor(l){super(or,sr),this.time=0,this.uniforms.amplitude=new Float32Array(2),this.uniforms.waveLength=new Float32Array(2),this.uniforms.alpha=new Float32Array(2),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,ct.defaults,l)}apply(l,i,u,c){var f,d;this.uniforms.dimensions[0]=(f=i.filterFrame)==null?void 0:f.width,this.uniforms.dimensions[1]=(d=i.filterFrame)==null?void 0:d.height,this.uniforms.time=this.time,l.applyFilter(this,i,u,c)}set mirror(l){this.uniforms.mirror=l}get mirror(){return this.uniforms.mirror}set boundary(l){this.uniforms.boundary=l}get boundary(){return this.uniforms.boundary}set amplitude(l){this.uniforms.amplitude[0]=l[0],this.uniforms.amplitude[1]=l[1]}get amplitude(){return this.uniforms.amplitude}set waveLength(l){this.uniforms.waveLength[0]=l[0],this.uniforms.waveLength[1]=l[1]}get waveLength(){return this.uniforms.waveLength}set alpha(l){this.uniforms.alpha[0]=l[0],this.uniforms.alpha[1]=l[1]}get alpha(){return this.uniforms.alpha}};let nr=ct;nr.defaults={mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0};/*!
 * @pixi/filter-rgb-split - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-rgb-split is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var lr=null,ar=null;class ri extends null{constructor(i=[-10,0],u=[0,10],c=[0,0]){super(lr,ar),this.red=i,this.green=u,this.blue=c}get red(){return this.uniforms.red}set red(i){this.uniforms.red=i}get green(){return this.uniforms.green}set green(i){this.uniforms.green=i}get blue(){return this.uniforms.blue}set blue(i){this.uniforms.blue=i}}/*!
 * @pixi/filter-shockwave - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-shockwave is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var ur=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,cr=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec4 filterClamp;

uniform vec2 center;

uniform float amplitude;
uniform float wavelength;
// uniform float power;
uniform float brightness;
uniform float speed;
uniform float radius;

uniform float time;

const float PI = 3.14159;

void main()
{
    float halfWavelength = wavelength * 0.5 / filterArea.x;
    float maxRadius = radius / filterArea.x;
    float currentRadius = time * speed / filterArea.x;

    float fade = 1.0;

    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            gl_FragColor = texture2D(uSampler, vTextureCoord);
            return;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }

    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);
    dir.y *= filterArea.y / filterArea.x;
    float dist = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
        return;
    }

    vec2 diffUV = normalize(dir);

    float diff = (dist - currentRadius) / halfWavelength;

    float p = 1.0 - pow(abs(diff), 2.0);

    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );
    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );

    vec2 offset = diffUV * powDiff / filterArea.xy;

    // Do clamp :
    vec2 coord = vTextureCoord + offset;
    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);
    vec4 color = texture2D(uSampler, clampedCoord);
    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    // No clamp :
    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);

    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;

    gl_FragColor = color;
}
`;const ft=class extends v.wn{constructor(l=[0,0],i,u=0){super(ur,cr),this.center=l,Object.assign(this,ft.defaults,i),this.time=u}apply(l,i,u,c){this.uniforms.time=this.time,l.applyFilter(this,i,u,c)}get center(){return this.uniforms.center}set center(l){this.uniforms.center=l}get amplitude(){return this.uniforms.amplitude}set amplitude(l){this.uniforms.amplitude=l}get wavelength(){return this.uniforms.wavelength}set wavelength(l){this.uniforms.wavelength=l}get brightness(){return this.uniforms.brightness}set brightness(l){this.uniforms.brightness=l}get speed(){return this.uniforms.speed}set speed(l){this.uniforms.speed=l}get radius(){return this.uniforms.radius}set radius(l){this.uniforms.radius=l}};let fr=ft;fr.defaults={amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1};/*!
 * @pixi/filter-simple-lightmap - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-simple-lightmap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var hr=null,dr=null;class ii extends null{constructor(i,u=0,c=1){super(hr,dr),this._color=0,this.uniforms.dimensions=new Float32Array(2),this.uniforms.ambientColor=new Float32Array([0,0,0,c]),this.texture=i,this.color=u}apply(i,u,c,f){var d,m;this.uniforms.dimensions[0]=(d=u.filterFrame)==null?void 0:d.width,this.uniforms.dimensions[1]=(m=u.filterFrame)==null?void 0:m.height,i.applyFilter(this,u,c,f)}get texture(){return this.uniforms.uLightmap}set texture(i){this.uniforms.uLightmap=i}set color(i){const u=this.uniforms.ambientColor;typeof i=="number"?(n.hex2rgb(i,u),this._color=i):(u[0]=i[0],u[1]=i[1],u[2]=i[2],u[3]=i[3],this._color=n.rgb2hex(u))}get color(){return this._color}get alpha(){return this.uniforms.ambientColor[3]}set alpha(i){this.uniforms.ambientColor[3]=i}}/*!
 * @pixi/filter-tilt-shift - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-tilt-shift is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var mr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,gr=`varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float blur;
uniform float gradientBlur;
uniform vec2 start;
uniform vec2 end;
uniform vec2 delta;
uniform vec2 texSize;

float random(vec3 scale, float seed)
{
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

void main(void)
{
    vec4 color = vec4(0.0);
    float total = 0.0;

    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));
    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;

    for (float t = -30.0; t <= 30.0; t++)
    {
        float percent = (t + offset - 0.5) / 30.0;
        float weight = 1.0 - abs(percent);
        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);
        sample.rgb *= sample.a;
        color += sample * weight;
        total += weight;
    }

    color /= total;
    color.rgb /= color.a + 0.00001;

    gl_FragColor = color;
}
`;class ht extends v.wn{constructor(i){var u,c;super(mr,gr),this.uniforms.blur=i.blur,this.uniforms.gradientBlur=i.gradientBlur,this.uniforms.start=(u=i.start)!=null?u:new v.E9(0,window.innerHeight/2),this.uniforms.end=(c=i.end)!=null?c:new v.E9(600,window.innerHeight/2),this.uniforms.delta=new v.E9(30,30),this.uniforms.texSize=new v.E9(window.innerWidth,window.innerHeight),this.updateDelta()}updateDelta(){this.uniforms.delta.x=0,this.uniforms.delta.y=0}get blur(){return this.uniforms.blur}set blur(i){this.uniforms.blur=i}get gradientBlur(){return this.uniforms.gradientBlur}set gradientBlur(i){this.uniforms.gradientBlur=i}get start(){return this.uniforms.start}set start(i){this.uniforms.start=i,this.updateDelta()}get end(){return this.uniforms.end}set end(i){this.uniforms.end=i,this.updateDelta()}}class pr extends ht{updateDelta(){const i=this.uniforms.end.x-this.uniforms.start.x,u=this.uniforms.end.y-this.uniforms.start.y,c=Math.sqrt(i*i+u*u);this.uniforms.delta.x=i/c,this.uniforms.delta.y=u/c}}class vr extends ht{updateDelta(){const i=this.uniforms.end.x-this.uniforms.start.x,u=this.uniforms.end.y-this.uniforms.start.y,c=Math.sqrt(i*i+u*u);this.uniforms.delta.x=-u/c,this.uniforms.delta.y=i/c}}const dt=class extends v.wn{constructor(l,i,u,c){super(),typeof l=="number"&&(v.P6.deprecation("5.3.0","TiltShiftFilter constructor arguments is deprecated, use options."),l={blur:l,gradientBlur:i,start:u,end:c}),l=Object.assign({},dt.defaults,l),this.tiltShiftXFilter=new pr(l),this.tiltShiftYFilter=new vr(l)}apply(l,i,u,c){const f=l.getFilterTexture();this.tiltShiftXFilter.apply(l,i,f,1),this.tiltShiftYFilter.apply(l,f,u,c),l.returnFilterTexture(f)}get blur(){return this.tiltShiftXFilter.blur}set blur(l){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=l}get gradientBlur(){return this.tiltShiftXFilter.gradientBlur}set gradientBlur(l){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=l}get start(){return this.tiltShiftXFilter.start}set start(l){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=l}get end(){return this.tiltShiftXFilter.end}set end(l){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=l}};let _r=dt;_r.defaults={blur:100,gradientBlur:600,start:void 0,end:void 0};/*!
 * @pixi/filter-twist - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-twist is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var xr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,yr=`varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float radius;
uniform float angle;
uniform vec2 offset;
uniform vec4 filterArea;

vec2 mapCoord( vec2 coord )
{
    coord *= filterArea.xy;
    coord += filterArea.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord -= filterArea.zw;
    coord /= filterArea.xy;

    return coord;
}

vec2 twist(vec2 coord)
{
    coord -= offset;

    float dist = length(coord);

    if (dist < radius)
    {
        float ratioDist = (radius - dist) / radius;
        float angleMod = ratioDist * ratioDist * angle;
        float s = sin(angleMod);
        float c = cos(angleMod);
        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);
    }

    coord += offset;

    return coord;
}

void main(void)
{

    vec2 coord = mapCoord(vTextureCoord);

    coord = twist(coord);

    coord = unmapCoord(coord);

    gl_FragColor = texture2D(uSampler, coord );

}
`;const mt=class extends v.wn{constructor(l){super(xr,yr),Object.assign(this,mt.defaults,l)}get offset(){return this.uniforms.offset}set offset(l){this.uniforms.offset=l}get radius(){return this.uniforms.radius}set radius(l){this.uniforms.radius=l}get angle(){return this.uniforms.angle}set angle(l){this.uniforms.angle=l}};let br=mt;br.defaults={radius:200,angle:4,padding:20,offset:new v.E9};/*!
 * @pixi/filter-zoom-blur - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-zoom-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Cr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Sr=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;

uniform vec2 uCenter;
uniform float uStrength;
uniform float uInnerRadius;
uniform float uRadius;

const float MAX_KERNEL_SIZE = \${maxKernelSize};

// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand(vec2 co, float seed) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);
    return fract(sin(sn) * c + seed);
}

void main() {

    float minGradient = uInnerRadius * 0.3;
    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;

    float gradient = uRadius * 0.3;
    float radius = (uRadius - gradient * 0.5) / filterArea.x;

    float countLimit = MAX_KERNEL_SIZE;

    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);
    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));

    float strength = uStrength;

    float delta = 0.0;
    float gap;
    if (dist < innerRadius) {
        delta = innerRadius - dist;
        gap = minGradient;
    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity
        delta = dist - radius;
        gap = gradient;
    }

    if (delta > 0.0) {
        float normalCount = gap / filterArea.x;
        delta = (normalCount - delta) / normalCount;
        countLimit *= delta;
        strength *= delta;
        if (countLimit < 1.0)
        {
            gl_FragColor = texture2D(uSampler, vTextureCoord);
            return;
        }
    }

    // randomize the lookup values to hide the fixed number of samples
    float offset = rand(vTextureCoord, 0.0);

    float total = 0.0;
    vec4 color = vec4(0.0);

    dir *= strength;

    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {
        float percent = (t + offset) / MAX_KERNEL_SIZE;
        float weight = 4.0 * (percent - percent * percent);
        vec2 p = vTextureCoord + dir * percent;
        vec4 sample = texture2D(uSampler, p);

        // switch to pre-multiplied alpha to correctly blur transparent images
        // sample.rgb *= sample.a;

        color += sample * weight;
        total += weight;

        if (t > countLimit){
            break;
        }
    }

    color /= total;
    // switch back from pre-multiplied alpha
    // color.rgb /= color.a + 0.00001;

    gl_FragColor = color;
}
`,gt=Object.getOwnPropertySymbols,wr=Object.prototype.hasOwnProperty,Tr=Object.prototype.propertyIsEnumerable,Ar=(l,i)=>{var u={};for(var c in l)wr.call(l,c)&&i.indexOf(c)<0&&(u[c]=l[c]);if(l!=null&&gt)for(var c of gt(l))i.indexOf(c)<0&&Tr.call(l,c)&&(u[c]=l[c]);return u};const pt=class extends v.wn{constructor(l){const i=Object.assign(pt.defaults,l),{maxKernelSize:u}=i,c=Ar(i,["maxKernelSize"]);super(Cr,Sr.replace("${maxKernelSize}",u.toFixed(1))),Object.assign(this,c)}get center(){return this.uniforms.uCenter}set center(l){this.uniforms.uCenter=l}get strength(){return this.uniforms.uStrength}set strength(l){this.uniforms.uStrength=l}get innerRadius(){return this.uniforms.uInnerRadius}set innerRadius(l){this.uniforms.uInnerRadius=l}get radius(){return this.uniforms.uRadius}set radius(l){(l<0||l===1/0)&&(l=-1),this.uniforms.uRadius=l}};let zr=pt;zr.defaults={strength:.1,center:[0,0],innerRadius:0,radius:-1,maxKernelSize:32};/*!
 * pixi-filters - v5.2.1
 * Compiled Fri, 24 Mar 2023 22:12:11 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */}}]);
