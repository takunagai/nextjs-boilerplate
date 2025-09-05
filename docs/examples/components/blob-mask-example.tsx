/**
 * Blob Mask コンポーネントの使用例
 * 
 * このファイルは、Blob Mask コンポーネントの様々な使用パターンを示します。
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import { BlobMasks, getBlobClipPath, type BlobShape } from "@/components/ui/blob-mask";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * 基本的な使用例
 */
export function BasicBlobExample() {
	return (
		<div className="space-y-8">
			<BlobMasks />
			
			<div className="grid grid-cols-3 gap-8">
				{/* Web 形状 */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Web Shape</h3>
					<div 
						className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600"
						style={{ clipPath: getBlobClipPath("web") }}
					>
						<div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
							WEB
						</div>
					</div>
				</div>

				{/* Consulting 形状 */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Consulting Shape</h3>
					<div 
						className="aspect-square relative overflow-hidden bg-gradient-to-br from-green-500 to-teal-600"
						style={{ clipPath: getBlobClipPath("consulting") }}
					>
						<div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
							CONSULT
						</div>
					</div>
				</div>

				{/* Creative 形状 */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Creative Shape</h3>
					<div 
						className="aspect-square relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600"
						style={{ clipPath: getBlobClipPath("creative") }}
					>
						<div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
							CREATIVE
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * 画像マスクの例
 */
export function ImageBlobExample() {
	return (
		<div className="space-y-8">
			<BlobMasks />
			<h2 className="text-2xl font-bold">画像にBlob形状を適用</h2>
			
			<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
				{(['web', 'consulting', 'creative'] as BlobShape[]).map((shape) => (
					<div key={shape} className="space-y-4">
						<div 
							className="aspect-[4/3] relative overflow-hidden"
							style={{ clipPath: getBlobClipPath(shape) }}
						>
							<Image
								src="/dummy-images/photo-05.jpg"
								alt={`${shape} blob shape example`}
								fill
								className="object-cover"
							/>
						</div>
						<p className="text-sm text-muted-foreground text-center">
							{shape} shape
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

/**
 * インタラクティブな例（形状切り替え）
 */
export function InteractiveBlobExample() {
	const [currentShape, setCurrentShape] = useState<BlobShape>("web");
	
	return (
		<div className="space-y-8">
			<BlobMasks />
			<h2 className="text-2xl font-bold">インタラクティブな形状切り替え</h2>
			
			<div className="flex gap-4 justify-center">
				{(['web', 'consulting', 'creative'] as BlobShape[]).map((shape) => (
					<Button
						key={shape}
						variant={currentShape === shape ? "default" : "outline"}
						onClick={() => setCurrentShape(shape)}
					>
						{shape}
					</Button>
				))}
			</div>
			
			<div className="max-w-md mx-auto">
				<div 
					className="aspect-square relative overflow-hidden transition-all duration-500"
					style={{ clipPath: getBlobClipPath(currentShape) }}
				>
					<div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
						<div className="h-full flex items-center justify-center text-white">
							<div className="text-center">
								<div className="text-4xl font-bold mb-2">
									{currentShape.toUpperCase()}
								</div>
								<div className="text-sm opacity-90">
									Click buttons to change shape
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * カードレイアウトの例
 */
interface ServiceCardProps {
	title: string;
	description: string;
	imageUrl: string;
	blobShape: BlobShape;
	color: string;
}

function ServiceCard({ title, description, imageUrl, blobShape, color }: ServiceCardProps) {
	return (
		<Card className="overflow-hidden">
			<div className="p-6 space-y-4">
				<div 
					className="aspect-[4/3] relative overflow-hidden mx-auto max-w-[200px]"
					style={{ clipPath: getBlobClipPath(blobShape) }}
				>
					<div className={`absolute inset-0 ${color}`} />
					<Image
						src={imageUrl}
						alt={title}
						fill
						className="object-cover mix-blend-multiply opacity-80"
					/>
				</div>
				
				<div className="text-center space-y-2">
					<h3 className="text-xl font-semibold">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</Card>
	);
}

export function CardLayoutBlobExample() {
	const services = [
		{
			title: "Web Development",
			description: "最新技術を活用したWebアプリケーション開発",
			imageUrl: "/dummy-images/photo-05.jpg",
			blobShape: "web" as BlobShape,
			color: "bg-blue-500"
		},
		{
			title: "Consulting",
			description: "ビジネス課題を解決するコンサルティング",
			imageUrl: "/dummy-images/photo-06.jpg",
			blobShape: "consulting" as BlobShape,
			color: "bg-green-500"
		},
		{
			title: "Creative Design",
			description: "印象的なビジュアルデザインの制作",
			imageUrl: "/dummy-images/photo-07.jpg",
			blobShape: "creative" as BlobShape,
			color: "bg-purple-500"
		}
	];
	
	return (
		<div className="space-y-8">
			<BlobMasks />
			<h2 className="text-2xl font-bold">カードレイアウトでの使用例</h2>
			
			<div className="grid md:grid-cols-3 gap-6">
				{services.map((service) => (
					<ServiceCard key={service.title} {...service} />
				))}
			</div>
		</div>
	);
}

/**
 * アニメーション例
 */
export function AnimatedBlobExample() {
	return (
		<div className="space-y-8">
			<BlobMasks />
			<h2 className="text-2xl font-bold">アニメーション効果</h2>
			
			<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
				{/* ホバー時のスケール */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Hover Scale</h3>
					<div 
						className="aspect-square relative overflow-hidden transition-transform duration-300 hover:scale-110 cursor-pointer"
						style={{ clipPath: getBlobClipPath("web") }}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
							Hover me!
						</div>
					</div>
				</div>

				{/* 回転アニメーション */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Rotating</h3>
					<div 
						className="aspect-square relative overflow-hidden animate-spin-slow"
						style={{ clipPath: getBlobClipPath("consulting") }}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600" />
					</div>
				</div>

				{/* パルスアニメーション */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Pulse</h3>
					<div 
						className="aspect-square relative overflow-hidden animate-pulse"
						style={{ clipPath: getBlobClipPath("creative") }}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600" />
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * レスポンシブ例
 */
export function ResponsiveBlobExample() {
	return (
		<div className="space-y-8">
			<BlobMasks />
			<h2 className="text-2xl font-bold">レスポンシブデザイン</h2>
			<p className="text-muted-foreground">
				画面サイズに応じてBlobのサイズが変化します
			</p>
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{(['web', 'consulting', 'creative'] as BlobShape[]).map((shape, index) => (
					<div key={shape} className="space-y-4">
						<div 
							className="w-full aspect-square md:aspect-[4/3] lg:aspect-square relative overflow-hidden"
							style={{ clipPath: getBlobClipPath(shape) }}
						>
							<div className={`absolute inset-0 bg-gradient-to-br ${
								index === 0 ? 'from-blue-400 to-blue-600' :
								index === 1 ? 'from-green-400 to-green-600' :
								'from-purple-400 to-purple-600'
							}`}>
								<div className="h-full flex items-center justify-center text-white">
									<div className="text-center p-4">
										<div className="text-2xl md:text-3xl lg:text-4xl font-bold">
											{shape}
										</div>
										<div className="text-xs md:text-sm mt-2">
											Responsive sizing
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

/**
 * 組み合わせ例（複数のBlob）
 */
export function CombinedBlobExample() {
	return (
		<div className="space-y-8">
			<BlobMasks />
			<h2 className="text-2xl font-bold">複数のBlobを組み合わせた例</h2>
			
			<div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
				{/* 背景のBlob */}
				<div 
					className="absolute top-10 left-10 w-32 h-32 opacity-50"
					style={{ clipPath: getBlobClipPath("web") }}
				>
					<div className="w-full h-full bg-blue-400" />
				</div>
				
				<div 
					className="absolute bottom-10 right-10 w-40 h-40 opacity-50"
					style={{ clipPath: getBlobClipPath("consulting") }}
				>
					<div className="w-full h-full bg-green-400" />
				</div>
				
				<div 
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
					style={{ clipPath: getBlobClipPath("creative") }}
				>
					<div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500">
						<div className="h-full flex items-center justify-center text-white font-bold text-xl">
							CENTER
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}