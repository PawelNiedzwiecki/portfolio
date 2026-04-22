import {
	InstagramLogoIcon,
	LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function BottomBar() {
	return (
		<div className="flex items-center justify-center gap-6 px-8 pb-8 pt-4 md:px-12">
			<a
				href="https://instagram.com/sleepy_weirdo"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
				className="text-fg/60 transition-colors duration-300 hover:text-fg"
			>
				<InstagramLogoIcon size={18} weight="regular" />
			</a>
			<a
				href="https://www.linkedin.com/in/pawelniedzwiecki/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
				className="text-fg/60 transition-colors duration-300 hover:text-fg"
			>
				<LinkedinLogoIcon size={18} weight="regular" />
			</a>
		</div>
	);
}
