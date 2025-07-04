"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// パーティクルの色定義（寒色系カラフル）
const PARTICLE_COLORS = [
	{ r: 100, g: 200, b: 255 }, // ライトブルー
	{ r: 150, g: 100, b: 255 }, // パープル
	{ r: 100, g: 255, b: 220 }, // シアン
	{ r: 200, g: 150, b: 255 }, // ラベンダー
	{ r: 50, g: 150, b: 255 }, // スカイブルー
];

// パーティクルクラス
class Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	color: { r: number; g: number; b: number };
	pulseSpeed: number;
	pulsePhase: number;

	constructor(canvasWidth: number, canvasHeight: number) {
		this.x = Math.random() * canvasWidth;
		this.y = Math.random() * canvasHeight;
		this.vx = (Math.random() - 0.5) * 0.5;
		this.vy = (Math.random() - 0.5) * 0.5;
		this.radius = Math.random() * 2 + 1;
		this.color =
			PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
		this.pulseSpeed = Math.random() * 0.02 + 0.01;
		this.pulsePhase = Math.random() * Math.PI * 2;
	}

	update(canvasWidth: number, canvasHeight: number) {
		// 位置の更新
		this.x += this.vx;
		this.y += this.vy;

		// 画面端での反射
		if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
		if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;

		// 境界内に収める
		this.x = Math.max(0, Math.min(canvasWidth, this.x));
		this.y = Math.max(0, Math.min(canvasHeight, this.y));
	}

	draw(ctx: CanvasRenderingContext2D, time: number) {
		// パルスエフェクト
		const pulse =
			Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.3 + 0.7;
		const opacity = 0.6 * pulse;

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`;
		ctx.fill();

		// グローエフェクト
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius * pulse * 3, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity * 0.1})`;
		ctx.fill();
	}
}

interface ParticleBackgroundProps {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

export function ParticleBackground({
	className,
	onClick,
}: ParticleBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number | undefined>(undefined);
	const particlesRef = useRef<Particle[]>([]);
	const timeRef = useRef(0);
	const mouseRef = useRef({ x: 0, y: 0 });
	const [isMobile, setIsMobile] = useState(false);

	// キャンバスサイズの設定
	const setCanvasSize = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}, []);

	// パーティクル間の接続を描画
	const drawConnections = useCallback(
		(ctx: CanvasRenderingContext2D, particles: Particle[]) => {
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 150) {
						const opacity = (1 - distance / 150) * 0.3;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);

						// グラデーション線
						const gradient = ctx.createLinearGradient(
							particles[i].x,
							particles[i].y,
							particles[j].x,
							particles[j].y,
						);
						gradient.addColorStop(
							0,
							`rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${opacity})`,
						);
						gradient.addColorStop(
							1,
							`rgba(${particles[j].color.r}, ${particles[j].color.g}, ${particles[j].color.b}, ${opacity})`,
						);

						ctx.strokeStyle = gradient;
						ctx.lineWidth = 1;
						ctx.stroke();
					}
				}
			}
		},
		[],
	);

	// アニメーションループ
	const animate = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// パーティクルの更新と描画
		particlesRef.current.forEach((particle) => {
			particle.update(canvas.width, canvas.height);
			particle.draw(ctx, timeRef.current);
		});

		// 接続線の描画
		drawConnections(ctx, particlesRef.current);

		timeRef.current += 1;
		animationRef.current = requestAnimationFrame(animate);
	}, [drawConnections]);

	// マウス移動ハンドラー
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isMobile) return;

			mouseRef.current = { x: e.clientX, y: e.clientY };

			// 近くのパーティクルを押し出す
			particlesRef.current.forEach((particle) => {
				const dx = mouseRef.current.x - particle.x;
				const dy = mouseRef.current.y - particle.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 100) {
					const force = (100 - distance) / 100;
					particle.vx -= (dx / distance) * force * 0.05;
					particle.vy -= (dy / distance) * force * 0.05;

					// 速度制限
					particle.vx = Math.max(-2, Math.min(2, particle.vx));
					particle.vy = Math.max(-2, Math.min(2, particle.vy));
				}
			});
		},
		[isMobile],
	);

	// 初期化とクリーンアップ
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		// モバイル判定
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();

		// キャンバスサイズ設定
		setCanvasSize();

		// パーティクル生成
		const particleCount = window.innerWidth < 768 ? 50 : 100;
		particlesRef.current = Array.from(
			{ length: particleCount },
			() => new Particle(canvas.width, canvas.height),
		);

		// アニメーション開始
		animate();

		// イベントリスナー
		window.addEventListener("resize", () => {
			setCanvasSize();
			checkMobile();
			// パーティクルの位置を調整
			particlesRef.current.forEach((particle) => {
				if (particle.x > canvas.width) particle.x = canvas.width;
				if (particle.y > canvas.height) particle.y = canvas.height;
			});
		});

		canvas.addEventListener("mousemove", handleMouseMove);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			window.removeEventListener("resize", setCanvasSize);
			canvas.removeEventListener("mousemove", handleMouseMove);
		};
	}, [animate, handleMouseMove, setCanvasSize]);

	return (
		<canvas
			ref={canvasRef}
			className={cn("absolute inset-0", className)}
			onClick={onClick}
			style={{ background: "transparent" }}
		/>
	);
}
