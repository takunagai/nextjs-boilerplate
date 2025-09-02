"use client";

import { useEffect, useState } from "react";

interface MinimalAnimationProps {
	className?: string;
}

export function MinimalAnimation({ className = "" }: MinimalAnimationProps) {
	const [animationStarted, setAnimationStarted] = useState(false);

	// アニメーション開始
	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimationStarted(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`relative ${className}`}>
			<h1 className="text-4xl leading-[1.3] md:text-6xl lg:text-7xl font-bold tracking-tight">
				{/* Web */}
				<span 
					className={`
						inline-block text-primary transition-all duration-600 ease-out
						${animationStarted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-8'
						}
					`}
					style={{ 
						animationDelay: animationStarted ? '0.5s' : '0s',
						transitionDelay: '0.5s'
					}}
				>
					Web
				</span>

				{/* First × */}
				<span 
					className={`
						inline-block mx-2 text-white transition-all duration-300 ease-out
						${animationStarted
							? 'opacity-100 scale-100'
							: 'opacity-0 scale-0'
						}
					`}
					style={{ 
						transitionDelay: '0.7s'
					}}
				>
					×
				</span>

				{/* AI */}
				<span 
					className={`
						inline-block text-primary transition-all duration-600 ease-out
						${animationStarted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-8'
						}
					`}
					style={{ 
						transitionDelay: '0.8s'
					}}
				>
					AI
				</span>

				{/* Second × */}
				<span 
					className={`
						inline-block mx-2 text-white transition-all duration-300 ease-out
						${animationStarted
							? 'opacity-100 scale-100'
							: 'opacity-0 scale-0'
						}
					`}
					style={{ 
						transitionDelay: '1.0s'
					}}
				>
					×
				</span>

				{/* Creative */}
				<span 
					className={`
						inline-block text-primary transition-all duration-600 ease-out
						${animationStarted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-8'
						}
					`}
					style={{ 
						transitionDelay: '1.1s'
					}}
				>
					Creative
				</span>
			</h1>

			{/* Subtle breathing effect after animation completes */}
			<div 
				className={`
					absolute inset-0 transition-opacity duration-1000 ease-out
					${animationStarted ? 'opacity-100' : 'opacity-0'}
					animate-breathing
				`}
				style={{ 
					transitionDelay: '2s',
					animationDelay: '2s'
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-lg blur-xl" />
			</div>
		</div>
	);
}