"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type RenderTarget = {
  framebuffer: WebGLFramebuffer;
  texture: WebGLTexture;
  width: number;
  height: number;
};

type ThemeState = {
  accent: [number, number, number];
  isDark: 0 | 1;
};

const vertexShaderSource = `#version 300 es
precision highp float;

in vec2 aPosition;
out vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const bufferFragmentShaderSource = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uPrev;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uMousePrev;
uniform float uMouseDown;
uniform int uFrame;
uniform vec3 uThemeColor;
uniform float uDarkMode;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 px = 1.0 / uResolution;
  vec3 lightThemeColor = clamp(uThemeColor * vec3(0.9, 1.08, 1.18), 0.0, 1.0);
  vec3 darkThemeColor = vec3(
    max(uThemeColor.r, 0.45),
    uThemeColor.g * 0.33,
    uThemeColor.b * 0.12
  );
  vec3 accentColor = mix(lightThemeColor, darkThemeColor, uDarkMode);

  vec2 mouse = uMouse;
  vec2 mousePrev = uMousePrev;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

  vec2 p = (uv - mouse) * aspect;
  float distanceToPointer = length(p);

  vec2 mouseVelocity = (mouse - mousePrev) * aspect;
  float motion = clamp(length(mouseVelocity) * 8.5, 0.0, 1.0);
  float activity = max(uMouseDown, motion);
  float idleWeight = 0.1 + 0.65 * activity;

  vec2 swirlDirection = vec2(-p.y, p.x);
  swirlDirection /= (distanceToPointer + 0.02);

  float influence = exp(-38.0 * distanceToPointer * distanceToPointer);
  float swirlStrength = mix(0.0014, 0.0072, uMouseDown) * influence * (0.32 + 0.68 * idleWeight);
  vec2 flow = swirlDirection * swirlStrength + mouseVelocity * influence * 0.38;

  float warp = fbm(uv * 2.1 + vec2(uTime * 0.009, -uTime * 0.007));
  flow += 0.00055 * vec2(
    sin(uTime * 0.09 + uv.y * 5.0 + warp * 6.2831),
    cos(uTime * 0.08 + uv.x * 4.6 + warp * 6.2831)
  );

  vec4 advected = texture(uPrev, uv - flow);

  vec4 blur = (
    texture(uPrev, uv + vec2(px.x, 0.0)) +
    texture(uPrev, uv - vec2(px.x, 0.0)) +
    texture(uPrev, uv + vec2(0.0, px.y)) +
    texture(uPrev, uv - vec2(0.0, px.y))
  ) * 0.25;

  vec4 smoke = mix(advected, blur, 0.08);

  smoke.rgb *= 0.975;
  smoke.a *= mix(0.978, 0.982, uDarkMode);

  float ambient = fbm(uv * 1.6 + vec2(uTime * 0.004, -uTime * 0.003));
  smoke.rgb += accentColor * (ambient - 0.56) * mix(0.0018, 0.0011, uDarkMode);

  float core = exp(-150.0 * distanceToPointer * distanceToPointer);
  float halo = exp(-56.0 * distanceToPointer * distanceToPointer);
  float plume = exp(-30.0 * distanceToPointer * distanceToPointer);

  vec3 shadowSmoke = mix(vec3(0.012, 0.04, 0.045), vec3(0.012, 0.005, 0.006), uDarkMode) * plume * mix(0.7, 1.0, uDarkMode);
  vec3 themedMist = accentColor * halo * mix(0.024, 0.018, uDarkMode) * (0.3 + 0.68 * idleWeight);
  vec3 themedCore = accentColor * core * mix(0.028, 0.07, uDarkMode) * (0.45 + activity);

  smoke.rgb += shadowSmoke + themedMist + themedCore;
  smoke.a = clamp(
    smoke.a + plume * mix(0.012, 0.011, uDarkMode) * (0.42 + 0.7 * idleWeight) + core * mix(0.055, 0.035, uDarkMode) * activity,
    0.0,
    1.0
  );

  if (uFrame < 2) {
    smoke = vec4(0.0);
  }

  outColor = clamp(smoke, 0.0, 1.0);
}
`;

