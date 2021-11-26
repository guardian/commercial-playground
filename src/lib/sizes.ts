type AdSize = [width: number, height: number] | 'fluid';

const AdSizes: { [key: string]: AdSize } = {
	// standard ad sizes
	billboard : [970, 250],
	leaderboard : [728,90],
	mpu : [300,250],
	halfPage : [300,600],
	portrait : [300,1050],
	skyscraper : [160,600],
	mobilesticky : [320,50],
	// dfp proprietary ad sizes
	fluid : "fluid",
	outOfPage : [1,1],
	googleCard : [300,274],
	// guardian proprietary ad sizes
	video : [620,1],
	outstreamDesktop : [620,350],
	outstreamGoogleDesktop : [550,310],
	outstreamMobile : [300,197],
	merchandisingHighAdFeature : [88,89],
	merchandisingHigh : [88,87],
	merchandising : [88,88],
	inlineMerchandising : [88,85],
	fabric : [88,71],
	empty : [2,2],
}

const Sizes: { [slot: string]: { [breakpoint: string]: AdSize[]} } = {
	'top-above-nav': {
		'desktop': [
			AdSizes.outOfPage,
			AdSizes.empty,
			AdSizes.leaderboard,
			[940,230],
			[900,250],
			AdSizes.billboard,
			AdSizes.fabric,
			AdSizes.fluid,
		],
		'tablet': [
			AdSizes.outOfPage,
			AdSizes.empty,
			AdSizes.fabric,
			AdSizes.fluid,
			AdSizes.leaderboard,
		]
	},
	'right': {
		'desktop': [
			AdSizes.outOfPage,
			AdSizes.empty,
			AdSizes.mpu,
			AdSizes.googleCard,
			AdSizes.halfPage,
			AdSizes.fluid,
		]
	}
}

const SizeMappings: { [slot: string]: [AdSize, AdSize[]] } = {
	'top-above-nav': [
		[980,0],
		Sizes['top-above-nav'].desktop,
	],
	'right': [
		[0,0],
		Sizes['right'].desktop,
	]
}

export {
	Sizes,
	SizeMappings,
}