import React, { useEffect, useRef } from 'react';
import { playFireworkBurstSound } from '../utils/audioEffects';

export default function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      '#ff4d8d',
      '#c77dff',
      '#ffd166',
      '#70d6ff',
      '#ff7597',
      '#06d6a0',
      '#ffffff',
      '#e0aaff',
    ];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.gravity = 0.06;
        this.size = Math.random() * 2.5 + 1.5;
      }

      update() {
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      constructor(targetX, targetY) {
        this.x = targetX !== undefined ? targetX : Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
        this.y = canvas.height;
        this.targetY = targetY !== undefined ? targetY : Math.random() * (canvas.height * 0.45) + canvas.height * 0.1;
        this.speed = Math.random() * 4 + 7;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.particles = [];
        this.exploded = false;
        this.trail = [];
      }

      update() {
        if (!this.exploded) {
          this.trail.push({ x: this.x, y: this.y });
          if (this.trail.length > 5) this.trail.shift();

          this.y -= this.speed;

          if (this.y <= this.targetY) {
            this.explode();
          }
        } else {
          for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            if (p.alpha <= 0) {
              this.particles.splice(i, 1);
            }
          }
        }
      }

      explode() {
        this.exploded = true;
        playFireworkBurstSound();
        const count = 45 + Math.floor(Math.random() * 25);
        for (let i = 0; i < count; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      draw() {
        if (!this.exploded) {
          ctx.save();
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (let i = 0; i < this.trail.length; i++) {
            const pt = this.trail[i];
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
          ctx.restore();
        } else {
          for (const p of this.particles) {
            p.draw();
          }
        }
      }

      isDone() {
        return this.exploded && this.particles.length === 0;
      }
    }

    let fireworks = [];
    let lastLaunch = 0;

    const render = (time) => {
      // Semi-transparent clear creates motion trails
      ctx.fillStyle = 'rgba(10, 2, 20, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (time - lastLaunch > 700 && fireworks.length < 6) {
        fireworks.push(new Firework());
        lastLaunch = time;
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.update();
        fw.draw();
        if (fw.isDone()) {
          fireworks.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const clickFw = new Firework(x, y);
      clickFw.explode();
      fireworks.push(clickFw);
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        cursor: 'crosshair',
      }}
    />
  );
}