const displayFragmentShaderSource = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uThemeColor;
uniform float uDarkMode;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv * 2.0 - 1.0;
  centered.x *= uResolution.x / uResolution.y;

  vec3 backgroundColor = mix(vec3(1.0), vec3(0.0), uDarkMode);
  vec3 lightThemeColor = clamp(uThemeColor * vec3(0.9, 1.08, 1.18), 0.0, 1.0);
  vec3 darkThemeColor = vec3(
    max(uThemeColor.r, 0.45),
    uThemeColor.g * 0.28,
    uThemeColor.b * 0.08
  );
  vec3 accentColor = mix(lightThemeColor, darkThemeColor, uDarkMode);
  vec4 sampleColor = texture(uTexture, uv);
  vec3 accentSample = sampleColor.rgb * mix(vec3(0.42, 1.0, 1.14), vec3(1.0, 0.34, 0.12), uDarkMode);

  float grain = noise(uv * 220.0 + uTime * 0.02) - 0.5;
  float density = clamp(sampleColor.a + grain * mix(0.018, 0.012, uDarkMode), 0.0, 1.0);

  float accentEnergy = clamp(
    dot(accentSample, mix(vec3(0.18, 0.46, 0.36), vec3(0.62, 0.28, 0.1), uDarkMode)) * mix(4.8, 2.3, uDarkMode),
    0.0,
    1.0
  );
  vec3 finalColor;

  if (uDarkMode > 0.5) {
    vec3 smokeBase = vec3(0.5, 0.14, 0.12);
    vec3 accentSmoke = mix(smokeBase, mix(smokeBase * vec3(0.82, 0.72, 0.68), accentColor, 0.72), accentEnergy);
    float opacity = density * 0.86;
    finalColor = mix(backgroundColor, accentSmoke, opacity);
    finalColor += accentSample * 0.08;
  } else {
    vec3 smokeBase = vec3(0.72, 0.9, 0.92);
    vec3 accentSmoke = mix(smokeBase, mix(vec3(0.34, 0.76, 0.8), accentColor, 0.68), accentEnergy);
    float opacity = density * 0.44;
    finalColor = mix(backgroundColor, accentSmoke, opacity);
    finalColor += accentSample * 0.05;
    finalColor -= density * vec3(0.008, 0.005, 0.004);
  }

  float vignette = 1.0 - 0.08 * dot(centered, centered);
  finalColor *= vignette;
  finalColor = clamp(finalColor, 0.0, 1.0);

  outColor = vec4(finalColor, 1.0);
}
`;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hue = ((h % 360) + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs((hue % 2) - 1));
  const m = l - chroma / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (hue >= 0 && hue < 1) {
    r = chroma;
    g = x;
  } else if (hue < 2) {
    r = x;
    g = chroma;
  } else if (hue < 3) {
    g = chroma;
    b = x;
  } else if (hue < 4) {
    g = x;
    b = chroma;
  } else if (hue < 5) {
    r = x;
    b = chroma;
  } else {
    r = chroma;
    b = x;
  }

  return [r + m, g + m, b + m];
}

function parseAccentColor(value: string): [number, number, number] {
  const matches = value.trim().match(/^([-\d.]+)\s+([-\d.]+)%\s+([-\d.]+)%$/);

  if (!matches) {
    return hslToRgb(4, 1, 0.61);
  }

  const hue = Number(matches[1]);
  const saturation = Number(matches[2]) / 100;
  const lightness = Number(matches[3]) / 100;

  return hslToRgb(hue, saturation, lightness);
}

function readThemeState(isDarkTheme: boolean): ThemeState {
  const styles = window.getComputedStyle(document.documentElement);
  const accentVarName = isDarkTheme ? "--main-color-dark" : "--main-color-light";

  return {
    accent: parseAccentColor(styles.getPropertyValue(accentVarName)),
    isDark: isDarkTheme ? 1 : 0,
  };
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(error || "Shader compile error");
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vsSource: string, fsSource: string) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error("Unable to create program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error(error || "Program link error");
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

function createTexture(gl: WebGL2RenderingContext, width: number, height: number) {
  const texture = gl.createTexture();

  if (!texture) {
    throw new Error("Unable to create texture.");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.bindTexture(gl.TEXTURE_2D, null);

  return texture;
}

function createFramebuffer(gl: WebGL2RenderingContext, texture: WebGLTexture) {
  const framebuffer = gl.createFramebuffer();

  if (!framebuffer) {
    throw new Error("Unable to create framebuffer.");
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(framebuffer);
    throw new Error("Framebuffer incomplete");
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return framebuffer;
}

function createTarget(gl: WebGL2RenderingContext, width: number, height: number): RenderTarget {
  const texture = createTexture(gl, width, height);
  const framebuffer = createFramebuffer(gl, texture);

  return { framebuffer, texture, width, height };
}

function destroyTarget(gl: WebGL2RenderingContext, target: RenderTarget | null) {
  if (!target) {
    return;
  }

  gl.deleteFramebuffer(target.framebuffer);
  gl.deleteTexture(target.texture);
}

function createFullscreenQuad(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();

  if (!vao || !buffer) {
    throw new Error("Unable to create fullscreen quad.");
  }

  const positionLocation = gl.getAttribLocation(program, "aPosition");

  if (positionLocation === -1) {
    gl.deleteVertexArray(vao);
    gl.deleteBuffer(buffer);
    throw new Error('Missing "aPosition" attribute.');
  }

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return { buffer, vao };
}

function getUniformLocation(gl: WebGL2RenderingContext, program: WebGLProgram, name: string) {
  const location = gl.getUniformLocation(program, name);

  if (!location) {
    throw new Error(`Missing "${name}" uniform.`);
  }

  return location;
}

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<ThemeState>({
    accent: hslToRgb(4, 1, 0.61),
    isDark: 0,
  });
  const resetRef = useRef(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isDarkTheme = resolvedTheme
      ? resolvedTheme === "dark"
      : document.documentElement.classList.contains("dark");

    themeRef.current = readThemeState(isDarkTheme);
    resetRef.current = true;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: true,
    });

    if (!gl) {
      return;
    }

    try {
      themeRef.current = readThemeState(document.documentElement.classList.contains("dark"));

      const bufferProgram = createProgram(gl, vertexShaderSource, bufferFragmentShaderSource);
      const displayProgram = createProgram(gl, vertexShaderSource, displayFragmentShaderSource);
      const bufferQuad = createFullscreenQuad(gl, bufferProgram);
      const displayQuad = createFullscreenQuad(gl, displayProgram);

      const bufferUniforms = {
        darkMode: getUniformLocation(gl, bufferProgram, "uDarkMode"),
        frame: getUniformLocation(gl, bufferProgram, "uFrame"),
        mouse: getUniformLocation(gl, bufferProgram, "uMouse"),
        mouseDown: getUniformLocation(gl, bufferProgram, "uMouseDown"),
        mousePrev: getUniformLocation(gl, bufferProgram, "uMousePrev"),
        prev: getUniformLocation(gl, bufferProgram, "uPrev"),
        resolution: getUniformLocation(gl, bufferProgram, "uResolution"),
        themeColor: getUniformLocation(gl, bufferProgram, "uThemeColor"),
        time: getUniformLocation(gl, bufferProgram, "uTime"),
      };

      const displayUniforms = {
        darkMode: getUniformLocation(gl, displayProgram, "uDarkMode"),
        resolution: getUniformLocation(gl, displayProgram, "uResolution"),
        texture: getUniformLocation(gl, displayProgram, "uTexture"),
        themeColor: getUniformLocation(gl, displayProgram, "uThemeColor"),
        time: getUniformLocation(gl, displayProgram, "uTime"),
      };

      let readTarget: RenderTarget | null = null;
      let writeTarget: RenderTarget | null = null;
      let frame = 0;
      let animationFrameId = 0;

      const mouse = {
        down: 0,
        prevX: 0.68,
        prevY: 0.42,
        x: 0.68,
        y: 0.42,
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.floor(window.innerWidth * dpr));
        const height = Math.max(1, Math.floor(window.innerHeight * dpr));

        if (canvas.width === width && canvas.height === height) {
          return;
        }

        canvas.width = width;
        canvas.height = height;

        destroyTarget(gl, readTarget);
        destroyTarget(gl, writeTarget);

        readTarget = createTarget(gl, width, height);
        writeTarget = createTarget(gl, width, height);
        frame = 0;
      };

      const swapTargets = () => {
        const nextTarget = readTarget;
        readTarget = writeTarget;
        writeTarget = nextTarget;
      };

      const updatePointer = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();

        if (!rect.width || !rect.height) {
          return;
        }

        const x = clamp01((clientX - rect.left) / rect.width);
        const y = clamp01(1 - (clientY - rect.top) / rect.height);

        mouse.x = x;
        mouse.y = y;
      };

      const handlePointerMove = (event: PointerEvent) => {
        updatePointer(event.clientX, event.clientY);
      };

      const handlePointerDown = (event: PointerEvent) => {
        updatePointer(event.clientX, event.clientY);
        mouse.down = 1;
      };

      const handlePointerUp = () => {
        mouse.down = 0;
      };

      const render = (timeMs: number) => {
        resize();

        if (!readTarget || !writeTarget) {
          animationFrameId = window.requestAnimationFrame(render);
          return;
        }

        if (resetRef.current) {
          frame = 0;
          resetRef.current = false;
        }

        const time = timeMs * 0.001;
        const { accent, isDark } = themeRef.current;

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);

        gl.viewport(0, 0, writeTarget.width, writeTarget.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, writeTarget.framebuffer);
        gl.useProgram(bufferProgram);
        gl.bindVertexArray(bufferQuad.vao);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, readTarget.texture);

        gl.uniform1i(bufferUniforms.prev, 0);
        gl.uniform2f(bufferUniforms.resolution, writeTarget.width, writeTarget.height);
        gl.uniform1f(bufferUniforms.time, time);
        gl.uniform2f(bufferUniforms.mouse, mouse.x, mouse.y);
        gl.uniform2f(bufferUniforms.mousePrev, mouse.prevX, mouse.prevY);
        gl.uniform1f(bufferUniforms.mouseDown, mouse.down);
        gl.uniform1i(bufferUniforms.frame, frame);
        gl.uniform3f(bufferUniforms.themeColor, accent[0], accent[1], accent[2]);
        gl.uniform1f(bufferUniforms.darkMode, isDark);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        swapTargets();

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.useProgram(displayProgram);
        gl.bindVertexArray(displayQuad.vao);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, readTarget.texture);

        gl.uniform1i(displayUniforms.texture, 0);
        gl.uniform2f(displayUniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(displayUniforms.time, time);
        gl.uniform3f(displayUniforms.themeColor, accent[0], accent[1], accent[2]);
        gl.uniform1f(displayUniforms.darkMode, isDark);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        frame += 1;
        animationFrameId = window.requestAnimationFrame(render);
      };

      resize();
      animationFrameId = window.requestAnimationFrame(render);

      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerdown", handlePointerDown, { passive: true });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
      window.addEventListener("pointercancel", handlePointerUp, { passive: true });
      window.addEventListener("blur", handlePointerUp);

      return () => {
        window.cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        window.removeEventListener("blur", handlePointerUp);

        destroyTarget(gl, readTarget);
        destroyTarget(gl, writeTarget);

        gl.deleteProgram(bufferProgram);
        gl.deleteProgram(displayProgram);
        gl.deleteVertexArray(bufferQuad.vao);
        gl.deleteVertexArray(displayQuad.vao);
        gl.deleteBuffer(bufferQuad.buffer);
        gl.deleteBuffer(displayQuad.buffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindVertexArray(null);
      };
    } catch (error) {
      console.error("Unable to initialize shader background.", error);
      return;
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
