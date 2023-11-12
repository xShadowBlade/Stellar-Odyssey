"use strict";(self.webpackChunkstellar_odyssey=self.webpackChunkstellar_odyssey||[]).push([[544],{544:function(Xr,Ae,E){E.d(Ae,{Vw:function(){return ue}});var y=E(774);/*!
 * @pixi/filter-adjustment - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-adjustment is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Fe=null,Pe=null;class Gr extends null{constructor(u){super(Fe,Pe),this.gamma=1,this.saturation=1,this.contrast=1,this.brightness=1,this.red=1,this.green=1,this.blue=1,this.alpha=1,Object.assign(this,u)}apply(u,f,d,g){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,u.applyFilter(this,f,d,g)}}/*!
 * @pixi/filter-kawase-blur - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-kawase-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Me=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,ke=`
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
}`,De=`
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
`;class L extends y.wn{constructor(u=4,f=3,d=!1){super(Me,d?De:ke),this._kernels=[],this._blur=4,this._quality=3,this.uniforms.uOffset=new Float32Array(2),this._pixelSize=new y.E9,this.pixelSize=1,this._clamp=d,Array.isArray(u)?this.kernels=u:(this._blur=u,this.quality=f)}apply(u,f,d,g){const v=this._pixelSize.x/f._frame.width,p=this._pixelSize.y/f._frame.height;let x;if(this._quality===1||this._blur===0)x=this._kernels[0]+.5,this.uniforms.uOffset[0]=x*v,this.uniforms.uOffset[1]=x*p,u.applyFilter(this,f,d,g);else{const _=u.getFilterTexture();let T=f,P=_,R;const z=this._quality-1;for(let M=0;M<z;M++)x=this._kernels[M]+.5,this.uniforms.uOffset[0]=x*v,this.uniforms.uOffset[1]=x*p,u.applyFilter(this,T,P,1),R=T,T=P,P=R;x=this._kernels[z]+.5,this.uniforms.uOffset[0]=x*v,this.uniforms.uOffset[1]=x*p,u.applyFilter(this,T,d,g),u.returnFilterTexture(_)}}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((u,f)=>u+f+.5,0))}_generateKernels(){const u=this._blur,f=this._quality,d=[u];if(u>0){let g=u;const v=u/f;for(let p=1;p<f;p++)g-=v,d.push(g)}this._kernels=d,this._updatePadding()}get kernels(){return this._kernels}set kernels(u){Array.isArray(u)&&u.length>0?(this._kernels=u,this._quality=u.length,this._blur=Math.max(...u)):(this._kernels=[0],this._quality=1)}get clamp(){return this._clamp}set pixelSize(u){typeof u=="number"?(this._pixelSize.x=u,this._pixelSize.y=u):Array.isArray(u)?(this._pixelSize.x=u[0],this._pixelSize.y=u[1]):u instanceof y.E9?(this._pixelSize.x=u.x,this._pixelSize.y=u.y):(this._pixelSize.x=1,this._pixelSize.y=1)}get pixelSize(){return this._pixelSize}get quality(){return this._quality}set quality(u){this._quality=Math.max(1,Math.round(u)),this._generateKernels()}get blur(){return this._blur}set blur(u){this._blur=u,this._generateKernels()}}/*!
 * @pixi/filter-advanced-bloom - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-advanced-bloom is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Z=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Oe=`
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
`;class Re extends y.wn{constructor(u=.5){super(Z,Oe),this.threshold=u}get threshold(){return this.uniforms.threshold}set threshold(u){this.uniforms.threshold=u}}var je=`uniform sampler2D uSampler;
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
`;const U=class extends y.wn{constructor(c){super(Z,je),this.bloomScale=1,this.brightness=1,this._resolution=y.Xd.FILTER_RESOLUTION,typeof c=="number"&&(c={threshold:c});const u=Object.assign(U.defaults,c);this.bloomScale=u.bloomScale,this.brightness=u.brightness;const{kernels:f,blur:d,quality:g,pixelSize:v,resolution:p}=u;this._extractFilter=new Re(u.threshold),this._extractFilter.resolution=p,this._blurFilter=f?new L(f):new L(d,g),this.pixelSize=v,this.resolution=p}apply(c,u,f,d,g){const v=c.getFilterTexture();this._extractFilter.apply(c,u,v,1,g);const p=c.getFilterTexture();this._blurFilter.apply(c,v,p,1),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=p,c.applyFilter(this,u,f,d),c.returnFilterTexture(p),c.returnFilterTexture(v)}get resolution(){return this._resolution}set resolution(c){this._resolution=c,this._extractFilter&&(this._extractFilter.resolution=c),this._blurFilter&&(this._blurFilter.resolution=c)}get threshold(){return this._extractFilter.threshold}set threshold(c){this._extractFilter.threshold=c}get kernels(){return this._blurFilter.kernels}set kernels(c){this._blurFilter.kernels=c}get blur(){return this._blurFilter.blur}set blur(c){this._blurFilter.blur=c}get quality(){return this._blurFilter.quality}set quality(c){this._blurFilter.quality=c}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(c){this._blurFilter.pixelSize=c}};let Ee=U;Ee.defaults={threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:y.Xd.FILTER_RESOLUTION};/*!
 * @pixi/filter-ascii - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-ascii is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Le=null,Ie=null;class Br extends null{constructor(u=8){super(Le,Ie),this.size=u}get size(){return this.uniforms.pixelSize}set size(u){this.uniforms.pixelSize=u}}/*!
 * @pixi/filter-bevel - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-bevel is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ve=null,Ne=null;class qr extends null{constructor(u){super(Ve,Ne),this._thickness=2,this._angle=0,this.uniforms.lightColor=new Float32Array(3),this.uniforms.shadowColor=new Float32Array(3),Object.assign(this,{rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},u),this.padding=1}_updateTransform(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)}get rotation(){return this._angle/t}set rotation(u){this._angle=u*t,this._updateTransform()}get thickness(){return this._thickness}set thickness(u){this._thickness=u,this._updateTransform()}get lightColor(){return r.rgb2hex(this.uniforms.lightColor)}set lightColor(u){r.hex2rgb(u,this.uniforms.lightColor)}get lightAlpha(){return this.uniforms.lightAlpha}set lightAlpha(u){this.uniforms.lightAlpha=u}get shadowColor(){return r.rgb2hex(this.uniforms.shadowColor)}set shadowColor(u){r.hex2rgb(u,this.uniforms.shadowColor)}get shadowAlpha(){return this.uniforms.shadowAlpha}set shadowAlpha(u){this.uniforms.shadowAlpha=u}}var Kr=E(121),Wr=E(844);/*!
 * @pixi/filter-bloom - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-bloom is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */class Yr extends null{constructor(u=2,f=4,d=n.FILTER_RESOLUTION,g=5){super();let v,p;typeof u=="number"?(v=u,p=u):u instanceof F?(v=u.x,p=u.y):Array.isArray(u)&&(v=u[0],p=u[1]),this.blurXFilter=new s(!0,v,f,d,g),this.blurYFilter=new s(!1,p,f,d,g),this.blurYFilter.blendMode=o.SCREEN,this.defaultFilter=new h}apply(u,f,d,g){const v=u.getFilterTexture();this.defaultFilter.apply(u,f,d,g),this.blurXFilter.apply(u,f,v,1),this.blurYFilter.apply(u,v,d,0),u.returnFilterTexture(v)}get blur(){return this.blurXFilter.blur}set blur(u){this.blurXFilter.blur=this.blurYFilter.blur=u}get blurX(){return this.blurXFilter.blur}set blurX(u){this.blurXFilter.blur=u}get blurY(){return this.blurYFilter.blur}set blurY(u){this.blurYFilter.blur=u}}/*!
 * @pixi/filter-bulge-pinch - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-bulge-pinch is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Xe=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Ge=`uniform float radius;
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
`;const H=class extends y.wn{constructor(c){super(Xe,Ge),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,H.defaults,c)}apply(c,u,f,d){const{width:g,height:v}=u.filterFrame;this.uniforms.dimensions[0]=g,this.uniforms.dimensions[1]=v,c.applyFilter(this,u,f,d)}get radius(){return this.uniforms.radius}set radius(c){this.uniforms.radius=c}get strength(){return this.uniforms.strength}set strength(c){this.uniforms.strength=c}get center(){return this.uniforms.center}set center(c){this.uniforms.center=c}};let Be=H;Be.defaults={center:[.5,.5],radius:100,strength:1};/*!
 * @pixi/filter-color-gradient - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-color-gradient is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var qe=`const float PI = 3.1415926538;
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
`,Ke=`attribute vec2 aVertexPosition;
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
`,O=O||{};O.stringify=function(){var c={"visit_linear-gradient":function(u){return c.visit_gradient(u)},"visit_repeating-linear-gradient":function(u){return c.visit_gradient(u)},"visit_radial-gradient":function(u){return c.visit_gradient(u)},"visit_repeating-radial-gradient":function(u){return c.visit_gradient(u)},visit_gradient:function(u){var f=c.visit(u.orientation);return f&&(f+=", "),u.type+"("+f+c.visit(u.colorStops)+")"},visit_shape:function(u){var f=u.value,d=c.visit(u.at),g=c.visit(u.style);return g&&(f+=" "+g),d&&(f+=" at "+d),f},"visit_default-radial":function(u){var f="",d=c.visit(u.at);return d&&(f+=d),f},"visit_extent-keyword":function(u){var f=u.value,d=c.visit(u.at);return d&&(f+=" at "+d),f},"visit_position-keyword":function(u){return u.value},visit_position:function(u){return c.visit(u.value.x)+" "+c.visit(u.value.y)},"visit_%":function(u){return u.value+"%"},visit_em:function(u){return u.value+"em"},visit_px:function(u){return u.value+"px"},visit_literal:function(u){return c.visit_color(u.value,u)},visit_hex:function(u){return c.visit_color("#"+u.value,u)},visit_rgb:function(u){return c.visit_color("rgb("+u.value.join(", ")+")",u)},visit_rgba:function(u){return c.visit_color("rgba("+u.value.join(", ")+")",u)},visit_color:function(u,f){var d=u,g=c.visit(f.length);return g&&(d+=" "+g),d},visit_angular:function(u){return u.value+"deg"},visit_directional:function(u){return"to "+u.value},visit_array:function(u){var f="",d=u.length;return u.forEach(function(g,v){f+=c.visit(g),v<d-1&&(f+=", ")}),f},visit:function(u){if(!u)return"";var f="";if(u instanceof Array)return c.visit_array(u,f);if(u.type){var d=c["visit_"+u.type];if(d)return d(u);throw Error("Missing visitor visit_"+u.type)}else throw Error("Invalid node.")}};return function(u){return c.visit(u)}}();var O=O||{};O.parse=function(){var c={linearGradient:/^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,repeatingLinearGradient:/^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,radialGradient:/^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,repeatingRadialGradient:/^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,sideOrCorner:/^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,extentKeywords:/^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,positionKeywords:/^(left|center|right|top|bottom)/i,pixelValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,percentageValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,emValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,angleValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,startCall:/^\(/,endCall:/^\)/,comma:/^,/,hexColor:/^\#([0-9a-fA-F]+)/,literalColor:/^([a-zA-Z]+)/,rgbColor:/^rgb/i,rgbaColor:/^rgba/i,number:/^(([0-9]*\.[0-9]+)|([0-9]+\.?))/},u="";function f(C){var S=new Error(u+": "+C);throw S.source=u,S}function d(){var C=g();return u.length>0&&f("Invalid input not EOF"),C}function g(){return N(v)}function v(){return p("linear-gradient",c.linearGradient,_)||p("repeating-linear-gradient",c.repeatingLinearGradient,_)||p("radial-gradient",c.radialGradient,R)||p("repeating-radial-gradient",c.repeatingRadialGradient,R)}function p(C,S,w){return x(S,function(D){var ze=w();return ze&&(k(c.comma)||f("Missing comma before color stops")),{type:C,orientation:ze,colorStops:N(Rr)}})}function x(C,S){var w=k(C);if(w){k(c.startCall)||f("Missing (");var D=S(w);return k(c.endCall)||f("Missing )"),D}}function _(){return T()||P()}function T(){return A("directional",c.sideOrCorner,1)}function P(){return A("angular",c.angleValue,1)}function R(){var C,S=z(),w;return S&&(C=[],C.push(S),w=u,k(c.comma)&&(S=z(),S?C.push(S):u=w)),C}function z(){var C=M()||Dr();if(C)C.at=Ce();else{var S=$();if(S){C=S;var w=Ce();w&&(C.at=w)}else{var D=be();D&&(C={type:"default-radial",at:D})}}return C}function M(){var C=A("shape",/^(circle)/i,0);return C&&(C.style=Te()||$()),C}function Dr(){var C=A("shape",/^(ellipse)/i,0);return C&&(C.style=X()||$()),C}function $(){return A("extent-keyword",c.extentKeywords,1)}function Ce(){if(A("position",/^at/,0)){var C=be();return C||f("Missing positioning value"),C}}function be(){var C=Or();if(C.x||C.y)return{type:"position",value:C}}function Or(){return{x:X(),y:X()}}function N(C){var S=C(),w=[];if(S)for(w.push(S);k(c.comma);)S=C(),S?w.push(S):f("One extra comma");return w}function Rr(){var C=jr();return C||f("Expected color definition"),C.length=X(),C}function jr(){return Lr()||Vr()||Ir()||Er()}function Er(){return A("literal",c.literalColor,0)}function Lr(){return A("hex",c.hexColor,1)}function Ir(){return x(c.rgbColor,function(){return{type:"rgb",value:N(Se)}})}function Vr(){return x(c.rgbaColor,function(){return{type:"rgba",value:N(Se)}})}function Se(){return k(c.number)[1]}function X(){return A("%",c.percentageValue,1)||Nr()||Te()}function Nr(){return A("position-keyword",c.positionKeywords,1)}function Te(){return A("px",c.pixelValue,1)||A("em",c.emValue,1)}function A(C,S,w){var D=k(S);if(D)return{type:C,value:D[w]}}function k(C){var S,w;return w=/^[\n\r\t\s]+/.exec(u),w&&we(w[0].length),S=C.exec(u),S&&we(S[0].length),S}function we(C){u=u.substr(C)}return function(C){return u=C.toString(),d()}}();var We=O.parse;O.stringify;var Q={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},J={red:0,orange:60,yellow:120,green:180,blue:240,purple:300};function Ye(c){var u,f=[],d=1,g;if(typeof c=="string")if(Q[c])f=Q[c].slice(),g="rgb";else if(c==="transparent")d=0,g="rgb",f=[0,0,0];else if(/^#[A-Fa-f0-9]+$/.test(c)){var v=c.slice(1),p=v.length,x=p<=4;d=1,x?(f=[parseInt(v[0]+v[0],16),parseInt(v[1]+v[1],16),parseInt(v[2]+v[2],16)],p===4&&(d=parseInt(v[3]+v[3],16)/255)):(f=[parseInt(v[0]+v[1],16),parseInt(v[2]+v[3],16),parseInt(v[4]+v[5],16)],p===8&&(d=parseInt(v[6]+v[7],16)/255)),f[0]||(f[0]=0),f[1]||(f[1]=0),f[2]||(f[2]=0),g="rgb"}else if(u=/^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(c)){var _=u[1],T=_==="rgb",v=_.replace(/a$/,"");g=v;var p=v==="cmyk"?4:v==="gray"?1:3;f=u[2].trim().split(/\s*[,\/]\s*|\s+/).map(function(z,M){if(/%$/.test(z))return M===p?parseFloat(z)/100:v==="rgb"?parseFloat(z)*255/100:parseFloat(z);if(v[M]==="h"){if(/deg$/.test(z))return parseFloat(z);if(J[z]!==void 0)return J[z]}return parseFloat(z)}),_===v&&f.push(1),d=T||f[p]===void 0?1:f[p],f=f.slice(0,p)}else c.length>10&&/[0-9](?:\s|\/)/.test(c)&&(f=c.match(/([0-9]+)/g).map(function(P){return parseFloat(P)}),g=c.match(/([a-z])/ig).join("").toLowerCase());else isNaN(c)?Array.isArray(c)||c.length?(f=[c[0],c[1],c[2]],g="rgb",d=c.length===4?c[3]:1):c instanceof Object&&(c.r!=null||c.red!=null||c.R!=null?(g="rgb",f=[c.r||c.red||c.R||0,c.g||c.green||c.G||0,c.b||c.blue||c.B||0]):(g="hsl",f=[c.h||c.hue||c.H||0,c.s||c.saturation||c.S||0,c.l||c.lightness||c.L||c.b||c.brightness]),d=c.a||c.alpha||c.opacity||1,c.opacity!=null&&(d/=100)):(g="rgb",f=[c>>>16,(c&65280)>>>8,c&255]);return{space:g,values:f,alpha:d}}var G={name:"rgb",min:[0,0,0],max:[255,255,255],channel:["red","green","blue"],alias:["RGB"]},B={name:"hsl",min:[0,0,0],max:[360,100,100],channel:["hue","saturation","lightness"],alias:["HSL"],rgb:function(c){var u=c[0]/360,f=c[1]/100,d=c[2]/100,g,v,p,x,_;if(f===0)return _=d*255,[_,_,_];d<.5?v=d*(1+f):v=d+f-d*f,g=2*d-v,x=[0,0,0];for(var T=0;T<3;T++)p=u+1/3*-(T-1),p<0?p++:p>1&&p--,6*p<1?_=g+(v-g)*6*p:2*p<1?_=v:3*p<2?_=g+(v-g)*(2/3-p)*6:_=g,x[T]=_*255;return x}};G.hsl=function(c){var u=c[0]/255,f=c[1]/255,d=c[2]/255,g=Math.min(u,f,d),v=Math.max(u,f,d),p=v-g,x,_,T;return v===g?x=0:u===v?x=(f-d)/p:f===v?x=2+(d-u)/p:d===v&&(x=4+(u-f)/p),x=Math.min(x*60,360),x<0&&(x+=360),T=(g+v)/2,v===g?_=0:T<=.5?_=p/(v+g):_=p/(2-v-g),[x,_*100,T*100]};function $e(c){Array.isArray(c)&&c.raw&&(c=String.raw(...arguments));var u,f=Ye(c);if(!f.space)return[];const d=f.space[0]==="h"?B.min:G.min,g=f.space[0]==="h"?B.max:G.max;return u=Array(3),u[0]=Math.min(Math.max(f.values[0],d[0]),g[0]),u[1]=Math.min(Math.max(f.values[1],d[1]),g[1]),u[2]=Math.min(Math.max(f.values[2],d[2]),g[2]),f.space[0]==="h"&&(u=B.rgb(u)),u.push(Math.min(Math.max(f.alpha,0),1)),u}function ee(c){switch(typeof c){case"string":return Ze(c);case"number":return y.P6.hex2rgb(c);default:return c}}function Ze(c){const u=$e(c);if(!u)throw new Error(`Unable to parse color "${c}" as RGBA.`);return[u[0]/255,u[1]/255,u[2]/255,u[3]]}function Ue(c){const u=We(st(c));if(u.length===0)throw new Error("Invalid CSS gradient.");if(u.length!==1)throw new Error("Unsupported CSS gradient (multiple gradients is not supported).");const f=u[0],d=He(f.type),g=Qe(f.colorStops),v=it(f.orientation);return{type:d,stops:g,angle:v}}function He(c){const u={"linear-gradient":0,"radial-gradient":1};if(!(c in u))throw new Error(`Unsupported gradient type "${c}"`);return u[c]}function Qe(c){const u=tt(c),f=[];for(let d=0;d<c.length;d++){const g=Je(c[d]);f.push({offset:u[d],color:g.slice(0,3),alpha:g[3]})}return f}function Je(c){return ee(et(c))}function et(c){switch(c.type){case"hex":return`#${c.value}`;case"literal":return c.value;default:return`${c.type}(${c.value.join(",")})`}}function tt(c){const u=[];for(let g=0;g<c.length;g++){const v=c[g];let p=-1;v.type==="literal"&&v.length&&"type"in v.length&&v.length.type==="%"&&"value"in v.length&&(p=parseFloat(v.length.value)/100),u.push(p)}const f=g=>{for(let v=g;v<u.length;v++)if(u[v]!==-1)return{indexDelta:v-g,offset:u[v]};return{indexDelta:u.length-1-g,offset:1}};let d=0;for(let g=0;g<u.length;g++){const v=u[g];if(v!==-1)d=v;else if(g===0)u[g]=0;else if(g+1===u.length)u[g]=1;else{const p=f(g),x=(p.offset-d)/(1+p.indexDelta);for(let _=0;_<=p.indexDelta;_++)u[g+_]=d+(_+1)*x;g+=p.indexDelta,d=u[g]}}return u.map(rt)}function rt(c){return c.toString().length>6?parseFloat(c.toString().substring(0,6)):c}function it(c){if(typeof c=="undefined")return 0;if("type"in c&&"value"in c)switch(c.type){case"angular":return parseFloat(c.value);case"directional":return ot(c.value)}return 0}function ot(c){const u={left:270,top:0,bottom:180,right:90,"left top":315,"top left":315,"left bottom":225,"bottom left":225,"right top":45,"top right":45,"right bottom":135,"bottom right":135};if(!(c in u))throw new Error(`Unsupported directional value "${c}"`);return u[c]}function st(c){let u=c.replace(/\s{2,}/gu," ");return u=u.replace(/;/g,""),u=u.replace(/ ,/g,","),u=u.replace(/\( /g,"("),u=u.replace(/ \)/g,")"),u.trim()}var at=Object.defineProperty,lt=Object.defineProperties,nt=Object.getOwnPropertyDescriptors,te=Object.getOwnPropertySymbols,ut=Object.prototype.hasOwnProperty,ct=Object.prototype.propertyIsEnumerable,re=(c,u,f)=>u in c?at(c,u,{enumerable:!0,configurable:!0,writable:!0,value:f}):c[u]=f,q=(c,u)=>{for(var f in u||(u={}))ut.call(u,f)&&re(c,f,u[f]);if(te)for(var f of te(u))ct.call(u,f)&&re(c,f,u[f]);return c},ft=(c,u)=>lt(c,nt(u));const ie=90;function dt(c){return[...c].sort((u,f)=>u.offset-f.offset)}const K=class extends y.wn{constructor(c){c&&"css"in c&&(c=ft(q({},Ue(c.css||"")),{alpha:c.alpha,maxColors:c.maxColors}));const u=q(q({},K.defaults),c);if(!u.stops||u.stops.length<2)throw new Error("ColorGradientFilter requires at least 2 color stops.");super(Ke,qe),this._stops=[],this.autoFit=!1,Object.assign(this,u)}get stops(){return this._stops}set stops(c){const u=dt(c),f=new Float32Array(u.length*3),d=0,g=1,v=2;for(let p=0;p<u.length;p++){const x=ee(u[p].color),_=p*3;f[_+d]=x[d],f[_+g]=x[g],f[_+v]=x[v]}this.uniforms.uColors=f,this.uniforms.uOffsets=u.map(p=>p.offset),this.uniforms.uAlphas=u.map(p=>p.alpha),this.uniforms.uNumStops=u.length,this._stops=u}set type(c){this.uniforms.uType=c}get type(){return this.uniforms.uType}set angle(c){this.uniforms.uAngle=c-ie}get angle(){return this.uniforms.uAngle+ie}set alpha(c){this.uniforms.uAlpha=c}get alpha(){return this.uniforms.uAlpha}set maxColors(c){this.uniforms.uMaxColors=c}get maxColors(){return this.uniforms.uMaxColors}};let I=K;I.LINEAR=0,I.RADIAL=1,I.CONIC=2,I.defaults={type:K.LINEAR,stops:[{offset:0,color:16711680,alpha:1},{offset:1,color:255,alpha:1}],alpha:1,angle:90,maxColors:0};/*!
 * @pixi/filter-color-map - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-color-map is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var ht=null,mt=null;class $r extends null{constructor(u,f=!1,d=1){super(ht,mt),this.mix=1,this._size=0,this._sliceSize=0,this._slicePixelSize=0,this._sliceInnerSize=0,this._nearest=!1,this._scaleMode=null,this._colorMap=null,this._scaleMode=null,this.nearest=f,this.mix=d,this.colorMap=u}apply(u,f,d,g){this.uniforms._mix=this.mix,u.applyFilter(this,f,d,g)}get colorSize(){return this._size}get colorMap(){return this._colorMap}set colorMap(u){!u||(u instanceof s||(u=s.from(u)),u!=null&&u.baseTexture&&(u.baseTexture.scaleMode=this._scaleMode,u.baseTexture.mipmap=o.OFF,this._size=u.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=u),this._colorMap=u)}get nearest(){return this._nearest}set nearest(u){this._nearest=u,this._scaleMode=u?r.NEAREST:r.LINEAR;const f=this._colorMap;f&&f.baseTexture&&(f.baseTexture._glTextures={},f.baseTexture.scaleMode=this._scaleMode,f.baseTexture.mipmap=o.OFF,f._updateID++,f.baseTexture.emit("update",f.baseTexture))}updateColorMap(){const u=this._colorMap;u&&u.baseTexture&&(u._updateID++,u.baseTexture.emit("update",u.baseTexture),this.colorMap=u)}destroy(u=!1){this._colorMap&&this._colorMap.destroy(u),super.destroy()}}/*!
 * @pixi/filter-color-overlay - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-color-overlay is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var gt=null,vt=null;class Zr extends null{constructor(u=0,f=1){super(gt,vt),this._color=0,this._alpha=1,this.uniforms.color=new Float32Array(3),this.color=u,this.alpha=f}set color(u){const f=this.uniforms.color;typeof u=="number"?(t.hex2rgb(u,f),this._color=u):(f[0]=u[0],f[1]=u[1],f[2]=u[2],this._color=t.rgb2hex(f))}get color(){return this._color}set alpha(u){this.uniforms.alpha=u,this._alpha=u}get alpha(){return this._alpha}}/*!
 * @pixi/filter-color-replace - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-color-replace is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var pt=null,xt=null;class Ur extends null{constructor(u=16711680,f=0,d=.4){super(pt,xt),this._originalColor=16711680,this._newColor=0,this.uniforms.originalColor=new Float32Array(3),this.uniforms.newColor=new Float32Array(3),this.originalColor=u,this.newColor=f,this.epsilon=d}set originalColor(u){const f=this.uniforms.originalColor;typeof u=="number"?(e.hex2rgb(u,f),this._originalColor=u):(f[0]=u[0],f[1]=u[1],f[2]=u[2],this._originalColor=e.rgb2hex(f))}get originalColor(){return this._originalColor}set newColor(u){const f=this.uniforms.newColor;typeof u=="number"?(e.hex2rgb(u,f),this._newColor=u):(f[0]=u[0],f[1]=u[1],f[2]=u[2],this._newColor=e.rgb2hex(f))}get newColor(){return this._newColor}set epsilon(u){this.uniforms.epsilon=u}get epsilon(){return this.uniforms.epsilon}}/*!
 * @pixi/filter-convolution - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-convolution is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var _t=null,yt=null;class Hr extends null{constructor(u,f=200,d=200){super(_t,yt),this.uniforms.texelSize=new Float32Array(2),this.uniforms.matrix=new Float32Array(9),u!==void 0&&(this.matrix=u),this.width=f,this.height=d}get matrix(){return this.uniforms.matrix}set matrix(u){u.forEach((f,d)=>{this.uniforms.matrix[d]=f})}get width(){return 1/this.uniforms.texelSize[0]}set width(u){this.uniforms.texelSize[0]=1/u}get height(){return 1/this.uniforms.texelSize[1]}set height(u){this.uniforms.texelSize[1]=1/u}}/*!
 * @pixi/filter-cross-hatch - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-cross-hatch is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ct=null,bt=null;class Qr extends null{constructor(){super(Ct,bt)}}/*!
 * @pixi/filter-crt - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-crt is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var St=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Tt=`varying vec2 vTextureCoord;
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
`;const oe=class extends y.wn{constructor(c){super(St,Tt),this.time=0,this.seed=0,this.uniforms.dimensions=new Float32Array(2),Object.assign(this,oe.defaults,c)}apply(c,u,f,d){const{width:g,height:v}=u.filterFrame;this.uniforms.dimensions[0]=g,this.uniforms.dimensions[1]=v,this.uniforms.seed=this.seed,this.uniforms.time=this.time,c.applyFilter(this,u,f,d)}set curvature(c){this.uniforms.curvature=c}get curvature(){return this.uniforms.curvature}set lineWidth(c){this.uniforms.lineWidth=c}get lineWidth(){return this.uniforms.lineWidth}set lineContrast(c){this.uniforms.lineContrast=c}get lineContrast(){return this.uniforms.lineContrast}set verticalLine(c){this.uniforms.verticalLine=c}get verticalLine(){return this.uniforms.verticalLine}set noise(c){this.uniforms.noise=c}get noise(){return this.uniforms.noise}set noiseSize(c){this.uniforms.noiseSize=c}get noiseSize(){return this.uniforms.noiseSize}set vignetting(c){this.uniforms.vignetting=c}get vignetting(){return this.uniforms.vignetting}set vignettingAlpha(c){this.uniforms.vignettingAlpha=c}get vignettingAlpha(){return this.uniforms.vignettingAlpha}set vignettingBlur(c){this.uniforms.vignettingBlur=c}get vignettingBlur(){return this.uniforms.vignettingBlur}};let wt=oe;wt.defaults={curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0};/*!
 * @pixi/filter-dot - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-dot is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var zt=null,At=null;class Jr extends null{constructor(u=1,f=5,d=!0){super(zt,At),this.scale=u,this.angle=f,this.grayscale=d}get scale(){return this.uniforms.scale}set scale(u){this.uniforms.scale=u}get angle(){return this.uniforms.angle}set angle(u){this.uniforms.angle=u}get grayscale(){return this.uniforms.grayscale}set grayscale(u){this.uniforms.grayscale=u}}/*!
 * @pixi/filter-drop-shadow - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-drop-shadow is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ft=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Pt=`varying vec2 vTextureCoord;
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
}`,Mt=Object.defineProperty,se=Object.getOwnPropertySymbols,kt=Object.prototype.hasOwnProperty,Dt=Object.prototype.propertyIsEnumerable,ae=(c,u,f)=>u in c?Mt(c,u,{enumerable:!0,configurable:!0,writable:!0,value:f}):c[u]=f,le=(c,u)=>{for(var f in u||(u={}))kt.call(u,f)&&ae(c,f,u[f]);if(se)for(var f of se(u))Dt.call(u,f)&&ae(c,f,u[f]);return c};const W=class extends y.wn{constructor(c){super(),this.angle=45,this._distance=5,this._resolution=y.Xd.FILTER_RESOLUTION;const u=c?le(le({},W.defaults),c):W.defaults,{kernels:f,blur:d,quality:g,pixelSize:v,resolution:p}=u;this._offset=new y.AB(this._updatePadding,this),this._tintFilter=new y.wn(Ft,Pt),this._tintFilter.uniforms.color=new Float32Array(4),this._tintFilter.uniforms.shift=this._offset,this._tintFilter.resolution=p,this._blurFilter=f?new L(f):new L(d,g),this.pixelSize=v,this.resolution=p;const{shadowOnly:x,rotation:_,distance:T,offset:P,alpha:R,color:z}=u;this.shadowOnly=x,_!==void 0&&T!==void 0?(this.rotation=_,this.distance=T):this.offset=P,this.alpha=R,this.color=z}apply(c,u,f,d){const g=c.getFilterTexture();this._tintFilter.apply(c,u,g,1),this._blurFilter.apply(c,g,f,d),this.shadowOnly!==!0&&c.applyFilter(this,u,f,0),c.returnFilterTexture(g)}_updatePadding(){const c=Math.max(Math.abs(this._offset.x),Math.abs(this._offset.y));this.padding=c+this.blur*2}_updateShift(){this._tintFilter.uniforms.shift.set(this.distance*Math.cos(this.angle),this.distance*Math.sin(this.angle))}set offset(c){this._offset.copyFrom(c),this._updatePadding()}get offset(){return this._offset}get resolution(){return this._resolution}set resolution(c){this._resolution=c,this._tintFilter&&(this._tintFilter.resolution=c),this._blurFilter&&(this._blurFilter.resolution=c)}get distance(){return this._distance}set distance(c){y.P6.deprecation("5.3.0","DropShadowFilter distance is deprecated, use offset"),this._distance=c,this._updatePadding(),this._updateShift()}get rotation(){return this.angle/y.ZX}set rotation(c){y.P6.deprecation("5.3.0","DropShadowFilter rotation is deprecated, use offset"),this.angle=c*y.ZX,this._updateShift()}get alpha(){return this._tintFilter.uniforms.alpha}set alpha(c){this._tintFilter.uniforms.alpha=c}get color(){return y.P6.rgb2hex(this._tintFilter.uniforms.color)}set color(c){y.P6.hex2rgb(c,this._tintFilter.uniforms.color)}get kernels(){return this._blurFilter.kernels}set kernels(c){this._blurFilter.kernels=c}get blur(){return this._blurFilter.blur}set blur(c){this._blurFilter.blur=c,this._updatePadding()}get quality(){return this._blurFilter.quality}set quality(c){this._blurFilter.quality=c}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(c){this._blurFilter.pixelSize=c}};let Ot=W;Ot.defaults={offset:{x:4,y:4},color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:y.Xd.FILTER_RESOLUTION};/*!
 * @pixi/filter-emboss - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-emboss is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Rt=null,jt=null;class ei extends null{constructor(u=5){super(Rt,jt),this.strength=u}get strength(){return this.uniforms.strength}set strength(u){this.uniforms.strength=u}}/*!
 * @pixi/filter-glitch - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-glitch is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Et=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Lt=`// precision highp float;

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
`;const Y=class extends y.wn{constructor(c){super(Et,Lt),this.offset=100,this.fillMode=Y.TRANSPARENT,this.average=!1,this.seed=0,this.minSize=8,this.sampleSize=512,this._slices=0,this._offsets=new Float32Array(1),this._sizes=new Float32Array(1),this._direction=-1,this.uniforms.dimensions=new Float32Array(2),this._canvas=document.createElement("canvas"),this._canvas.width=4,this._canvas.height=this.sampleSize,this.texture=y.xE.from(this._canvas,{scaleMode:y.aH.NEAREST}),Object.assign(this,Y.defaults,c)}apply(c,u,f,d){const{width:g,height:v}=u.filterFrame;this.uniforms.dimensions[0]=g,this.uniforms.dimensions[1]=v,this.uniforms.aspect=v/g,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,c.applyFilter(this,u,f,d)}_randomizeSizes(){const c=this._sizes,u=this._slices-1,f=this.sampleSize,d=Math.min(this.minSize/f,.9/this._slices);if(this.average){const g=this._slices;let v=1;for(let p=0;p<u;p++){const x=v/(g-p),_=Math.max(x*(1-Math.random()*.6),d);c[p]=_,v-=_}c[u]=v}else{let g=1;const v=Math.sqrt(1/this._slices);for(let p=0;p<u;p++){const x=Math.max(v*g*Math.random(),d);c[p]=x,g-=x}c[u]=g}this.shuffle()}shuffle(){const c=this._sizes,u=this._slices-1;for(let f=u;f>0;f--){const d=Math.random()*f>>0,g=c[f];c[f]=c[d],c[d]=g}}_randomizeOffsets(){for(let c=0;c<this._slices;c++)this._offsets[c]=Math.random()*(Math.random()<.5?-1:1)}refresh(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()}redraw(){const c=this.sampleSize,u=this.texture,f=this._canvas.getContext("2d");f.clearRect(0,0,8,c);let d,g=0;for(let v=0;v<this._slices;v++){d=Math.floor(this._offsets[v]*256);const p=this._sizes[v]*c,x=d>0?d:0,_=d<0?-d:0;f.fillStyle=`rgba(${x}, ${_}, 0, 1)`,f.fillRect(0,g>>0,c,p+1>>0),g+=p}u.baseTexture.update(),this.uniforms.displacementMap=u}set sizes(c){const u=Math.min(this._slices,c.length);for(let f=0;f<u;f++)this._sizes[f]=c[f]}get sizes(){return this._sizes}set offsets(c){const u=Math.min(this._slices,c.length);for(let f=0;f<u;f++)this._offsets[f]=c[f]}get offsets(){return this._offsets}get slices(){return this._slices}set slices(c){this._slices!==c&&(this._slices=c,this.uniforms.slices=c,this._sizes=this.uniforms.slicesWidth=new Float32Array(c),this._offsets=this.uniforms.slicesOffset=new Float32Array(c),this.refresh())}get direction(){return this._direction}set direction(c){if(this._direction===c)return;this._direction=c;const u=c*y.ZX;this.uniforms.sinDir=Math.sin(u),this.uniforms.cosDir=Math.cos(u)}get red(){return this.uniforms.red}set red(c){this.uniforms.red=c}get green(){return this.uniforms.green}set green(c){this.uniforms.green=c}get blue(){return this.uniforms.blue}set blue(c){this.uniforms.blue=c}destroy(){var c;(c=this.texture)==null||c.destroy(!0),this.texture=this._canvas=this.red=this.green=this.blue=this._sizes=this._offsets=null}};let j=Y;j.defaults={slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},j.TRANSPARENT=0,j.ORIGINAL=1,j.LOOP=2,j.CLAMP=3,j.MIRROR=4;/*!
 * @pixi/filter-glow - v5.2.1
 * Compiled Fri, 24 Mar 2023 22:12:11 UTC
 *
 * @pixi/filter-glow is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var It=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Vt=`varying vec2 vTextureCoord;
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
`;const ne=class extends y.wn{constructor(c){const u=Object.assign({},ne.defaults,c),{outerStrength:f,innerStrength:d,color:g,knockout:v,quality:p,alpha:x}=u,_=Math.round(u.distance);super(It,Vt.replace(/__ANGLE_STEP_SIZE__/gi,`${(1/p/_).toFixed(7)}`).replace(/__DIST__/gi,`${_.toFixed(0)}.0`)),this.uniforms.glowColor=new Float32Array([0,0,0,1]),this.uniforms.alpha=1,Object.assign(this,{color:g,outerStrength:f,innerStrength:d,padding:_,knockout:v,alpha:x})}get color(){return y.P6.rgb2hex(this.uniforms.glowColor)}set color(c){y.P6.hex2rgb(c,this.uniforms.glowColor)}get outerStrength(){return this.uniforms.outerStrength}set outerStrength(c){this.uniforms.outerStrength=c}get innerStrength(){return this.uniforms.innerStrength}set innerStrength(c){this.uniforms.innerStrength=c}get knockout(){return this.uniforms.knockout}set knockout(c){this.uniforms.knockout=c}get alpha(){return this.uniforms.alpha}set alpha(c){this.uniforms.alpha=c}};let ue=ne;ue.defaults={distance:10,outerStrength:4,innerStrength:0,color:16777215,quality:.1,knockout:!1,alpha:1};/*!
 * @pixi/filter-godray - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-godray is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Nt=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Xt=`vec3 mod289(vec3 x)
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
`,Gt=`varying vec2 vTextureCoord;
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
`;const ce=class extends y.wn{constructor(c){super(Nt,Gt.replace("${perlin}",Xt)),this.parallel=!0,this.time=0,this._angle=0,this.uniforms.dimensions=new Float32Array(2);const u=Object.assign(ce.defaults,c);this._angleLight=new y.E9,this.angle=u.angle,this.gain=u.gain,this.lacunarity=u.lacunarity,this.alpha=u.alpha,this.parallel=u.parallel,this.center=u.center,this.time=u.time}apply(c,u,f,d){const{width:g,height:v}=u.filterFrame;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=g,this.uniforms.dimensions[1]=v,this.uniforms.aspect=v/g,this.uniforms.time=this.time,this.uniforms.alpha=this.alpha,c.applyFilter(this,u,f,d)}get angle(){return this._angle}set angle(c){this._angle=c;const u=c*y.ZX;this._angleLight.x=Math.cos(u),this._angleLight.y=Math.sin(u)}get gain(){return this.uniforms.gain}set gain(c){this.uniforms.gain=c}get lacunarity(){return this.uniforms.lacunarity}set lacunarity(c){this.uniforms.lacunarity=c}get alpha(){return this.uniforms.alpha}set alpha(c){this.uniforms.alpha=c}};let Bt=ce;Bt.defaults={angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0],alpha:1};/*!
 * @pixi/filter-grayscale - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-grayscale is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var qt=null,Kt=null;class ti extends null{constructor(){super(qt,Kt)}}/*!
 * @pixi/filter-hsl-adjustment - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-hsl-adjustment is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Wt=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Yt=`precision mediump float;

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
`;const fe=class extends y.wn{constructor(c){super(Wt,Yt),this._hue=0;const u=Object.assign({},fe.defaults,c);Object.assign(this,u)}get hue(){return this._hue}set hue(c){this._hue=c,this.uniforms.uHue=this._hue*(Math.PI/180)}get alpha(){return this.uniforms.uAlpha}set alpha(c){this.uniforms.uAlpha=c}get colorize(){return this.uniforms.uColorize}set colorize(c){this.uniforms.uColorize=c}get lightness(){return this.uniforms.uLightness}set lightness(c){this.uniforms.uLightness=c}get saturation(){return this.uniforms.uSaturation}set saturation(c){this.uniforms.uSaturation=c}};let $t=fe;$t.defaults={hue:0,saturation:0,lightness:0,colorize:!1,alpha:1};/*!
 * @pixi/filter-motion-blur - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-motion-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Zt=null,Ut=null;class ri extends null{constructor(u=[0,0],f=5,d=0){super(Zt,Ut),this.kernelSize=5,this.uniforms.uVelocity=new Float32Array(2),this._velocity=new s(this.velocityChanged,this),this.setVelocity(u),this.kernelSize=f,this.offset=d}apply(u,f,d,g){const{x:v,y:p}=this.velocity;this.uniforms.uKernelSize=v!==0||p!==0?this.kernelSize:0,u.applyFilter(this,f,d,g)}set velocity(u){this.setVelocity(u)}get velocity(){return this._velocity}setVelocity(u){if(Array.isArray(u)){const[f,d]=u;this._velocity.set(f,d)}else this._velocity.copyFrom(u)}velocityChanged(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y,this.padding=(Math.max(Math.abs(this._velocity.x),Math.abs(this._velocity.y))>>0)+1}set offset(u){this.uniforms.uOffset=u}get offset(){return this.uniforms.uOffset}}/*!
 * @pixi/filter-multi-color-replace - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-multi-color-replace is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Ht=null,Qt=null;class ii extends null{constructor(u,f=.05,d=u.length){super(Ht,Qt.replace(/%maxColors%/g,d.toFixed(0))),this._replacements=[],this._maxColors=0,this.epsilon=f,this._maxColors=d,this.uniforms.originalColors=new Float32Array(d*3),this.uniforms.targetColors=new Float32Array(d*3),this.replacements=u}set replacements(u){const f=this.uniforms.originalColors,d=this.uniforms.targetColors,g=u.length;if(g>this._maxColors)throw new Error(`Length of replacements (${g}) exceeds the maximum colors length (${this._maxColors})`);f[g*3]=-1;for(let v=0;v<g;v++){const p=u[v];let x=p[0];typeof x=="number"?x=a.hex2rgb(x):p[0]=a.rgb2hex(x),f[v*3]=x[0],f[v*3+1]=x[1],f[v*3+2]=x[2];let _=p[1];typeof _=="number"?_=a.hex2rgb(_):p[1]=a.rgb2hex(_),d[v*3]=_[0],d[v*3+1]=_[1],d[v*3+2]=_[2]}this._replacements=u}get replacements(){return this._replacements}refresh(){this.replacements=this._replacements}get maxColors(){return this._maxColors}set epsilon(u){this.uniforms.epsilon=u}get epsilon(){return this.uniforms.epsilon}}/*!
 * @pixi/filter-old-film - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-old-film is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Jt=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,er=`varying vec2 vTextureCoord;
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
`;const de=class extends y.wn{constructor(c,u=0){super(Jt,er),this.seed=0,this.uniforms.dimensions=new Float32Array(2),typeof c=="number"?(this.seed=c,c=void 0):this.seed=u,Object.assign(this,de.defaults,c)}apply(c,u,f,d){var g,v;this.uniforms.dimensions[0]=(g=u.filterFrame)==null?void 0:g.width,this.uniforms.dimensions[1]=(v=u.filterFrame)==null?void 0:v.height,this.uniforms.seed=this.seed,c.applyFilter(this,u,f,d)}set sepia(c){this.uniforms.sepia=c}get sepia(){return this.uniforms.sepia}set noise(c){this.uniforms.noise=c}get noise(){return this.uniforms.noise}set noiseSize(c){this.uniforms.noiseSize=c}get noiseSize(){return this.uniforms.noiseSize}set scratch(c){this.uniforms.scratch=c}get scratch(){return this.uniforms.scratch}set scratchDensity(c){this.uniforms.scratchDensity=c}get scratchDensity(){return this.uniforms.scratchDensity}set scratchWidth(c){this.uniforms.scratchWidth=c}get scratchWidth(){return this.uniforms.scratchWidth}set vignetting(c){this.uniforms.vignetting=c}get vignetting(){return this.uniforms.vignetting}set vignettingAlpha(c){this.uniforms.vignettingAlpha=c}get vignettingAlpha(){return this.uniforms.vignettingAlpha}set vignettingBlur(c){this.uniforms.vignettingBlur=c}get vignettingBlur(){return this.uniforms.vignettingBlur}};let tr=de;tr.defaults={sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3};/*!
 * @pixi/filter-outline - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-outline is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var rr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,ir=`varying vec2 vTextureCoord;
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
`;const V=class extends y.wn{constructor(c=1,u=0,f=.1,d=1,g=!1){super(rr,ir.replace(/\$\{angleStep\}/,V.getAngleStep(f))),this._thickness=1,this._alpha=1,this._knockout=!1,this.uniforms.uThickness=new Float32Array([0,0]),this.uniforms.uColor=new Float32Array([0,0,0,1]),this.uniforms.uAlpha=d,this.uniforms.uKnockout=g,Object.assign(this,{thickness:c,color:u,quality:f,alpha:d,knockout:g})}static getAngleStep(c){const u=Math.max(c*V.MAX_SAMPLES,V.MIN_SAMPLES);return(Math.PI*2/u).toFixed(7)}apply(c,u,f,d){this.uniforms.uThickness[0]=this._thickness/u._frame.width,this.uniforms.uThickness[1]=this._thickness/u._frame.height,this.uniforms.uAlpha=this._alpha,this.uniforms.uKnockout=this._knockout,c.applyFilter(this,u,f,d)}get alpha(){return this._alpha}set alpha(c){this._alpha=c}get color(){return y.P6.rgb2hex(this.uniforms.uColor)}set color(c){y.P6.hex2rgb(c,this.uniforms.uColor)}get knockout(){return this._knockout}set knockout(c){this._knockout=c}get thickness(){return this._thickness}set thickness(c){this._thickness=c,this.padding=c}};let he=V;he.MIN_SAMPLES=1,he.MAX_SAMPLES=100;/*!
 * @pixi/filter-pixelate - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-pixelate is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var or=null,sr=null;class oi extends null{constructor(u=10){super(or,sr),this.size=u}get size(){return this.uniforms.size}set size(u){typeof u=="number"&&(u=[u,u]),this.uniforms.size=u}}/*!
 * @pixi/filter-radial-blur - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-radial-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var ar=null,lr=null;class si extends null{constructor(u=0,f=[0,0],d=5,g=-1){super(ar,lr),this._angle=0,this.angle=u,this.center=f,this.kernelSize=d,this.radius=g}apply(u,f,d,g){this.uniforms.uKernelSize=this._angle!==0?this.kernelSize:0,u.applyFilter(this,f,d,g)}set angle(u){this._angle=u,this.uniforms.uRadian=u*Math.PI/180}get angle(){return this._angle}get center(){return this.uniforms.uCenter}set center(u){this.uniforms.uCenter=u}get radius(){return this.uniforms.uRadius}set radius(u){(u<0||u===1/0)&&(u=-1),this.uniforms.uRadius=u}}/*!
 * @pixi/filter-reflection - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-reflection is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var nr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,ur=`varying vec2 vTextureCoord;
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
`;const me=class extends y.wn{constructor(c){super(nr,ur),this.time=0,this.uniforms.amplitude=new Float32Array(2),this.uniforms.waveLength=new Float32Array(2),this.uniforms.alpha=new Float32Array(2),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,me.defaults,c)}apply(c,u,f,d){var g,v;this.uniforms.dimensions[0]=(g=u.filterFrame)==null?void 0:g.width,this.uniforms.dimensions[1]=(v=u.filterFrame)==null?void 0:v.height,this.uniforms.time=this.time,c.applyFilter(this,u,f,d)}set mirror(c){this.uniforms.mirror=c}get mirror(){return this.uniforms.mirror}set boundary(c){this.uniforms.boundary=c}get boundary(){return this.uniforms.boundary}set amplitude(c){this.uniforms.amplitude[0]=c[0],this.uniforms.amplitude[1]=c[1]}get amplitude(){return this.uniforms.amplitude}set waveLength(c){this.uniforms.waveLength[0]=c[0],this.uniforms.waveLength[1]=c[1]}get waveLength(){return this.uniforms.waveLength}set alpha(c){this.uniforms.alpha[0]=c[0],this.uniforms.alpha[1]=c[1]}get alpha(){return this.uniforms.alpha}};let cr=me;cr.defaults={mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0};/*!
 * @pixi/filter-rgb-split - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-rgb-split is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var fr=null,dr=null;class ai extends null{constructor(u=[-10,0],f=[0,10],d=[0,0]){super(fr,dr),this.red=u,this.green=f,this.blue=d}get red(){return this.uniforms.red}set red(u){this.uniforms.red=u}get green(){return this.uniforms.green}set green(u){this.uniforms.green=u}get blue(){return this.uniforms.blue}set blue(u){this.uniforms.blue=u}}/*!
 * @pixi/filter-shockwave - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-shockwave is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var hr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,mr=`varying vec2 vTextureCoord;
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
`;const ge=class extends y.wn{constructor(c=[0,0],u,f=0){super(hr,mr),this.center=c,Object.assign(this,ge.defaults,u),this.time=f}apply(c,u,f,d){this.uniforms.time=this.time,c.applyFilter(this,u,f,d)}get center(){return this.uniforms.center}set center(c){this.uniforms.center=c}get amplitude(){return this.uniforms.amplitude}set amplitude(c){this.uniforms.amplitude=c}get wavelength(){return this.uniforms.wavelength}set wavelength(c){this.uniforms.wavelength=c}get brightness(){return this.uniforms.brightness}set brightness(c){this.uniforms.brightness=c}get speed(){return this.uniforms.speed}set speed(c){this.uniforms.speed=c}get radius(){return this.uniforms.radius}set radius(c){this.uniforms.radius=c}};let gr=ge;gr.defaults={amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1};/*!
 * @pixi/filter-simple-lightmap - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-simple-lightmap is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var vr=null,pr=null;class li extends null{constructor(u,f=0,d=1){super(vr,pr),this._color=0,this.uniforms.dimensions=new Float32Array(2),this.uniforms.ambientColor=new Float32Array([0,0,0,d]),this.texture=u,this.color=f}apply(u,f,d,g){var v,p;this.uniforms.dimensions[0]=(v=f.filterFrame)==null?void 0:v.width,this.uniforms.dimensions[1]=(p=f.filterFrame)==null?void 0:p.height,u.applyFilter(this,f,d,g)}get texture(){return this.uniforms.uLightmap}set texture(u){this.uniforms.uLightmap=u}set color(u){const f=this.uniforms.ambientColor;typeof u=="number"?(n.hex2rgb(u,f),this._color=u):(f[0]=u[0],f[1]=u[1],f[2]=u[2],f[3]=u[3],this._color=n.rgb2hex(f))}get color(){return this._color}get alpha(){return this.uniforms.ambientColor[3]}set alpha(u){this.uniforms.ambientColor[3]=u}}/*!
 * @pixi/filter-tilt-shift - v5.2.0
 * Compiled Tue, 28 Feb 2023 14:24:35 UTC
 *
 * @pixi/filter-tilt-shift is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var xr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,_r=`varying vec2 vTextureCoord;

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
`;class ve extends y.wn{constructor(u){var f,d;super(xr,_r),this.uniforms.blur=u.blur,this.uniforms.gradientBlur=u.gradientBlur,this.uniforms.start=(f=u.start)!=null?f:new y.E9(0,window.innerHeight/2),this.uniforms.end=(d=u.end)!=null?d:new y.E9(600,window.innerHeight/2),this.uniforms.delta=new y.E9(30,30),this.uniforms.texSize=new y.E9(window.innerWidth,window.innerHeight),this.updateDelta()}updateDelta(){this.uniforms.delta.x=0,this.uniforms.delta.y=0}get blur(){return this.uniforms.blur}set blur(u){this.uniforms.blur=u}get gradientBlur(){return this.uniforms.gradientBlur}set gradientBlur(u){this.uniforms.gradientBlur=u}get start(){return this.uniforms.start}set start(u){this.uniforms.start=u,this.updateDelta()}get end(){return this.uniforms.end}set end(u){this.uniforms.end=u,this.updateDelta()}}class yr extends ve{updateDelta(){const u=this.uniforms.end.x-this.uniforms.start.x,f=this.uniforms.end.y-this.uniforms.start.y,d=Math.sqrt(u*u+f*f);this.uniforms.delta.x=u/d,this.uniforms.delta.y=f/d}}class Cr extends ve{updateDelta(){const u=this.uniforms.end.x-this.uniforms.start.x,f=this.uniforms.end.y-this.uniforms.start.y,d=Math.sqrt(u*u+f*f);this.uniforms.delta.x=-f/d,this.uniforms.delta.y=u/d}}const pe=class extends y.wn{constructor(c,u,f,d){super(),typeof c=="number"&&(y.P6.deprecation("5.3.0","TiltShiftFilter constructor arguments is deprecated, use options."),c={blur:c,gradientBlur:u,start:f,end:d}),c=Object.assign({},pe.defaults,c),this.tiltShiftXFilter=new yr(c),this.tiltShiftYFilter=new Cr(c)}apply(c,u,f,d){const g=c.getFilterTexture();this.tiltShiftXFilter.apply(c,u,g,1),this.tiltShiftYFilter.apply(c,g,f,d),c.returnFilterTexture(g)}get blur(){return this.tiltShiftXFilter.blur}set blur(c){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=c}get gradientBlur(){return this.tiltShiftXFilter.gradientBlur}set gradientBlur(c){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=c}get start(){return this.tiltShiftXFilter.start}set start(c){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=c}get end(){return this.tiltShiftXFilter.end}set end(c){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=c}};let br=pe;br.defaults={blur:100,gradientBlur:600,start:void 0,end:void 0};/*!
 * @pixi/filter-twist - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-twist is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Sr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Tr=`varying vec2 vTextureCoord;

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
`;const xe=class extends y.wn{constructor(c){super(Sr,Tr),Object.assign(this,xe.defaults,c)}get offset(){return this.uniforms.offset}set offset(c){this.uniforms.offset=c}get radius(){return this.uniforms.radius}set radius(c){this.uniforms.radius=c}get angle(){return this.uniforms.angle}set angle(c){this.uniforms.angle=c}};let wr=xe;wr.defaults={radius:200,angle:4,padding:20,offset:new y.E9};/*!
 * @pixi/filter-zoom-blur - v5.1.1
 * Compiled Wed, 11 Jan 2023 23:10:33 UTC
 *
 * @pixi/filter-zoom-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var zr=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,Ar=`varying vec2 vTextureCoord;
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
`,_e=Object.getOwnPropertySymbols,Fr=Object.prototype.hasOwnProperty,Pr=Object.prototype.propertyIsEnumerable,Mr=(c,u)=>{var f={};for(var d in c)Fr.call(c,d)&&u.indexOf(d)<0&&(f[d]=c[d]);if(c!=null&&_e)for(var d of _e(c))u.indexOf(d)<0&&Pr.call(c,d)&&(f[d]=c[d]);return f};const ye=class extends y.wn{constructor(c){const u=Object.assign(ye.defaults,c),{maxKernelSize:f}=u,d=Mr(u,["maxKernelSize"]);super(zr,Ar.replace("${maxKernelSize}",f.toFixed(1))),Object.assign(this,d)}get center(){return this.uniforms.uCenter}set center(c){this.uniforms.uCenter=c}get strength(){return this.uniforms.uStrength}set strength(c){this.uniforms.uStrength=c}get innerRadius(){return this.uniforms.uInnerRadius}set innerRadius(c){this.uniforms.uInnerRadius=c}get radius(){return this.uniforms.uRadius}set radius(c){(c<0||c===1/0)&&(c=-1),this.uniforms.uRadius=c}};let kr=ye;kr.defaults={strength:.1,center:[0,0],innerRadius:0,radius:-1,maxKernelSize:32};/*!
 * pixi-filters - v5.2.1
 * Compiled Fri, 24 Mar 2023 22:12:11 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */}}]);
