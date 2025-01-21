export interface AnimationConfig {
    duration: number;
    ease: string;
}

export const LOGIN_ANIMATION_CONFIG: AnimationConfig = {
    duration: 0.3,
    ease: "power2.inOut"
} as const;